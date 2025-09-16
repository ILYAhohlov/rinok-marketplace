import React, { useState } from 'react';
import '../styles/components.css';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Простая проверка
    const adminLogin = process.env.REACT_APP_ADMIN_LOGIN || 'glavadmin';
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || '55555';
    
    if (credentials.login === adminLogin && credentials.password === adminPassword) {
      onLogin();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="card admin-login-card">
        <h2 style={{ marginBottom: '24px' }}>Вход в админ панель</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Логин"
              className="input"
              value={credentials.login}
              onChange={(e) => setCredentials({...credentials, login: e.target.value})}
              required
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="Пароль"
              className="input"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          
          {error && (
            <div style={{ 
              color: '#dc3545', 
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Войти
          </button>
        </form>
        
        <div style={{ 
          marginTop: '20px', 
          fontSize: '12px', 
          color: '#666',
          background: '#f8f9fa',
          padding: '10px',
          borderRadius: '4px'
        }}>
          <strong>Тестовые данные:</strong><br/>
          Логин: glavadmin<br/>
          Пароль: 55555
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;