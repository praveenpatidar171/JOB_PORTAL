import { useState } from "react"
import { Navbar } from "../shared/Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import axios from "axios"
import { JOBS_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

export const JobCreate = () => {

    const { allCompanies } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        experience: "",
        location: "",
        jobType: "",
        salary: "",
        position: 0,
        companyId: "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeSelectHandler = (value) => {
        const selectedCompany = allCompanies?.find((company) => company?.name?.toLowerCase() === value);
        console.log(selectedCompany);
        setInput({ ...input, companyId: selectedCompany?._id })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            const sendData = {
                title: input.title,
                description: input.description,
                salary: input.salary,
                requirements: input.requirements,
                experience: input.experience,
                jobType: input.jobType,
                location: input.location,
                position: input.position,
                companyId: input.companyId,
            }

            const { data } = await axios.post(`${JOBS_API_END_POINT}/create`, sendData, config);
            if (data?.success) {
                toast.success(data?.message);
                navigate('/admin/jobs')
            }

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className="grid grid-cols-2 gap-4 my-5">
                        <div className="flex flex-col space-y-2">
                            <Label>Title</Label>
                            <Input
                                className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                type='text'
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Description</Label>
                            <Input
                                className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Requirements</Label>
                            <Input
                                className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                type='text'
                                name='requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Experience</Label>
                            <Input
                                className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                type='number'
                                name='experience'
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Location</Label>
                            <Input
                                className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Jobe-Type</Label>
                            <Input
                                className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                type='text'
                                name='jobType'
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Salary(LPA)</Label>
                            <Input
                                className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                type='text'
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Positions</Label>
                            <Input
                                className='focus-visible:ring-offset-0 focus-visible:ring-0'
                                type='number'
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                    </div>
                    {
                        allCompanies?.length > 0 &&
                        <Select onValueChange={changeSelectHandler} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Company" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Companies</SelectLabel>
                                    {
                                        allCompanies?.map((company) =>
                                            <SelectItem key={company?._id} value={company?.name?.toLowerCase()}>{company?.name[0].toUpperCase() + company?.name?.slice(1)}</SelectItem>
                                        )
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    }
                    {
                        loading ? <Button type='submit' className='w-full mt-4'><Loader2 className="h-5 w-5 animate-spin" /> Please wait</Button> :
                            <Button type='submit' className='w-full mt-4'>Post Job</Button>
                    }
                    {
                        allCompanies?.length === 0 && <p className="text-xs text-red-600 font-bold text-center my-3">*Want to post a job? First, register your company!</p>
                    }
                </form>
            </div>
        </div>
    )
}
