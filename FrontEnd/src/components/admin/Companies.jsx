import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGeAllCompanies'
import { Input } from '../ui/input'
import { useDispatch } from 'react-redux'
import { setsearchCompanyByText } from '@/redux/companySlice'


const Companies = () => {

  useGetAllCompanies();
  const [input, setInput ] = useState("");
    const navigate= useNavigate();
    const dispatch= useDispatch();
    useEffect(()=>{
dispatch(setsearchCompanyByText(input));
    },[input])
  return (
    <div className=' my-16 max-w-6xl mx-auto'>
        <div className='flex justify-between items-center pt-5'>
            <Input className=' w-fit'
            placeholder='search here'
            onChange={(e)=>setInput(e.target.value)}
        />
         <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>  
        </div>
       <CompaniesTable/>
    </div>
  )
}

export default Companies