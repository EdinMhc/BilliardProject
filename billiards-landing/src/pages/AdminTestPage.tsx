import { useState, useEffect } from 'react';
import { useAuth } from '../components/Utilities/authContext';

const AdminTestPage = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tokenDetails, setTokenDetails] = useState('');

  useEffect(() => {
    // Display stored token for debugging
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setTokenDetails(`Token exists (${storedToken.slice(0, 10)}...)`);
    } else {
      setTokenDetails('No token found');
    }
  }, [token]);

  const testAdminEndpoint = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7044/api/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        alert(`API call successful! Data: ${JSON.stringify(data)}`);
      } else {
        const errorData = await response.text();
        alert(`API call failed: ${errorData || response.status}`);
      }
    } catch (error) {
      alert(`API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin API Test</h1>
      <p>Token status: {tokenDetails}</p>
      <button 
        onClick={testAdminEndpoint} 
        disabled={!token || loading}
        style={{
          padding: '10px 20px',
          background: token ? '#3182ce' : '#cccccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: token ? 'pointer' : 'not-allowed'
        }}
      >
        {loading ? 'Testing...' : 'Test Admin Endpoint'}
      </button>
    </div>
  );
};

export default AdminTestPage;