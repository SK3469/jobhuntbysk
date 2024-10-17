import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
// const companyArray = [];

const PostJobs = () => {
        const { singleJob } = useSelector(store => store.job);
        const dispatch = useDispatch();
        const navigator = useNavigate();
        const { companies } = useSelector(store => store.company);
        const [input, setInput] = useState({
                title: "",
                description: "",
                requirements: "",
                salary: "",
                location: "",
                jobType: "",
                experience: "",
                position: "",
                companyId: ""
        })
        const [loading, setLoading] = useState(false);

        const changeEventHandler = (e) => {
                setInput({ ...input, [e.target.name]: e.target.value })
        }
        const selectChangeHandler= (value)=>{
                const selectedCompany = companies.find((company)=> company.name.toLowerCase()== value)
                setInput({...input, companyId:selectedCompany._id});
        }
        const submitHandler =async (e)=>{
                e.preventDefault();
                // console.log(input);
try {
        setLoading(true);
const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
        headers:{
                "Content-Type":'application/json'
        },
        withCredentials:true
});
        if(res.data.succuss)
                {toast.success(res.data.message);}
        navigator('/admin/jobs')
} catch (error) {
        toast.error(error.response.data.message)
}     finally{
        setLoading(false);
}  
        } 

        return (
                <div className='mt-[69px] flex flex-col justify-center items-center max-w-screen '>
                        <div>
                                <h1 className='font-bold text-2xl my-5'>Post Job</h1>
                        </div>
                        <form onSubmit={submitHandler} className='border rounded-lg shadow-lg px-7 py-6'>
                                <div className="items-center grid grid-cols-2 gap-3">
                                        <div>
                                                <Label>Title</Label>
                                                <Input
                                                        type='text'
                                                        name="title"
                                                        value={input.title}
                                                        onChange={changeEventHandler}
                                                        className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                                />
                                        </div>
                                        <div>
                                                <Label>Description</Label>
                                                <Input
                                                        type='text'
                                                        name="description"
                                                        value={input.description}
                                                        onChange={changeEventHandler}
                                                        className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                                />
                                        </div>
                                        <div>
                                                <Label>Requirements</Label>
                                                <Input
                                                        type='text'
                                                        name="requirements"
                                                        value={input.requirements}
                                                        onChange={changeEventHandler}
                                                        className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                                />
                                        </div>
                                        <div>
                                                <Label>Salary</Label>
                                                <Input
                                                        type='number'
                                                        name="salary"
                                                        value={input.salary}
                                                        onChange={changeEventHandler}
                                                        className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                                />
                                        </div>
                                        <div>
                                                <Label>Location</Label>
                                                <Input
                                                        type='text'
                                                        name="location"
                                                        value={input.location}
                                                        onChange={changeEventHandler}
                                                        className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                                />
                                        </div>
                                        <div>
                                                <Label>JobType</Label>
                                                <Input
                                                        type='text'
                                                        name="jobType"
                                                        value={input.jobType}
                                                        onChange={changeEventHandler}
                                                        className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                                />
                                        </div>
                                        <div>
                                                <Label>Experience Level</Label>
                                                <Input
                                                        type='text'
                                                        name="experience"
                                                        value={input.experience}
                                                        onChange={changeEventHandler}
                                                        className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                                />
                                        </div>
                                        <div>
                                                <Label>No of Positions</Label>
                                                <Input
                                                        type='number'
                                                        name="position"
                                                        value={input.position}
                                                        onChange={changeEventHandler}
                                                        className=" focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                                />
                                        </div>
                                        {
                                                companies.length >0 && (
                                                        <Select onValueChange={selectChangeHandler}>
                                                                <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Select a Company" className=''/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                        {
                                                                        companies.map((company) => {
                                                                                return (
                                                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                                                )
                                                                        })
                                                                        };
                                                                </SelectContent>
                                                        </Select>
                                                )
                                        }
                                </div>

                               
                                {
    loading ? <Button className="w-full my-4"> <Loader2 className=' mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> :  <Button type="submit" className="w-full my-4">Post</Button>
   }
                                {
                                        companies.length == 0 && <p className='text-red-600 text-center font-bold text-sm'>Please Register your company first! </p>
                                }
                                
                        </form>

                </div>
        )
}

export default PostJobs