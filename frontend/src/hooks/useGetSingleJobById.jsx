import { setSingleJob } from "@/redux/jobSlice";
import { JOBS_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useGetSingleJobById = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const config = {
                    withCredentials: true,
                }
                const { data } = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, config);
                if (data?.success) {
                    dispatch(setSingleJob(data?.job));
                }

            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
        }
        fetchSingleJob();

    }, [jobId, dispatch]);
}
