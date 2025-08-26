import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Video,
  Download,
  Play,
  X,
  Eye,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingCart,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import SeoHelmet from "@components/SeoHelmet";
import { galleryItems } from "../data/galleryItems.js";
import LoginModal from "../components/LoginModal";
import FullscreenViewer from "../components/FullscreenViewer";



const Gallery = () => {
  const { t, i18n } = useTranslation("gallery");
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";

  // State management
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFullscreenViewer, setShowFullscreenViewer] = useState(false);
  const [fullscreenItem, setFullscreenItem] = useState(null);
  const [purchaseItem, setPurchaseItem] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    type: 'all',
    location: 'all',
    category: 'all',
    priceRange: [0, 1000],
    sortBy: 'featured'
  });

  // Get filtered and sorted items
  const getFilteredItems = () => {
    let items = [...galleryItems];

    // Apply filters
    if (filters.type !== 'all') {
      items = items.filter(item => {
        if (filters.type === 'images') return item.type === 'image';
        if (filters.type === 'videos') return item.type === 'video';
        return item.type === filters.type;
      });
    }

    if (filters.location !== 'all') {
      items = items.filter(item =>
        item.location[lang] === filters.location ||
        item.location[lang === 'ar' ? 'en' : 'ar'] === filters.location
      );
    }

    if (filters.category !== 'all') {
      items = items.filter(item =>
        item.category[lang] === filters.category ||
        item.category[lang === 'ar' ? 'en' : 'ar'] === filters.category
      );
    }

    // Price range filter
    items = items.filter(item =>
      item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
    );

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      items = items.filter(item =>
        item.title[lang].toLowerCase().includes(search) ||
        item.description[lang].toLowerCase().includes(search) ||
        item.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }

    // Sort items
    switch (filters.sortBy) {
      case 'newest':
        items.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
        break;
      case 'oldest':
        items.sort((a, b) => new Date(a.datePublished) - new Date(b.datePublished));
        break;
      case 'priceLowToHigh':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
        items.sort((a, b) => b.featured - a.featured);
        break;
      default:
        break;
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  // Get unique locations and categories for filters
  const getUniqueLocations = () => {
    return [...new Set(galleryItems.map(item => item.location[lang]))].sort();
  };

  const getUniqueCategories = () => {
    return [...new Set(galleryItems.map(item => item.category[lang]))].sort();
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      type: 'all',
      location: 'all',
      category: 'all',
      priceRange: [0, 1000],
      sortBy: 'featured'
    });
    setSearchTerm('');
  };

  // Handle purchase - opens login modal
  const handlePurchase = (item) => {
    setPurchaseItem(item);
    setShowLoginModal(true);
  };

  // Handle add to cart - opens login modal
  const handleAddToCart = (item) => {
    setPurchaseItem(item);
    setShowLoginModal(true);
  };

  // Handle view fullscreen
  const handleViewFullscreen = (item) => {
    setFullscreenItem(item);
    setShowFullscreenViewer(true);
  };

  // Handle login success
  const handleLoginSuccess = (userData, item) => {
    if (item) {
      // Simulate purchase/add to cart process
      setTimeout(() => {
        alert(lang === "ar"
          ? `تم بنجاح! ${item.title[lang]} - ${item.price} ${item.currency}`
          : `Success! ${item.title[lang]} - ${item.price} ${item.currency}`
        );
      }, 500);
    }
  };

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-primaryColor, #212529)" }}
      dir={dir}
    >
      <SeoHelmet
        title={t("hero.title")}
        description={t("hero.description")}
        keywords="gallery, photography, drone, aerial, Saudi Arabia, Skyshot"
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-primaryColor)]"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-16 w-16 border-4 border-[var(--color-tertiaryColor)] border-t-transparent rounded-full mx-auto mb-4"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[var(--color-primaryTextColor)] text-lg"
              >
                {t("loading.loadingGallery")}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Section */}
      <div className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            {/* Featured Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: "var(--color-tertiaryColor, #032747)",
                color: "#60a5fa",
              }}
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-blue-400"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {lang === "ar" ? "معرض مميز" : "Featured Gallery"}
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
              className="mb-4 text-4xl font-bold sm:text-6xl lg:text-7xl"
              style={{
                background: dir === "rtl"
                  ? "linear-gradient(135deg, var(--color-tertiaryColor) 0%, var(--color-primaryTextColor) 100%)"
                  : "linear-gradient(135deg, var(--color-primaryTextColor) 0%, var(--color-tertiaryColor) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-2xl text-base text-gray-400 md:text-lg lg:text-xl"
            >
              {t("hero.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Advanced Filters & Search */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-2xl p-6 sm:p-8 shadow-md"
          style={{ backgroundColor: "var(--color-secondaryColor, #343a40)" }}
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-primaryTextColor)]/60 h-5 w-5" />
              <input
                type="text"
                placeholder={t("filters.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[var(--color-primaryColor)]/50 border border-[var(--color-primaryTextColor)]/20 rounded-xl text-[var(--color-primaryTextColor)] placeholder-[var(--color-primaryTextColor)]/60 focus:outline-none focus:border-[var(--color-tertiaryColor)] focus:ring-2 focus:ring-[var(--color-tertiaryColor)]/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Type Filter */}
            <div className="flex gap-3 flex-wrap">
              {["all", "images", "videos"].map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFilterChange('type', type)}
                  className={`px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
                    filters.type === type
                      ? "shadow-lg"
                      : "border border-gray-600 hover:border-blue-400"
                  }`}
                  style={{
                    backgroundColor: filters.type === type
                      ? "var(--color-tertiaryColor, #032747)"
                      : "transparent"
                  }}
                >
                  {type === "all" ? t("filters.all") :
                   type === "images" ? t("filters.images") :
                   t("filters.videos")}
                </motion.button>
              ))}
            </div>

            {/* Advanced Filters Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg border border-gray-600 hover:border-blue-400 transition-all duration-300"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? t("filters.hideFilters") : t("filters.showFilters")}
            </motion.button>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-[var(--color-primaryTextColor)]/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-primaryTextColor)]/80 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {t("filters.location")}
                    </label>
                    <select
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--color-primaryColor)]/50 border border-[var(--color-primaryTextColor)]/20 rounded-lg text-[var(--color-primaryTextColor)] focus:outline-none focus:border-[var(--color-tertiaryColor)] focus:ring-2 focus:ring-[var(--color-tertiaryColor)]/20"
                    >
                      <option value="all">{t("filters.allLocations")}</option>
                      {getUniqueLocations().map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-primaryTextColor)]/80 mb-2">
                      <Filter className="inline h-4 w-4 mr-1" />
                      {t("filters.category")}
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--color-primaryColor)]/50 border border-[var(--color-primaryTextColor)]/20 rounded-lg text-[var(--color-primaryTextColor)] focus:outline-none focus:border-[var(--color-tertiaryColor)] focus:ring-2 focus:ring-[var(--color-tertiaryColor)]/20"
                    >
                      <option value="all">{t("filters.allCategories")}</option>
                      {getUniqueCategories().map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-primaryTextColor)]/80 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      {t("filters.sortBy")}
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--color-primaryColor)]/50 border border-[var(--color-primaryTextColor)]/20 rounded-lg text-[var(--color-primaryTextColor)] focus:outline-none focus:border-[var(--color-tertiaryColor)] focus:ring-2 focus:ring-[var(--color-tertiaryColor)]/20"
                    >
                      <option value="featured">{t("filters.featured")}</option>
                      <option value="newest">{t("filters.newest")}</option>
                      <option value="oldest">{t("filters.oldest")}</option>
                      <option value="priceLowToHigh">{t("filters.priceLowToHigh")}</option>
                      <option value="priceHighToLow">{t("filters.priceHighToLow")}</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="mt-4 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-6 py-2 bg-[var(--color-redColor)]/20 text-[var(--color-redColor)] rounded-lg hover:bg-[var(--color-redColor)]/30 transition-all duration-300"
                  >
                    {t("filters.clearFilters")}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[var(--color-primaryTextColor)]/70 text-center"
        >
          {filteredItems.length === 0
            ? t("loading.noResults")
            : lang === "ar"
              ? `${filteredItems.length} عنصر موجود`
              : `${filteredItems.length} items found`
          }
        </motion.p>
      </div>

      {/* Enhanced Gallery Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-12">
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("loading.noResults")}
            </h3>
            <p className="text-gray-400 mb-6">
              {t("loading.tryDifferentFilter")}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-6 py-3 text-white rounded-xl font-medium transition-all duration-300"
              style={{ backgroundColor: "var(--color-tertiaryColor, #032747)" }}
            >
              {t("filters.clearFilters")}
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                style={{
                  backgroundColor: "var(--color-secondaryColor, #343a40)",
                  // aspectRatio: item.type === 'video' ? '4/3' : '4/3'
                }}
                onClick={() => setSelectedItem(item)}
              >
                {/* Premium Badge */}
                {item.premium && (
                  <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-xs font-bold text-amber-950"
                       style={{ backgroundColor: "#fbbf24" }}>
                    {t("mediaViewer.premium")}
                  </div>
                )}

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 text-white"
                       style={{ backgroundColor: "var(--color-tertiaryColor, #032747)" }}>
                    ⭐ {t("mediaViewer.featured")}
                  </div>
                )}

                {/* Image/Video Preview */}
                <div className="relative w-full h-full overflow-hidden">
                  {item.type === 'video' ? (
                    <div className="relative w-full h-full">
                      <img
                        src={item.thumbnail}
                        alt={item.title[lang]}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Video Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 bg-gradient-to-r from-[var(--color-tertiaryColor)] to-[var(--color-darkBlueColor)] rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Play className="w-6 h-6 text-[var(--color-primaryTextColor)] ml-1" />
                        </motion.div>
                      </div>
                      {/* Video Badge */}
                      <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 text-white backdrop-blur-sm"
                           style={{ backgroundColor: "rgba(3, 39, 71, 0.8)" }}>
                        <Video className="w-3 h-3" />
                        {t("filters.videos")}
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={item.src}
                        alt={item.title[lang]}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Photo Badge */}
                      <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 text-white backdrop-blur-sm"
                           style={{ backgroundColor: "rgba(3, 39, 71, 0.8)" }}>
                        <Camera className="w-3 h-3" />
                        {t("filters.images")}
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay with Details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-[var(--color-primaryTextColor)] font-bold text-lg mb-2 line-clamp-2">
                        {item.title[lang]}
                      </h3>

                      {/* Location and Price */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-[var(--color-primaryTextColor)]/80 text-sm">
                          <MapPin className="w-3 h-3" />
                          {item.location[lang]}
                        </div>
                        <div className="flex items-center gap-1 text-[var(--color-sunsetGold)] font-bold text-sm">
                          <DollarSign className="w-3 h-3" />
                          {item.price} {item.currency}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1 text-[var(--color-primaryTextColor)]/60 text-xs mb-3">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.datePublished).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                      </div>

                      {/* Action Buttons */}
                      <div className="md:flex hidden items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 py-2 px-3 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center gap-1 text-sm"
                          style={{ backgroundColor: "var(--color-tertiaryColor, #032747)" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewFullscreen(item);
                          }}
                        >
                          <Eye className="w-3 h-3" />
                          {lang === "ar" ? "عرض كامل" : "View Full"}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg transition-all duration-200 text-amber-950"
                          style={{ backgroundColor: "#fbbf24" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePurchase(item);
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Lightbox Modal */}
    <AnimatePresence>
  {selectedItem && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-md"
      onClick={() => setSelectedItem(null)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="relative max-h-[95vh] max-w-7xl w-full bg-gradient-to-br from-[var(--color-secondaryColor)] to-[var(--color-primaryColor)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-primaryTextColor)]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedItem(null)}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full text-[var(--color-primaryTextColor)] hover:bg-black/70 transition-all duration-200"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        {/* Premium/Featured Badges */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 flex gap-1 sm:gap-2">
          {selectedItem.premium && (
            <div className="bg-gradient-to-r from-[var(--color-sunsetGold)] to-[var(--color-yellowColor)] text-[var(--color-primaryColor)] px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
              {t("mediaViewer.premium")}
            </div>
          )}
          {selectedItem.featured && (
            <div className="bg-[var(--color-tertiaryColor)] text-[var(--color-primaryTextColor)] px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
              ⭐ {t("mediaViewer.featured")}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row max-h-[95vh]">
          {/* Media Preview */}
          <div className="lg:w-2/3 relative flex-shrink-0 min-h-0">
            {selectedItem.type === 'video' ? (
              <div className="h-[35vh] sm:h-[45vh] lg:h-[85vh] flex items-center justify-center">
                <video
                  controls
                  className="w-full h-full object-contain"
                  poster={selectedItem.thumbnail}
                  autoPlay={false}
                >
                  <source src={selectedItem.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="h-[35vh] sm:h-[45vh] lg:h-[85vh] flex items-center justify-center">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title[lang]}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Enhanced Item Details */}
          <div className="lg:w-1/3 p-3 sm:p-4 lg:p-6 flex flex-col bg-gradient-to-b from-[var(--color-secondaryColor)]/50 to-[var(--color-primaryColor)]/50 backdrop-blur-sm min-h-0">
            {/* Type Badge */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              {selectedItem.type === 'video' ? (
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-tertiaryColor)]" />
              ) : (
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-tertiaryColor)]" />
              )}
              <span className="text-[var(--color-tertiaryColor)] font-semibold text-sm sm:text-base">
                {selectedItem.type === 'video' ? t("filters.videos") : t("filters.images")}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--color-primaryTextColor)] mb-2 sm:mb-3 leading-tight">
              {selectedItem.title[lang]}
            </h2>

            {/* Description - Compact */}
            <p className="text-[var(--color-primaryTextColor)]/80 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-2">
              {selectedItem.description[lang]}
            </p>

            {/* Details Grid - Compact */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-shrink-0">
              <div className="flex items-center justify-between py-1.5 border-b border-[var(--color-primaryTextColor)]/10">
                <span className="text-[var(--color-primaryTextColor)]/60 flex items-center gap-1.5 text-xs sm:text-sm">
                  <MapPin className="w-3 h-3" />
                  {t("mediaViewer.location")}
                </span>
                <span className="text-[var(--color-primaryTextColor)] font-medium text-xs sm:text-sm">
                  {selectedItem.location[lang]}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[var(--color-primaryTextColor)]/10">
                <span className="text-[var(--color-primaryTextColor)]/60 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Filter className="w-3 h-3" />
                  {t("mediaViewer.category")}
                </span>
                <span className="text-[var(--color-primaryTextColor)] font-medium text-xs sm:text-sm">
                  {selectedItem.category[lang]}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[var(--color-primaryTextColor)]/10">
                <span className="text-[var(--color-primaryTextColor)]/60 flex items-center gap-1.5 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3" />
                  {t("mediaViewer.datePublished")}
                </span>
                <span className="text-[var(--color-primaryTextColor)] font-medium text-xs sm:text-sm">
                  {new Date(selectedItem.datePublished).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[var(--color-primaryTextColor)]/10">
                <span className="text-[var(--color-primaryTextColor)]/60 text-xs sm:text-sm">
                  {t("mediaViewer.resolution")}
                </span>
                <span className="text-[var(--color-primaryTextColor)] font-medium text-xs sm:text-sm">
                  {selectedItem.resolution}
                </span>
              </div>

              {/* Price Display */}
              <div className="flex items-center justify-between py-2 sm:py-3 bg-gradient-to-r from-[var(--color-tertiaryColor)]/20 to-[var(--color-darkBlueColor)]/20 rounded-lg px-3">
                <span className="text-[var(--color-primaryTextColor)]/80 flex items-center gap-1.5 text-xs sm:text-sm">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                  {t("mediaViewer.price")}
                </span>
                <span className="text-[var(--color-sunsetGold)] font-bold text-base sm:text-lg">
                  {selectedItem.price} {selectedItem.currency}
                </span>
              </div>
            </div>

            {/* Action Buttons - Compact */}
            <div className="space-y-2 mt-auto flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePurchase(selectedItem)}
                className="w-full py-2.5 sm:py-3 px-4 rounded-lg font-bold text-sm sm:text-base text-amber-950 transition-all duration-300 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#fbbf24" }}
              >
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                {t("mediaViewer.buyNow")}
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleViewFullscreen(selectedItem)}
                  className="flex-1 py-2 sm:py-2.5 px-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                  style={{ backgroundColor: "var(--color-tertiaryColor, #032747)" }}
                >
                  <Eye className="w-3 h-3" />
                  {t("mediaViewer.viewFullSize")}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(selectedItem)}
                  className="flex-1 py-2 sm:py-2.5 px-3 rounded-lg font-semibold text-white border border-gray-600 hover:border-blue-400 transition-all duration-300 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
                >
                  <ShoppingCart className="w-3 h-3" />
                  {t("mediaViewer.addToCart")}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPurchaseItem(null);
        }}
        onSuccess={handleLoginSuccess}
        purchaseItem={purchaseItem}
      />

      {/* Fullscreen Viewer */}
      <FullscreenViewer
        isOpen={showFullscreenViewer}
        onClose={() => {
          setShowFullscreenViewer(false);
          setFullscreenItem(null);
        }}
        item={fullscreenItem}
      />
    </div>
  );
};

export default Gallery;

