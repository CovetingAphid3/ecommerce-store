// src/components/CategoryFilter.tsx
import React from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="relative">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full sm:w-48 p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
};

export default CategoryFilter;

