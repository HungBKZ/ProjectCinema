# 🚀 Deployment Checklist - Brevo Email Integration

## ✅ Pre-Deployment Checklist

### Backend Changes
- [x] Converted `email.js` to use Brevo SMTP
- [x] Removed Resend package from `package.json`
- [x] Updated `.env.example` with Brevo configuration
- [x] Cleaned up test mode code
- [x] No compile errors

### Local Testing
- [ ] Test password reset email locally
- [ ] Test booking confirmation email locally
- [ ] Verify emails arrive to actual user addresses

### Environment Variables
- [ ] BREVO_SMTP_KEY added to local `.env`
- [ ] BREVO_SMTP_KEY added to Render dashboard

## 🌐 Render Deployment Steps

### 1. Add Environment Variable to Render

1. Visit: https://dashboard.render.com
2. Select your backend service: `projectcinema`
3. Go to **Environment** tab
4. Add new environment variable:
   ```
   Key: BREVO_SMTP_KEY
   Value: your_brevo_smtp_key_here
   ```
5. Click **Save Changes**

### 2. Optional: Remove Old Variables

If you have old email-related variables, remove them:
- `RESEND_API_KEY` (if exists)
- `EMAIL_HOST` (if exists)
- `EMAIL_PORT` (if exists)
- `EMAIL_USER` (if exists)
- `EMAIL_PASSWORD` (if exists)

### 3. Deploy Code Changes

```powershell
# In backend directory
cd d:\CinemaProject

# Stage all changes
git add .

# Commit with clear message
git commit -m "Integrate Brevo SMTP for email service - no test mode restrictions"

# Push to GitHub
git push origin main
```

### 4. Verify Deployment

Render will automatically deploy after push. Monitor:
1. **Logs** tab in Render dashboard
2. Look for: "Deploy live" message
3. Check for any errors in logs

### 5. Test Production Email

Test password reset:
```powershell
# PowerShell command
Invoke-RestMethod -Uri "https://projectcinema.onrender.com/api/auth/forgot-password" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"hungvinh229@gmail.com"}'
```

Or use curl:
```bash
curl -X POST https://projectcinema.onrender.com/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"hungvinh229@gmail.com"}'
```

### 6. Check Email Delivery

1. Check inbox of test email
2. Check spam folder if not in inbox
3. Verify email template renders correctly
4. Verify sender shows as "EYESEE Showcase"

## 📊 Post-Deployment Monitoring

### Render Logs
Monitor for email-related logs:
```
✅ Email sent successfully to: user@example.com
❌ Failed to send email: [error message]
```

### Brevo Dashboard
Check statistics:
1. Visit: https://app.brevo.com/statistics/email/smtp
2. Monitor:
   - Emails sent
   - Delivery rate
   - Bounce rate
   - Usage quota (300/day for free tier)

## 🐛 Common Issues & Solutions

### Issue: "Error: Invalid login"
**Solution:**
- Verify BREVO_SMTP_KEY is correct in Render
- Regenerate SMTP key in Brevo if needed
- Update Render environment variable
- Redeploy

### Issue: "Connection timeout"
**Solution:**
- Check Render logs for network errors
- Verify smtp-relay.brevo.com is accessible
- Contact Render support if firewall issue

### Issue: Emails go to spam
**Solution:**
- Verify sender domain in Brevo (optional)
- Add SPF and DKIM records
- Test with different email providers

### Issue: Deployment doesn't pick up new env vars
**Solution:**
1. In Render dashboard, click **Manual Deploy**
2. Select **Clear build cache & deploy**

## ✅ Success Criteria

- [x] Backend deployed successfully
- [ ] No errors in Render logs
- [ ] Password reset email arrives to test email
- [ ] Booking confirmation email arrives to test email
- [ ] Emails don't show test mode warnings
- [ ] Sender shows as "EYESEE Showcase"
- [ ] Email templates render correctly

## 📝 Rollback Plan

If issues occur:

1. **Check Render logs** for specific error
2. **Verify environment variable** is set correctly
3. **Test locally** to isolate issue
4. **Contact Brevo support** if SMTP issue
5. **Revert commit** if necessary:
   ```powershell
   git revert HEAD
   git push origin main
   ```

## 🎯 Final Verification

After successful deployment:

1. ✅ Register new user → Check welcome email (if implemented)
2. ✅ Forgot password → Check reset email
3. ✅ Complete booking → Check confirmation email
4. ✅ All emails arrive to actual user addresses (not test email)
5. ✅ No test mode warnings in email content

---

**Current Configuration:**
- Backend: https://projectcinema.onrender.com
- Frontend: https://project-cinema-pied.vercel.app
- Email Service: Brevo SMTP
- SMTP Server: smtp-relay.brevo.com:587
- Sender: EYESEE Showcase <9d1b3f001@smtp-brevo.com>

**Ready to Deploy!** 🚀
