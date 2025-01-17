import { useDispatch } from "react-redux"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "@/redux/jobSlice"

const category =
    [
        "Frontend Developer", "Backend Developer", "Data Science", "Graphic Designer", "Full Stack Developer"
    ]
export const CategoryCarouse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }
    return (
        <div className="w-full my-15">
            <Carousel className='w-[40%] mx-auto'>
                <CarouselContent>
                    {
                        category.map((category, index) =>
                            <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={index}>
                                <Button onClick={() => clickHandler(category)} variant='outline' className='rounded-full' > {category}</Button>
                            </CarouselItem>)
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    )
}
