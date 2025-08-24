import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 500,
  className = '',
  contentClassName = '',
  disabled = false,
  trigger = 'hover' // 'hover', 'click', 'focus'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let newPosition = position;

    // Check if tooltip fits in the preferred position
    switch (position) {
      case 'top':
        if (triggerRect.top - tooltipRect.height < 10) {
          newPosition = 'bottom';
        }
        break;
      case 'bottom':
        if (triggerRect.bottom + tooltipRect.height > viewport.height - 10) {
          newPosition = 'top';
        }
        break;
      case 'left':
        if (triggerRect.left - tooltipRect.width < 10) {
          newPosition = 'right';
        }
        break;
      case 'right':
        if (triggerRect.right + tooltipRect.width > viewport.width - 10) {
          newPosition = 'left';
        }
        break;
    }

    setActualPosition(newPosition);
  };

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Calculate position after tooltip is rendered
      setTimeout(calculatePosition, 0);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      hideTooltip();
    }
  };

  const getPositionClasses = () => {
    switch (actualPosition) {
      case 'top':
        return {
          tooltip: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
          arrow: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900 border-t-8 border-x-transparent border-x-8'
        };
      case 'bottom':
        return {
          tooltip: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
          arrow: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900 border-b-8 border-x-transparent border-x-8'
        };
      case 'left':
        return {
          tooltip: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
          arrow: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-900 border-l-8 border-y-transparent border-y-8'
        };
      case 'right':
        return {
          tooltip: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
          arrow: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-900 border-r-8 border-y-transparent border-y-8'
        };
      default:
        return {
          tooltip: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
          arrow: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900 border-t-8 border-x-transparent border-x-8'
        };
    }
  };

  const positionClasses = getPositionClasses();

  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: actualPosition === 'top' ? 10 : actualPosition === 'bottom' ? -10 : 0,
      x: actualPosition === 'left' ? 10 : actualPosition === 'right' ? -10 : 0
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.15
      }
    }
  };

  if (!content) {
    return children;
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className={`
              absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg
              whitespace-nowrap pointer-events-none
              ${positionClasses.tooltip}
              ${contentClassName}
            `}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {content}
            
            {/* Arrow */}
            <div 
              className={`absolute w-0 h-0 ${positionClasses.arrow}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Rich Tooltip Component with custom content
export const RichTooltip = ({
  children,
  title,
  description,
  position = 'top',
  delay = 500,
  className = '',
  disabled = false
}) => {
  const content = (
    <div className="max-w-xs">
      {title && (
        <div className="font-semibold text-white mb-1">
          {title}
        </div>
      )}
      {description && (
        <div className="text-gray-200 text-xs">
          {description}
        </div>
      )}
    </div>
  );

  return (
    <Tooltip
      content={content}
      position={position}
      delay={delay}
      className={className}
      disabled={disabled}
      contentClassName="max-w-none"
    >
      {children}
    </Tooltip>
  );
};

// Info Tooltip Component
export const InfoTooltip = ({
  children,
  info,
  position = 'top',
  className = ''
}) => {
  return (
    <Tooltip
      content={info}
      position={position}
      className={`inline-flex items-center ${className}`}
      delay={200}
    >
      {children || (
        <div className="w-4 h-4 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs cursor-help">
          ?
        </div>
      )}
    </Tooltip>
  );
};

// Error Tooltip Component
export const ErrorTooltip = ({
  children,
  error,
  show = false,
  position = 'bottom'
}) => {
  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {show && error && (
          <motion.div
            className={`
              absolute z-50 px-3 py-2 text-sm text-white bg-red-600 rounded-lg shadow-lg
              whitespace-nowrap pointer-events-none mt-1
              ${position === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'}
            `}
            initial={{ opacity: 0, y: position === 'top' ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'top' ? 10 : -10 }}
            transition={{ duration: 0.2 }}
          >
            {error}
            
            {/* Arrow */}
            <div 
              className={`
                absolute w-0 h-0 left-1/2 transform -translate-x-1/2
                ${position === 'top' 
                  ? 'top-full border-t-red-600 border-t-4 border-x-transparent border-x-4'
                  : 'bottom-full border-b-red-600 border-b-4 border-x-transparent border-x-4'
                }
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
