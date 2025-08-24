import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconInfo,
  IconAlertCircle
} from '@tabler/icons-react';

const Notification = ({ 
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose,
  position = 'top-right',
  showCloseButton = true,
  autoClose = true
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, autoClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <IconCheck className="w-5 h-5" />;
      case 'error':
        return <IconAlertCircle className="w-5 h-5" />;
      case 'warning':
        return <IconAlertTriangle className="w-5 h-5" />;
      case 'info':
      default:
        return <IconInfo className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          title: 'text-green-800',
          message: 'text-green-700'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'text-red-600',
          title: 'text-red-800',
          message: 'text-red-700'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          title: 'text-yellow-800',
          message: 'text-yellow-700'
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          title: 'text-blue-800',
          message: 'text-blue-700'
        };
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getAnimationVariants = () => {
    const isTop = position.includes('top');
    const isRight = position.includes('right');
    const isLeft = position.includes('left');
    const isCenter = position.includes('center');

    let x = 0;
    let y = 0;

    if (isTop) y = -100;
    else y = 100;

    if (isRight) x = 100;
    else if (isLeft) x = -100;
    else if (isCenter) x = 0;

    return {
      initial: { opacity: 0, x, y, scale: 0.9 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
      exit: { opacity: 0, x, y: y * 0.5, scale: 0.9 }
    };
  };

  const colors = getColors();
  const variants = getAnimationVariants();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 ${getPositionClasses()}`}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          <div className={`
            max-w-sm w-full ${colors.bg} ${colors.border} border rounded-lg shadow-lg p-4
            backdrop-blur-sm
          `}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${colors.icon}`}>
                {getIcon()}
              </div>
              
              <div className="ml-3 rtl:mr-3 rtl:ml-0 w-0 flex-1">
                {title && (
                  <h3 className={`text-sm font-medium ${colors.title}`}>
                    {title}
                  </h3>
                )}
                {message && (
                  <p className={`text-sm ${colors.message} ${title ? 'mt-1' : ''}`}>
                    {message}
                  </p>
                )}
              </div>
              
              {showCloseButton && (
                <div className="ml-4 rtl:mr-4 rtl:ml-0 flex-shrink-0">
                  <button
                    onClick={handleClose}
                    className={`
                      inline-flex rounded-md p-1.5 ${colors.icon} 
                      hover:bg-white hover:bg-opacity-20 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
                      transition-colors duration-200
                    `}
                  >
                    <IconX className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Progress bar for auto-close */}
            {autoClose && duration > 0 && (
              <motion.div
                className="mt-3 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className={`h-full ${
                    type === 'success' ? 'bg-green-600' :
                    type === 'error' ? 'bg-red-600' :
                    type === 'warning' ? 'bg-yellow-600' :
                    'bg-blue-600'
                  }`}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: duration / 1000, ease: 'linear' }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing notifications
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success: (title, message, options = {}) => 
      addNotification({ type: 'success', title, message, ...options }),
    error: (title, message, options = {}) => 
      addNotification({ type: 'error', title, message, ...options }),
    warning: (title, message, options = {}) => 
      addNotification({ type: 'warning', title, message, ...options }),
    info: (title, message, options = {}) => 
      addNotification({ type: 'info', title, message, ...options })
  };
};

// Notification Container Component
export const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => onRemove(notification.id)}
        />
      ))}
    </div>
  );
};

export default Notification;
