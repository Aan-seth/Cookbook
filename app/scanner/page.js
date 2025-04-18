'use client';
import { useState } from 'react';

export default function Scanner() {
  const [image, setImage] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
      setRecipes([]); // Clear previous results
      setError('');
    }
  };

  const fetchRecipes = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch recipes');
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Scan Your Ingredients</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Upload a photo of your ingredients, and we'll suggest delicious recipes powered by AI!
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {image && (
        <img
          src={image}
          alt="Selected ingredients"
          className="w-64 h-64 object-cover rounded-lg shadow mb-4"
        />
      )}

      <button
        onClick={fetchRecipes}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded-lg mb-6 hover:bg-green-700 transition"
      >
        {loading ? 'Scanning...' : 'Scan Image'}
      </button>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      <div className="w-full max-w-2xl space-y-6">
        {recipes.map((recipe, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md text-left"
          >
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <h3 className="font-medium">Ingredients:</h3>
            <ul className="list-disc list-inside mb-2 text-sm">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
            <h3 className="font-medium">Steps:</h3>
            <ol className="list-decimal list-inside text-sm">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
