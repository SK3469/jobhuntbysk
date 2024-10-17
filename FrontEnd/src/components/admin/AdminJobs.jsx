import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGeAllAdminJobs'
import { setsearchJobByText } from '@/redux/jobSlice'


const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setsearchJobByText(input));
  }, [input])
  return (
    <div className=' my-16 max-w-6xl mx-auto'>
      <div className='flex justify-between items-center pt-5'>
        <Input className=' w-fit'
          placeholder='search here'
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/job/create")}>New Jobs</Button>
      </div>
      <AdminJobsTable />
    </div>
  )
}

export default AdminJobs