import { CategoryCarouse } from "./CategoryCarouse"
import { Footer } from "./shared/Footer"
import { HeroSection } from "./HeroSection"
import { LatestJobs } from "./LatestJobs"
import { Navbar } from "./shared/Navbar"
import { useGetAllJobs } from "@/hooks/useGetAllJobs"

export const Home = () => {

    useGetAllJobs();
    
    return <div>
        <Navbar />
        <HeroSection />
        <CategoryCarouse />
        <LatestJobs />
        <Footer />
    </div>
}