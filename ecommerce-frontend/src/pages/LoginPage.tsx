import React, { useState } from 'react';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Determines if the form is for login or signup
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const body = { Email: email, Passwod: password };
        try {
            if (isLogin) {
                // Handle login
                const response = await axios.post('http://localhost:8000/users/login', body);
                if (response.status === 200) {
                    setSuccessMessage('Login successful!');
                    // Redirect or perform further actions after successful login
                }
            } else {
                // Handle signup
                const response = await axios.post('http://localhost:8000/users/signup', body);
                if (response.status === 200) {
                    setSuccessMessage('Signup successful! You can now log in.');
                    setIsLogin(true); // Switch to login form
                }
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label className="mb-2">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </label>
                <label className="mb-2">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </label>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p className="mt-4">
                {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline ml-1">
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default LoginPage;

