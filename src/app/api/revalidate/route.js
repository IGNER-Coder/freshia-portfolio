import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // 1. Verify the secret to ensure only Sanity can trigger this
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    const body = await request.json();

    // 2. Revalidate the entire artworks gallery page
    revalidatePath('/artworks');

    // 3. If a specific artwork was updated, revalidate its dedicated page too
    if (body?.slug?.current) {
      revalidatePath(`/artworks/${body.slug.current}`);
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Cache successfully purged!'
    });
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err.message 
    }, { status: 500 });
  }
}
