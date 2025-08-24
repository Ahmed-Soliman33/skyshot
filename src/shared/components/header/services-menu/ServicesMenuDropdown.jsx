import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";

import { uiActions } from "@store/ui-slice";
import ServicesTabs from "./ServicesTabs";
import ServicesContent from "./ServicesContent";

const ServicesMenuDropdown = () => {
  const { servicesDropdownVisible: isOpen } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();
  const { t: servicesT } = useTranslation("services");
  const servicesTabs = [
    {
      key: "aerial",
      title: servicesT("tabs.services.aerial.title"),
      description: servicesT("tabs.services.aerial.description"),
      image:
        "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764978/aerial-photography_f2jk9r.jpg",
    },
    {
      key: "commercial",
      title: servicesT("tabs.services.commercial.title"),
      description: servicesT("tabs.services.commercial.description"),
      image:
        "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764979/project-producing_x05zhg.jpg",
    },
    {
      key: "editing",
      title: servicesT("tabs.services.editing.title"),
      description: servicesT("tabs.services.editing.description"),
      image:
        "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764975/video-production_clinip.jpg",
    },
    {
      key: "events",
      title: servicesT("tabs.services.events.title"),
      description: servicesT("tabs.services.events.description"),
      image:
        "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764979/event-coverage_azwaxv.jpg",
    },
  ];

  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("aerial");
  const containerRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (isOpen) {
          dispatch(uiActions.showServicesDropdown());
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleToggleDropdown = () => {
    dispatch(uiActions.showServicesDropdown());
  };

  const handleCloseDropdown = () => {
    if (isOpen) {
      dispatch(uiActions.showServicesDropdown());
    }
  };

  return (
    <div onClick={handleToggleDropdown} ref={containerRef}>
      {/* Main Trigger Link */}
      <button
        className={`group text-secondaryTextColor relative font-medium transition-colors duration-300 hover:text-white ${
          isOpen && "text-white"
        }`}
      >
        <div className="flex items-center space-x-1">
          <span className="relative z-10">{t("header.services")} </span>
          {isOpen ? (
            <HiChevronUp className="h-5 w-5" />
          ) : (
            <HiChevronDown className="h-5 w-5" />
          )}
        </div>
        <span
          className={`absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full ${
            isOpen && "w-full"
          }`}
        ></span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed right-0 left-0 z-40 mt-4 h-[90vh] w-[100vw] bg-[#0a0a0a] px-[10%] pt-24 text-white shadow-xl"
            onClick={handleToggleDropdown}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative grid grid-cols-3 gap-8 p-6"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDropdown}
                className="hover:text-redColor absolute -top-10 right-5 text-white transition-colors"
              >
                <HiXMark
                  className="h-7 w-7 transition-transform duration-300 group-hover:rotate-180 hover:rotate-180"
                  strokeWidth={1.5}
                />
              </button>

              {/* Tabs */}
              <ServicesTabs
                tabs={servicesTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Content */}
              <ServicesContent
                tab={servicesTabs.find((s) => s.key === activeTab)}
              />

              {/* Image */}
              <div className="bg-secondaryColor aspect-video overflow-hidden">
                <img
                  src={servicesTabs.find((s) => s.key === activeTab)?.image}
                  alt="Service Image"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesMenuDropdown;
