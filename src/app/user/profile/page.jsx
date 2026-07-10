import UserProfileDashboard from '@/components/UserProfileDashboard'
import Link from 'next/link'
import React from 'react'
import { BiSolidRightArrow } from 'react-icons/bi'

const UserAccountPage = () => {
  return (
   <section>
    <div className="container">
       <div>
           <div className="flex items-center gap-2 pt-15 text-sm mb-6">
            <Link href={"/"} className="text-gray-600 hover:text-black transition-all font-medium">
              Home
            </Link>
            <BiSolidRightArrow className="text-[10px] text-gray-400" />
            <Link href={"/products"} className="text-blue-500 transition-all font-medium">
              My Account
            </Link>
          </div>
            <div>
            <UserProfileDashboard/>
          </div>
       </div>
    </div>
   </section>
  )
}

export default UserAccountPage
