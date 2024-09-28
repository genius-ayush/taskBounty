'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useTheme } from 'next-themes';

export default function AuthUser() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const response = await axios.post("http://localhost:3000/v1/worker/login", {
        email: email,
        password: password,
      });

      let data = response.data;

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        router.push('/userDashboard');
      }
    } else {
      const response = await axios.post("http://localhost:3000/v1/worker/signin", {
        username: username,
        email: email,
        password: password,
      });

      let data = response.data;

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        router.push('/userDashboard');
      }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">
          {isLogin ? 'Login as user' : 'Create an account as user'}
        </h1> 
        <div className="p-8 rounded-lg shadow-lg dark:bg-[#1a1a2e] bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Choose a username"
                  required
                  className="dark:bg-[#0c0c1d] dark:text-gray-100 dark:border-[#3a3a4e] dark:placeholder-gray-400"
                  onChange={(e) => { setUsername(e.target.value); }}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>  
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="dark:bg-[#0c0c1d] dark:border-[#3a3a4e] dark:text-gray-100 dark:placeholder-gray-400"
                onChange={(e) => { setEmail(e.target.value); }}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="dark:bg-[#0c0c1d] dark:border-[#3a3a4e] dark:text-gray-100 dark:placeholder-gray-400"
                  onChange={(e) => { setPassword(e.target.value); }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#14F195]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold">
              {isLogin ? 'Sign in' : 'Sign up'}
            </Button>
          </form>
        </div>
        <p className="text-center mt-8">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-purple-600 hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
