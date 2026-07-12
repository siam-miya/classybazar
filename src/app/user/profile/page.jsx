import SubBanner from '@/components/SubBanner'
import UserProfileDashboard from '@/components/UserProfileDashboard'
import Link from 'next/link'
import React from 'react'
import { BiSolidRightArrow } from 'react-icons/bi'

const UserAccountPage = () => {
  return (
   <section>
    <div className="container">
       <div>
          <SubBanner title={"Your Profile"} pageName={"Profile"}/>
            <div>
            <UserProfileDashboard/>
          </div>
       </div>
    </div>
   </section>
  )
}

export default UserAccountPage
