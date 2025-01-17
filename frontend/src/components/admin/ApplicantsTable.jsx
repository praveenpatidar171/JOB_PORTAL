import { MoreHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constant"
import { setSingleJob } from "@/redux/jobSlice"

export const ApplicantsTable = () => {
    const { singleJob } = useSelector((store) => store.job);
    const applications = singleJob?.applications;
    const dispatch = useDispatch();
    const updateStatus = async (status, applicationId) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            const sendData = {
                status,
            }
            const { data } = await axios.put(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, sendData, config);
            if (data?.success) {
                toast.success(data?.message);
                dispatch(setSingleJob({
                    ...singleJob, applications: applications?.map((application) =>
                        application._id === applicationId ? { ...application, status: data?.application?.status } : application
                    )
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>List of your recent applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications?.map((application) =>
                            <TableRow key={application?._id} className='font-semibold'>
                                <TableCell>{application?.applicant?.name}</TableCell>
                                <TableCell>{application?.applicant?.email}</TableCell>
                                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                <TableCell>{application?.applicant?.profile?.resume ?
                                    <a className="hover:underline text-blue-900" href={application?.applicant?.profile?.resume} target="_blank">{application?.applicant?.profile?.resumeOriginalName}</a>
                                    : <>NA</>}
                                </TableCell>
                                <TableCell>{application?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{application?.status?.[0].toUpperCase() + application?.status?.slice(1)}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-24 flex flex-col items-center gap-2'>
                                            <div onClick={() => updateStatus("accepted", application?._id)} className={`text-xs text-green-600 font-bold cursor-pointer`}>Accepted</div>
                                            <div onClick={() => updateStatus("rejected", application?._id)} className={`text-xs text-red-600 font-bold cursor-pointer`}>Rejected</div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}
