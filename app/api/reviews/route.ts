import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const review = await request.json();

    const response = await fetch('http://localhost:8000/api/reviews', { // Assuming your backend API is running locally
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error('Failed to create review');
    }

    const newReview = await response.json();
    return NextResponse.json(newReview, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
