import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { X, ZoomIn, ZoomOut, RotateCw, Download, Share2 } from "lucide-react";

const FullscreenViewer = ({ isOpen, onClose, item }) => {
  const { t, i18n } = useTranslation("gallery");
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset values when item changes
  useEffect(() => {
    if (item) {
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [item]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
        case '0':
          handleReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = item.src;
    link.download = `skyshot-${item.id}-${item.title[lang].replace(/\s+/g, '-').toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title[lang],
          text: item.description[lang],
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
        onClick={onClose}
      >
        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="absolute top-0 left-0 right-0 z-10 p-4"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)" }}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Title */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg truncate">
                {item.title[lang]}
              </h3>
              <p className="text-gray-300 text-sm">
                {item.location[lang]} • {item.resolution}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 ml-4">
           
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all ml-2"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Image Container */}
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: position.x,
              y: position.y
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === 'video' ? (
              <video
                controls
                className="max-w-[90vw] max-h-[90vh] object-contain"
                poster={item.thumbnail}
                autoPlay={false}
              >
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={item.src}
                alt={item.title[lang]}
                className="max-w-[90vw] max-h-[90vh] object-contain select-none  "
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                style={{ 
                  userSelect: "none", 
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                  WebkitUserDrag: "none"
                }}
              />
            )}
          </motion.div>
        </div>

       
      </motion.div>
    </AnimatePresence>
  );
};

export default FullscreenViewer;
