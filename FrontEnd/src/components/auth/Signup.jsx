import React, { useEffect } from 'react'
import { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'sonner'
import  {USER_API_END_POINT } from '@/utils/constant'
import { setLoading } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'

import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: ""
  });
const {loading, user}= useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e)=>{
    e.preventDefault();
  try {
    dispatch(setLoading(true));
    const formData = new FormData();
formData.append("fullname",input.fullname);
formData.append("email", input.email);
formData.append("phonenumber",input.phonenumber);
formData.append("password",input.password);
formData.append("role", input.role);
if(input.file){
  formData.append("file",input.file);
}

    const res = await axios.post(`${USER_API_END_POINT}/register`, formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
      withCredentials:true,
    });
    if (res.data.success) {
      navigate("/login");
      toast.success(res.data.message);
  }

  } catch (error) {
    console.log(error);
    //Want popup in ui
    toast.error(error.response.data.message);
  }
  finally{
    dispatch(setLoading(false));
  }
  }
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  })
  return (
    <div>
 {/* <Navbar/> */}
   
   
    <div className=' flex items-center justify-center max-w-7xl my-10 '>
      <form onSubmit={submitHandler} className=' w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <h1 className=' font-bold text-xl mb-5'>Sign<span className='text-red-900'>UP</span> </h1>
        <div className=' my-2'>
          <Label>Full Name</Label>
          <Input type="text"
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
            placeholder="Sunil Kumar" />
        </div>
        <div className=' my-2'>
          <Label>Email</Label>
          <Input type="email"
          value={input.email}
          name="email"
          onChange={changeEventHandler}
            placeholder="Sunil@gmail.com" />
        </div>
        <div className=' my-2'>
          <Label>Password</Label>
          <Input type="password"
          value={input.password}
          name="password"
          onChange={changeEventHandler}
            placeholder="********" />
        </div>
        <div className=' my-2'>
          <Label>phonenumber</Label>
          <Input type="text"
          value={input.phonenumber}
          name="phonenumber"
          onChange={changeEventHandler}
            placeholder="9999999999" />
        </div>
        <div className=' flex  items-center justify-between'>
          <RadioGroup defaultValue="comfortable" className="flex gap-10 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role== 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r1">student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role=='recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">recruiter</Label>
            </div>
          </RadioGroup>
          <div className='flex items-center'>
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
        </div>
        {
    loading ? <Button className="w-full my-4"> <Loader2 className=' mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> :  <Button type="submit" className="w-full font-bold my-4">Signup</Button>
   }
        <span className='text-sm'>Already have an account? <Link to="/login" className=' text-purple-700'>Login</Link> </span>

      </form>
    </div>
    </div>
  )
}

export default Signup