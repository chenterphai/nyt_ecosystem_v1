'use client'
import { supabaseClient } from "@/utils/supabase/client";
import Image from "next/image";
import React from "react";

export default function Home() {

  const supabase = supabaseClient()
  const [count, setCount] = React.useState<any[] | null>(null)
  React.useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {

      // Count rows
      const { data, error } = await supabase.from('products').select('count').single();
      if (error) {
        throw error
      }
      setCount(data.count)


    } catch (error) {
      console.log(error)
    }
  }
  console.log(count)

  return (
    <>
      <div
        className={`w-full rounded bg-gray-200 relative h-full overflow-hidden`}
        id='#top'
      >
        <div className="p-5">
          <div className="grid grid-cols-3 gap-8">

            <div className="rounded-md bg-gray-50 p-5">
              <h1
                className="text-gray-500 font-medium text-2xl"
              >All Products</h1>
              <p
                className="mb-3 text-gray-400"
              >In all categories</p>
              <p className="text-5xl text-sky-500">
                {count}
              </p>
              <p className="text-gray-400 px-1">Items</p>
            </div>

            <div className="">

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
