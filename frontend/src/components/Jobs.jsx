import React from 'react'
import { Navbar } from './shared/Navbar'
import { Footer } from './shared/Footer'
import { FilterCard } from './FilterCard'
import { Job } from './Job';
import { useSelector } from 'react-redux';

export const Jobs = () => {
    const { allJobs } = useSelector((store) => store.job);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        allJobs?.length <= 0 ? <div className='text-lg font-bold flex justify-center items-center'><div>No Jobs Found</div></div> :
                            (<div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {allJobs?.slice(0, 6).map((job) => <Job job={job} key={job?._id} />)}
                                </div>
                            </div>)
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
