import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

// const LatestJobCards = ({job}) => {  //Getting Jobs from Latestjobs 
//     return (
//         <div className='  border border-gray-300 px-4 py-4 shadow-xl rounded-lg cursor-pointer'>
//             <div className="">
//                 <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
//                 <p className='text-gray-500 text-sm'>India</p>
//             </div>
//             <div>
//                 <h1 className='text-lg font-bold mt-2'>{job?.title}</h1>
//                 <p className='text-gray-600'>{job?.description}</p>
//             </div>
//             <div className=' flex gap-2 mt-3 items-center '>
//                 <Badge className={' text-blue-700 font-bold'} variant="ghost" >12 Positions</Badge>
//                 <Badge className={' text-green-700 font-bold'} variant="ghost" >Full Time</Badge>
//                 <Badge className={' text-red-700 font-bold'} variant="ghost" >Part Time</Badge>
//                 <Badge className={' text-violet-900 font-bold'} variant="ghost" >Upto 30LPA</Badge>
//             </div>
//         </div>
//     )
// }
const LatestJobCards = ({ job }) => {
    const navigate= useNavigate();
    return (
        <div onClick={()=>navigate(`/description/${job?._id}`)} className='border border-gray-300 px-4 py-4 shadow-xl rounded-lg cursor-pointer flex flex-col h-full'>
            <div className="flex-grow"> {/* This allows the content to take the available space */}
                <div className="mb-2">
                    <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                    <p className='text-gray-500 text-sm'>India</p>
                </div>
                <div className="mb-2">
                    <h1 className='text-lg font-bold mt-2'>{job?.title}</h1>
                    <p className='text-gray-600'>{job?.description}</p>
                </div>
            </div>
            <div className='flex gap-2 mt-3 items-center'> {/* No need for flex-wrap if you want them in a single row */}
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-green-700 font-bold'} variant="ghost">{job?.location}</Badge>
                <Badge className={'text-red-700 font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-violet-900 font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </div>
    );
}

export default LatestJobCards