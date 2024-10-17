import React, { Profiler, useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact2, Pen, PhoneCall, SpaceIcon } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
const isResume = true;
const Profile = () => {
    useGetAppliedJobs();
  const [open, setOpen]= useState(false);
  const {user} =useSelector(store=>store.auth); // this from redux store
    return (
        <div>
             <div className=' section-1 mx-auto max-w-4xl my-[68px] shadow-md pb-5 rounded-xl'>
            
            <div className='pl-5 pr-5 flex justify-between items-center mt-20'>
                <div className='flex items-center'>
                    <Avatar className="w-20 h-20 ">
                        <AvatarImage src="https://www.shutterstock.com/image-vector/job-hunt-logo-template-illustration-260nw-1848003559.jpg" />
                    </Avatar>
                    <div>
                        <h1 className='font-bold text-lg'>{user?.fullname}</h1>
                        <p>{user?.profile?.bio}</p>
                    </div>
                </div>

                <div>
                    <Button onClick={()=>setOpen(true)} variant="outline"><Pen /></Button>
                </div>
            </div>
            <div className='flex flex-col gap-3 mt-7 pl-9'>
                <div className='flex gap-2'>
                    <Contact2 />
                    <h1>{user?.email}</h1>
                </div>
                <div className='flex gap-2'>
                    <PhoneCall />
                    <h1>{user?.phonenumber}</h1>
                </div>
                <div className=" my-5">
                    <h1 className='text-xl font-bold pl-1'>Skills</h1>
                    <div className='flex gap-3' >
                        {
                          user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (<Badge className={"bg-green-500"} key={index}>{item}</Badge>)) : <span>Not Applicable!</span>
                        }
                    </div>

                </div>
                <div className='grid gap-1'>
                    <Label className="font-bold text-lg"> Resume</Label>
                    {
                        isResume ? <a className='text-green-700' target='black' href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span className='text-red-800 text-xl'>NA</span>
                    }
                    <h1 className='text-red-700'>Dont have Resume?  <span><Button className="bg-blue-700"><a target='blank' href='https://capstone-resume-builder.vercel.app/'>Create Resume</a></Button></span></h1>

                </div>
            </div>
            
        </div>
        <div className='section-2 max-w-4xl rounded-lg shadow-lg mx-auto mb-20 pl-3 '>
            <h1 className='font-bold text-lg pl-3 mb-2'>Applied Jobs</h1>
            <AppliedJobTable/>

        </div>
        <UpdateProfileDialog open = {open} setOpen={setOpen}/>
        </div>
       
        
      
    )
}

export default Profile