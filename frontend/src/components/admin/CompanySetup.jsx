import { ArrowLeft, Loader2 } from "lucide-react"
import { Navbar } from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"
import { useGetCompanyById } from "@/hooks/useGetCompanyById"

export const CompanySetup = () => {

    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { singleCompany } = useSelector((store) => store.company);

    const companyId = params.id;

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', input.name);
        formData.append('website', input.website);
        formData.append('location', input.location);
        formData.append('description', input.description);

        if (input.file) {
            formData.append('logo', input.file);
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            }

            const { data } = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, config);

            if (data?.success) {
                toast.success(data?.message);
                dispatch(setSingleCompany(data.company));
                navigate('/admin/companies');
            }

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    };
    useGetCompanyById(companyId);
    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: null
        })

    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center gap-5 p-8">
                        <Button onClick={() => navigate('/admin/companies')} variant='outline' className='flex items-center gap-2 text-gray-500 font-semibold'><ArrowLeft /><span>Back</span></Button>
                        <h1 className="font-bold text-xl">Company Setup</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-5">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type='text'
                                name='name'
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type='text'
                                name='website'
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type='file'
                                accept='image/*'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button type='submit' className='w-full mt-8' ><Loader2 className="h-5 w-5 animate-spin" /> Please wait</Button> :
                            <Button type='submit' className='w-full mt-8' >Update</Button>
                    }

                </form>
            </div>
        </div>
    )
}
