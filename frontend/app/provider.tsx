'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation' 
// import React, { ReactNode } from 'react'
import Router from 'next/router'

function Provider({children} : {children:React.ReactNode}) {

    const token = localStorage.getItem("token") ; 
  const [userName , setUserName] = useState("") ; 
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/v1/creator/me",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          const data = response.data; 
          console.log(data);

          if (data.username) {
            setUserName(data.username);

            if (data.role == "CREATOR") {
                console.log("refresh") ;
                
                var flag = localStorage.getItem("flag") ; 
                if(flag  == null){
                    localStorage.setItem("flag" , "true") ; 
                     window.location.reload()
                }
               

                // Router.reload();
                // router.refresh() ; 
              router.push("/creatorDashboard");
            }

            if (data.role == "WORKER") {
                // router.refresh() ; 
                var flag = localStorage.getItem("flag") ; 
                if(flag  == null){
                    localStorage.setItem("flag" , "true") ; 
                     window.location.reload()
                }
              router.push("/workerDashboard");
            }
          }
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/v1/worker/me",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          const data = response.data; 
          console.log(data.username); 
          if (data.username) {
            setUserName(data.username);

            if (data.Role == "WORKER") {
              console.log("worker") ; 
              var flag = localStorage.getItem("flag") ; 
              if(flag  == null){
                  localStorage.setItem("flag" , "true") ; 
                   window.location.reload()
              }
             
            router.push("/userDashboard");
          }

            
          }
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchData();
  }, [token]);
  return (
    
    <>{children} </>
  )
}

export default Provider