export const config = {
    api: {
      bodyParser: {
        sizeLimit: "5mb", // Accept large base64 images
      },
    },
  };
  
  export async function POST(req) {
    try {
      const { imageBase64 } = await req.json();
      const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
  
      if (!HUGGING_FACE_API_KEY) {
        throw new Error("Hugging Face API key is missing");
      }
  
      // Send image to Hugging Face image captioning model
      const response = await fetch("https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: imageBase64 }),
      });
  
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Hugging Face API error: ${errText}`);
      }
  
      const data = await response.json();
      const caption = data?.[0]?.generated_text || "food image";
  
      console.log("🧠 Caption from model:", caption);
  
      // Use caption to generate mock recipes (you can later use AI here too)
      const recipes = generateMockRecipes(caption);
  
      return new Response(JSON.stringify({ recipes }), { status: 200 });
    } catch (error) {
      console.error("API error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  
  function generateMockRecipes(caption) {
    // Basic keyword matching for mockup
    if (caption.toLowerCase().includes("pasta")) {
      return [
        {
          title: "Creamy Tomato Pasta",
          ingredients: ["200g pasta", "2 tomatoes", "1 onion", "2 garlic cloves", "Cream", "Salt", "Pepper"],
          steps: [
            "Boil the pasta in salted water until al dente.",
            "Sauté onion and garlic, add tomatoes and cook down.",
            "Add cream and mix with boiled pasta.",
            "Season and serve hot."
          ],
        },
      ];
    }
  
    return [
      {
        title: `Quick Dish Based on: ${caption}`,
        ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        steps: ["Step 1", "Step 2", "Step 3"],
      },
    ];
  }
  