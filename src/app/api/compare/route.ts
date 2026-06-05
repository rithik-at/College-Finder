import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json({ error: 'No college IDs provided' }, { status: 400 });
    }

    const ids = idsParam.split(',').map((id) => parseInt(id.trim())).filter((id) => !isNaN(id));

    if (ids.length === 0) {
      return NextResponse.json({ error: 'Invalid college IDs' }, { status: 400 });
    }

    if (ids.length > 3) {
      return NextResponse.json({ error: 'Cannot compare more than 3 colleges' }, { status: 400 });
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: {
          in: ids,
        },
      },
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
        highestPackage: true,
        placementRate: true,
        acceptedExams: true,
      },
    });

    // Maintain requested order
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderedColleges = ids
      .map((id) => colleges.find((c: any) => c.id === id))
      .filter(Boolean);

    return NextResponse.json(orderedColleges);
  } catch (error) {
    console.error('Failed to fetch colleges for compare:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges for comparison' },
      { status: 500 }
    );
  }
}
