import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { backdrop } from "./anim";
import BurgerButton from "./BurgerButton";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@store/ui-slice";

export default function BurgerMenu() {
  const dispatch = useDispatch();
  const { menuVisible: isActive } = useSelector(({ ui }) => ui);

  // Scroll lock when menu is open
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isActive]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isActive) {
        dispatch(uiActions.toggleHeaderMenu());
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isActive]);

  const handleToggle = () => {
    dispatch(uiActions.toggleHeaderMenu());
  };

  return (
    <>
      {/* Burger Button */}
      <BurgerButton isActive={isActive} onClick={handleToggle} />

      {/* Backdrop and Menu */}
      <AnimatePresence mode="wait">
        {isActive && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              variants={backdrop}
              initial="initial"
              animate="enter"
              exit="exit"
              className="fixed top-0 bottom-0 left-0 z-30 h-[100vh] w-full bg-black/50 backdrop-blur-xs"
              onClick={handleToggle}
            />

            {/* Menu */}
            <Menu onClose={handleToggle} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
