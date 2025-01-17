import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Hyderabad", "Pune", "Mumbai", "Bangalore"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Science"],
    },
]
export const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='h-[88vh] overflow-y-scroll rounded-md bg-white shadow-lg p-2'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup
                value={selectedValue}
                onValueChange={changeHandler}
                className='mt-4'>
                <div className='flex flex-col justify-center'>
                    {
                        filterData.map((filter, index) => <div key={index} className='flex flex-col gap-4'>
                            <h1>{filter.filterType}</h1>
                            <div className='flex flex-col gap-2'>
                                {
                                    filter.array.map((item, idx) => {
                                        const id = `id${index} - ${idx}`;
                                        return (
                                            <div key={idx} className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    id={id}
                                                    type='radio'
                                                    value={item}
                                                    name={filter.filterType}
                                                    className='h-3 w-3'
                                                />
                                                <Label htmlFor={id} >
                                                    {item}
                                                </Label>
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                            <hr className='mt-3' />
                        </div>)
                    }
                </div>
            </RadioGroup>
        </div>
    )
}
