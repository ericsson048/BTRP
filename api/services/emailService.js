import nodemailer from 'nodemailer';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Email sending function
const sendEmail = async ({ to, subject, html }) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Welcome email template
export const sendWelcomeEmail = async (userEmail, userName) => {
    const subject = 'Welcome to BTR - Burundi en Temps Réel';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Welcome to BTR!</h1>
            <p>Dear ${userName},</p>
            <p>Thank you for joining Burundi en Temps Réel. We're excited to have you as part of our community!</p>
            <p>With your account, you can:</p>
            <ul>
                <li>Access exclusive content</li>
                <li>Participate in our community</li>
                <li>Stay updated with the latest news</li>
            </ul>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Best regards,<br>The BTR Team</p>
        </div>
    `;

    return sendEmail({ to: userEmail, subject, html });
};

// Password reset email template
export const sendPasswordResetEmail = async (userEmail, resetToken) => {
    const subject = 'BTR - Password Reset Request';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Password Reset Request</h1>
            <p>You requested to reset your password.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}" 
               style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                Reset Password
            </a>
            <p>If you didn't request this, please ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
            <p>Best regards,<br>The BTR Team</p>
        </div>
    `;

    return sendEmail({ to: userEmail, subject, html });
};

// Contact form email notification
export const sendContactEmail = async (name, email, message) => {
    const subject = 'BTR - Nouveau message de contact';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Nouveau message de contact</h1>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px;">Vous pouvez répondre directement à cet email pour contacter ${name}.</p>
        </div>
    `;

    return sendEmail({
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject,
        html
    });
};

export { sendEmail };
