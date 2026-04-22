import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jt_user');
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {}
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('jt_users') || '[]');
    const u = users.find(x => x.email === email);
    if (!u) return { ok: false, msg: 'Пользователь не найден' };
    if (u.password !== btoa(password)) return { ok: false, msg: 'Неверный пароль' };
    const safe = { id: u.id, name: u.name, email: u.email, role: u.role, avatar: u.avatar, city: u.city, skills: u.skills || [] };
    localStorage.setItem('jt_user', JSON.stringify(safe));
    setUser(safe);
    return { ok: true, user: safe };
  };

  const register = (data) => {
    let users = JSON.parse(localStorage.getItem('jt_users') || '[]');
    if (users.find(x => x.email === data.email)) return { ok: false, msg: 'Email уже используется' };
    const u = { id: Date.now().toString(), ...data, password: btoa(data.password), avatar: data.avatar || '' };
    users.push(u);
    localStorage.setItem('jt_users', JSON.stringify(users));
    const safe = { id: u.id, name: u.name, email: u.email, role: u.role, avatar: u.avatar, city: u.city, skills: u.skills || [] };
    localStorage.setItem('jt_user', JSON.stringify(safe));
    setUser(safe);
    return { ok: true, user: safe };
  };

  const logout = () => {
    localStorage.removeItem('jt_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
