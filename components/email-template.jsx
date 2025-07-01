export const EmailTemplate = ({ name, email, message }) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777; }
          .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You for Contacting Us!</h1>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you soon.</p>
          
          <h3>Your Message Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
          
          <p>If you have any urgent inquiries, please feel free to contact us directly at (+91) 9284244459.</p>
        </div>
        <div class="footer">
          <p>Best regards,</p>
          <p>Bhavya Mandviya</p>
          <p>Vadodara, Gujarat, India</p>
        </div>
      </body>
      </html>
    `;
};
