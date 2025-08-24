import { useTranslation } from "react-i18next";
import { HiArrowUpRight, HiArrowUpLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

const ServicesContent = ({ tab }) => {
  const { i18n } = useTranslation();
  const dir = i18n.dir();
  return (
    <div className="mt-8">
      <h3 className="text-[1.4rem] font-semibold tracking-widest">
        {tab.title}
      </h3>
      <div className="mt-6 flex items-center space-x-2">
        <span className="text-secondaryTextColor text-[1.1rem]">
          {tab.description}
        </span>
      </div>

      <Link className="group mt-16 flex items-center space-x-4 text-sm">
        <div className="bg-tertiaryColor p-4">
          {dir === "rtl" ? (
            <HiArrowUpLeft className="h-4 w-4 text-white duration-300 group-hover:-rotate-45" />
          ) : (
            <HiArrowUpRight className="h-4 w-4 text-white duration-300 group-hover:rotate-45" />
          )}
        </div>
        <span className="text-primaryTextColor text-[1.3rem] transition-colors duration-300 group-hover:underline">
          {dir === "ltr" ? "Explore Service" : "استكشف الخدمة"}
        </span>
      </Link>
    </div>
  );
};

export default ServicesContent;
