import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          college: {
            select: { name: true, slug: true }
          }
        }
      }),
      prisma.review.count(),
    ]);

    return NextResponse.json({
      data: reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { collegeId, author, rating, title, content } = body;

    if (!collegeId || !author || !rating || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: {
        author,
        rating: parseFloat(rating),
        title,
        content,
        collegeId: parseInt(collegeId),
      }
    });

    return NextResponse.json({ success: true, data: newReview }, { status: 201 });
  } catch (error) {
    console.error('Failed to create review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
