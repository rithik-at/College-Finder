import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { exam, rank, category = 'General' } = body;

    if (!exam || !rank) {
      return NextResponse.json(
        { error: 'Exam and rank are required' },
        { status: 400 }
      );
    }

    const rankNum = parseInt(rank);
    if (isNaN(rankNum) || rankNum <= 0) {
      return NextResponse.json(
        { error: 'Invalid rank' },
        { status: 400 }
      );
    }

    // Save to predictor history
    try {
      await prisma.predictorHistory.create({
        data: {
          exam,
          rank: rankNum,
          category,
        }
      });
    } catch (e) {
      console.warn("Could not save predictor history:", e);
    }

    // Find cutoffs where the student's rank is within range
    // We fetch cutoffs where closingRank >= studentRank 
    // (a higher closing rank number means lower score required)
    const cutoffs = await prisma.admissionCutoff.findMany({
      where: {
        exam,
        category,
        closingRank: {
          gte: rankNum, // if closing rank is 5000, and my rank is 4000, I am eligible
        },
      },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
            location: true,
            rating: true,
            ranking: true,
            logo: true,
            feesMin: true,
            feesMax: true,
            avgPackage: true,
            acceptedExams: true,
          },
        },
      },
      orderBy: {
        closingRank: 'asc', // show the most competitive colleges first
      },
      take: 50,
    });

    // Group by college and calculate confidence
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const collegeMap = new Map<number, any>();

    for (const cutoff of cutoffs) {
      // Calculate confidence based on how far rank is from closing rank
      // if rank is much better (lower) than closing rank -> Safe
      // if rank is close to closing rank -> Moderate
      // if rank is very close or slightly below -> Reach (we only fetched gte, but maybe we can add a buffer later)
      
      const margin = cutoff.closingRank - rankNum;
      let confidence: 'Safe' | 'Moderate' | 'Reach' = 'Reach';
      
      if (margin > cutoff.closingRank * 0.2) {
        confidence = 'Safe'; // Rank is 20% better than closing rank
      } else if (margin > cutoff.closingRank * 0.05) {
        confidence = 'Moderate'; // Rank is 5-20% better
      }

      const existing = collegeMap.get(cutoff.collegeId);
      
      // Keep the best confidence level and add the course
      if (!existing || margin > existing.bestRankMargin) {
        collegeMap.set(cutoff.collegeId, {
          college: cutoff.college,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          matchedCutoffs: cutoffs.filter((c: any) => c.collegeId === cutoff.collegeId),
          confidence,
          bestRankMargin: margin,
        });
      }
    }

    // Sort: Safe first, then Moderate, then Reach; within each, by ranking
    const results = Array.from(collegeMap.values())
      .sort((a, b) => {
        const confidenceOrder: Record<string, number> = { Safe: 0, Moderate: 1, Reach: 2 };
        const confDiff = confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
        if (confDiff !== 0) return confDiff;
        return (a.college.ranking || 999) - (b.college.ranking || 999);
      })
      .map((item) => ({
        college: item.college,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        matchedCutoffs: item.matchedCutoffs.map((c: any) => ({
          id: c.id,
          exam: c.exam,
          year: c.year,
          category: c.category,
          course: c.course,
          closingRank: c.closingRank,
          openingRank: c.openingRank,
        })),
        confidence: item.confidence,
      }));

    return NextResponse.json({
      success: true,
      data: results,
      meta: {
        totalMatches: results.length,
        exam,
        rank: rankNum,
        category,
      }
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to process prediction' },
      { status: 500 }
    );
  }
}
