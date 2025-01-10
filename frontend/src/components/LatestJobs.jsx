import { LatestJobCards } from "./LatestJobCards"

const initialJob = [1, 2, 3, 4, 5, 6, 7, 8];
export const LatestJobs = () => {
    return (
        <div className="w-full my-20">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold"><span className="text-[#6A38C2]">Latest & Top</span> Job Openinigs</h1>
                <div className="grid grid-cols-3 gap-4 my-5">
                    {initialJob.slice(0, 6).map((item, index) => <LatestJobCards key={index} />)}
                </div>
            </div>
        </div>
    )
}
