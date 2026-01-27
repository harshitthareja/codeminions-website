# CodeMinions Coming Soon Website

A professional coming soon page for CodeMinions YouTube channel.

## Deployment Instructions

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   - Create a new repository on GitHub
   - Upload all files (index.html, vercel.json, README.md)

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login (use GitHub account for easy integration)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Deploy" (Vercel auto-detects settings)

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

## Connect Your Hostinger Domain (codeminions.in)

### Step 1: Get Vercel Nameservers
After deploying, in Vercel:
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your domain: `codeminions.in`
4. Vercel will provide DNS settings

### Step 2: Update DNS in Hostinger

**Option A: Using Nameservers (Recommended)**
1. Login to Hostinger
2. Go to "Domains" → Select `codeminions.in`
3. Go to "DNS / Nameservers"
4. Select "Change Nameservers"
5. Add Vercel nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
6. Save changes (propagation takes 24-48 hours)

**Option B: Using A Records (Faster)**
1. In Vercel, get the IP address shown
2. In Hostinger DNS Zone Editor:
   - Delete existing A records for `@` and `www`
   - Add new A record:
     - Type: `A`
     - Name: `@`
     - Points to: Vercel IP (e.g., `76.76.21.21`)
   - Add CNAME record:
     - Type: `CNAME`
     - Name: `www`
     - Points to: `cname.vercel-dns.com`
3. Save changes (propagation takes 10-60 minutes)

## Verify Domain Connection

1. Wait for DNS propagation
2. Visit `codeminions.in` and `www.codeminions.in`
3. Both should show your website with SSL (https)

## Update Contact Form

The current form shows a success message but doesn't send emails. To make it functional:

### Option 1: Use Formspree (Free & Easy)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update the form tag in index.html:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 2: Use EmailJS
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Follow their JavaScript integration guide

### Option 3: Use Vercel Serverless Functions
Create an API endpoint to handle form submissions with email service.

## Files Structure
```
codeminions-website/
├── index.html       # Main website file
├── vercel.json      # Vercel configuration
└── README.md        # This file
```

## Support
For issues, contact via YouTube: @codeminions
