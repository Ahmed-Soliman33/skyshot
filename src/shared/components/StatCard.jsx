import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus
} from '@tabler/icons-react';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'increase', // 'increase', 'decrease', 'neutral'
  icon: Icon, 
  color = 'blue',
  loading = false,
  className = ''
}) => {
  const { formatNumber, isRTL } = useLanguage();

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'text-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    },
    red: {
      bg: 'bg-red-50',
      icon: 'text-red-500',
      gradient: 'from-red-500 to-red-600'
    },
    gray: {
      bg: 'bg-gray-50',
      icon: 'text-gray-500',
      gradient: 'from-gray-500 to-gray-600'
    }
  };

  const changeTypeClasses = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const ChangeIcon = {
    increase: IconTrendingUp,
    decrease: IconTrendingDown,
    neutral: IconMinus
  }[changeType];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { delay: 0.2, type: 'spring', stiffness: 200 }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-24 h-8 bg-gray-200 rounded mb-2"></div>
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div
          variants={iconVariants}
          className={`w-12 h-12 ${colorClasses[color].bg} rounded-lg flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 ${colorClasses[color].icon}`} />
        </motion.div>
        
        {change && (
          <div className={`flex items-center space-x-1 rtl:space-x-reverse ${changeTypeClasses[changeType]}`}>
            <ChangeIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' ? formatNumber(value) : value}
        </h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>

      {/* Gradient line at bottom */}
      <div className={`mt-4 h-1 bg-gradient-to-r ${colorClasses[color].gradient} rounded-full`}></div>
    </motion.div>
  );
};

export default StatCard;
