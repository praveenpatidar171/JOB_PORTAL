import React, { useEffect } from 'react'
import { Navbar } from './shared/Navbar'
import { Job } from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useGetAllJobs } from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

export const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-2xl my-10'>Search Results ({allJobs?.length})</h1>
                <div className='grid grid-cols-3 gap-4 mt-5'>
                    {
                        allJobs?.map((job) =>
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
