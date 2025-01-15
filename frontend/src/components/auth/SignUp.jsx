import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { useState } from "react"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner"
import { setLoading } from "@/redux/userSlicer"
import { useDispatch, useSelector } from "react-redux"
import { Loader2 } from "lucide-react"

export const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [profile, setProfile] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((store) => store.user)

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('role', role);
            formData.append('phoneNumber', mobile);

            if (profile) {
                formData.append('profilePhoto', profile);
            }
            const { data } = await axios.post(`${USER_API_END_POINT}/register`, formData, config);
            if (data.success) {
                navigate('/signin');
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(setLoading(false));
        }
    }
    return <div>
        <Navbar />
        <div className="flex justify-center items-center max-w-7x ">
            <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                <h1 className="font-bold text-xl mb-5"> Sign Up</h1>
                <div className="my-2">
                    <Label htmlFor='name'>Name</Label>
                    <Input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='john doe' />
                </div>
                <div className="my-2">
                    <Label htmlFor='email'>Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='john@example.com' />
                </div>
                <div className="my-2">
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='password' />
                </div>
                <div className="my-2">
                    <Label htmlFor='number'>Mobile Number</Label>
                    <Input onChange={(e) => setMobile(e.target.value)} value={mobile} type='text' placeholder='mobile number' />
                </div>
                <div className="flex items-center justify-between">
                    <RadioGroup defaultValue="comfortable" className='flex items-center gap-4 my-5'>
                        <div className="flex items-center space-x-2">
                            <Input onChange={(e) => setRole(e.target.value)} type="radio" value="student" checked={role === 'student'} name="role" className="cursor-pointer" />
                            <Label htmlFor="r1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input onChange={(e) => setRole(e.target.value)} type="radio" value="recruiter" checked={role === 'recruiter'} name="role" className="cursor-pointer" />
                            <Label htmlFor="r2">Recruiter</Label>
                        </div>
                    </RadioGroup>
                    <div className="flex items-center gap-2">
                        <Label>Profile</Label>
                        <Input accept='image/*' onChange={(e) => setProfile(e.target.files?.[0])} type='file' className='cursor-pointer' />
                    </div>
                </div>
                {
                    loading ? <Button className='w-full my-4'><Loader2 className="w-4 h-4 animate-spin" />Please wait</Button> : <Button type='submit' className='w-full my-4'>SignUp</Button>
                }
                <span className="font-medium text-sm">Already have an account? <Link to={'/signin'} className="text-blue-600 font-medium" >SignIn</Link></span>
            </form>
        </div>
    </div>
}