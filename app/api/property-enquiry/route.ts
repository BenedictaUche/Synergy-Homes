import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { propertyName, propertySlug, propertyPrice, name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
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
        subject: `New Property Enquiry: ${propertyName}`,
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
                  <h1>New Property Enquiry</h1>
                </div>
                <div class="content">
                  <div class="highlight">
                    <strong>🏠 Property:</strong> ${propertyName}<br>
                    ${propertyPrice ? `<strong>Price:</strong> ${propertyPrice}<br>` : ''}
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
                    <div class="label">Message:</div>
                    <div class="value">${message}</div>
                  </div>
                  <div class="field">
                    <div class="label">Property Link:</div>
                    <div class="value">
                      <a href="https://synergyhomes.com.ng/properties/${propertySlug}">View Property</a>
                    </div>
                  </div>
                  <div class="field">
                    <div class="label">Submitted At:</div>
                    <div class="value">${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}</div>
                  </div>
                </div>
                <div class="footer">
                  <p>Please respond to this enquiry as soon as possible.</p>
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
        subject: `Thank You for Your Enquiry: ${propertyName}`,
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
                  <h1>Thank You for Your Enquiry!</h1>
                </div>
                <div class="content">
                  <p>Hi ${name.split(' ')[0]},</p>

                  <p>Thank you for your interest in <strong>${propertyName}</strong>.</p>

                  <p>We've received your enquiry and our property specialist team will review it and get back to you within 24 hours with:</p>
                  <ul>
                    <li>Detailed information about the property</li>
                    <li>Answers to your questions</li>
                    <li>Documentation and title information</li>
                    <li>Payment plans and financing options (if applicable)</li>
                    <li>Next steps in the purchase process</li>
                  </ul>

                  <p>In the meantime, feel free to explore our other properties or contact us directly if you have any urgent questions.</p>

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
          .from('property_enquiries')
          .insert({
            property_name: propertyName,
            property_slug: propertySlug,
            property_price: propertyPrice || null,
            name,
            email,
            phone,
            message,
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
        message: 'Enquiry submitted successfully',
        adminEmailId: adminEmail?.data?.id || null,
        userEmailId: userEmail?.data?.id || null
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing property enquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    )
  }
}
