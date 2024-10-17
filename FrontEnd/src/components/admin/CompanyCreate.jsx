import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {                //headers use in case of authentiction...
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company)) // to getting data from redux store
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;// mongoDB id gets by by this term _id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='max-w-7xl mx-auto mt-[69px]'>
            <div className='my-20'>
                <h1 className=' font-bold text-2xl'>Your Company Name</h1>
                <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, architecto?</p>
            </div>
            <div>
                <Label>Your Company</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder='JobHunt,Google etc..'
                    onChange={(e) => setCompanyName(e.target.value)} 
                    />
            </div>
            <div className='flex gap-2 items-center my-10'>
                <Button onClick={() => navigate("/admin/companies")} variant="outline">Cancel</Button>
                <Button onClick={registerNewCompany}>Continue</Button>
            </div>
        </div>
    )
}

export default CompanyCreate;