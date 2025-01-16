import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const CompaniesTable = ({ search }) => {

    const { allCompanies } = useSelector((store) => store.company);

    const [filteredCompanies, setFilteredCompanies] = useState(allCompanies);
    const navigate = useNavigate();


    useEffect(() => {
        const filtered = allCompanies.filter((company) => company?.name?.toLowerCase().includes(search.toLowerCase()));
        setFilteredCompanies(filtered);
    }, [search, allCompanies]);

    return (
        <div>
            <Table>
                <TableCaption> A list of your registered Companies </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filteredCompanies?.length === 0 ? <TableRow ><TableCell className='text-center text-lg font-medium' colSpan={4}>No companies available at the moment. Please add a company to proceed.</TableCell> </TableRow> :
                            filteredCompanies?.map((company) =>
                                <TableRow key={company?._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company?.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company?.name}</TableCell>
                                    <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className='text-right cursor-pointer'>
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className='w-20 h-10 flex items-center justify-center'>
                                                <div onClick={() => navigate(`/admin/companies/${company?._id}`)} className='flex items-center cursor-pointer'>
                                                    <Edit2 className='h-3' />
                                                    <span className='text-sm font-medium text-muted-foreground'>Edit</span>
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
