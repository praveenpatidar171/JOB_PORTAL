import { Contact, Mail, Pen } from "lucide-react"
import { Navbar } from "./shared/Navbar"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import { AppliedJobsTable } from "./AppliedJobsTable"
import { useState } from "react"
import { UpdateProfileDialog } from "./UpdateProfileDialog"
import { useSelector } from "react-redux"
import { useGetAllAppliedJobsByUser } from "@/hooks/useGetAllAppliedJobsByUser"

export const Profile = () => {

    useGetAllAppliedJobsByUser();

    const [open, setOpen] = useState(false);
    const { authUser } = useSelector((store) => store.user);

    return <div>
        <Navbar />
        <div className="max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 rounded-2xl my-5 p-8">
            <div className="flex justify-between">
                <div className="flex items-center gap-4 ">
                    <Avatar className='h-24 w-24'>
                        <AvatarImage src={authUser?.profile?.profilePhoto} alt="User Image" />
                    </Avatar>
                    <div>
                        <h1 className="font-medium text-xl">{authUser?.name}</h1>
                        <p>{authUser?.profile?.bio}</p>
                    </div>
                </div>
                <Button onClick={() => setOpen(true)} className='text-right' variant='outline' ><Pen /></Button>
            </div>
            <div className="my-5">
                <div className="flex gap-3 items-center my-2">
                    <Mail />
                    <span>{authUser?.email}</span>
                </div>
                <div className="flex gap-3 items-center my-2">
                    <Contact />
                    <span>{authUser?.phoneNumber}</span>
                </div>
            </div>
            <div className="my-5">
                <h1>Skills</h1>
                <div className="flex items-center gap-1">
                    {
                        authUser?.profile?.skills?.length !== 0 ? authUser?.profile?.skills?.map((skill, index) => <Badge key={index}>{skill}</Badge>) : <span>NA</span>
                    }
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className='text-base font-bold'>Resume</Label>
                {
                    authUser?.profile?.resume ? <a className="text-blue-500 hover:underline cursor-pointer w-full" href={authUser?.profile?.resume} target="_blank">{authUser?.profile?.resumeOriginalName}</a> :
                        <span>NA</span>
                }
            </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
            <div className="pb-5">
                <AppliedJobsTable />
            </div>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
}