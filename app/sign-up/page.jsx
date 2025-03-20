"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from "next/navigation"; 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function AuthForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("client");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      // Handle successful login (store token, redirect, etc.)
      localStorage.setItem('token', data.token);
      console.log('Login successful:', data);

      // Add redirect logic here
      if (data.role === "freelancer") {
        router.push("/find-work");
      } else if (data.role === "client") {
        router.push("/find-talent");
      } else if (data.role === "admin") {
        router.push("/admin-pannel");
      }
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupError("");

    const formData = new FormData(e.target);
    const email = formData.get('signup-email');
    const password = formData.get('signup-password');
    const confirmPassword = formData.get('signup-confirm');

    if (password !== confirmPassword) {
      setSignupError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!termsAgreed) {
      setSignupError('You must agree to the terms');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          user_type: role,
        }),
      });

      console.log(response);
// Top of your component file
console.log('API Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      console.log('Signup successful:', data);
      // Handle successful signup (auto-login or redirect)
    } catch (error) {
      setSignupError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome to SkillBridge </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                <Button type="submit" className="w-full cursor-pointer hover:!bg-black hover:!text-white" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" name="signup-email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" name="signup-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input id="signup-confirm" name="signup-confirm" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-role">Select Role</Label>
                  <select
                    id="signup-role"
                    className="w-full p-2 border rounded-md"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="freelancer">Freelancer</option>
                    <option value="client">Client</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={termsAgreed}
                    onCheckedChange={(checked) => setTermsAgreed(checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
                {signupError && <p className="text-red-500 text-sm">{signupError}</p>}
                <Button type="submit" className="w-full cursor-pointer hover:!bg-black hover:!text-white" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <div className="text-sm text-center text-gray-500">
            Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}