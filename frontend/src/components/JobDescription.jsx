import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT, JOBS_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import axios from 'axios'

export const JobDescription = () => {

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector((store) => store.job);
    const { authUser } = useSelector((store) => store.user);
    const isInitiallyApplied = singleJob?.applications?.some((application) => application.applicant === authUser?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
            const sendData = {
                jobId,
            }

            const { data } = await axios.post(`${APPLICATION_API_END_POINT}/apply`, sendData, config);
            if (data?.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: authUser?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // to update UI
                toast.success(data?.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const config = {
                    withCredentials: true,
                }
                const { data } = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, config);
                if (data.success) {
                    dispatch(setSingleJob(data.job));
                    setIsApplied(data.job.applications.some((application) => application.applicant === authUser?._id));
                }

            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }

        fetchSingleJob();

    }, [jobId, dispatch, authUser?._id])


    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge variant={'ghost'} className='text-blue-700 font-bold'>{`${singleJob?.position}`} Positions</Badge>
                        <Badge variant={'ghost'} className='text-[#F83002] font-bold'>{singleJob?.jobType}</Badge>
                        <Badge variant={'ghost'} className='text-[#7209b7] font-bold'>{`${singleJob?.salary}`} LPA</Badge>
                    </div>
                </div>
                <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-purple-900'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description}</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='py-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='py-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='py-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='py-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='py-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='py-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='py-4 font-normal text-gray-800'>{singleJob?.createdAt?.split('T')[0]}</span></h1>
            </div>
        </div>
    )
}
