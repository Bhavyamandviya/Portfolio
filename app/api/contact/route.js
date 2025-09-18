import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com' for Gmail
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS, // your app password
    },
  });
};

// Email templates
const createOwnerEmailHtml = (name, email, message) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #ffffff; }
        .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; }
        .info-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #70757f; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
            <p>You have received a new message from your portfolio contact form:</p>
            
            <div class="info-box">
                <strong>Name:</strong> ${name}
            </div>
            <div class="info-box">
                <strong>Email:</strong> ${email}
            </div>
            <div class="info-box">
                <strong>Message:</strong><br>
                ${message.replace(/\n/g, "<br>")}
            </div>
        </div>
        <div class="footer">
            <p>This message was sent from your portfolio contact form.</p>
        </div>
    </div>
</body>
</html>
`;

const createUserEmailHtml = (name) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #70757f; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #ffffff; }
        .footer { background-color: #f4f4f4; padding: 20px; text-align: center; }
        .highlight { color: #70757f; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Reaching Out!</h1>
        </div>
        <div class="content">
            <p>Hi ${name},</p>
            
            <p>Thank you for getting in touch through my portfolio website. I've received your message and appreciate you taking the time to reach out.</p>
            
            <p>I'll review your message carefully and get back to you as soon as possible, typically within 24-48 hours.</p>
            
            <p>In the meantime, feel free to:</p>
            <ul>
                <li>Check out my other projects on my portfolio</li>
                <li>Connect with me on professional networks</li>
                <li>Reach out directly if you have any urgent questions</li>
            </ul>
            
            <p>Best regards,<br>
            <span class="highlight">Bhavya Mandviya</span></p>
        </div>
        <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p><strong>Contact:</strong> mandviyabhavya@gmail.com | <strong>Phone:</strong> (+91) 9284244459</p>
            <p><strong>Location:</strong> Vadodara, Gujarat, India</p>
        </div>
    </div>
</body>
</html>
`;

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const transporter = createTransporter();

    // Send email to yourself (notification)
    const ownerMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.OWNER_EMAIL || "mandviyabhavya@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: createOwnerEmailHtml(name, email, message),
      replyTo: email,
    };

    // Send thank you email to the user
    const userMailOptions = {
      from: `"Bhavya Mandviya" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for contacting me, ${name}!`,
      html: createUserEmailHtml(name),
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json(
      { success: true, message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
