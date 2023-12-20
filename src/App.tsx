import React, { useState, useRef, useEffect } from "react";

const OtpInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    document.addEventListener("paste", handlePaste);

    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const handlePaste = (e: ClipboardEvent) => {
    let pastedData = e.clipboardData?.getData("Text");
    pastedData = pastedData?.trim();
    if (pastedData && /^[0-9]{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, 6);
      setOtp(newOtp);

      inputRefs.current[5]?.focus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const newOtp = [...otp];

    if (!/^\d*$/.test(value)) return;

    if (value === "" && index > 0) {
      newOtp[index] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
      return;
    }

    newOtp[index] = value;

    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    setOtp(newOtp);
    console.log(newOtp);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="h-screen flex justify-center items-center space-x-4 bg-green-200">
      {otp.map((value, index) => (
        <input
          className="size-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition spin-button-none "
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
