// File: app/unit-converter/page.tsx (Corrected Code)
'use client';

import { useState, useEffect } from 'react';
// CORRECTED PATH: We need to go up two directories to find the file.
import convertersData from '../../converters.json';

// Data structures
interface Unit {
  name: string;
  symbol: string;
  factor: number;
  type?: string;
  offset?: number;
}

interface Category {
  name: string;
  units: Unit[];
}

export default function UnitConverterPage() {
  const [inputValue, setInputValue] = useState(1);
  const [outputValue, setOutputValue] = useState(0);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');

  useEffect(() => {
    setCategories(convertersData.categories);
    const initialCategory = convertersData.categories[0];
    if (initialCategory) {
      setCurrentCategory(initialCategory);
    }
  }, []);

  useEffect(() => {
    if (currentCategory) {
      setUnits(currentCategory.units);
      if (currentCategory.units.length >= 2) {
        setFromUnit(currentCategory.units[0].symbol);
        setToUnit(currentCategory.units[1].symbol);
      }
    }
  }, [currentCategory]);

  // Calculation Logic
  useEffect(() => {
    if (!currentCategory || !fromUnit || !toUnit) return;

    const fromUnitData = currentCategory.units.find(u => u.symbol === fromUnit);
    const toUnitData = currentCategory.units.find(u => u.symbol === toUnit);

    if (fromUnitData && toUnitData) {
      let result = 0;
      // Special calculation for Temperature
      if (fromUnitData.type === 'temperature' && toUnitData.type === 'temperature') {
        let valueInCelsius = inputValue;
        if (fromUnitData.symbol === '°F') {
          valueInCelsius = (inputValue - 32) * 5/9;
        } else if (fromUnitData.symbol === 'K') {
          valueInCelsius = inputValue - 273.15;
        }
        
        if (toUnitData.symbol === '°F') {
          result = (valueInCelsius * 9/5) + 32;
        } else if (toUnitData.symbol === 'K') {
          result = valueInCelsius + 273.15;
        } else {
          result = valueInCelsius;
        }
      } else { // Standard calculation for all other units
        const baseValue = inputValue * fromUnitData.factor;
        result = baseValue / toUnitData.factor;
      }
      setOutputValue(result);
    }
  }, [inputValue, fromUnit, toUnit, currentCategory]);

  const handleCategoryChange = (categoryName: string) => {
    const newCategory = categories.find(c => c.name === categoryName);
    if (newCategory) {
      setCurrentCategory(newCategory);
    }
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Smart output formatting
  const formatOutput = (value: number) => {
    if (value === 0) return '0';
    if (Math.abs(value) < 0.0001 || Math.abs(value) > 1e9) {
        return value.toExponential(4);
    }
    return parseFloat(value.toFixed(4)).toString();
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Unit Converter</h1>
        
        <div className="mb-6">
          <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            id="category-select"
            value={currentCategory?.name || ''}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
          >
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {units.map(unit => <option key={unit.symbol} value={unit.symbol}>{unit.symbol}</option>)}
            </select>
          </div>

          <div className="flex justify-center my-2">
            <button
              onClick={handleSwapUnits}
              className="p-2 bg-white hover:bg-gray-100 border rounded-full transition text-gray-600 focus:ring-2 focus:ring-indigo-500"
              title="Swap units"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={formatOutput(outputValue)}
              className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg text-lg font-semibold"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {units.map(unit => <option key={unit.symbol} value={unit.symbol}>{unit.symbol}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
