import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from "@/components/ui/button";
import { User2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Logout function
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='bg-white fixed top-0 left-0 w-full z-50 shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <h1 onClick={()=>{navigate('/')}} className='font-bold text-2xl cursor-pointer'>
                    Job<span className='text-red-700'>Hunt</span>
                </h1>
                <div className='flex items-center gap-3'>
                    <ul className='flex font-medium items-center gap-4'>
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <Link to='/admin/companies'><li>Companies</li></Link>
                                    <Link to="/admin/jobs"><li>Jobs</li></Link>
                                </>) : (
                                <>
                                    <Link to='/'><li>Home</li></Link>
                                    <Link to="/jobs"><li>Jobs</li></Link>
                                    <Link to="/browse"><li>Browse</li></Link>
                                </>
                            )
                        }

                    </ul>
                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-violet-700 hover:bg-violet-900">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80'>
                                <div className='flex gap-4'>
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h3 className='font-medium'>{user?.fullname}</h3>
                                        <h4 className='text-sm text-muted-foreground'>{user?.profile?.bio}</h4>
                                    </div>
                                </div>
                                <div className='flex flex-col text-gray-400'>
                                    {user && user.role == "student" &&(
                                        <div className='flex items-center w-fit cursor-pointer'>
                                        <User2 />
                                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                    </div>
                                    )}
                                    <div className='flex items-center w-fit cursor-pointer'>
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
