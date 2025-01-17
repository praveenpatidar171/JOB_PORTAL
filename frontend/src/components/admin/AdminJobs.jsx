import { useNavigate } from "react-router-dom"
import { Navbar } from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import { AdminJobsTable } from "./AdminJobsTable"
import { useGetAllAdminPostedJobs } from "@/hooks/useGetAllAdminPostedJobs"

export const AdminJobs = () => {

    useGetAllAdminPostedJobs();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    return (

        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
                    <Input
                        className='w-fit '
                        placeholder='Filter By Name & Role'
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/jobs/create')}>Post New Job</Button>
                </div>
                <AdminJobsTable search={search}/>
            </div>
        </div>
    )
}
