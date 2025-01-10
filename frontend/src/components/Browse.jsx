import React from 'react'
import { Navbar } from './shared/Navbar'
import { Footer } from './shared/Footer'
import { Job } from './Job';

const jobss = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Browse = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-2xl my-10'>Search Results ({jobss.length})</h1>
                <div className='grid grid-cols-3 gap-4 mt-5'>
                    {
                        jobss.map((job, index) => <Job key={index} />)
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
