const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to set auth token in localStorage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Helper function to remove auth token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('API Request:', url, options.method || 'GET');
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}. Make sure backend is running and route exists.`);
    }

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', response.status, data);
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    if (error.message) {
      throw error;
    }
    throw new Error('Network error. Please check if backend is running.');
  }
};

// Auth API
export const authAPI = {
  register: async (username, email, password) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  login: async (username, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  logout: () => {
    removeToken();
  },
};

// Products API
export const productsAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.search) queryParams.append('search', filters.search);

    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    return await apiRequest(endpoint);
  },

  getById: async (id) => {
    return await apiRequest(`/products/${id}`);
  },
};

// Orders API
export const ordersAPI = {
  create: async (orderData) => {
    return await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getMyOrders: async () => {
    return await apiRequest('/orders/my-orders');
  },

  getById: async (id) => {
    return await apiRequest(`/orders/${id}`);
  },

  updateStatus: async (id, status) => {
    return await apiRequest(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

// Cart API
export const cartAPI = {
  getCart: async () => {
    return await apiRequest('/cart');
  },

  addToCart: async (item) => {
    return await apiRequest('/cart/add', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  updateCartItem: async (itemId, quantity) => {
    return await apiRequest(`/cart/update/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  removeFromCart: async (itemId) => {
    return await apiRequest(`/cart/remove/${itemId}`, {
      method: 'DELETE',
    });
  },

  clearCart: async () => {
    return await apiRequest('/cart/clear', {
      method: 'DELETE',
    });
  },
};

// Reviews API
export const reviewsAPI = {
  getByProduct: async (productId) => {
    return await apiRequest(`/reviews/product/${productId}`);
  },

  getMyReviews: async () => {
    return await apiRequest('/reviews/my-reviews');
  },

  getById: async (id) => {
    return await apiRequest(`/reviews/${id}`);
  },

  create: async (productId, rating, comment) => {
    return await apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify({ productId, rating, comment }),
    });
  },

  update: async (reviewId, rating, comment) => {
    return await apiRequest(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify({ rating, comment }),
    });
  },

  delete: async (reviewId) => {
    return await apiRequest(`/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  },

  getProductRating: async (productId) => {
    return await apiRequest(`/reviews/product/${productId}/rating`);
  },
};

export { getToken, setToken, removeToken };

