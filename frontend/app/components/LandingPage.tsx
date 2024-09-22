'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { DollarSign, Video, FileText, Gamepad, ArrowRight } from "lucide-react"
// import { useState, useEffect } from 'react'
import Header from './Header'
// import { useTheme } from "next-themes"
import { useTheme } from 'next-themes';

export default function LandingPage() {  

  const { theme } = useTheme();
  let darkMode = false ; 

  if(theme == 'dark'){
    darkMode = true ; 
  }else{
    darkMode = false ; 
  }

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <main className="flex-1">
        <section  className=" w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className={`absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] ${darkMode ? 'animate-[pulse_4s_ease-in-out_infinite]' : ''}`} />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-white via-purple-100/20 to-white'}`} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="space-y-4 text-center lg:text-left lg:w-1/2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none animate-fade-in-up">
                Earn <span className="text-purple-500 animate-pulse">Solana</span>  Completing Simple Tasks

                </h1>
                <p className={`max-w-[600px] ${darkMode ? 'text-gray-400' : 'text-gray-600'} md:text-xl animate-fade-in-up animation-delay-200`}>
                  TaskBounty connects you with simple, rewarding tasks. Complete surveys, watch videos, or play games to earn Solana in your spare time.
                </p>
                <div className="space-x-4 animate-fade-in-up animation-delay-300">
                  <Link href="/authcreator">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
                  </Link>
                  <Button variant="outline" className={`${darkMode ? 'text-purple-400 border-purple-400 hover:bg-purple-400/10' : 'text-purple-600 border-purple-600 hover:bg-purple-600/10'}`}>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-75 blur-2xl animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full bg-gray-900 flex items-center justify-center">
                    <DollarSign className="w-24 h-24 md:w-32 md:h-32 text-purple-500" />
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-pink-500 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-500 rounded-full animate-bounce delay-700"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
            <div className="absolute -top-40 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
        </section>
        <section id="how-it-works" className={`w-full py-12 md:py-24 lg:py-32 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It <span className="text-purple-500">Works</span>
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-purple-400">For Creators</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    Post tasks, set Solana rewards, and get valuable insights from users.
                  </p>
                  <ul className="space-y-2">
                    <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      <ArrowRight className="mr-2 h-4 w-4 text-purple-500" />
                      Create surveys, video tasks, or games
                    </li>
                    <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      <ArrowRight className="mr-2 h-4 w-4 text-purple-500" />
                      Set Solana incentives for completion
                    </li>
                    <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      <ArrowRight className="mr-2 h-4 w-4 text-purple-500" />
                      Receive instant feedback and data
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-pink-400">For Users</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    Complete simple tasks and earn Solana in your spare time.
                  </p>
                  <ul className="space-y-2">
                    <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      <ArrowRight className="mr-2 h-4 w-4 text-pink-500" />
                      Browse available tasks that match your interests
                    </li>
                    <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      <ArrowRight className="mr-2 h-4 w-4 text-pink-500" />
                      Complete tasks quickly and easily
                    </li>
                    <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      <ArrowRight className="mr-2 h-4 w-4 text-pink-500" />
                      Get paid in Solana for your time and opinions
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className={`w-full py-12 md:py-24 lg:py-32 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Featured <span className="text-purple-500">Task Types</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500'} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <FileText className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-purple-400">Surveys</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Share your opinions and earn Solana through quick and easy surveys.
                  </p>
                </CardContent>
              </Card>
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-pink-500' : 'bg-white border-gray-200 hover:border-pink-500'} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Video className="h-12 w-12 text-pink-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-pink-400">Video Tasks</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Watch videos, provide feedback, and get paid in Solana for your time.
                  </p>
                </CardContent>
              </Card>
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Gamepad className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-blue-400">Games</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Play engaging games while earning Solana and having fun.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section  className={`w-full py-12 md:py-24 lg:py-32 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 items-center lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Integrated <span className="text-purple-500">Solana Wallet</span>
                  </h2>
                  <p className={`max-w-[600px] ${darkMode ? 'text-gray-400' : 'text-gray-600'} md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed`}>
                    Manage your Solana earnings seamlessly with our built-in wallet. Instant deposits, easy withdrawals, and secure storage.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Create Wallet
                  </Button>
                  <Button variant="outline" className={darkMode ? 'text-purple-400 border-purple-400 hover:bg-purple-400/10' : 'text-purple-600 border-purple-600 hover:bg-purple-600/10'}>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Card className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} w-full max-w-md transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">Wallet Features</h3>
                    <ul className="space-y-2">
                      <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        <ArrowRight className="mr-2 h-4 w-4 text-purple-500" />
                        Instant Solana deposits from completed tasks
                      </li>
                      <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        <ArrowRight className="mr-2 h-4 w-4 text-purple-500" />
                        Easy withdrawals to external Solana wallets
                      </li>
                      <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        <ArrowRight className="mr-2 h-4 w-4 text-purple-500" />
                        Real-time Solana balance and transaction history
                      </li>
                      <li className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        <ArrowRight className="mr-2 h-4 w-4 text-purple-500" />
                        Secure storage with industry-standard encryption
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className={`w-full py-12 md:py-24 lg:py-32 border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Earning <span className="text-purple-500">Solana</span> Today
                </h2>
                <p className={`mx-auto max-w-[600px] ${darkMode ? 'text-gray-400' : 'text-gray-600'} md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed`}>
                  Join TaskBounty and turn your spare time into Solana. Complete tasks, earn rewards, and manage your crypto easily.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    className={`max-w-lg flex-1 ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" type="submit">
                    Sign Up
                  </Button>
                </form>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  By signing up, you agree to our{" "}
                  <Link className={`underline underline-offset-2 ${darkMode ? 'hover:text-purple-400' : 'hover:text-purple-600'}`} href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}