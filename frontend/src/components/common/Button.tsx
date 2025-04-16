interface ButtonProps {
  text: string;
  bg?: string;
  bgShadow?: string;
  textColor?: string;
  px?: string;
  onclick?: () => void 
}

const Button = ({ text, bg, bgShadow, textColor, px, onclick }: ButtonProps) => {
  return (
    <div className="relative group">
      <div
        className={`h-full top-1.5 -z-10 left-1.5 p-2 ${
          px || "px-6"
        } w-full absolute ${
          bgShadow || "bg-secondary"
        } rounded-lg group-hover:invisible transition-all duration-200`}
      ></div>

      <button
        className={`${bg || "bg-white"} ${
          textColor || "text-primary"
        } ${
          px || "px-6"
        } font-bold rounded-lg p-2 mt-4 flex items-center justify-center w-full cursor-pointer ${bgShadow ? `hover:${bgShadow}` : "hover:bg-secondary"} hover:text-[#FFF8F8] hover:translate-1 transition-all duration-300 ease-in-out z-10`}
        onClick={onclick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
