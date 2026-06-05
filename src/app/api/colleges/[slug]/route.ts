import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const college = await prisma.college.findUnique({
      where: { slug },
      include: {
        courses: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        cutoffs: {
          orderBy: [{ year: 'desc' }, { closingRank: 'asc' }],
        },
        _count: {
          select: { reviews: true },
        },
      },
    });

    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error('Failed to fetch college details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch college details' },
      { status: 500 }
    );
  }
}
