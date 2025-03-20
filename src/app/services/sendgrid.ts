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

// Helper function to escape HTML special characters
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
    // Sanitize user inputs
    const sanitizedName = escapeHtml(data.name);
    const sanitizedEmail = escapeHtml(data.email);
    const sanitizedSubject = escapeHtml(data.subject);
    const sanitizedMessage = escapeHtml(data.message);
    
    // Set up the email data
    const msg = {
      to: process.env.MAIL_RECEIVER_ADDRESS,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
        name: process.env.SENDGRID_FROM_NAME || 'Contact Form',
      },
      replyTo: sanitizedEmail,
      subject: `Contact Form: ${sanitizedSubject}`,
      text: `Message from: ${sanitizedName} <${sanitizedEmail}>\nSubject: ${sanitizedSubject}\n\n${sanitizedMessage}`,
      html: `<div>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
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