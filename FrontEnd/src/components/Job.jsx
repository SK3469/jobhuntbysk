import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "sunilkumarkuma"
    const daysAgoFunction =(mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiffrence = currentTime- createdAt;
        return Math.floor(timeDiffrence/(1000*24*60*60));
    }
    return (
        <div className=' cursor-pointer rounded-md bg-purple-50 shadow-lg border border-purple-100 px-3 py-3 '>
            <div className='flex justify-between'>
                <p>{daysAgoFunction(job?.createdAt) == 0? "Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-xl" size="icon"> <Bookmark /> </Button>
            </div>

            <div className='flex items-center gap-3 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>

            </div>
            <div>
                <h1 className='text-lg font-medium'>{job?.Title}</h1>
                <p>{job?.description}</p>

            </div>
            <div className=' flex gap-2 mt-4 items-center pl-5'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-red-700 font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-violet-900 font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>  
            <div className='flex justify-center my-3  gap-2'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} className=" bg-purple-700 text-sm">Details</Button>
                <Button 
                 className="bg-green-600 text-sm">Save for Later</Button>
            </div>
        </div>
    )
}

export default Job