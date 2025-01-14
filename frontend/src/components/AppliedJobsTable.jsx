import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

export const AppliedJobsTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>List Of Your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className='text-right'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2, 3, 4].map((item, index) =>
                            <TableRow key={index}>
                                <TableCell>13-01-2025</TableCell>
                                <TableCell>Software Engineer</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className='text-right'><Badge>Accepted</Badge></TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total Applied Jobs:</TableCell>
                        <TableCell className='text-right'>4</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
