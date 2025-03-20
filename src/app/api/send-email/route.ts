import { NextResponse } from 'next/server';
import { sendMailWithSendGrid } from '@/app/services/sendgrid';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }
    
    // Check receiver email address
    if (!process.env.MAIL_RECEIVER_ADDRESS) {
      console.error('Mail receiver address is missing');
      return NextResponse.json({ 
        success: false, 
        error: "Server configuration error: Missing email receiver configuration"
      }, { status: 500 });
    }
    
    // Format the data for our email service
    const formData = {
      name: body.name,
      email: body.email,
      subject: body.subject || 'Contact Form Submission', // Use default if not provided
      message: body.message,
      captcha: 'api-route' // Not needed for SendGrid but included for compatibility
    };
    
    // Send the email using SendGrid
    const result = await sendMailWithSendGrid(formData);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error('SendGrid email sending failed:', result.error);
      return NextResponse.json({ 
        success: false, 
        error: result.error
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Email sending error:', error);
    
    // Provide more specific error message if possible
    let errorMessage = "An error occurred while sending the email";
    
    if (error instanceof Error) {
      // Include the actual error message for debugging
      errorMessage = `Email error: ${error.message}`;
    }
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage
    }, { status: 500 });
  }
} 