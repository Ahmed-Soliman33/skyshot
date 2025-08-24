import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language || 'en';
  const isRTL = currentLanguage === 'ar';
  const isLTR = currentLanguage === 'en';

  const changeLanguage = useCallback((lng) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
  }, [currentLanguage, changeLanguage]);

  const getDirection = useCallback(() => {
    return isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  const getTextAlign = useCallback(() => {
    return isRTL ? 'right' : 'left';
  }, [isRTL]);

  const getOppositeAlign = useCallback(() => {
    return isRTL ? 'left' : 'right';
  }, [isRTL]);

  const formatNumber = useCallback((number) => {
    return new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-EG' : 'en-US').format(number);
  }, [currentLanguage]);

  const formatCurrency = useCallback((amount, currency = 'USD') => {
    return new Intl.NumberFormat(currentLanguage === 'ar' ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }, [currentLanguage]);

  const formatDate = useCallback((date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    return new Intl.DateTimeFormat(
      currentLanguage === 'ar' ? 'ar-EG' : 'en-US',
      { ...defaultOptions, ...options }
    ).format(new Date(date));
  }, [currentLanguage]);

  const formatRelativeTime = useCallback((date) => {
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now - targetDate) / 1000);

    if (diffInSeconds < 60) {
      return t('common.justNow', 'Just now');
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return t('common.minutesAgo', '{{count}} minutes ago', { count: minutes });
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return t('common.hoursAgo', '{{count}} hours ago', { count: hours });
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return t('common.daysAgo', '{{count}} days ago', { count: days });
    }
  }, [t]);

  return {
    currentLanguage,
    isRTL,
    isLTR,
    changeLanguage,
    toggleLanguage,
    getDirection,
    getTextAlign,
    getOppositeAlign,
    formatNumber,
    formatCurrency,
    formatDate,
    formatRelativeTime,
    t,
  };
};
