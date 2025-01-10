import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const HeroSection = () => {
    return <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
            <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium" >No. 1 Job Hunt Website</span>
            <h1 className="text-5xl font-bold">Search, Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Jobs</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum doloremque vero porro et repellat?</p>
            <div className="flex items-center rounded-md mx-auto w-[40%] shadow-lg">
                <Input type='text' placeholder='Find your dream jobs' className='w-full outline-none focus-visible:ring-transparent' />
                <Button className='bg-[#6A38C2]'><Search className="h-5 w-5" /></Button>
            </div>
        </div>
    </div>
}