import { Link, useNavigate } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { LogOut, User2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import axios from "axios"
import { USER_API_END_POINT } from "@/utils/constant"
import { setAuthUser, setLoading } from "@/redux/userSlicer"

export const Navbar = () => {

    const { authUser } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = async () => {
        try {
            const config = {
                withCredentials: true,
            }
            const { data } = await axios.get(`${USER_API_END_POINT}/logout`, config);
            if (data.success) {
                navigate('/signin');
                dispatch(setAuthUser(null));
                dispatch(setLoading(false));
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return <div className="bg-white">

        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
            <div>
                <h1 className="text-2xl font-bold">Job<span className="text-[#F83002]">Portal</span></h1>
            </div>
            <div className="flex gap-12 items-center">
                <ul className="flex items-center gap-5 font-medium">
                    <li><Link to={'/'} >Home</Link></li>
                    <li><Link to={'/jobs'}>Jobs</Link></li>
                    <li><Link to={'/browse'}>Browse</Link></li>
                </ul>

                {
                    !authUser ?
                        <div className="flex items-center gap-2">
                            <Link to={'/signin'}  >
                                <Button variant="outline" >SignIn</Button>
                            </Link>
                            <Link to={'/signup'}>
                                <Button className="bg-purple-700 hover:bg-purple-800">SignUp</Button>
                            </Link>
                        </div>
                        :
                        <Popover className='hover:cursor-pointer'>
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex gap-4 space-y-2">
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h1 className="font-medium">{authUser?.name[0].toUpperCase() + authUser?.name.slice(1)}</h1>
                                        <h1 className="text-sm text-muted-foreground">{authUser?.profile.bio}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col my-2 text-gray-600">
                                    <div className="w-fit cursor-pointer flex items-center gap-2">
                                        <User2 />
                                        <Button variant="link">View Profile</Button>
                                    </div>
                                    <div className="w-fit cursor-pointer flex items-center gap-2">
                                        <LogOut />
                                        <Button onClick={logOutHandler} variant="link">Logout</Button>
                                    </div>

                                </div>
                            </PopoverContent>
                        </Popover>
                }

            </div>
        </div>
    </div>
}