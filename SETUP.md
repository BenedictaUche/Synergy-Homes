# Setup Guide for Express Interest & Download Prospectus Features

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Resend API Key for sending emails
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key_here

# Supabase Configuration (Optional - for database storage)
# Get these from your Supabase project settings: https://supabase.com/dashboard/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Sanity Configuration (if using Sanity CMS)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

## Required Setup

### 1. Resend (Required for Email Functionality)

1. Sign up at [Resend](https://resend.com)
2. Create an API key
3. Add it to your `.env.local` as `RESEND_API_KEY`
4. Verify your domain or use the default sender

### 2. Supabase (Optional - for Database Storage)

The application works without Supabase, but database storage is recommended for tracking submissions.

#### Setup Steps:

1. **Create a Supabase Project**
   - Go to [Supabase](https://supabase.com) and create a new project
   - Note your project URL and anon key from Settings > API

2. **Run the Database Schema**
   - Open the SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL to create the tables

3. **Add Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your `.env.local`

#### Database Tables Created:

- `investment_interests` - Stores Express Interest form submissions
- `prospectus_requests` - Stores Download Prospectus requests
- `waitlist_registrations` - Stores waitlist signups

## Features Implemented

### ✅ Express Interest
- Form dialog with validation
- Email notifications (admin + user confirmation)
- Database storage (if Supabase configured)
- Error handling and success feedback

### ✅ Download Prospectus
- Professional dialog form (replaced prompt-based approach)
- Email delivery with prospectus information
- Database tracking (if Supabase configured)
- User-friendly success messages

### ✅ Waitlist Registration
- Form for coming-soon investments
- Email notifications
- Database storage (if Supabase configured)

## How It Works

1. **Without Supabase**:
   - Forms work and send emails via Resend
   - Submissions are not stored in a database
   - All functionality remains operational

2. **With Supabase**:
   - Forms work and send emails via Resend
   - All submissions are automatically saved to the database
   - You can query and manage submissions from Supabase dashboard

## Testing

1. Start your development server: `npm run dev`
2. Navigate to an investment page
3. Test "Express Interest" button
4. Test "Download Prospectus" button
5. Check your email inbox for notifications
6. If Supabase is configured, check your database tables

## Troubleshooting

- **Emails not sending**: Check your Resend API key and domain verification
- **Database errors**: Ensure Supabase environment variables are set correctly
- **Forms not submitting**: Check browser console for errors and verify API routes are accessible
