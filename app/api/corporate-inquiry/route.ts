/**
 * Corporate inquiry form → email notification.
 *
 * Required in .env.local:
 *   RESEND_API_KEY     – from https://resend.com/api-keys
 *   CORPORATE_INQUIRY_EMAIL or INQUIRY_NOTIFY_EMAIL – where to receive submissions
 *
 * Optional:
 *   RESEND_FROM_EMAIL  – e.g. "Your Site <notifications@yourdomain.com>" (must be verified in Resend)
 *   Default "from" is onboarding@resend.dev for testing.
 */
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/** POST /api/corporate-inquiry – send inquiry as email notification. */
export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email not configured: RESEND_API_KEY missing' },
      { status: 500 }
    );
  }

  const notifyEmail = process.env.CORPORATE_INQUIRY_EMAIL || process.env.INQUIRY_NOTIFY_EMAIL;
  if (!notifyEmail) {
    return NextResponse.json(
      { error: 'Email not configured: CORPORATE_INQUIRY_EMAIL or INQUIRY_NOTIFY_EMAIL required' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const {
      name,
      companyName,
      email,
      phoneNumber,
      franchiseLocations,
      hearAboutUs,
      startTimeline,
    } = body as Record<string, string>;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const from = process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';
    const html = `
      <h2>Corporate Teams Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company name:</strong> ${escapeHtml(companyName || '—')}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phoneNumber || '—')}</p>
      <p><strong>Number of franchise locations:</strong> ${escapeHtml(franchiseLocations || '—')}</p>
      <p><strong>How did you hear about us?</strong> ${escapeHtml(hearAboutUs || '—')}</p>
      <p><strong>How soon would you like to start?</strong> ${escapeHtml(startTimeline || '—')}</p>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to: [notifyEmail],
      subject: `Corporate Teams Inquiry from ${name.trim()}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Corporate inquiry error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to send inquiry' },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
