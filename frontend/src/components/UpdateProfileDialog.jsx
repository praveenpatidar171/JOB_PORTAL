import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setAuthUser } from '@/redux/userSlicer'


export const UpdateProfileDialog = ({ open, setOpen }) => {

    const { authUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: authUser?.name,
        email: authUser?.email,
        phoneNumber: authUser?.phoneNumber,
        bio: authUser?.profile?.bio,
        skills: authUser?.profile?.skills?.map((skill) => skill),
        file: authUser?.profile?.resume,

    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('email', input.email),
            formData.append('bio', input.bio),
            formData.append('skills', input.skills),
            formData.append('phoneNumber', input.phoneNumber)

        if (input.file) {
            formData.append('file', input.file);
            console.log('FormData file:', input.file.name);
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,
            }

            const { data } = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, config);
            if (data.success) {
                const user = {
                    _id: data._id,
                    email: data.email,
                    name: data.name,
                    role: data.role,
                    profile: data.profile,
                    phoneNumber: data.phoneNumber,
                    skills: data.skills,
                }
                dispatch(setAuthUser(user));
                toast.success(data.message);
                setOpen(false);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }


    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });

    }
    return (
        <div>
            <Dialog open={open} >
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right' >Name</Label>
                                <Input value={input.name} onChange={changeEventHandler} id='name' type='text' className='col-span-3' name='name' placeholder='John doe' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email' className='text-right' >Email</Label>
                                <Input value={input.email} onChange={changeEventHandler} id='email' type='email' className='col-span-3' name='email' placeholder='John@example.com' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='phoneNumber' className='text-right' >Number</Label>
                                <Input value={input.phoneNumber} onChange={changeEventHandler} id='phoneNumber' type='text' className='col-span-3' name='phoneNumber' placeholder='John doe' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='bio' className='text-right' >Bio</Label>
                                <Input value={input.bio} onChange={changeEventHandler} id='bio' className='col-span-3' name='bio' placeholder='John doe' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills' className='text-right' >Skills</Label>
                                <Input value={input.skills} onChange={changeEventHandler} id='skills' className='col-span-3' name='skills' placeholder='John doe' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='file' className='text-right' >Resume</Label>
                                <Input onChange={fileChangeHandler} id='file' className='col-span-3' name='file' type='file' accept='application/pdf' placeholder='John doe' />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='w-full my-4'><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>
                                    : <Button type='submit' className='w-full my-4'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
