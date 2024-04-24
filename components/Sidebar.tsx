'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { use, useMemo } from 'react'
import { BiCart, BiHome } from 'react-icons/bi'
import Image from 'next/image'
import { supabaseClient } from '@/utils/supabase/client'
import { LuArrowLeftToLine } from 'react-icons/lu'
import { TbMessageCircle } from 'react-icons/tb'
import { IoNotificationsOutline } from 'react-icons/io5'
import { GrServices } from 'react-icons/gr'

interface SIDEBAR_PROPS {
    children: React.ReactNode;
}

const Sidebar: React.FC<SIDEBAR_PROPS> = ({
    children
}) => {
    const router = useRouter()
    const pathname = usePathname()
    const route = useMemo(() => [
        {
            label: "Home",
            active: pathname === "/",
            href: "/",
            icon: <BiHome size={25} />
        },
        {
            label: "Products",
            active: pathname === "/products",
            href: "/products",
            icon: <BiCart size={25} />
        },
        {
            label: "Services",
            active: pathname === "/services",
            href: "/services",
            icon: <GrServices size={25} />
        },
        {
            label: "Message",
            active: pathname === "/message",
            href: "/message",
            icon: <TbMessageCircle size={25} />
        },
        {
            label: "Notification",
            active: pathname === "/notification",
            href: "/notification",
            icon: <IoNotificationsOutline size={25} />
        },
    ], [pathname])

    const supabase = supabaseClient()
    const [data, setData] = React.useState<any[] | null>(null)
    const fetchData = async () => {
        const { data, error } = await supabase.from('homepage').select("image").eq('id', 1)
        setData(data)
    }
    React.useEffect(() => {
        fetchData()
    }, [])

    const [toggle, setToggle] = React.useState(false)

    const onClick = () => {
        setToggle(!toggle);
    }

    return (
        <div className='flex flex-1'>
            <div className={`h-screen ${toggle ? 'w-[20%]' : 'w-[5%]'} bg-gray-50 sticky top-0 transition-all duration-300 ease-in-out`}>
                <div className='p-3 border-b'>
                    <div className='flex items-center justify-between'>
                        <div className={`flex items-center justify-start gap-x-2 relative`}>
                            <div className='w-12 h-12 p-1'>
                                <Image
                                    src={data?.at(0).image}
                                    alt='Logo'
                                    width={500}
                                    height={500}
                                    className='w-full cursor-pointer'
                                    onClick={onClick}
                                />
                            </div>

                            <h1
                                className={`text-lg md:text-xl font-semibold text-sky-600 transition-all duration-300 ease-in-out`}
                            >
                                {toggle ? 'NYT Ecosystem' : ''}
                            </h1>

                        </div>
                        {!toggle ? "" : (
                            <button
                                onClick={onClick}
                                className='p-2 rounded bg-gray-100'
                            >
                                <LuArrowLeftToLine
                                    className='text-gray-500'
                                />
                            </button>
                        )}
                    </div>
                </div>
                <div className='w-[20%]:p-3 p-2 flex flex-col space-y-3'>
                    {route.map((items) => (
                        <button
                            onClick={() => router.push(items.href)}
                            key={items.label}
                            className={!items.active ? 'flex justify-start items-center gap-x-2 text-gray-500 my-1 p-2 px-4 transition-all duration-200 ease-in-out hover:bg-gray-100 rounded-lg' : 'flex justify-start items-center gap-x-2 text-gray-500 my-1 p-2 px-4 transition-all duration-200 ease-in-out bg-gray-100 rounded-lg'}
                        >
                            {items.icon}
                            {toggle ? items.label : ""}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`${toggle ? 'w-[80%] p-2' : 'w-[95%] p-2'} transition-all duration-300 ease-in-out`}>
                {children}
            </div>
        </div>
    )
}

export default Sidebar