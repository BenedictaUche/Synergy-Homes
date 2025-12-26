import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { investmentName, name, email, phone, amount, message } = body

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
      to: 'andaline160@gmail.com',
      replyTo: email,
      subject: `New Investment Interest: ${investmentName}`,
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
              .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #3b82f6; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Investment Interest</h1>
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
                ${amount ? `
                <div class="field">
                  <div class="label">Intended Investment Amount:</div>
                  <div class="value">₦${parseInt(amount).toLocaleString()}</div>
                </div>
                ` : ''}
                ${message ? `
                <div class="field">
                  <div class="label">Additional Information:</div>
                  <div class="value">${message}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Submitted At:</div>
                  <div class="value">${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}</div>
                </div>
              </div>
              <div class="footer">
                <p>This is an automated notification from Synergy Homes investment platform.</p>
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
      subject: `Thank You for Your Interest in ${investmentName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0f172a; color: white; padding: 30px; text-align: center; }
              .content { padding: 30px; background: #ffffff; }
              .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, ${name.split(' ')[0]}!</h1>
              </div>
              <div class="content">
                <p>We've received your interest in <strong>${investmentName}</strong>.</p>

                <p>Our investment advisory team will review your submission and contact you within 24 hours to discuss:</p>
                <ul>
                  <li>Investment details and terms</li>
                  <li>Documentation requirements</li>
                  <li>Next steps in the investment process</li>
                  <li>Answers to any questions you may have</li>
                </ul>

                <p>In the meantime, feel free to review our investment prospectus or contact us if you have any immediate questions.</p>

                <div style="text-align: center;">
                  <a href="https://synergyhomes.com.ng/investments" class="button">View All Investments</a>
                </div>

                <p style="margin-top: 30px;"><strong>Contact Information:</strong><br>
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
          .from('investment_interests')
          .insert({
            investment_name: investmentName,
            name,
            email,
            phone,
            amount: amount ? parseFloat(amount as string) : null,
            message: message || null,
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
        message: 'Interest submitted successfully',
        adminEmailId: adminEmail?.data?.id || null,
        userEmailId: userEmail?.data?.id || null
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing investment interest:', error)
    return NextResponse.json(
      { error: 'Failed to submit interest. Please try again.' },
      { status: 500 }
    )
  }
}
