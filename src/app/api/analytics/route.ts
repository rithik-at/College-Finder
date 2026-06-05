import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const colleges = await prisma.college.findMany({
      select: {
        name: true,
        type: true,
        state: true,
        rating: true,
        feesMin: true,
        feesMax: true,
        avgPackage: true,
        highestPackage: true,
        placementRate: true,
      },
      where: {
        feesMin: { not: null },
        avgPackage: { not: null },
      }
    });

    // Aggregate by State
    const stateDistribution = colleges.reduce((acc, curr) => {
      acc[curr.state] = (acc[curr.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Aggregate by Type
    const typeDistribution = colleges.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      colleges,
      stateDistribution: Object.entries(stateDistribution).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, 10),
      typeDistribution: Object.entries(typeDistribution).map(([name, value]) => ({ name, value })),
    });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
