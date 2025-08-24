import { apiService } from "@utils/apiService";

/**
 * Dashboard API Service
 * Handles all API calls for dashboard data using native fetch API
 * No external HTTP client dependencies required
 */

// Dashboard Overview APIs
export const dashboardApi = {
  // Get dashboard statistics
  getStats: async () => {
    try {
      const response = await apiService.get("/dashboard/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },

  // Get sales data for charts
  getSalesData: async (period = "7d") => {
    try {
      const response = await apiService.get(
        `/dashboard/sales?period=${period}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching sales data:", error);
      throw error;
    }
  },

  // Get user growth data
  getUserGrowthData: async (period = "7d") => {
    try {
      const response = await apiService.get(
        `/dashboard/users/growth?period=${period}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user growth data:", error);
      throw error;
    }
  },

  // Get recent activities
  getRecentActivities: async (limit = 10) => {
    try {
      const response = await apiService.get(
        `/dashboard/activities?limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recent activities:", error);
      throw error;
    }
  },
};

// Pages Management APIs
export const pagesApi = {
  // Get all pages
  getPages: async (params = {}) => {
    try {
      const response = await apiService.get("/pages", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }
  },

  // Get single page
  getPage: async (id) => {
    try {
      const response = await apiService.get(`/pages/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching page:", error);
      throw error;
    }
  },

  // Create new page
  createPage: async (pageData) => {
    try {
      const response = await apiService.post("/pages", pageData);
      return response.data;
    } catch (error) {
      console.error("Error creating page:", error);
      throw error;
    }
  },

  // Update page
  updatePage: async (id, pageData) => {
    try {
      const response = await apiService.put(`/pages/${id}`, pageData);
      return response.data;
    } catch (error) {
      console.error("Error updating page:", error);
      throw error;
    }
  },

  // Delete page
  deletePage: async (id) => {
    try {
      const response = await apiService.delete(`/pages/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting page:", error);
      throw error;
    }
  },
};

// Blog Management APIs
export const blogApi = {
  // Get all blog posts
  getPosts: async (params = {}) => {
    try {
      const response = await apiService.get("/blog/posts", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }
  },

  // Get single blog post
  getPost: async (id) => {
    try {
      const response = await apiService.get(`/blog/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw error;
    }
  },

  // Create new blog post
  createPost: async (postData) => {
    try {
      const response = await apiService.post("/blog/posts", postData);
      return response.data;
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  },

  // Update blog post
  updatePost: async (id, postData) => {
    try {
      const response = await apiService.put(`/blog/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error("Error updating blog post:", error);
      throw error;
    }
  },

  // Delete blog post
  deletePost: async (id) => {
    try {
      const response = await apiService.delete(`/blog/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting blog post:", error);
      throw error;
    }
  },
};

// Media Management APIs
export const mediaApi = {
  // Get all media files
  getMedia: async (params = {}) => {
    try {
      const response = await apiService.get("/media", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching media:", error);
      throw error;
    }
  },

  // Upload media file
  uploadMedia: async (formData) => {
    try {
      const response = await apiService.post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading media:", error);
      throw error;
    }
  },

  // Delete media file
  deleteMedia: async (id) => {
    try {
      const response = await apiService.delete(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting media:", error);
      throw error;
    }
  },
};

// Users Management APIs
export const usersApi = {
  // Get all admins
  getAdmins: async (params = {}) => {
    try {
      const response = await apiService.get("/users/admins", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching admins:", error);
      throw error;
    }
  },

  // Get all customers
  getCustomers: async (params = {}) => {
    try {
      const response = await apiService.get("/users/customers", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await apiService.post("/users", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await apiService.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await apiService.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

// Orders Management APIs
export const ordersApi = {
  // Get all orders
  getOrders: async (params = {}) => {
    try {
      const response = await apiService.get("/orders", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Get single order
  getOrder: async (id) => {
    try {
      const response = await apiService.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    try {
      const response = await apiService.patch(`/orders/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // Get orders statistics
  getOrdersStats: async (period = "30d") => {
    try {
      const response = await apiService.get(`/orders/stats?period=${period}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders stats:", error);
      throw error;
    }
  },
};

// Services Management APIs
export const servicesApi = {
  // Get all services
  getServices: async (params = {}) => {
    try {
      const response = await apiService.get("/services", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  },

  // Create new service
  createService: async (serviceData) => {
    try {
      const response = await apiService.post("/services", serviceData);
      return response.data;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  },

  // Update service
  updateService: async (id, serviceData) => {
    try {
      const response = await apiService.put(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  },

  // Delete service
  deleteService: async (id) => {
    try {
      const response = await apiService.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  },
};

// Profile Management APIs
export const profileApi = {
  // Get current user profile
  getProfile: async () => {
    try {
      const response = await apiService.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  // Update profile information
  updateProfile: async (profileData) => {
    try {
      console.log({ profileData });
      const response = await apiService.put("/auth/editMe", profileData, {});
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  // Upload avatar
  uploadAvatar: async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await apiService.post("/auth/upload-avatar", formData);
      return response.data;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await apiService.put(
        "/auth/change-password",
        passwordData,
      );
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },

  // Send email verification
  sendEmailVerification: async () => {
    try {
      const response = await apiService.post("/auth/send-verification");
      return response.data;
    } catch (error) {
      console.error("Error sending email verification:", error);
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (token, userId) => {
    try {
      const response = await apiService.post("/auth/verify-email", {
        token,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error("Error verifying email:", error);
      throw error;
    }
  },

  // Deactivate account
  deactivateAccount: async () => {
    try {
      const response = await apiService.delete("/auth/deactivateMyAccount");
      return response.data;
    } catch (error) {
      console.error("Error deactivating account:", error);
      throw error;
    }
  },

  // Get user statistics (uploads, earnings, etc.)
  getUserStats: async () => {
    try {
      const response = await apiService.get("/users/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  },

  // Get user uploads
  getUserUploads: async (params = {}) => {
    try {
      const response = await apiService.get("/uploads/my-uploads", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching user uploads:", error);
      throw error;
    }
  },

  // Get user orders
  getUserOrders: async (params = {}) => {
    try {
      const response = await apiService.get("/orders", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  },

  // Update notification preferences
  updateNotificationPreferences: async (preferences) => {
    try {
      const response = await apiService.put(
        "/auth/notification-preferences",
        preferences,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      throw error;
    }
  },

  // Update privacy settings
  updatePrivacySettings: async (settings) => {
    try {
      const response = await apiService.put("/auth/privacy-settings", settings);
      return response.data;
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      throw error;
    }
  },
};

export default {
  dashboard: dashboardApi,
  pages: pagesApi,
  blog: blogApi,
  media: mediaApi,
  users: usersApi,
  orders: ordersApi,
  services: servicesApi,
  profile: profileApi,
};
