import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminJobsTable = () => {
    const {allAdminJobs, searchJobByText}= useSelector(store=>store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredJobs =allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
        });
        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted Jobs.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name </TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {/* Table BOdy */}
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-35">
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className=' flex gap-2 items-center w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                Edit
                                            </div >
                                            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex gap-2 mt-3 cursor-pointer'>
                                                <Eye className='w-4'/>
                                                Applicants
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable