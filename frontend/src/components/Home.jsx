import { CategoryCarouse } from "./CategoryCarouse"
import { Footer } from "./shared/Footer"
import { HeroSection } from "./HeroSection"
import { LatestJobs } from "./LatestJobs"
import { Navbar } from "./shared/Navbar"
import { useGetAllJobs } from "@/components/hooks/useGetAllJobs"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Home = () => {

    const { authUser } = useSelector((store) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser?.role === 'recruiter') {
            navigate('/admin/companies');
        }
    }, [])
    useGetAllJobs();
    return <div>
        <Navbar />
        <HeroSection />
        <CategoryCarouse />
        <LatestJobs />
        <Footer />
    </div>
}