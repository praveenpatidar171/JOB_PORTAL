import { useNavigate } from "react-router-dom"
import { Navbar } from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "sonner"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"

export const CompanyCreate = () => {

    const [name, setName] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
            const sendData = {
                name,
            }

            const { data } = await axios.post(`${COMPANY_API_END_POINT}/create`, sendData, config);

            if (data?.success) {
                toast.success(data?.message);
                const companyId = data?.newCompany?._id;
                navigate(`/admin/companies/${companyId}`);
                dispatch(setSingleCompany(data?.newCompany));
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }

    }
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto ">
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-500">What would you like to give your company name? You can change this later</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type='text'
                    className='my-2'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='ex: JobHunt, Microsoft etc.'
                />
                <div className="flex items-center gap-2 my-10">
                    <Button variant='outline' onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    <Button onClick={registerNewCompany} >Continues</Button>
                </div>
            </div>
        </div>
    )
}
