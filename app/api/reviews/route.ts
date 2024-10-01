// /app/api/reviews/route.ts
import { Review } from '@/app/models/Review';
import { createReview } from '@/app/services/reviewService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const review: Omit<Review, '_id'> = await request.json();
    const newReview = await createReview(review);
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
