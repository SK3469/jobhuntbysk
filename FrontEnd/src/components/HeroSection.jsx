import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const [query,setQuery]= useState("");
  const searchJobHandler=()=>{
dispatch(setSearchedQuery(query));
navigate("/browse")
  }
  return (
    <div className=''>

      <div className="text flex flex-col justify-center items-center my-20">
        <h2 className=' border rounded-md bg-gray-200 text-red-800 font-bold pl-3 pr-3 px-2 py-2'>No.1 Job Website</h2>
        <h1 className=' text-5xl text-center font-bold'>Search, Apply & <br /> Get Your<span className='text-purple-900'> Dream Jobs</span></h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex omnis, vitae provident doloribus ab nobis?</p>
      </div>
      <div className=" flex w-1/3 shadow-lg border border-gray-200 rounded-full mx-auto text-center">
        <input 
        className='w-full outline-none border-none  text-center itme-center'
        type="text" 
        onChange={(e)=>setQuery(e.target.value)}
        placeholder='Find Your Dream Jobs'/>

        <Button onClick={searchJobHandler} className=" rounded-r-full bg-purple-800">
          <Search className='h-auto w-5'/>
        </Button>

      </div>

    </div>
  )
}

export default HeroSection