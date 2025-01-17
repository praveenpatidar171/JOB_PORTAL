import { setAdminJobs } from "@/redux/jobSlice";
import { JOBS_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useGetAllAdminPostedJobs = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminPostedJobs = async () => {
            try {
                const config = {
                    withCredentials: true,
                }

                const { data } = await axios.get(`${JOBS_API_END_POINT}/userJobs`, config);
                if (data?.success) {
                    dispatch(setAdminJobs(data?.jobs));
                }

            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
        }

        fetchAllAdminPostedJobs();

    }, []);

}
