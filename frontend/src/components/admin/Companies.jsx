import { useNavigate } from "react-router-dom"
import { Navbar } from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { CompaniesTable } from "./CompaniesTable"
import { useGetAllCompanies } from "@/components/hooks/useGetAllCompanies"
import { useState } from "react"

export const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    return (

        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
                    <Input
                        className='w-fit '
                        placeholder='Filter By Name'
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/companies/create')}>New Company</Button>
                </div>
                <CompaniesTable search={search} />

            </div>
        </div>
    )
}
