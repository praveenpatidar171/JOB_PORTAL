import { CategoryCarouse } from "./CategoryCarouse"
import { Footer } from "./shared/Footer"
import { HeroSection } from "./HeroSection"
import { LatestJobs } from "./LatestJobs"
import { Navbar } from "./shared/Navbar"
import { useGetAllJobs } from "@/components/hooks/useGetAllJobs"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

export const Home = () => {

    const [token, setToken] = useState();
    const { authUser } = useSelector((store) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser?.role === 'recruiter') {
            navigate('/admin/companies');
        }
        const token = Cookies.get("token");
        if (token) {
            setToken(token);
        }
    }, [])
    if (token) {
        useGetAllJobs();
    }
    console.log(token);
    return <div>
        <Navbar />
        <HeroSection />
        <CategoryCarouse />
        <LatestJobs />
        <Footer />
    </div>
}