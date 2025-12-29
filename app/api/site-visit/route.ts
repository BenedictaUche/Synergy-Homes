import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { propertyName, propertySlug, name, email, phone, preferredDate, preferredTime, notes } = body

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format date and time
    const visitDate = new Date(preferredDate).toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const visitTime = preferredTime

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
        subject: `New Site Visit Request: ${propertyName}`,
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
                .highlight { background: #dbeafe; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Site Visit Request</h1>
                </div>
                <div class="content">
                  <div class="highlight">
                    <strong>📅 Visit Details</strong><br>
                    Property: ${propertyName}<br>
                    Date: ${visitDate}<br>
                    Time: ${visitTime}
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
                  ${notes ? `
                  <div class="field">
                    <div class="label">Additional Notes:</div>
                    <div class="value">${notes}</div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Property Link:</div>
                    <div class="value">
                      <a href="https://synergyhomes.com.ng/properties/${propertySlug}">View Property</a>
                    </div>
                  </div>
                  <div class="field">
                    <div class="label">Requested At:</div>
                    <div class="value">${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}</div>
                  </div>
                </div>
                <div class="footer">
                  <p>Please contact the client to confirm the site visit appointment.</p>
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
        subject: `Site Visit Scheduled: ${propertyName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0f172a; color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; background: #ffffff; }
                .highlight { background: #dbeafe; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; }
                .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Site Visit Scheduled!</h1>
                </div>
                <div class="content">
                  <p>Hi ${name.split(' ')[0]},</p>

                  <p>Thank you for scheduling a site visit for <strong>${propertyName}</strong>.</p>

                  <div class="highlight">
                    <strong>📅 Your Visit Details:</strong><br>
                    Date: ${visitDate}<br>
                    Time: ${visitTime}
                  </div>

                  <p><strong>What happens next?</strong></p>
                  <ul>
                    <li>Our team will review your request and contact you within 24 hours to confirm the appointment</li>
                    <li>We'll provide you with the exact location and directions to the property</li>
                    <li>If needed, we can reschedule to a more convenient time</li>
                    <li>Our property specialist will be available to answer all your questions during the visit</li>
                  </ul>

                  <p>In the meantime, feel free to review the property details or contact us if you have any immediate questions.</p>

                  <div style="text-align: center;">
                    <a href="https://synergyhomes.com.ng/properties/${propertySlug}" class="button">View Property Details</a>
                  </div>

                  <p style="margin-top: 30px;"><strong>Contact Information:</strong><br>
                  Phone: +234 803 396 6285<br>
                  Email: contact@synergyhomes.com.ng</p>
                </div>
                <div class="footer">
                  <p><strong>Synergy Homes Limited</strong><br>
                  Building Your Future, One Property at a Time</p>
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
          .from('site_visits')
          .insert({
            property_name: propertyName,
            property_slug: propertySlug,
            name,
            email,
            phone,
            preferred_date: preferredDate,
            preferred_time: preferredTime,
            notes: notes || null,
            created_at: new Date().toISOString(),
          })

        if (dbError) {
          console.error('Error saving to database:', dbError)
        }
      } catch (dbError) {
        console.error('Error saving to database:', dbError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Site visit scheduled successfully',
        adminEmailId: adminEmail?.data?.id || null,
        userEmailId: userEmail?.data?.id || null
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing site visit request:', error)
    return NextResponse.json(
      { error: 'Failed to schedule site visit. Please try again.' },
      { status: 500 }
    )
  }
}
