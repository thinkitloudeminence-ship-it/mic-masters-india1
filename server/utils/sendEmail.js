const nodemailer = require("nodemailer");

// Gmail SMTP via App Password (no third-party payment/SMS API - just email delivery)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

/**
 * Sends the "registration confirmed" email after admin verifies the
 * uploaded payment screenshot.
 */
async function sendRegistrationConfirmedEmail({ to, fullName }) {
  const mailOptions = {
    from: `"Mic Masters India" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🎤 Your Mic Masters India Registration is Confirmed!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background:#0f0f0f; color:#fff; border-radius:12px; overflow:hidden;">
        <div style="background:#000; padding:24px; text-align:center; border-bottom:3px solid #FFD700;">
          <h1 style="color:#FFD700; margin:0; font-size:24px;">🎤 Mic Masters India</h1>
        </div>
        <div style="padding:28px;">
          <h2 style="color:#FFD700; margin-top:0;">Hi ${fullName}! 🌟</h2>
          <p style="font-size:16px; line-height:1.7; color:#eee;">
            Congratulations! Your registration for <strong style="color:#FFD700;">Mic Masters India</strong> has been 
            <strong style="color:#4caf50;">successfully confirmed</strong>! 🎉
          </p>
          <p style="font-size:15px; line-height:1.7; color:#eee;">
            Your registration is complete and your seat is secured. We are super excited to have you perform with us!
          </p>
          <div style="margin:24px 0; padding:20px; background:#1a1a1a; border-radius:10px; border-left:4px solid #FFD700;">
            <p style="margin:0 0 8px 0; font-size:14px; color:#ccc;">📋 Registration Status</p>
            <p style="margin:0; font-size:16px; font-weight:bold; color:#4caf50;">✅ Confirmed & Verified</p>
          </div>
          <div style="margin:20px 0; padding:18px; background:#1a1a1a; border-radius:10px; border-left:4px solid #E4405F;">
            <p style="margin:0 0 8px 0; font-size:15px; color:#FFD700; font-weight:bold;">⏰ Important Reminders:</p>
            <ul style="margin:0; padding-left:18px; color:#ddd; line-height:1.8; font-size:14px;">
              <li>Be on time to attend the event</li>
              <li>Perform your best and give it your all!</li>
              <li>Venue: 26-27, Hotel Amrit, Near Sardar Patel Bridge, Chhoti Gwaltoli, Indore – 452001</li>
              <li>Stay tuned to our social media for event updates</li>
            </ul>
          </div>
          <p style="font-size:14px; color:#aaa; margin-top:20px;">
            We believe in you. Go shine on that stage! 🌟🎤
          </p>
          <p style="font-size:13px; color:#777; margin-top:12px;">
            For any questions, reach out to us on Instagram <strong>@micmastersindia</strong> or reply to this email.
          </p>
        </div>
        <div style="background:#000; padding:16px; text-align:center; font-size:12px; color:#555; border-top:1px solid #222;">
          © ${new Date().getFullYear()} Mic Masters India. All rights reserved. | Powered by The Counseling Cafe
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendRegistrationConfirmedEmail };
