import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {

        const fetchSingleCompany = async () => {
            try {
                const config = {
                    withCredentials: true,
                }
                const { data } = await axios.get(`${COMPANY_API_END_POINT}/${companyId}`, config);
                if (data?.success) {
                    dispatch(setSingleCompany(data?.company));
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch]);
}