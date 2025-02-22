import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUser, setLoading } from "@/redux/userSlicer"
import { Loader2 } from "lucide-react"


export const SignIn = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, authUser } = useSelector((store) => store.user);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
            const sendData = {
                email, password, role
            }
            const { data } = await axios.post(`${USER_API_END_POINT}/login`, sendData, config);
            if (data.success) {
                navigate('/');
                const user = {
                    _id: data._id,
                    email: data.email,
                    name: data.name,
                    role: data.role,
                    profile: data.profile,
                    phoneNumber: data.phoneNumber,
                }
                dispatch(setAuthUser(user));
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            dispatch(setLoading(false));
        }

    }
    return <div>
        <Navbar />
        <div className="flex justify-center items-center max-w-7x ">
            <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                <h1 className="font-bold text-xl mb-5"> Sign In</h1>
                <div className="my-2">
                    <Label htmlFor='email'>Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='john@example.com' />
                </div>
                <div className="my-2">
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password' />
                </div>
                <div className="flex items-center justify-between">
                    <RadioGroup defaultValue="comfortable" className='flex items-center gap-4 mt-3'>
                        <div className="flex items-center space-x-2">
                            <Input onChange={(e) => setRole(e.target.value)} checked={role === 'student'} type="radio" value="student" name="role" className="cursor-pointer" />
                            <Label htmlFor="r1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input onChange={(e) => setRole(e.target.value)} checked={role === 'recruiter'} type="radio" value="recruiter" name="role" className="cursor-pointer" />
                            <Label htmlFor="r2">Recruiter</Label>
                        </div>
                    </RadioGroup>
                </div>
                {
                    loading ? <Button className='w-full my-4'><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>
                        : <Button type='submit' className='w-full my-4'>SignIn</Button>
                }
                <span className="font-medium text-sm">Don't have an account? <Link to={'/signup'} className="text-blue-600" >SignUp</Link></span>
            </form>
        </div>
    </div>
}