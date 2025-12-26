import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { investmentName, investmentSlug, userEmail, userName } = body

    // Validate required fields
    if (!investmentName || !investmentSlug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Option 1: If you have pre-generated PDF files
    // const pdfPath = path.join(process.cwd(), 'public', 'prospectus', `${investmentSlug}.pdf`)
    // const pdfBuffer = await fs.readFile(pdfPath)

    // Option 2: Generate PDF dynamically (requires pdf generation library)
    // const pdfBuffer = await generateInvestmentPDF(investmentSlug)

    // For now, we'll send an email with a download link
    if (userEmail && userName) {
      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not configured. Email will not be sent.')
      } else {
        await resend.emails.send({
        from: 'Synergy Homes <noreply@synergyhomes.com.ng>',
        to: userEmail,
        subject: `Investment Prospectus: ${investmentName}`,
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
                .info-box { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Investment Prospectus</h1>
                </div>
                <div class="content">
                  <p>Dear ${userName},</p>

                  <p>Thank you for your interest in <strong>${investmentName}</strong>.</p>

                  <p>Please find the detailed investment prospectus attached to this email. The prospectus contains:</p>
                  <ul>
                    <li>Complete investment overview and objectives</li>
                    <li>Financial projections and ROI analysis</li>
                    <li>Risk assessment and mitigation strategies</li>
                    <li>Legal and regulatory compliance information</li>
                    <li>Terms and conditions</li>
                    <li>Payment and exit strategies</li>
                  </ul>

                  <div class="info-box">
                    <strong>📄 Document Information</strong><br>
                    Investment: ${investmentName}<br>
                    Document Type: Investment Prospectus<br>
                    Generated: ${new Date().toLocaleDateString('en-NG')}
                  </div>

                  <p>We recommend reviewing the prospectus carefully. If you have any questions or would like to schedule a consultation with our investment advisory team, please don't hesitate to contact us.</p>

                  <div style="text-align: center;">
                    <a href="https://synergyhomes.com.ng/investments/${investmentSlug}" class="button">View Investment Details</a>
                  </div>

                  <p style="margin-top: 30px;"><strong>Contact Our Investment Team:</strong><br>
                  Phone: +234 123 456 7890<br>
                  Email: contact@synergyhomes.com.ng</p>
                </div>
                <div class="footer">
                  <p><strong>Synergy Homes Limited</strong><br>
                  Building Your Future, One Investment at a Time</p>
                  <p style="font-size: 10px; margin-top: 10px;">
                    This prospectus is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy securities.
                    Please consult with your financial advisor before making investment decisions.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
          // Uncomment when you have actual PDF files
          // attachments: [
          //   {
          //     filename: `${investmentSlug}-prospectus.pdf`,
          //     content: pdfBuffer,
          //   },
          // ],
        })
      }
    }

    // Save to database if Supabase is configured
    if (supabase && userEmail && userName) {
      try {
        const { error: dbError } = await supabase
          .from('prospectus_requests')
          .insert({
            investment_name: investmentName,
            investment_slug: investmentSlug,
            user_name: userName,
            user_email: userEmail,
            created_at: new Date().toISOString(),
          })

        if (dbError) {
          console.error('Error saving prospectus request to database:', dbError)
          // Don't fail the request if database save fails
        }
      } catch (dbError) {
        console.error('Error saving prospectus request to database:', dbError)
        // Don't fail the request if database save fails
      }
    }

    // Log the download request
    console.log(`Prospectus requested for: ${investmentName} by ${userName || 'Anonymous'}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Prospectus will be sent to your email',
        downloadUrl: `/prospectus/${investmentSlug}.pdf` // For direct download if file exists
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error generating prospectus:', error)
    return NextResponse.json(
      { error: 'Failed to generate prospectus. Please try again.' },
      { status: 500 }
    )
  }
}
