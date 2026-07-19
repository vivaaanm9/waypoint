import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import { useAuth } from "../../context/AuthContext";
import { LogIn, Key, Phone } from "lucide-react";

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginWithEmail, loginWithPhone, loginWithGoogle } = useAuth();
  const [tab, setTab] = useState("email"); // 'email' | 'phone'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    loginWithEmail(email, password);
    onClose();
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!phone) return;
    setOtpSent(true);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phone || !otp) return;
    loginWithPhone(phone, otp);
    onClose();
  };

  const handleGoogleSubmit = () => {
    loginWithGoogle();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login to Waypoint">
      <div className="flex flex-col gap-6">
        {/* Tab Selection */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setTab("email")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              tab === "email" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Email Login
          </button>
          <button
            onClick={() => setTab("phone")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              tab === "phone" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            OTP Login
          </button>
        </div>

        {tab === "email" ? (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<LogIn size={18} />}
              required
            />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Key size={18} />}
              required
            />
            <Button type="submit" fullWidth>
              Sign In with Email
            </Button>
          </form>
        ) : (
          <form
            onSubmit={otpSent ? handlePhoneSubmit : handleSendOTP}
            className="flex flex-col gap-4"
          >
            <Input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone size={18} />}
              disabled={otpSent}
              required
            />
            {otpSent && (
              <Input
                type="text"
                placeholder="Enter 4-digit OTP (e.g., 1234)"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                leftIcon={<Key size={18} />}
                required
              />
            )}
            <Button type="submit" fullWidth>
              {otpSent ? "Verify OTP & Login" : "Send OTP"}
            </Button>
          </form>
        )}

        <div className="relative flex items-center justify-center my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative px-3 bg-white text-xs text-[#9AA6B2] uppercase font-semibold">
            Or continue with
          </span>
        </div>

        <button
          onClick={handleGoogleSubmit}
          className="w-full flex items-center justify-center gap-2 py-3 border border-[#E2E8F0] hover:bg-slate-50 transition-all rounded-xl font-semibold text-sm cursor-pointer shadow-sm text-gray-700 active:scale-95"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 0 1 8 12.527a5.99 5.99 0 0 1 5.99-5.99c1.474 0 2.809.537 3.843 1.418l2.969-2.968A9.947 9.947 0 0 0 13.99 2.55 9.99 9.99 0 0 0 4 12.538a9.99 9.99 0 0 0 9.99 9.99 9.53 9.53 0 0 0 9.77-9.98c0-.776-.08-1.5-.22-2.263H12.24Z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </Modal>
  );
};
