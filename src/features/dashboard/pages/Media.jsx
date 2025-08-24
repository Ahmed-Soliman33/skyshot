import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../shared/hooks/useLanguage";
import {
  IconPhoto,
  IconVideo,
  IconFile,
  IconUpload,
  IconDownload,
  IconTrash,
  IconEye,
  IconSearch,
  IconFilter,
  IconGrid3x3,
  IconList,
  IconCalendar,
} from "@tabler/icons-react";

const Media = () => {
  const { t } = useTranslation("dashboard");
  const { formatDate } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Load media files from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setMedia(dummyMedia);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample media data - replace with API calls
  const dummyMedia = [
    {
      id: 1,
      name: "hero-image.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadedAt: "2024-01-15",
      url: "https://via.placeholder.com/400x300/032747/ffffff?text=Hero+Image",
      alt: "صورة البطل الرئيسية",
    },
    {
      id: 2,
      name: "product-demo.mp4",
      type: "video",
      size: "15.7 MB",
      duration: "2:34",
      uploadedAt: "2024-01-14",
      url: "https://via.placeholder.com/400x300/001d3d/ffffff?text=Video+Demo",
      alt: "فيديو تعريفي بالمنتج",
    },
    {
      id: 3,
      name: "company-logo.png",
      type: "image",
      size: "156 KB",
      dimensions: "512x512",
      uploadedAt: "2024-01-13",
      url: "https://via.placeholder.com/400x300/343a40/ffffff?text=Logo",
      alt: "شعار الشركة",
    },
    {
      id: 4,
      name: "user-manual.pdf",
      type: "document",
      size: "3.2 MB",
      pages: 24,
      uploadedAt: "2024-01-12",
      url: "https://via.placeholder.com/400x300/6a7282/ffffff?text=PDF+Document",
      alt: "دليل المستخدم",
    },
    {
      id: 5,
      name: "team-photo.jpg",
      type: "image",
      size: "1.8 MB",
      dimensions: "1600x900",
      uploadedAt: "2024-01-11",
      url: "https://via.placeholder.com/400x300/032747/ffffff?text=Team+Photo",
      alt: "صورة الفريق",
    },
    {
      id: 6,
      name: "presentation.pptx",
      type: "document",
      size: "8.5 MB",
      slides: 32,
      uploadedAt: "2024-01-10",
      url: "https://via.placeholder.com/400x300/6a7282/ffffff?text=Presentation",
      alt: "عرض تقديمي",
    },
  ];

  const filteredMedia = media.filter((item) => {
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "image":
        return IconPhoto;
      case "video":
        return IconVideo;
      case "document":
        return IconFile;
      default:
        return IconFile;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "image":
        return "text-green-500";
      case "video":
        return "text-blue-500";
      case "document":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  const handleUpload = () => {
    console.log("Upload new media");
  };

  const handleDelete = (item) => {
    if (window.confirm(t("messages.deleteConfirm"))) {
      setMedia((prev) => prev.filter((m) => m.id !== item.id));
    }
  };

  const handleDownload = (item) => {
    console.log("Download:", item.name);
  };

  const handleView = (item) => {
    console.log("View:", item.name);
    window.open(item.url, "_blank");
  };

  const MediaCard = ({ item }) => {
    const TypeIcon = getTypeIcon(item.type);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
      >
        <div className="group relative aspect-video bg-gray-100">
          {item.type === "image" ? (
            <img
              src={item.url}
              alt={item.alt}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <TypeIcon className={`h-16 w-16 ${getTypeColor(item.type)}`} />
            </div>
          )}

          {/* Overlay */}
          <div className="bg-opacity-0 group-hover:bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black transition-all duration-200">
            <div className="flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100 rtl:space-x-reverse">
              <button
                onClick={() => handleView(item)}
                className="rounded-full bg-white p-2 text-gray-700 hover:text-blue-600"
              >
                <IconEye className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDownload(item)}
                className="rounded-full bg-white p-2 text-gray-700 hover:text-green-600"
              >
                <IconDownload className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="rounded-full bg-white p-2 text-gray-700 hover:text-red-600"
              >
                <IconTrash className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="truncate font-medium text-gray-900">{item.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{item.alt}</p>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <TypeIcon className={`h-4 w-4 ${getTypeColor(item.type)}`} />
              <span>{item.size}</span>
            </div>
            <span>{formatDate(item.uploadedAt)}</span>
          </div>

          {item.dimensions && (
            <div className="mt-1 text-xs text-gray-500">{item.dimensions}</div>
          )}

          {item.duration && (
            <div className="mt-1 text-xs text-gray-500">
              المدة: {item.duration}
            </div>
          )}

          {(item.pages || item.slides) && (
            <div className="mt-1 text-xs text-gray-500">
              {item.pages ? `${item.pages} صفحة` : `${item.slides} شريحة`}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const MediaListItem = ({ item }) => {
    const TypeIcon = getTypeIcon(item.type);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md rtl:space-x-reverse"
      >
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
          {item.type === "image" ? (
            <img
              src={item.url}
              alt={item.alt}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <TypeIcon className={`h-8 w-8 ${getTypeColor(item.type)}`} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-gray-900">{item.name}</h3>
          <p className="truncate text-sm text-gray-500">{item.alt}</p>
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 rtl:space-x-reverse">
            <span>{item.size}</span>
            {item.dimensions && <span>{item.dimensions}</span>}
            {item.duration && <span>المدة: {item.duration}</span>}
            {item.pages && <span>{item.pages} صفحة</span>}
            {item.slides && <span>{item.slides} شريحة</span>}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500 rtl:space-x-reverse">
          <span>{formatDate(item.uploadedAt)}</span>
        </div>

        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => handleView(item)}
            className="p-2 text-gray-400 hover:text-blue-600"
          >
            <IconEye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDownload(item)}
            className="p-2 text-gray-400 hover:text-green-600"
          >
            <IconDownload className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="p-2 text-gray-400 hover:text-red-600"
          >
            <IconTrash className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 rounded-lg bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("navigation.media")}
          </h1>
          <p className="mt-1 text-gray-600">إدارة الصور والفيديوهات والملفات</p>
        </div>
        <button
          onClick={handleUpload}
          className="flex items-center space-x-2 rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-darkBlueColor)] rtl:space-x-reverse"
        >
          <IconUpload className="h-4 w-4" />
          <span>رفع ملفات</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الملفات
              </p>
              <p className="text-2xl font-bold text-gray-900">{media.length}</p>
            </div>
            <IconFile className="h-8 w-8 text-gray-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الصور</p>
              <p className="text-2xl font-bold text-green-600">
                {media.filter((m) => m.type === "image").length}
              </p>
            </div>
            <IconPhoto className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الفيديوهات</p>
              <p className="text-2xl font-bold text-blue-600">
                {media.filter((m) => m.type === "video").length}
              </p>
            </div>
            <IconVideo className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المستندات</p>
              <p className="text-2xl font-bold text-purple-600">
                {media.filter((m) => m.type === "document").length}
              </p>
            </div>
            <IconFile className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Search */}
            <div className="relative">
              <IconSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 rtl:right-3" />
              <input
                type="text"
                placeholder="البحث في الملفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-[var(--color-tertiaryColor)] rtl:pr-10 rtl:pl-4"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="all">جميع الأنواع</option>
              <option value="image">الصور</option>
              <option value="video">الفيديوهات</option>
              <option value="document">المستندات</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-lg p-2 ${viewMode === "grid" ? "bg-[var(--color-tertiaryColor)] text-white" : "text-gray-400 hover:text-gray-600"}`}
            >
              <IconGrid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-lg p-2 ${viewMode === "list" ? "bg-[var(--color-tertiaryColor)] text-white" : "text-gray-400 hover:text-gray-600"}`}
            >
              <IconList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredMedia.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredMedia.map((item) => (
              <MediaListItem key={item.id} item={item} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {filteredMedia.length === 0 && (
        <div className="py-12 text-center">
          <IconPhoto className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            لا توجد ملفات
          </h3>
          <p className="mb-4 text-gray-500">
            لم يتم العثور على ملفات تطابق البحث
          </p>
          <button
            onClick={handleUpload}
            className="rounded-lg bg-[var(--color-tertiaryColor)] px-4 py-2 text-white hover:bg-[var(--color-darkBlueColor)]"
          >
            رفع ملف جديد
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Media;
