import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

export const AppliedJobsTable = () => {

    const { allAppliedJobs } = useSelector((store) => store.application);
    return (
        <div>
            <Table className='font-semibold' >
                <TableCaption>List Of Your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {
                        allAppliedJobs?.map((application) =>
                            <TableRow key={application?._id}>
                                <TableCell>{application?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{application?.job?.title}</TableCell>
                                <TableCell>{application?.job?.company?.name}</TableCell>
                                <TableCell className='text-right'>
                                    <Badge className={`${application?.status === 'accepted' && 'bg-green-400 text-white'} ${application?.status === 'rejected' && 'bg-red-400'}`} >
                                        {application?.status?.[0].toUpperCase() + application?.status?.slice(1)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total Applied Jobs:</TableCell>
                        <TableCell className='text-right'>{allAppliedJobs?.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
