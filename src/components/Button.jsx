
const Button = ({children, type="button", TagName, ...props}) => {
  return (
    <TagName {...props} className='inline-block text-[#FAFAFA] bg-[#DB4444] py-2 px-8 rounded-1 border-none cursor-pointer text-center leading-10 hover:text-white hover:bg-black transition-all rounded-br-3xl rounded-tl-3xl' type={type}>{children}</TagName>
  )
}

export default Button
