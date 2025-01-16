import { setAllCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useGetAllCompanies = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async () => {

            try {
                const config = {
                    withCredentials: true,
                }
                const { data } = await axios.get(`${COMPANY_API_END_POINT}/`, config);
                if (data?.success) {
                    dispatch(setAllCompanies(data?.companies));
                }

            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }

        }
        fetchAllCompanies();
    }, []);
}