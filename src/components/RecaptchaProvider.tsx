import ReCAPTCHA from "react-google-recaptcha";
import React from "react";

export const ReCaptchaProvider: React.FC<{ 
    children: React.ReactNode;
    onChange: (token: string | null) => void;
}> = ({ children, onChange }) => {
    return (
        <>
            <ReCAPTCHA 
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} 
                onChange={onChange}
                className="justify-self-center"
            />
            {children}
        </>
    )
}