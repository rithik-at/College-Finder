import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collegeId = searchParams.get('collegeId');

  if (!collegeId) {
    return NextResponse.json({ error: 'Missing collegeId' }, { status: 400 });
  }

  try {
    const questions = await prisma.question.findMany({
      where: { collegeId: parseInt(collegeId) },
      include: {
        user: true,
        answers: {
          include: { user: true },
          orderBy: { upvotes: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Failed to fetch QA:', error);
    return NextResponse.json({ error: 'Failed to fetch QA' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, username, collegeId, questionId, title, content } = body;

    if (!username || !content) {
      return NextResponse.json({ error: 'Username and content are required' }, { status: 400 });
    }

    // Pseudo-auth: Find or create user
    let user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      user = await prisma.user.create({ data: { username, name: username } });
    }

    if (action === 'ask') {
      if (!title || !collegeId) {
        return NextResponse.json({ error: 'Title and collegeId required for asking' }, { status: 400 });
      }

      const question = await prisma.question.create({
        data: {
          title,
          content,
          collegeId: parseInt(collegeId),
          userId: user.id,
        },
        include: { user: true, answers: { include: { user: true } } },
      });

      return NextResponse.json(question);
    } else if (action === 'answer') {
      if (!questionId) {
        return NextResponse.json({ error: 'questionId required for answering' }, { status: 400 });
      }

      const answer = await prisma.answer.create({
        data: {
          content,
          questionId: parseInt(questionId),
          userId: user.id,
        },
        include: { user: true },
      });

      return NextResponse.json(answer);
    } else if (action === 'upvote_question') {
      if (!questionId) return NextResponse.json({ error: 'questionId required' }, { status: 400 });
      const q = await prisma.question.update({
        where: { id: parseInt(questionId) },
        data: { upvotes: { increment: 1 } },
      });
      return NextResponse.json(q);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Failed to post QA:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
