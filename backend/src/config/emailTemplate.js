export const verifyEmail = (otp) => {
  return `<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email - Connect</title>
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #eaeaea; padding: 40px; text-align: center;">
    <div style="max-width: 420px; background: #fff; padding: 30px; border-radius: 12px; 
                box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15); margin: auto; border-top: 5px solid #000;">
        
        <h2 style="color: #111; font-size: 24px; margin-bottom: 8px; font-weight: bold; text-transform: uppercase;">Connect</h2>
        <p style="color: #444; font-size: 15px; font-style: italic;">Your one-time verification code</p>
        
        <div style="display: inline-block; background: #111; color: #fff; padding: 18px 30px; 
                    font-size: 30px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; 
                    margin: 20px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
            ${otp}
        </div>

        <p style="color: #555; font-size: 14px; margin-top: 10px;">This code is valid for <strong>15 minutes</strong>. If you did not request this, ignore this email.</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

        <p style="color: #777; font-size: 12px;">Thanks,</p>
        <p style="color: #333; font-size: 13px; font-weight: bold;">The Connect Team</p>
    </div>
</body>
</html>
`;
};

export const resetEmail = (otp) => {
  return `<!DOCTYPE html>
<html>
<head>
    <title>Reset Your Password - Connect</title>
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #eaeaea; padding: 40px; text-align: center;">
    <div style="max-width: 420px; background: #fff; padding: 30px; border-radius: 12px; 
                box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15); margin: auto; border-top: 5px solid #000;">
        
        <h2 style="color: #111; font-size: 24px; margin-bottom: 8px; font-weight: bold; text-transform: uppercase;">Connect</h2>
        <p style="color: #444; font-size: 15px; font-style: italic;">Your password reset OTP</p>
        
        <div style="display: inline-block; background: #111; color: #fff; padding: 18px 30px; 
                    font-size: 30px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; 
                    margin: 20px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
            ${otp}
        </div>

        <p style="color: #555; font-size: 14px; margin-top: 10px;">Use this OTP to reset your password. This code is valid for <strong>15 minutes</strong>. Do not share it with anyone.</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

        <p style="color: #777; font-size: 12px;">If you didn't request this, please ignore this email or contact our support team.</p>
        <p style="color: #333; font-size: 13px; font-weight: bold;">The Connect Team</p>
    </div>
</body>
</html>
`;
};
