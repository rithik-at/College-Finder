import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const exam = searchParams.get('exam');
    const course = searchParams.get('course');
    const collegeId = searchParams.get('collegeId');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};
    if (exam) whereClause.exam = exam;
    if (course) whereClause.course = { contains: course, mode: 'insensitive' };
    if (collegeId) whereClause.collegeId = parseInt(collegeId);

    const [cutoffs, total] = await Promise.all([
      prisma.admissionCutoff.findMany({
        where: whereClause,
        orderBy: { closingRank: 'asc' },
        skip,
        take: limit,
        include: {
          college: {
            select: { name: true, slug: true, type: true }
          }
        }
      }),
      prisma.admissionCutoff.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      data: cutoffs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Failed to fetch cutoffs:', error);
    return NextResponse.json({ error: 'Failed to fetch cutoffs' }, { status: 500 });
  }
}
