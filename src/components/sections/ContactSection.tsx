"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { ReCaptchaProvider } from "../RecaptchaProvider";
import { ContactFormData } from "@/types";
import { contactFormSchema } from "@/app/utils/validation/contact-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ContactSectionProps {
  sendMail: (formData: ContactFormData) => Promise<{success: boolean, error: string | null}>;
}

export function ContactSection({ sendMail }: ContactSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const [showSuccess, setShowSuccess] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur" // Validate fields when they lose focus
  });
  
  // Update form data with captcha value when it changes
  useEffect(() => {
    if (captcha) {
      setValue('captcha', captcha);
    }
  }, [captcha, setValue]);
  
  const onSubmit = async (formData: ContactFormData) => {
    // Clear any previous submission errors
    setSubmissionError(null);
    
    // Ensure captcha is provided
    if (!captcha) {
      setSubmissionError("Please complete the captcha verification");
      return false;
    }
    
    try {
      // First try with server action
      try {
        const result = await sendMail({...formData});
        
        if (result.success) {
          setShowSuccess(true);
          reset();
          setCaptcha(null);
          setTimeout(() => {
            setShowSuccess(false);
          }, 5000);
          return true;
        } else if (result.error) {
          setSubmissionError(result.error);
          return false;
        }
        // If server action fails, continue to fallback
      } catch (err) {
        console.log(err);
        // Continue to fallback
      }
      
      // Fallback to API route
      const apiData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      };
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      const apiResult = await response.json();
      
      if (apiResult.success) {
        setShowSuccess(true);
        reset();
        setCaptcha(null);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
        return true;
      } else {
        setSubmissionError(apiResult.error || "Failed to send message. Please try again later.");
        return false;
      }
    } catch (err) {
      let errorMessage = "An error occurred while sending your message. Please try again later.";
      
      if (err instanceof Error) {
        errorMessage += ` Error details: ${err.message}`;
      }
      
      setSubmissionError(errorMessage);
      return false;
    }
  }

  useEffect(() => {
    setIsMounted(true);
    if (success === "true") {
      setShowSuccess(true);
      // Automatically hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);


  return (
    <section id="contact" className="relative w-full bg-black min-h-screen">
      {isMounted ? (
          <WavyBackground className="w-full" colors={['#ffffff', '#818cf8', '#6366f1', '#4f46e5']}>
            <div className="container mx-auto px-4 py-16 w-full">
              <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500 text-transparent font-semibold mb-20 text-center">
                Contact Me
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                {/* Left Column - Contact Information */}
                <div className="backdrop-blur-sm bg-black/20 p-8 rounded-xl border border-gray-800 flex flex-col space-y-8">
                  <h2 className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-white to-gray-300 text-transparent">Get In Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-zinc-800/80 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-gray-200 font-medium">Email</h3>
                        <p className="text-gray-400">reeseparsons99@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-zinc-800/80 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-gray-200 font-medium">Location</h3>
                        <p className="text-gray-400">Nova Scotia, Canada</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-xl font-medium text-gray-200 mb-6">Connect With Me</h3>
                    <div className="flex space-x-4">
                      <a href="https://github.com/reese001" target="_blank" rel="noopener noreferrer" className="bg-zinc-800/80 p-3 rounded-full hover:bg-zinc-700/80 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-300" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/reese-parsons/" target="_blank" rel="noopener noreferrer" className="bg-zinc-800/80 p-3 rounded-full hover:bg-zinc-700/80 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-gray-300" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Contact Form */}
                <div className="backdrop-blur-sm bg-black/20 p-8 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-white to-gray-300 text-transparent mb-8">Send a Message</h2>
                  {showSuccess && (
                    <div className="mb-6 p-4 bg-green-900/50 border border-green-600 rounded-lg text-green-300 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Message sent successfully! I&apos;ll get back to you soon.
                    </div>
                  )}
                  
                  {submissionError && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-600 rounded-lg text-red-300">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Error</span>
                      </div>
                      <p className="mt-1 ml-7">{submissionError}</p>
                    </div>
                  )}
                  
                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <input type="hidden" {...register("captcha")} />
                    
                    <div className="space-y-2 text-left">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className={`bg-zinc-900/80 border-zinc-800 text-white focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
                        aria-invalid={errors.name ? "true" : "false"}
                        {...register("name")}
                      />
                      {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-2 text-left">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="your.email@example.com"
                        className={`bg-zinc-900/80 border-zinc-800 text-white focus:border-indigo-500 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
                        aria-invalid={errors.email ? "true" : "false"}
                        {...register("email")}
                      />
                      {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="space-y-2 text-left">
                      <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                        Subject
                      </label>
                      <Input
                        type="text"
                        id="subject"
                        placeholder="Subject of your message"
                        className={`bg-zinc-900/80 border-zinc-800 text-white focus:border-indigo-500 focus:ring-indigo-500 ${errors.subject ? 'border-red-500' : ''}`}
                        aria-invalid={errors.subject ? "true" : "false"}
                        {...register("subject")}
                      />
                      {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
                    </div>
                    <div className="space-y-2 text-left">
                      <label htmlFor="message" className="text-sm font-medium text-gray-300">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        className={`bg-zinc-900/80 border-zinc-800 text-white resize-none focus:border-indigo-500 focus:ring-indigo-500 ${errors.message ? 'border-red-500' : ''}`}
                        aria-invalid={errors.message ? "true" : "false"}
                        {...register("message")}
                      />
                      {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <ReCaptchaProvider onChange={setCaptcha}>
                        {!captcha && errors.captcha && (
                          <div className="text-red-500 text-sm mb-2">
                            {errors.captcha.message}
                          </div>
                        )}
                        <div className="w-full">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-white hover:bg-gray-200 text-black py-2.5 font-medium rounded-md hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </button>
                        </div>
                      </ReCaptchaProvider>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </WavyBackground>
      ) : (
        <WavyBackground className="w-full min-h-screen" colors={['#ffffff', '#818cf8', '#6366f1', '#4f46e5']}>
          <div className="py-32 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 w-full">
              <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500 text-transparent font-semibold mb-20 text-center">
                Contact Me
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                <div className="backdrop-blur-sm bg-black/20 p-8 rounded-xl border border-gray-800">
                  {/* Placeholder for contact info */}
                  <div className="opacity-50">Loading contact info...</div>
                </div>
                <div className="backdrop-blur-sm bg-black/20 p-8 rounded-xl border border-gray-800">
                  {/* Placeholder form while the client-side component loads */}
                  <div className="opacity-50">Loading form...</div>
                </div>
              </div>
            </div>
          </div>
        </WavyBackground>
      )}
    </section>
  );
} 