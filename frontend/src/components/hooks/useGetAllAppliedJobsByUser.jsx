import { setAllAppliedJobs } from "@/redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useGetAllAppliedJobsByUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const config = {
                    withCredentials: true,
                }
                const { data } = await axios.get(`${APPLICATION_API_END_POINT}/applications`, config);
                if (data?.success) {
                    dispatch(setAllAppliedJobs(data?.applications));
                }

            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
        }
        fetchAllAppliedJobs();
    }, []);
}
