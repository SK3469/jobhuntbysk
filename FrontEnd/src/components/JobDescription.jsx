import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { toast } from 'sonner';

const JobDescription = () => {

    const params = useParams(); // use this to getting id of single jpb.
    const jobId = params.id;
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false;  // this used to diff. btwn applied and already applied.
    const [isApplied, setIsApplied] = useState(isIntiallyApplied)
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                //dispatch(setSingleJob)
                setIsApplied(true);
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob)) //for real time UI updation..
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));  //jobs actually defind the jobslice `allJobs[]`
                    setIsApplied(res.data.job.applications.some(application => application.applicant == user?._id)) // This is for first rendring..
                }

            } catch (error) {
                console.log(error)
            }

        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id])
    return (
        <div className=' max-w-7xl mx-auto my-[69px]'>
            <div className='flex justify-between pt-3'>
                <div>
                    <h1>{singleJob?.title}</h1>
                    <div className=''>
                        <Badge className={' text-blue-700 font-bold'} variant="ghost" >{singleJob?.position}Positions</Badge>
                        <Badge className={' text-green-700 font-bold'} variant="ghost" >{singleJob?.jobtype}</Badge>
                        <Badge className={' text-violet-900 font-bold'} variant="ghost" >{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <div>
                    <Button onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-red-600' : 'bg-green-600 hover:bg-green-500'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

            </div>
            <h1 className=' border-b-2 border-gray-200 font-medium p-4'>Job Description</h1>
            <div className='flex flex-col '>
                <h1 className='font-bold flex'>Role: <span className='pl-5 font-normal'>{singleJob?.title}</span></h1>
                <h1 className='font-bold'>Location: <span className='pl-5 font-normal'>{singleJob?.location}</span></h1>
                <h1 className='font-bold'>Description: <span className='pl-5 font-normal'>{singleJob?.description}</span></h1>
                <h1 className='font-bold'>Experience: <span className='pl-5 font-normal'>{singleJob?.experienceLevel}Years</span></h1>
                <h1 className='font-bold'>Salary: <span className='pl-5 font-normal'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold'>Total Applicants: <span className='pl-5 font-normal'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold'>Posted Date: <span className='pl-5 font-normal'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription