import React from 'react'
import CountdownTimer from './CountDownTimer'

const SectionHeading = ({subHeading, heading, countDown=false}) => {
  return (
    <div>
      <h3 className='text-[#DB4444] font-semibold font-poppins relative pl-[40px] text-[16px] leading-5 after:content-[""] after:absolute after:w-[20px] after:h-[40px] after:left-0 after:bg-[#DB4444] after:rounded-md after"top-1/2 after:translate-y-[-22%]'>{subHeading}</h3>
    <div className={`flex ${countDown && "gap-[87px] items-end"}`}>
         <div>
         <h3 className='pt-7 font-semibold text-[36px] leading-12 text-black font-inter'>{heading}</h3>
     </div>
     <div>
         {countDown &&  <CountdownTimer/>}
     </div>
    </div>
    </div>
  )
}

export default SectionHeading
