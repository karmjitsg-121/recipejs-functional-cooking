(() => {
  /* =========================
     DATA
  ========================== */
  const recipes = [
    {
      id: 1,
      title: "Creamy Alfredo Pasta",
      time: 30,
      difficulty: "easy",
      description: "A quick and creamy pasta.",
      ingredients: ["Pasta", "Cream", "Garlic", "Cheese"],
      steps: [
        "Boil pasta",
        "Prepare sauce",
        {
          step: "Combine",
          substeps: ["Mix pasta with sauce", "Add cheese"]
        }
      ]
    },
    {
      id: 2,
      title: "Chicken Curry",
      time: 60,
      difficulty: "medium",
      description: "Rich Indian curry.",
      ingredients: ["Chicken", "Onion", "Spices"],
      steps: [
        "Marinate chicken",
        {
          step: "Cook curry",
          substeps: [
            "Fry onions",
            "Add spices",
            {
              step: "Simmer",
              substeps: ["Add chicken", "Cook till tender"]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Garden Salad",
      time: 15,
      difficulty: "easy",
      description: "Fresh veggie salad.",
      ingredients: ["Lettuce", "Tomato", "Cucumber"],
      steps: ["Chop vegetables", "Mix and serve"]
    },
    {
      id: 4,
      title: "Beef Stroganoff",
      time: 70,
      difficulty: "hard",
      description: "Creamy beef dish.",
      ingredients: ["Beef", "Mushroom", "Cream"],
      steps: ["Cook beef", "Prepare sauce", "Combine"]
    }
  ];

  /* =========================
     STATE
  ========================== */
  let currentFilter = "all";
  let currentSort = null;

  const recipeContainer = document.querySelector("#recipe-container");

  /* =========================
     RECURSIVE STEPS
  ========================== */
  const renderSteps = (steps) => `
    <ul>
      ${steps.map(step =>
        typeof step === "string"
          ? `<li>${step}</li>`
          : `<li>${step.step}${renderSteps(step.substeps)}</li>`
      ).join("")}
    </ul>
  `;

  /* =========================
     CARD TEMPLATE
  ========================== */
  const createRecipeCard = (recipe) => `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
      </div>
      <p>${recipe.description}</p>

      <div class="recipe-actions">
        <button data-action="steps">Show Steps</button>
        <button data-action="ingredients">Show Ingredients</button>
      </div>

      <div class="recipe-details steps">
        <h4>Steps</h4>
        ${renderSteps(recipe.steps)}
      </div>

      <div class="recipe-details ingredients">
        <h4>Ingredients</h4>
        <ul>
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

  /* =========================
     FILTER & SORT
  ========================== */
  const filterRecipes = (list) => {
    if (currentFilter === "quick") return list.filter(r => r.time < 30);
    if (["easy","medium","hard"].includes(currentFilter))
      return list.filter(r => r.difficulty === currentFilter);
    return list;
  };

  const sortRecipes = (list) => {
    const copy = [...list];
    if (currentSort === "name")
      return copy.sort((a,b) => a.title.localeCompare(b.title));
    if (currentSort === "time")
      return copy.sort((a,b) => a.time - b.time);
    return copy;
  };

  const updateDisplay = () => {
    let updated = filterRecipes(recipes);
    updated = sortRecipes(updated);
    recipeContainer.innerHTML = updated.map(createRecipeCard).join("");
  };

  /* =========================
     EVENTS (DELEGATION)
  ========================== */
  document.addEventListener("click", (e) => {
    if (e.target.dataset.filter) {
      currentFilter = e.target.dataset.filter;
      updateDisplay();
    }

    if (e.target.dataset.sort) {
      currentSort = e.target.dataset.sort;
      updateDisplay();
    }

    if (e.target.dataset.action) {
      const card = e.target.closest(".recipe-card");
      const section = card.querySelector("." + e.target.dataset.action);
      section.style.display =
        section.style.display === "block" ? "none" : "block";
    }
  });

  /* =========================
     INIT
  ========================== */
  updateDisplay();
})();
