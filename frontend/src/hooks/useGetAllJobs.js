import { setAllJobs } from "@/redux/jobSlice";
import { JOBS_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useGetAllJobs = async () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchallJobs = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }
                const { data } = await axios.get(`${JOBS_API_END_POINT}/`, config);
                if (data.success) {
                    dispatch(setAllJobs(data.jobs));
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message)
            }
        }

        fetchallJobs();

    }, []);

};