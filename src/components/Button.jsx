
const Button = ({children, type="button", TagName, ...props}) => {
  return (
    <TagName {...props} className='inline-block text-[#FAFAFA] bg-[#DB4444] py-3 px-7 rounded-1 border-none cursor-pointer text-center font-poppins font-medium text-[16px] leading-6 hover:text-white hover:bg-black transition-all rounded-tr-4xl rounded-bl-4xl' type={type}>{children}</TagName>
  )
}

export default Button
