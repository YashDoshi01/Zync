"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Tabs, Tab } from "@heroui/react";
import { Card, CardBody } from "@heroui/card";
import { Lock, User, Mail, Cake, Upload } from "lucide-react";
import { useState } from "react";
import ErrorMessage from "@/components/Errormessage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { registerUser } from "@/store/slices/authSlice";
export default function SignupPage() {
  const [step, setStep] = useState("account");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
  email: "",
  password: "",
  username: "",
  dob: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (token) {
      router.push("/chats"); // or your dashboard page
    }
  }, [token, router]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);  
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    const { email, password, username, dob } = formData;
  
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!username) newErrors.username = "Username is required.";
    if (!dob) newErrors.dob = "Date of birth is required.";
  
    if (username && (username.length < 8 || username.length > 20)) {
      newErrors.username = "Username must be between 8 and 20 characters.";
    }
  
    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
  
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 15) newErrors.dob = "You must be at least 15 years old.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const fileInput = document.getElementById("avatar") as HTMLInputElement;
    const avatarFile = fileInput?.files?.[0] ?? null;
  
    const resultAction = await dispatch(registerUser({ ...formData, avatar: avatarFile }));
    if (registerUser.fulfilled.match(resultAction)) {
      
      router.push('/login'); // Redirect to login
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

      {/* Signup Form */}
      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
          Welcome to <span className="text-[#5865F2]">Zync</span>
        </h1>
        <div className="bg-[#2F3136]/40 p-8 rounded-2xl border border-[#40444B]/30 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">Join our gaming community today</p>
          </div>

          <Tabs
            aria-label="Signup Steps"
            selectedKey={step}
            onSelectionChange={(key) => setStep(key as string)}
            color={"primary"}
          >
            <Tab key="account" title="Account">
              <Card className="bg-transparent border-none shadow-none">
                <CardBody>
                  <form className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-white font-medium"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
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
                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="block text-white font-medium"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
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

                    <Button
                      type="button"
                      onClick={() => setStep("profile")}
                      className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      Continue
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="profile" title="Profile">
              <Card className="bg-transparent border-none shadow-none">
                <CardBody>
                  <form className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="space-y-2">
                      <label
                        htmlFor="avatar"
                        className="block text-white font-medium"
                      >
                        Profile Picture
                      </label>
                      <div
                        className={`relative rounded-xl border-2 border-dashed ${
                          isDragging
                            ? "border-[#5865F2] bg-[#5865F2]/10"
                            : "border-[#40444B]"
                        } p-4 transition-colors`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                          {previewUrl ? (
                            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
                              <img
                                src={previewUrl}
                                alt="Profile preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-[#1a1b1e] flex items-center justify-center mb-2">
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <div className="text-center">
                            <p className="text-white font-medium">
                              {previewUrl ? "Change picture" : "Upload picture"}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              Drag & drop or click to upload
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                      <label
                        htmlFor="username"
                        className="block text-white font-medium"
                      >
                        Username
                      </label>
                      <div className="relative">
                        <Input
                          id="username"
                          type="text"
                          placeholder="Choose a username"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                          }
                          className=" border-[#40444B] text-white pl-10 focus:ring-[#5865F2] focus:border-[#5865F2]"
                        />
                        {errors.username && <ErrorMessage message={errors.username} />}
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="space-y-2">
                      <label
                        htmlFor="dob"
                        className="block text-white font-medium"
                      >
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Input
                          id="dob"
                          type="date"
                          value={formData.dob}
                          onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                          }
                          className="border-[#40444B] text-white pl-10 focus:ring-[#5865F2] focus:border-[#5865F2]"
                        />
                        <Cake className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        {errors.dob && <ErrorMessage message={errors.dob} />}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-6 text-lg rounded-xl flex items-center justify-center gap-2 transition-colors" onClick={handleSubmit}>
                      Create Account
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>

          {/* Login Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#5865F2] hover:underline">
              Log in
            </a>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-gray-400 text-xs mt-4">
          By signing up, you agree to our{" "}
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
  );
}
