export const getVerificationEmailTemplate = (code: number): string => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Verify Your Aniheaven Account</title>
      <!--[if mso]>
      <style type="text/css">
      body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
      </style>
      <![endif]-->
  </head>

  <body style="margin: 0; padding: 0; background-color: #0d0d0d; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
      <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #0f0f0f; font-family: 'Arial', sans-serif;">
          <!-- Header -->

          <div style="background-color: #1c1c1c; padding: 40px 30px; text-align: center; border-bottom: 2px solid #845fd6;">
              <h1 style="margin: 0; color: #e2e8f0; font-size: 28px; font-weight: bold;">Aniheaven</h1>
              <p style="margin: 10px 0 0 0; color: #999999; font-size: 16px;">Email Verification</p>
          </div>
  
          <!-- Welcome Message -->
          <div style="padding: 40px 30px;">
              <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0;">Hey there,</p>
              <p style="color: #999999; font-size: 16px; line-height: 1.6; margin: 20px 0;">Welcome to Aniheaven! To ensure the security of your account, please use the verification code below to complete your registration.</p>
          </div>
  
          <!-- Verification Code -->
          <div style="margin: 0 30px 30px; background-color: #1c1c1c; border-radius: 12px; padding: 24px; text-align: center;">
              <p style="color: #999999; font-size: 14px; margin: 0 0 15px 0;">Your Verification Code:</p>
              <p style="color: #845fd6; font-size: 32px; letter-spacing: 8px; margin: 0; font-weight: bold;">${code}</p>
              <p style="color: #535256; font-size: 12px; margin: 15px 0 0 0;">This code will expire in 24 hours</p>
          </div>
  
          <!-- Security Notice -->
          <div style="background-color: #1c1c1c; padding: 30px; border-top: 1px solid #2d2d2d;">
              <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 0;">For your security:</p>
              <ul style="color: #999999; font-size: 14px; line-height: 1.6; margin: 10px 0; padding-left: 20px;">
                  <li>Never share your verification code</li>
                  <li>Aniheaven staff will never ask for your password</li>
                  <li>Enable 2FA for additional security</li>
              </ul>
          </div>
  
          <!-- Footer -->
          <div style="background-color: #0f0f0f; padding: 30px; border-top: 1px solid #2d2d2d; text-align: center;">
              <p style="color: #535256; font-size: 14px; margin: 0 0 20px 0;">&copy; ${new Date().getFullYear()} Aniheaven. All rights reserved.</p>
              <div>
                  <a href="#" style="color: #845fd6; text-decoration: none; margin: 0 15px; font-size: 14px;">Terms</a>
                  <a href="#" style="color: #845fd6; text-decoration: none; margin: 0 15px; font-size: 14px;">Privacy</a>
                  <a href="#" style="color: #845fd6; text-decoration: none; margin: 0 15px; font-size: 14px;">Support</a>
              </div>
          </div>
      </div>
  </body>
  </html>`;
};
