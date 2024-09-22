'use client'
import axios from "axios" ;
import { useRouter } from 'next/navigation' 
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
// import {useNavigate} from react-router-dom ; 
import Link from 'next/link'
import AuthCreator from "../components/AuthCreator";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false) ; 
  const [username , setUsername] = useState(""); 
  const [email , setEmail] = useState("") ; 
  const [password , setPassword] = useState("") ; 
  // const [error , setError] = useState("") ; 
  const router = useRouter()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
    if(isLogin){

      const response = await axios.post("http://localhost:3000/v1/creator/login" , {
        email : email , 
        password :password 
      })

      let data = response.data ; 

      if(data && data.token){
        localStorage.setItem("token" , data.token) ; 
        router.push('/dashboard') ; 
      }

    }else{

      console.log(username); 
      const response = await axios.post("http://localhost:3000/v1/creator/signin" , {
      
        username : username , 
        email : email , 
        password : password

      })

      let data = response.data ; 

      if(data && data.token){
        localStorage.setItem("token" , data.token); 
        router.push('/dashboard')
      }
    }
    
  }

  return (
    <AuthCreator/>
  )
}