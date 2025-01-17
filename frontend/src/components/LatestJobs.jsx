import { useSelector } from "react-redux";
import { LatestJobCards } from "./LatestJobCards"
import { motion } from "framer-motion";

export const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job)
    return (
        <div className="w-full my-20">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold"><span className="text-[#6A38C2]">Latest & Top</span> Job Openinigs</h1>
                <div className="grid grid-cols-3 gap-4 my-5">
                    {allJobs?.length <= 0 ? <span>No Jobs available</span> : allJobs?.slice(0, 6).map((job) =>
                        <motion.div
                            key={job?._id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <LatestJobCards job={job} />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
