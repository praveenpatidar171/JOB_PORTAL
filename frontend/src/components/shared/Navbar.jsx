import { Link } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { LogOut, User2 } from "lucide-react"

export const Navbar = () => {

    const user = false;
    return <div className="bg-white">

        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
            <div>
                <h1 className="text-2xl font-bold">Job<span className="text-[#F83002]">Portal</span></h1>
            </div>
            <div className="flex gap-12 items-center">
                <ul className="flex items-center gap-5 font-medium">
                    <li><Link>Home</Link></li>
                    <li><Link>Jobs</Link></li>
                    <li><Link>Browse</Link></li>
                </ul>

                {
                    !user ?
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
                                        <h1 className="font-medium">Praveeen Patidar</h1>
                                        <h1 className="text-sm text-muted-foreground">I'm a full stack Engineer</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col my-2 text-gray-600">
                                    <div className="w-fit cursor-pointer flex items-center gap-2">
                                        <User2 />
                                        <Button variant="link">View Profile</Button>
                                    </div>
                                    <div className="w-fit cursor-pointer flex items-center gap-2">
                                        <LogOut />
                                        <Button variant="link">Logout</Button>
                                    </div>

                                </div>
                            </PopoverContent>
                        </Popover>
                }

            </div>
        </div>
    </div>
}