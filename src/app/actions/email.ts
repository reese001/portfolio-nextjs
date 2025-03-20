'use server';

import { ContactFormData } from '@/types';
import { sendMailWithSendGrid } from '../services/sendgrid';

export async function sendMail(formData: ContactFormData) {
  // Check if required environment variables are available for the receiver
  if (!process.env.MAIL_RECEIVER_ADDRESS) {
    console.error('Mail receiver address is missing');
    return {
      success: false,
      error: "Server configuration error: Missing email receiver configuration",
    };
  }
  
  try {
    // Use SendGrid to send the email
    const result = await sendMailWithSendGrid(formData);
    
    if (!result.success) {
      console.error('SendGrid email sending failed:', result.error);
    }
    
    return result;
  } catch (err: unknown) {
    console.error('Email sending error:', err);
    // Provide more specific error message if possible
    let errorMessage = "An error occurred while sending the email";
    
    if (err instanceof Error) {
      // Include the actual error message for debugging
      errorMessage = `Email error: ${err.message}`;
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
} 