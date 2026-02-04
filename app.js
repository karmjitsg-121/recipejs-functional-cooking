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
    },
    {
      id: 2,
      title: "Chicken Curry",
      time: 60,
      difficulty: "medium",
      description: "Rich Indian curry.",
      ingredients: ["Chicken", "Onion", "Spices"],
    },
    {
      id: 3,
      title: "Garden Salad",
      time: 15,
      difficulty: "easy",
      description: "Fresh veggie salad.",
      ingredients: ["Lettuce", "Tomato", "Cucumber"],
    },
    {
      id: 4,
      title: "Beef Stroganoff",
      time: 70,
      difficulty: "hard",
      description: "Creamy beef dish.",
      ingredients: ["Beef", "Mushroom", "Cream"],
    },
  ];

  /* =========================
     STATE
  ========================== */
  let currentFilter = "all";
  let currentSort = null;
  let searchTerm = "";
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const recipeContainer = document.querySelector("#recipe-container");
  const counter = document.querySelector("#counter");
  const searchInput = document.querySelector("#search");

  /* =========================
     CARD TEMPLATE
  ========================== */
  const createRecipeCard = (r) => `
    <div class="recipe-card">
      <span
        class="favorite ${favorites.includes(r.id) ? "active" : ""}"
        data-fav="${r.id}"
      >❤️</span>

      <h3>${r.title}</h3>

      <div class="recipe-meta">
        <span>⏱️ ${r.time} min</span>
        <span class="difficulty ${r.difficulty}">
          ${r.difficulty}
        </span>
      </div>

      <p>${r.description}</p>
    </div>
  `;

  /* =========================
     FILTER / SORT / SEARCH
  ========================== */
  const applyAll = (list) => {
    let result = [...list];

    if (currentFilter === "favorites") {
      result = result.filter(r => favorites.includes(r.id));
    } else if (["easy","medium","hard"].includes(currentFilter)) {
      result = result.filter(r => r.difficulty === currentFilter);
    } else if (currentFilter === "quick") {
      result = result.filter(r => r.time < 30);
    }

    if (searchTerm) {
      result = result.filter(r =>
        r.title.toLowerCase().includes(searchTerm) ||
        r.ingredients.join(" ").toLowerCase().includes(searchTerm)
      );
    }

    if (currentSort === "name") {
      result.sort((a,b) => a.title.localeCompare(b.title));
    }

    if (currentSort === "time") {
      result.sort((a,b) => a.time - b.time);
    }

    return result;
  };

  /* =========================
     RENDER
  ========================== */
  const updateDisplay = () => {
    const visible = applyAll(recipes);
    recipeContainer.innerHTML = visible.map(createRecipeCard).join("");
    counter.textContent = `Showing ${visible.length} of ${recipes.length} recipes`;
  };

  /* =========================
     EVENTS
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

    if (e.target.dataset.fav) {
      const id = Number(e.target.dataset.fav);
      favorites = favorites.includes(id)
        ? favorites.filter(f => f !== id)
        : [...favorites, id];

      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateDisplay();
    }
  });

  /* =========================
     SEARCH (DEBOUNCE)
  ========================== */
  let debounceTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchTerm = e.target.value.toLowerCase();
      updateDisplay();
    }, 300);
  });

  /* =========================
     INIT
  ========================== */
  updateDisplay();
})();
