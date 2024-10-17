import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application)
    const statusHandler = async (status, id) => {
        try {
            // axios.defaults.withCredentials = true; // incase withcredentials not working in res data..
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success)
                toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>List of your recent applications</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead className="text-right">Email</TableHead>
                        <TableHead className="text-right">Contact</TableHead>
                        <TableHead className="text-right">Resume</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.applications.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant.fullname}</TableCell>
                                <TableCell className="text-right">{item?.applicant.email}</TableCell>
                                <TableCell className="text-right">{item?.applicant.phonenumber}</TableCell>
                                <TableCell >
                                    {
                                        item?.applicant?.profile?.resume ? <a className="text-right text-blue-800 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant.profile.resumeOriginalName}</a> :
                                            <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className="text-right">{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className=" float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-37">
                                            {shortlistingStatus.map((status, index) => {
                                                return (
                                                    <div onClick={()=>statusHandler(status,item?._id)} key={index} className='cursor-pointer p-2 my-1  '>
                                                        <span>{status}</span>
                                                    </div>
                                                )
                                            })}
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        )) //if dont want to return anything need to us paranthisis ()
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable