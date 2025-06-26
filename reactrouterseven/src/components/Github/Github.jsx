import React from "react";
import{useEffect,useState} from "react"
import { useLoaderData } from "react-router-dom";  // new hook of react, used here , its work is jab bhi mera arrow github pr jaega, jo header pr ha, ussi time hi ,data fetch hona start hojaegaa, or wo cache main store ho jegaa , means this hook is used for fast fetching  or optimise data fetch
export default function Github() {
    const data=useLoaderData()

    // const [data, setData] = useState([])
    // useEffect(() => {
    //     fetch("https://api.github.com/users/MohammadShujaullah")
    //         .then((response) => response.json())
    //         .then(data => {
    //             setData(data)
    //         })
    // }, [])
    return (<div className="text-center bg-gray-600 m-4 text-white p-4 text-3xl">Github Followers:{data.followers}
                <img className="w-96 rounded-full width={300}" src=" https://avatars.githubusercontent.com/u/174425969?v=4" alt="image1" />
            </div>)
}

export const githubinfoLoader=async()=>{
    const response=await fetch("https://api.github.com/users/MohammadShujaullah")
    return response.json()
}