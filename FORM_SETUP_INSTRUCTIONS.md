# Velox Studios - Form Setup Instructions

## How to Connect Your Contact Form to Outlook

Your form is set up to use **Formspree** - a free service that sends form submissions directly to your email.

### Step-by-Step Setup (5 minutes):

1. **Go to Formspree**
   - Visit: https://formspree.io/
   - Click "Get Started" (it's FREE!)

2. **Create Account**
   - Sign up with your email (can use veloxstudios@outlook.com)
   - Verify your email

3. **Create Your Form**
   - Click "+ New Form"
   - Form name: "Velox Studios Contact"
   - Email: veloxstudios@outlook.com
   - Click "Create Form"

4. **Get Your Form ID**
   - Copy the form endpoint that looks like: `https://formspree.io/f/xyzabc123`
   - The ID is the part after `/f/` (e.g., `xyzabc123`)

5. **Update Your Website**
   - Open: `index.html`
   - Find line with: `action="https://formspree.io/f/YOUR_FORM_ID"`
   - Replace `YOUR_FORM_ID` with your actual ID
   - Example: `action="https://formspree.io/f/xyzabc123"`
   - Save the file

6. **Test It!**
   - Open your website
   - Fill out the contact form
   - Submit
   - Check veloxstudios@outlook.com for the email!

## What Happens When Someone Submits:

✅ Form data is sent to Formspree
✅ Formspree forwards it to veloxstudios@outlook.com
✅ User sees a "Thank you" page
✅ You get an email with all the details:
   - Name
   - Email
   - Business/Project Name
   - Project Description
   - Timeline (if selected)
   - Budget Range (if selected)

## Free Plan Limits:

- 50 submissions per month
- Perfect for starting out!
- Upgrade later if needed

## Alternative (Even Simpler):

If you want something even simpler, you can use a mailto link instead, though it's less professional:
- Opens the user's email client
- Not recommended for professional sites

**Formspree is the best free option for your setup!**

---

Need help? Email questions work great with Formspree's documentation:
https://help.formspree.io/
