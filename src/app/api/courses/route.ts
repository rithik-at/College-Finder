import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const q = searchParams.get('q');
    const level = searchParams.get('level');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};
    if (q) {
      whereClause.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { college: { name: { contains: q, mode: 'insensitive' } } }
      ];
    }
    if (level) {
      whereClause.level = level;
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where: whereClause,
        orderBy: { fees: 'asc' },
        skip,
        take: limit,
        include: {
          college: {
            select: { name: true, slug: true, type: true }
          }
        }
      }),
      prisma.course.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      data: courses,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
