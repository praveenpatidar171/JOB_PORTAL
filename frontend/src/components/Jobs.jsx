import React from 'react'
import { Navbar } from './shared/Navbar'
import { Footer } from './shared/Footer'
import { FilterCard } from './FilterCard'
import { Job } from './Job';

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

export const Jobs = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        jobsArray.length <= 0 ? <div className='text-lg font-bold flex justify-center items-center'><div>No Jobs Found</div></div> :
                            (<div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {jobsArray.map((job, index) => <Job key={index} />)}
                                </div>
                            </div>)
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
