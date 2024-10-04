import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Implement form submission logic here (e.g., send data to your API)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Contact Us</h1>
        {submitted ? (
          <p className="text-lg text-green-600 text-center">Thank you for your message! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="message">
                Message:
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;

