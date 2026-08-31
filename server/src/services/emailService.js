import nodemailer from 'nodemailer';

// Note: You'll need to install nodemailer: npm install nodemailer

const createTransporter = () => {
  if (!process.env.SMTP_HOST) {
    console.warn('SMTP not configured. Email service disabled.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async (to, subject, html, text) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log('Email service not configured. Skipping email send.');
      return { success: false, message: 'Email service not configured' };
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@nexlab.com',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to NexLab! 🚀';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Welcome to NexLab!</h1>
      <p>Hi ${user.name},</p>
      <p>Welcome to NexLab - Learn AI by Building!</p>
      <p>Here's what you can do next:</p>
      <ul>
        <li>Complete your first sprint</li>
        <li>Explore our courses</li>
        <li>Join the community</li>
      </ul>
      <p>Start your journey: <a href="${process.env.FRONTEND_URL}/dashboard">Go to Dashboard</a></p>
      <p>Happy Learning! 🎓</p>
      <p>The NexLab Team</p>
    </div>
  `;

  return sendEmail(user.email, subject, html);
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const subject = 'Reset Your Password - NexLab';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Reset Your Password</h1>
      <p>Hi ${user.name},</p>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link expires in 1 hour.</p>
      <p>The NexLab Team</p>
    </div>
  `;

  return sendEmail(user.email, subject, html);
};