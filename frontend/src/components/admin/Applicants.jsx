import { useGetSingleJobById } from "@/components/hooks/useGetSingleJobById"
import { Navbar } from "../shared/Navbar"
import { ApplicantsTable } from "./ApplicantsTable"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export const Applicants = () => {
    const params = useParams();
    useGetSingleJobById(params.id);
    const {singleJob} = useSelector((store)=> store.job);
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl my-5">Applicants ({singleJob?.applications?.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}
