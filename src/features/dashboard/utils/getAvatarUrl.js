export const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return null;

  // If it's already a full URL (like Google avatar)
  if (avatarPath.startsWith("http")) {
    return avatarPath;
  }

  // If it's a local path, prepend the backend URL
  return `${import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000"}${avatarPath}`;
};
