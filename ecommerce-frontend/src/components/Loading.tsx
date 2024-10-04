// src/components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-b-4 border-transparent"></div>
    <span className="mt-4 text-xl text-gray-500">Loading...</span>
  </div>
);

export default Loading;

