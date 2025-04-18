import Hero from "@/components/Hero";
import RecipeCard from "@/components/RecipeCard";

const sampleRecipes = [
  {
    title: "Creamy Chicken Pasta",
    image: "/pasta.jpg",
    description: "A rich and creamy delight ready in under 30 minutes.",
  },
  {
    title: "Grilled Chicken",
    image: "/chicken.jpg",
    description: "Juicy and smoky grilled chicken with herbs.",
  },
  {
    title: "Chocolate Cake",
    image: "/cake.jpg",
    description: "A moist chocolate cake for all your sweet cravings.",
  },
];

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {sampleRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
