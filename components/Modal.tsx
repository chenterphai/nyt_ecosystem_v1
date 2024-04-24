'use client'
import { supabaseClient } from '@/utils/supabase/client'
import React, { ChangeEvent } from 'react'
import { FaTimes } from 'react-icons/fa'

interface ModalProps {
    i: any;
    onClose: () => void;
    onAlert: () => void;
}

const Modal = ({ i, onClose, onAlert }: ModalProps) => {

    const supabase = supabaseClient()

    const [name, setName] = React.useState('')
    const [desc, setDesc] = React.useState('')
    const [qty, setQty] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [cate, setCate] = React.useState('')

    let file: File;
    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            file = e.target.files[0]
        }

    }

    // Upload data to database
    const handleAdd = async () => {

        const { data, error } = await supabase.storage.from('files').upload(`products/${file.name}`, file as File)

        if (data) {
            console.log(data);
        } else if (error) {
            console.log(error);
        }

        const imageUrl = `"https://gcxsvuwjngrpqmekwgzc.supabase.co/storage/v1/object/public/files/${data?.path}"`
        console.log(imageUrl)

        const { data: pData, error: pError } = await supabase
            .from('products')
            .insert([{
                Image: JSON.parse(`[{"img":${imageUrl}}]`),
                Name: name,
                Description: desc,
                Quantity: qty,
                Price: price,
                Category: cate
            }])
        if (pError) {
            console.log(pError);
            return;
        } else if (pData) {
            console.log(pData);
            console.log('Added Successfully!')
        }
        onAlert();
        onClose();
    }

    // Click to refresh page
    // Click outside to close modal



    return (
        <>
            {i === 1 ? (<>
                <div
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded backdrop-blur-md bg-white/40 shadow-xl'
                >
                    <div className='relative'>
                        <h1 className='text-center  pb-5 text-sky-700 font-medium text-xl'>
                            Add New Product
                        </h1>
                        <div className='grid grid-cols-8 gap-3'>
                            <input
                                type="text"
                                className='p-3 text-gray-600 col-span-4 rounded-md'
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <select
                                onChange={(e) => setCate(e.target.value)}
                                name=""
                                id=""
                                className='col-span-4 p-3 text-gray-400 rounded-md selection:text-gray-600'>
                                <option value="">Category</option>
                                <option value="templates">Template</option>
                                <option value="components">Components</option>
                                <option value="ebooks">EBook</option>
                                <option value="courses">Course</option>
                                <option value="pc-peripherals">PC-Peripherals</option>
                            </select>
                            <input
                                type="text"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className='p-3 text-gray-600 col-span-5 rounded-md'
                                placeholder='Description'
                                required
                            />
                            <input type="number"
                                className='col-span-3 rounded-md p-3 text-gray-600'
                                placeholder='Quantity'
                                onChange={(e) => setQty(e.target.value)}
                                required
                            />
                            <input type="number"
                                className='col-span-4 rounded-md p-3 text-gray-600'
                                placeholder='Price'
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <input type="file"
                                className='col-span-4 rounded-md p-3 text-gray-600 border-none'
                                placeholder='Choose Image'
                                required
                                onChange={handleImage}
                            />
                            <input
                                type="submit"
                                className='cursor-pointer col-span-8 p-3 bg-sky-500  text-white rounded-md transition-all duration-150 ease-in-out active:scale-95'
                                onClick={handleAdd}
                            />
                        </div>

                        {/* Close button */}
                        <button className='absolute -top-3 right-0' onClick={onClose}>
                            <FaTimes size={16} className='text-gray-500' />
                        </button>
                    </div>
                </div>
            </>) : ""}
        </>
    )
}

export default Modal