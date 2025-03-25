export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('authToken');
    
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      return response;
    }
  
    return response;
  };