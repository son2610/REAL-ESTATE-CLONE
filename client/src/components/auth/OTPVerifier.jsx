import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { Button } from "..";

const OTPVerifier = ({ phone, cb }) => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmOTP = () => {
        setIsLoading(true);
        window.confirmOTP
            .confirm(otp)
            .then((result) => {
                console.log(result);
                setIsLoading(false);
                cb();
            })
            .catch((error) => {
                setIsLoading(false);
            });
    };

    return (
        <div className="flex items-center justify-center h-full flex-col gap-12">
            <span>
                We sent OTP code to your <span>{phone}</span> number. Please
                check your phone!
            </span>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>●</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle="h-16 otp-item border rounded-md outline-none inline-block text-lg border-blue-600 mx-2"
                shouldAutoFocus={true}
            />
            <div className="flex gap-4 items-center justify-center">
                <Button disabaled={isLoading} onClick={handleConfirmOTP}>
                    Confirm OTP
                </Button>
                <Button onClick={() => setOtp("")} className="bg-orange-600">
                    Clear OTP
                </Button>
            </div>
        </div>
    );
};

export default OTPVerifier;
