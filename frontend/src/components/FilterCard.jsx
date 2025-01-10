import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Input } from './ui/input'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Hyderabad", "Pune", "Mumbai", "Bangalore"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Science"],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1lakh-5lakh", "5lakh-10lakh",],
    },


]
export const FilterCard = () => {
    return (
        <div className='h-[88vh] overflow-y-scroll rounded-md bg-white shadow-lg p-2'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup default='comfortable' className='mt-4'>
                <div className='flex flex-col justify-center'>
                    {
                        filterData.map((filter, index) => <div key={index} className='flex flex-col gap-4'>
                            <h1>{filter.filterType}</h1>
                            <div className='flex flex-col gap-2'>
                                {
                                    filter.array.map((item, index) => <div key={index} className="flex items-center space-x-2">
                                        <Input type='radio' value={item} name={filter.filterType} className='h-3 w-3' />
                                        <Label htmlFor={`${index}`} >{item}</Label>
                                    </div>)
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
