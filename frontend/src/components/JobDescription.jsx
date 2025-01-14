import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'


export const JobDescription = () => {

    const isApplied = true;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Software Engineer</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge variant={'ghost'} className='text-blue-700 font-bold'>12 Positions</Badge>
                        <Badge variant={'ghost'} className='text-[#F83002] font-bold'>Part Time</Badge>
                        <Badge variant={'ghost'} className='text-[#7209b7] font-bold'>24 LPA</Badge>
                    </div>
                </div>
                <Button disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-purple-900'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='py-4 font-normal text-gray-800'>Software Engineer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='py-4 font-normal text-gray-800'>Hyderabad</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='py-4 font-normal text-gray-800'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, laboriosam.</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='py-4 font-normal text-gray-800'>2 yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='py-4 font-normal text-gray-800'>12LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='py-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='py-4 font-normal text-gray-800'>13-01-2025</span></h1>
            </div>
        </div>
    )
}
