'use client'
import Modal from '@/components/Modal'
import Notification from '@/components/Notification'
import { supabaseClient } from '@/utils/supabase/client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { CiCirclePlus } from 'react-icons/ci'
import { MdOutlineUpdate } from 'react-icons/md'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaArrowUp } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const Products = () => {



    const [data, setData] = useState<any[] | null>(null)
    const supabase = supabaseClient()
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true })
            setData(data)
        }
        fetchData()
    }, [])
    const [close, setClose] = useState(false)
    const [show, setShow] = useState(0)
    const toggle = (e: any) => {
        setClose(!close)
        setShow(e)
    }
    const onClose = () => {
        toggle(0)
        setClose(close)
    }

    // Notification show
    const [alert, setAlert] = useState(false)
    const handleAlert = (e: boolean) => {
        setAlert(e)

        setInterval(() => {
            setAlert(!e)
        }, 5000)
    }

    const [categories, setCategories] = useState('')
    const handleChangeCategory = (e: any) => {
        setCategories(e)
    }
    console.log(categories);


    const router = useRouter()
    return (
        <div
            className={`w-full rounded ${show !== 0 ? "bg-gray-200" : "bg-gray-200"} relative h-full overflow-hidden`}
            id='#top'
        >
            <div className='flex flex-col p-2'>

                <div className='mb-3 flex justify-between items-center bg-gray-100 rounded relative'>
                    <h1 className='p-3 px-5 text-lg md:text-xl font-semibold text-sky-600'>Products</h1>
                    <button
                        onClick={toggle}
                        className='p-2 m-2 transition-all duration-150 ease-in-out hover:bg-gray-200 rounded'>
                        <AiOutlineMenu
                            className=''
                        />
                    </button>

                    <div className={close && show !== 0 ?
                        'absolute flex flex-col gap-y-2 items-start text-gray-500 text-sm top-14 bg-gray-100 shadow-md rounded right-0 p-3'
                        : 'absolute hidden flex-col gap-y-2 items-start text-gray-500 text-sm top-12 bg-gray-200 rounded right-0 p-3'}>
                        <button
                            onClick={() => toggle(1)}
                            className='flex items-center justify-start gap-x-1 hover:text-gray-700 transition-all ease-in-out duration-200'
                        >
                            <CiCirclePlus />
                            Add Product
                        </button>
                        <button
                            onClick={() => toggle(2)}
                            className='flex items-center justify-start gap-x-1 hover:text-gray-700 transition-all ease-in-out duration-200'
                        >
                            <MdOutlineUpdate />
                            Update</button>
                        <button
                            onClick={() => toggle(3)}
                            className='flex items-center justify-start gap-x-1 hover:text-gray-700 transition-all ease-in-out duration-200'
                        >
                            <RiDeleteBin2Line />
                            Delete</button>
                    </div>
                </div>
            </div>


            <Modal i={show} onClose={onClose} onAlert={() => handleAlert(true)} />

            <Notification className={`bg-green-50 text-green-500 transition-all duration-300 ease-in-out ${alert ? 'right-3' : '-right-56'} `}>
                <FaRegCircleCheck />

                Added Successfully!

            </Notification>

            {/* Table */}
            <div className='m-2 bg-gray-100 rounded-md'>
                <div className='grid grid-cols-8 gap-8 p-2'>
                    <div className='font-medium text-sky-600 text-center'>
                        ID
                    </div>
                    <div className='col-span-2 font-medium text-sky-600'>
                        Name
                    </div>
                    <div className='font-medium text-sky-600'>
                        Image
                    </div>
                    <div className='font-medium text-sky-600'>
                        Quantity
                    </div>
                    <div className='font-medium text-sky-600'>
                        Price
                    </div>
                    <div className='col-span-2 font-medium text-sky-600'>
                        <select
                            onChange={(e) => handleChangeCategory(e.target.value)}
                            name="" id="" className='bg-transparent'>
                            <option value="">Category</option>
                            <option value="templates">Template</option>
                            <option value="components">Component</option>
                            <option value="ebooks">EBook</option>
                            <option value="courses">Course</option>
                            <option value="pc-peripherals">PC & Peripherals</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='m-2 bg-gray-100 rounded-md'>
                <div className='grid grid-cols-8 gap-8 p-2'>

                    {data && data?.map((items) => (
                        <>
                            <div className='flex items-center justify-center'>
                                {items.id}
                            </div>
                            <div className='col-span-2 flex items-center'>
                                {items.Name}
                            </div>
                            <div className=''>
                                <div>
                                    <Image
                                        src={items.Image.at(0).img}
                                        alt='Image'
                                        width={1200}
                                        height={1200}
                                        className='rounded-md'
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <div>
                                    {items.Quantity}
                                </div>
                            </div>
                            <div className='flex justify-start items-center'>
                                $ {items.Price}
                            </div>
                            <div className='col-span-2 flex items-center'>
                                {items.Category}
                            </div>
                        </>
                    ))}
                </div>
            </div>

            <div className='fixed bottom-8 right-12'>
                <button
                    onClick={() => router.push('#top')}
                    className='bg-sky-500 p-2 rounded-full animate-bounce'>
                    <FaArrowUp
                        className='text-white'
                    />
                </button>
            </div>
        </div >
    )
}

export default Products