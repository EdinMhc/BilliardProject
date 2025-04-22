export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const authData = localStorage.getItem('authData');
  const token = authData ? JSON.parse(authData).token : null;
  
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
    localStorage.removeItem('authData');
    window.location.href = '/';
    return response;
  }

  return response;
};