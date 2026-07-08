import Button from '@/components/Button'
import Link from 'next/link'
import React from 'react'
import { BiSolidRightArrow } from 'react-icons/bi'

const NotFound = () => {
  return (
    <section>
      <div className="container">
        <div>
          <div className="flex items-center gap-2 pt-15 text-sm mb-6">
            <Link href={"/"} className="text-gray-600 hover:text-black transition-all font-medium">
              Home
            </Link>
            <BiSolidRightArrow className="text-[10px] text-gray-400" />
            <p className="text-red-600 font-medium">
              Not Found
            </p>
          </div>
          <div className='flex flex-col items-center justify-center h-[50vh] bg-red-900 rounded-2xl space-y-10 my-5'>
            <h1 className='font-bold text-4xl text-white'>404 Not Found</h1>
            <p className='text-white font-semibold'>Your visited page not found. You may go home page.</p>
            <div>
              <Button TagName={Link} href={"/"}>Back to home page</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound