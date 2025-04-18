import Image from "next/image";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={300}
        height={200}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-600">{recipe.title}</h3>
        <p className="text-sm text-gray-600">{recipe.description}</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;