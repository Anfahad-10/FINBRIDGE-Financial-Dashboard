const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"FINBRIDGE Finance" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

/* ==========================
   1. REGISTRATION EMAIL
   ========================== */

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to FINBRIDGE Finance – Your account is active 💎";
  const text = `Hello ${name},\n\nWelcome to FINBRIDGE Finance! Your account is now active. Start managing your wealth and optimizing your taxes today.\n\nGo to Dashboard: https://FINBRIDGE-finance.com/dashboard`;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Modern Reset */
        body { margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        table { border-spacing: 0; border-collapse: collapse; width: 100%; }
        td { padding: 0; }

        /* Layout */
        .wrapper { width: 100%; table-layout: fixed; background-color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; }

        /* Content Sections */
        .header { padding: 48px 20px 20px 20px; text-align: left; }
        .main-content { padding: 40px 20px; text-align: center; }
        
        /* Typography - Modern Finance Style */
        .title { color: #121212; font-size: 40px; font-weight: 800; line-height: 1.1; margin: 0 0 24px 0; letter-spacing: -1.5px; }
        .body-copy { color: #535353; font-size: 17px; line-height: 1.6; margin: 0 auto 32px auto; max-width: 480px; }
        
        /* The "Pill" Button */
        .btn-wrapper { padding: 10px 0 50px 0; }
        .btn { 
          background-color: #1DB954; /* Spotify Green / Growth Emerald */
          color: #ffffff !important; 
          padding: 18px 42px; 
          text-decoration: none; 
          border-radius: 500px; 
          font-weight: 700; 
          font-size: 13px; 
          letter-spacing: 1.5px;
          text-transform: uppercase;
          display: inline-block;
          box-shadow: 0 4px 12px rgba(29, 185, 84, 0.25);
        }

        /* Footer - Full Width Gray */
        .footer-outer { background-color: #F8F8F8; padding: 60px 0; border-top: 1px solid #eeeeee; }
        .footer-inner { max-width: 600px; margin: 0 auto; padding: 0 20px; text-align: left; }
        .footer-logo { font-size: 22px; font-weight: 800; color: #b3b3b3; margin-bottom: 24px; display: block; }
        .footer-links { font-size: 12px; color: #a1a1a1; line-height: 1.8; margin-bottom: 20px; }
        .footer-links a { color: #a1a1a1; text-decoration: none; margin-right: 15px; font-weight: 600; }
        .footer-links a:hover { text-decoration: underline; }
        .address { font-size: 11px; color: #b3b3b3; margin-top: 30px; line-height: 1.5; }

        /* Mobile Adjustments */
        @media screen and (max-width: 600px) {
          .title { font-size: 32px !important; }
          .header { padding-top: 30px; }
          .btn { width: 100%; box-sizing: border-box; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <!-- Logo Section -->
        <table class="container">
          <tr>
            <td class="header">
              <span style="font-size: 24px; font-weight: 800; color: #1DB954; letter-spacing: -0.5px;">FINBRIDGE.</span>
            </td>
          </tr>
        </table>

        <!-- Main Body -->
        <table class="container">
          <tr>
            <td class="main-content">
              <h1 class="title">Your financial journey starts now.</h1>
              
              <p class="body-copy">
                Hello ${name}, thanks for joining FINBRIDGE Finance. Your account is fully set up and ready to help you optimize your wealth and simplify your taxes.
              </p>

              <div class="btn-wrapper">
                <a href="https://FINBRIDGE-finance.com/dashboard" class="btn">Go to My Dashboard</a>
              </div>
            </td>
          </tr>
        </table>

        <!-- Full Width Footer -->
        <div class="footer-outer">
            <div class="footer-inner">
              <span class="footer-logo">FINBRIDGE</span>
              
              <div class="footer-links">
                <span style="margin-right: 15px; color: #121212; font-weight: 700;">GET THE APP:</span>
                <a href="#">iPhone</a>
                <a href="#">iPad</a>
                <a href="#">Android</a>
              </div>

              <div style="border-top: 1px solid #e0e0e0; margin: 20px 0;"></div>
              
              <div class="footer-links">
                <a href="#">Terms of Use</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Security</a>
                <a href="#">Contact Support</a>
              </div>
              
              <p class="address">
                This email was sent to ${userEmail} because you registered an account with FINBRIDGE Finance.<br><br>
                FINBRIDGE Finance Inc.<br>
                255 Financial District, 7th Floor<br>
                New York, NY 10004, USA
              </p>
            </div>
        </div>
      </div>
    </body>
    </html>
  `;
  await sendEmail(userEmail, subject, text, html);
}

/* ==========================
   2. RESET PASSWORD EMAIL (NEW)
   ========================== */
async function sendResetPasswordEmail(userEmail, resetUrl) {
  const subject = "Reset Your Password - FINBRIDGE Finance";
  const text = `You requested a password reset. Click here to reset: ${resetUrl}`;

  // Reusing your styles but changing content for Reset logic
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { padding: 48px 20px 20px 20px; text-align: left; }
        .main-content { padding: 40px 20px; text-align: center; }
        .title { color: #121212; font-size: 40px; font-weight: 800; line-height: 1.1; margin: 0 0 24px 0; letter-spacing: -1.5px; }
        .body-copy { color: #535353; font-size: 17px; line-height: 1.6; margin: 0 auto 32px auto; max-width: 480px; }
        .btn { background-color: #1DB954; color: #ffffff !important; padding: 18px 42px; text-decoration: none; border-radius: 500px; font-weight: 700; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; display: inline-block; box-shadow: 0 4px 12px rgba(29, 185, 84, 0.25); }
        .footer-outer { background-color: #F8F8F8; padding: 60px 0; border-top: 1px solid #eeeeee; }
        .footer-inner { max-width: 600px; margin: 0 auto; padding: 0 20px; text-align: left; }
        .footer-logo { font-size: 22px; font-weight: 800; color: #b3b3b3; margin-bottom: 24px; display: block; }
        .address { font-size: 11px; color: #b3b3b3; margin-top: 30px; line-height: 1.5; }
        @media screen and (max-width: 600px) { .title { font-size: 32px !important; } .header { padding-top: 30px; } .btn { width: 100%; } }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <table class="container"><tr><td class="header"><span style="font-size: 24px; font-weight: 800; color: #1DB954; letter-spacing: -0.5px;">FINBRIDGE.</span></td></tr></table>
        <table class="container">
          <tr>
            <td class="main-content">
              <h1 class="title">Forgot your password?</h1>
              <p class="body-copy">
                We received a request to reset the password for your FINBRIDGE account. 
                <br><br>
                If you didn't make this request, ignore this email. Otherwise, you can reset your password using the button below.
                <br>
                (Link expires in 10 minutes)
              </p>
              <div style="padding: 10px 0 50px 0;">
                <a href="${resetUrl}" class="btn">Reset Password</a>
              </div>
            </td>
          </tr>
        </table>
        <div class="footer-outer"><div class="footer-inner"><span class="footer-logo">FINBRIDGE</span><p class="address">FINBRIDGE Finance Inc.</p></div></div>
      </div>
    </body>
    </html>
  `;
  await sendEmail(userEmail, subject, text, html);
}




module.exports = { sendRegistrationEmail, sendResetPasswordEmail };