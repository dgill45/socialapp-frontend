import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`$process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, formData);
      
      // Handle successful login (e.g., storing token)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Login successful');
        router.push('/dashboard'); // Redirect to the dashboard after successful login
      }
    } catch (err) {
      console.error(err);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
