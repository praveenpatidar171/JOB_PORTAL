import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

export const Job = ({ job }) => {

    const navigate = useNavigate();
    const daysAgoFunction = (mongoTime) => {

        const createdAt = new Date(mongoTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;

        return Math.floor(timeDifference / (1 * 24 * 60 * 60 * 1000));
    }
    const days = daysAgoFunction(job?.createdAt);
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-600'>{days === 0 ? "Today" : days + ' days ago'} </p>
                <Button variant='outline' size='icon' className='rounded-full'><Bookmark /></Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button variant='outline' size='icon' className='p-6'>
                    <Avatar>
                        <AvatarImage src='https://img.freepik.com/premium-photo/home-logo_1301603-1367.jpg' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-600'>{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge variant={'ghost'} className='text-blue-700 font-bold'>{job?.position} Positions</Badge>
                <Badge variant={'ghost'} className='text-[#F83002] font-bold'>{job?.jobType}</Badge>
                <Badge variant={'ghost'} className='text-[#7209b7] font-bold'>{`${job?.salary}LPA`}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
                <Button className='bg-[#7209b7] text-white' variant='outline'>Save For Later</Button>
            </div>
        </div>
    )
}
