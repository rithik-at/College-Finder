import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Filters
    const query = searchParams.get('q');
    const type = searchParams.get('type');
    const state = searchParams.get('state');
    
    // Sorting
    const sortBy = searchParams.get('sortBy') || 'ranking';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

    if (query) {
      whereClause.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { city: { contains: query, mode: 'insensitive' } },
        { state: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (type) {
      whereClause.type = type;
    }

    if (state) {
      whereClause.state = state;
    }

    const courseRaw = searchParams.get('course');
    if (courseRaw) {
      let courseTerm = courseRaw;
      if (courseRaw === 'BTech') courseTerm = 'B.Tech';
      else if (courseRaw === 'MBA') courseTerm = 'M.B.A';
      else if (courseRaw === 'MTech') courseTerm = 'M.Tech';
      else if (courseRaw === 'BSc') courseTerm = 'B.Sc';
      
      whereClause.courses = {
        some: {
          name: {
            contains: courseTerm,
            mode: 'insensitive',
          }
        }
      };
    }

    // Determine sort order
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderByClause: any = {};
    switch (sortBy) {
      case 'ranking':
        orderByClause = { ranking: 'asc' }; // lowest rank is best
        break;
      case 'rating':
        orderByClause = { rating: 'desc' };
        break;
      case 'fees_low':
        orderByClause = { feesMin: 'asc' };
        break;
      case 'fees_high':
        orderByClause = { feesMin: 'desc' };
        break;
      case 'name':
        orderByClause = { name: 'asc' };
        break;
      default:
        orderByClause = { ranking: 'asc' };
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip,
        take: limit,
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
      }),
      prisma.college.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      data: colleges,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Failed to fetch colleges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}
