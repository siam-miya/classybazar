
const CategoryCard = ({ icon: Icon, text }) => {
  return (
    <div className="group flex flex-col items-center justify-center border border-gray-300 rounded-[4px] cursor-pointer select-none transition-all duration-300 ease-in-out p-6 w-full h-[145px] bg-white hover:bg-[#DB4444] hover:border-[#DB4444]">
      <div className="flex items-center justify-center text-black group-hover:text-white transition-colors duration-300 mb-4">
        {Icon && <Icon className="w-14 h-14" />}
      </div>
      <p className="font-poppins text-base font-normal text-black group-hover:text-white transition-colors duration-300">
        {text}
      </p>
    </div>
  );
};

export default CategoryCard;