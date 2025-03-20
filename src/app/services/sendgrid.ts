import sgMail from '@sendgrid/mail';
import { ContactFormData } from '@/types';

// Initialize the SendGrid client with API Key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailResult {
  success: boolean;
  error: string | null;
}

export async function sendMailWithSendGrid(data: ContactFormData): Promise<EmailResult> {
  // Ensure API key is set
  if (!process.env.SENDGRID_API_KEY) {
    console.error('Missing SendGrid API key');
    return {
      success: false,
      error: 'Server configuration error: Missing SendGrid API key',
    };
  }
  
  // Check receiver email
  if (!process.env.MAIL_RECEIVER_ADDRESS) {
    console.error('Missing receiver email address');
    return {
      success: false,
      error: 'Server configuration error: Missing receiver email address',
    };
  }
  
  try {
    // Set up the email data
    const msg = {
      to: process.env.MAIL_RECEIVER_ADDRESS,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
        name: process.env.SENDGRID_FROM_NAME || 'Contact Form',
      },
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      text: `Message from: ${data.name} <${data.email}>\nSubject: ${data.subject}\n\n${data.message}`,
      html: `<div>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>`,
    };
    
    // Send the email
    const response = await sgMail.send(msg);
    
    // Check response status code
    if (response[0].statusCode >= 200 && response[0].statusCode < 300) {
      return {
        success: true,
        error: null,
      };
    } else {
      console.error('SendGrid returned non-success status code:', response[0].statusCode);
      return {
        success: false,
        error: `SendGrid error: Status code ${response[0].statusCode}`,
      };
    }
  } catch (error) {
    console.error('SendGrid sending error:', error);
    
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = `SendGrid error: ${error.message}`;
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
} 