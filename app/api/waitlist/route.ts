import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { investmentName, name, email, phone } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to admin
    let adminEmail = null
    let userEmail = null

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not configured. Emails will not be sent.')
    } else {
      adminEmail = await resend.emails.send({
      from: 'Synergy Homes <noreply@synergyhomes.com.ng>',
      to: 'contact@synergyhomes.com.ng',
      replyTo: email,
      subject: `New Waitlist Registration: ${investmentName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0f172a; color: white; padding: 20px; text-align: center; }
              .content { background: #f8f9fa; padding: 30px; margin-top: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #555; }
              .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #eab308; }
              .badge { display: inline-block; padding: 5px 10px; background: #fef3c7; color: #92400e; border-radius: 3px; font-size: 12px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Waitlist Registration</h1>
                <span class="badge">Coming Soon Investment</span>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Investment:</div>
                  <div class="value">${investmentName}</div>
                </div>
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${phone}</div>
                </div>
                <div class="field">
                  <div class="label">Registered At:</div>
                  <div class="value">${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      })

      // Send confirmation email to user
      userEmail = await resend.emails.send({
      from: 'Synergy Homes <noreply@synergyhomes.com.ng>',
      to: email,
      subject: `You're on the Waitlist for ${investmentName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0f172a; color: white; padding: 30px; text-align: center; }
              .content { padding: 30px; background: #ffffff; }
              .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #eab308; margin: 20px 0; }
              .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to the Waitlist!</h1>
              </div>
              <div class="content">
                <p>Hi ${name.split(' ')[0]},</p>

                <p>Thank you for joining the waitlist for <strong>${investmentName}</strong>!</p>

                <div class="highlight">
                  <strong>🎯 You're on the list!</strong><br>
                  We'll notify you immediately when this investment opportunity opens. You'll be among the first to know.
                </div>

                <p><strong>What happens next?</strong></p>
                <ul>
                  <li>You'll receive an email notification when the investment opens</li>
                  <li>We'll send you an SMS alert as well</li>
                  <li>Early access to investment documentation</li>
                  <li>Priority consideration for allocation</li>
                </ul>

                <p>In the meantime, feel free to explore our other available investment opportunities.</p>

                <div style="text-align: center;">
                  <a href="https://synergyhomes.com.ng/investments" class="button">Browse Open Investments</a>
                </div>

                <p style="margin-top: 30px;">Questions? Contact us:<br>
                Phone: +234 123 456 7890<br>
                Email: contact@synergyhomes.com.ng</p>
              </div>
              <div class="footer">
                <p><strong>Synergy Homes Limited</strong><br>
                Building Your Future, One Investment at a Time</p>
              </div>
            </div>
          </body>
        </html>
      `,
      })
    }

    // Save to database if Supabase is configured
    if (supabase) {
      try {
        const { error: dbError } = await supabase
          .from('waitlist_registrations')
          .insert({
            investment_name: investmentName,
            name,
            email,
            phone,
            created_at: new Date().toISOString(),
          })

        if (dbError) {
          console.error('Error saving to database:', dbError)
          // Don't fail the request if database save fails
        }
      } catch (dbError) {
        console.error('Error saving to database:', dbError)
        // Don't fail the request if database save fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined waitlist',
        adminEmailId: adminEmail?.data?.id || null,
        userEmailId: userEmail?.data?.id || null
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing waitlist registration:', error)
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    )
  }
}
