'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' 
import axios from 'axios'
import AuthUser from '../components/AuthUser'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [username , setUsername] = useState("") ; 
  const [email , setEmail] = useState("") ; 
  const [password , setPassword] = useState("") ; 
  const router = useRouter()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
    if(isLogin){

      const response = await axios.post("http://localhost:3000/v1/worker/login" , {
        email : email , 
        password :password 
      })

      let data = response.data ; 

      if(data && data.token){
        localStorage.setItem("token" , data.token) ; 
        router.push('/userDashboard') ; 
      }

    }else{

      console.log(username); 
      const response = await axios.post("http://localhost:3000/v1/worker/signin" , {
      
        username : username , 
        email : email , 
        password : password

      })

      let data = response.data ; 

      if(data && data.token){
        localStorage.setItem("token" , data.token); 
        router.push('/userDashboard')
      }
    }
    
  }

  return (
    <AuthUser/>
  )
}