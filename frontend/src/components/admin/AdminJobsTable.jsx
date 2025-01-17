import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const AdminJobsTable = ({ search }) => {

    const { adminJobs } = useSelector((store) => store.job);
    const [filteredJobs, setFilteredJobs] = useState(adminJobs);
    const navigate = useNavigate();


    useEffect(() => {
        const filtered = adminJobs?.filter((job) => job?.title?.toLowerCase().includes(search.toLowerCase())
            || job?.company?.name?.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredJobs(filtered);
    }, [search, adminJobs]);

    return (
        <div>
            <Table>
                <TableCaption>A list of your posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Positions</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filteredJobs?.length === 0 ? <TableRow ><TableCell className='text-center text-lg font-medium' colSpan={4}>No Jobs available at the moment. Please add a job to proceed.</TableCell> </TableRow> :
                            filteredJobs?.map((job) =>
                                <TableRow className='text-sm font-medium' key={job?._id}>
                                    <TableCell>{job?.company?.name}</TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{job?.location}</TableCell>
                                    <TableCell>{job?.position}</TableCell>
                                    <TableCell>{job?.salary} LPA</TableCell>
                                    <TableCell className='text-right cursor-pointer'>
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className='w-32'>
                                                <div onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} className='flex items-center cursor-pointer'>
                                                    <Edit2 className='h-3' />
                                                    <span className='text-sm font-medium text-muted-foreground'>Edit</span>
                                                </div>
                                                <div onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} className='flex items-center mt-2 cursor-pointer'>
                                                    <Eye className='h-3'/>
                                                    <span className='text-sm font-medium text-muted-foreground'>Applicants</span>
                                                </div>
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
