import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [isAdmin, setIsAdmin] = useState(false);
=======
>>>>>>> d3d7d0bb7829220937f2ff7e27b803f909f55fc5

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const userData = decodeToken(token);
      if (userData && userData.exp > Date.now()) {
        setUser(userData);
<<<<<<< HEAD
        setIsAdmin(userData.role === 'admin');
      } else {
        localStorage.removeItem('authToken');
        setIsAdmin(false);
=======
      } else {
        localStorage.removeItem('authToken');
>>>>>>> d3d7d0bb7829220937f2ff7e27b803f909f55fc5
      }
    }
    setLoading(false);
  }, []);

  const generateToken = (userData) => {
    const payload = {
      ...userData,
      exp: Date.now() + 24 * 60 * 60 * 1000,
      iat: Date.now()
    };
    return btoa(JSON.stringify(payload));
  };

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  };

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
<<<<<<< HEAD
            name: user.name,
            role: email.includes('admin') ? 'admin' : 'user'
=======
            name: user.name
>>>>>>> d3d7d0bb7829220937f2ff7e27b803f909f55fc5
          };
          const token = generateToken(userData);
          localStorage.setItem('authToken', token);
          setUser({ ...userData, exp: Date.now() + 24 * 60 * 60 * 1000 });
<<<<<<< HEAD
          setIsAdmin(userData.role === 'admin');
=======
>>>>>>> d3d7d0bb7829220937f2ff7e27b803f909f55fc5
          resolve({ success: true });
        } else {
          reject({ message: 'Invalid email or password' });
        }
      }, 500);
    });
  };

  const register = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.find(u => u.email === email)) {
          reject({ message: 'Email already exists' });
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        const userData = {
          id: newUser.id,
          email: newUser.email,
<<<<<<< HEAD
          name: newUser.name,
          role: email.includes('admin') ? 'admin' : 'user'
=======
          name: newUser.name
>>>>>>> d3d7d0bb7829220937f2ff7e27b803f909f55fc5
        };
        const token = generateToken(userData);
        localStorage.setItem('authToken', token);
        setUser({ ...userData, exp: Date.now() + 24 * 60 * 60 * 1000 });
        resolve({ success: true });
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
<<<<<<< HEAD
    setIsAdmin(false);
  };

  const updateProfile = async (userData) => {
    return new Promise((resolve, reject) => {
      try {
        const token = generateToken(userData);
        localStorage.setItem('authToken', token);
        setUser(userData);
        resolve({ success: true });
      } catch (err) {
        reject({ message: 'Failed to update profile' });
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateProfile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
=======
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
>>>>>>> d3d7d0bb7829220937f2ff7e27b803f909f55fc5
