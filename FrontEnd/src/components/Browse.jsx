import React, { useEffect } from 'react'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';


const Browse = ({job}) => {
  useGetAllJobs();
  const navigate= useNavigate();
  const {allJobs}= useSelector(store=>store.job);
  const dispatch= useDispatch();
  useEffect(()=>{
    return()=>{
      dispatch(setSearchedQuery(""));
    }
  })
  return (
    <div>
      <div className='max-w-7xl my-[68px] mx-auto'>
<h1 className='text-gray-500 text-lg'>Search Results <span className='text-red-700 font-medium'>({allJobs.length})</span></h1>
<div className='grid grid-cols-3 gap-3 mt-5'>
  {
    allJobs.map((job)=>{
      return(
        <Job key={job._id} job={job}/>
      )
    })
  }
</div>

      </div>
    </div>
  )
}

export default Browse