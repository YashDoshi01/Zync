"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import ErrorMessage from "@/components/Errormessage";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/slices/authSlice';
import type { RootState, AppDispatch } from '@/store/index';
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, error, loading } = useSelector((state: RootState) => state.auth);
  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    const { email, password } = formData;   

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Login form data:", formData);
      dispatch(loginUser(formData));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#1a1b1e] relative overflow-hidden">
      {/* Centered Background Image with Blur */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1614294148960-9aa740632a87?auto=format&fit=crop&q=80')",
          backgroundSize: "80% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(40px)",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1a1b1e]/80" />

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
          Welcome back to <span className="text-[#5865F2]">Zync</span>
        </h1>

        <div className="bg-[#2F3136]/40 p-8 rounded-2xl border border-[#40444B]/30 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-500  mb-2">
              Login to continue
            </h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <Card className="bg-transparent border-none shadow-none">
            <CardBody>
              <form className="space-y-6">
                {/* Email */}
                <div className="space-y-1">
                  <p className="text-sm text-white">Email</p>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="border-[#40444B] text-white pl-10 focus:ring-[#5865F2] focus:border-[#5865F2]"
                    />
                    {errors.email && <ErrorMessage message={errors.email} />}
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <p className="text-sm text-white">Password</p>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="border-[#40444B] text-white pl-10 focus:ring-[#5865F2] focus:border-[#5865F2]"
                    />
                    {errors.password && <ErrorMessage message={errors.password} />}
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2 transition-colors" onClick={handleSubmit}>
                  Log In
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Signup Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-[#5865F2] hover:underline">
              Sign up
            </a>
          </p>

          {/* Terms */}
          <p className="text-center text-gray-400 text-xs mt-4">
            By logging in, you agree to our{" "}
            <a href="/" className="text-[#5865F2] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/" className="text-[#5865F2] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
