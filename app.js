// --------------------
// Recipe Data
// --------------------
const recipes = [
  {
    id: 1,
    title: "Creamy Alfredo Pasta",
    time: 30,
    difficulty: "easy",
    description: "A quick and creamy pasta perfect for busy evenings.",
    category: "pasta",
  },
  {
    id: 2,
    title: "Classic Chicken Curry",
    time: 60,
    difficulty: "medium",
    description: "A rich and flavorful curry with aromatic spices.",
    category: "curry",
  },
  {
    id: 3,
    title: "Fresh Garden Salad",
    time: 15,
    difficulty: "easy",
    description: "A light and healthy salad with fresh veggies.",
    category: "salad",
  },
  {
    id: 4,
    title: "Beef Stroganoff",
    time: 70,
    difficulty: "hard",
    description: "A hearty dish with tender beef and creamy sauce.",
    category: "meat",
  },
  {
    id: 5,
    title: "Vegetable Stir Fry",
    time: 25,
    difficulty: "easy",
    description: "Quick stir-fried vegetables with soy sauce.",
    category: "vegetarian",
  },
  {
    id: 6,
    title: "Butter Chicken",
    time: 65,
    difficulty: "medium",
    description: "Creamy tomato-based Indian chicken curry.",
    category: "curry",
  },
  {
    id: 7,
    title: "Homemade Pizza",
    time: 90,
    difficulty: "hard",
    description: "From-scratch pizza with homemade dough.",
    category: "baking",
  },
  {
    id: 8,
    title: "Grilled Fish Fillet",
    time: 40,
    difficulty: "medium",
    description: "Perfectly grilled fish with herbs and lemon.",
    category: "seafood",
  },
];

// --------------------
// DOM Selection
// --------------------
const recipeContainer = document.querySelector("#recipe-container");

// --------------------
// State
// --------------------
let currentFilter = "all";
let currentSort = null;

// --------------------
// Create Recipe Card
// --------------------
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

// --------------------
// Render Recipes
// --------------------
const renderRecipes = (recipesArray) => {
  recipeContainer.innerHTML = recipesArray
    .map((recipe) => createRecipeCard(recipe))
    .join("");
};

// --------------------
// Pure Filter Function
// --------------------
const filterRecipes = (recipesArray, filter) => {
  if (filter === "easy" || filter === "medium" || filter === "hard") {
    return recipesArray.filter(
      (recipe) => recipe.difficulty === filter
    );
  }

  if (filter === "quick") {
    return recipesArray.filter((recipe) => recipe.time < 30);
  }

  return recipesArray;
};

// --------------------
// Pure Sort Function
// --------------------
const sortRecipes = (recipesArray, sortType) => {
  const copy = [...recipesArray];

  if (sortType === "name") {
    return copy.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sortType === "time") {
    return copy.sort((a, b) => a.time - b.time);
  }

  return copy;
};

// --------------------
// Central Update Function
// --------------------
const updateDisplay = () => {
  let updatedRecipes = filterRecipes(recipes, currentFilter);
  updatedRecipes = sortRecipes(updatedRecipes, currentSort);
  renderRecipes(updatedRecipes);
};

// --------------------
// Event Listeners
// --------------------
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    updateDisplay();
  });
});

document.querySelectorAll("[data-sort]").forEach((button) => {
  button.addEventListener("click", () => {
    currentSort = button.dataset.sort;
    updateDisplay();
  });
});

// --------------------
// Initial Load
// --------------------
updateDisplay();
