/* ===================================
   Tutorials Data
   =================================== */

const tutorials = [
  {
    id: 1,
    title: "Python Basics – Getting Started",
    description: "Your first steps in Python programming. Learn variables, data types, and syntax.",
    category: "python",
    level: "beginner",
    duration: "10:51",
    videoUrl: "https://youtu.be/u68yDCeYhsw"
  },
  {
    id: 2,
    title: "Python Loops",
    description: "Master Python lists and for/while loops.",
    category: "python",
    level: "beginner",
    duration: "12:26",
    videoUrl: "https://youtu.be/KeK274e7XrM"
  },
  {
    id: 3,
    title: "Functions in Python",
    description: "Learn functions, parameters, and return values.",
    category: "python",
    level: "beginner",
    duration: "18:09",
    videoUrl: "https://youtu.be/D8ISfPzOb2A"
  },
  {
    id: 4,
    title: "Python Dictionaries Explained",
    description: "Work with key-value pairs using dictionaries.",
    category: "python",
    level: "beginner",
    duration: "19:00",
    videoUrl: "https://youtu.be/Aozo6P-xUcg"
  },
  {
    id: 5,
    title: "Working with Files in Python",
    description: "Read and write files using Python.",
    category: "python",
    level: "intermediate",
    duration: "16:24",
    videoUrl: "https://youtu.be/eXB2-IrFtMc"
  },
  {
    id: 6,
    title: "Python OOP – Classes & Objects",
    description: "Introduction to Object-Oriented Programming in Python.",
    category: "python",
    level: "intermediate",
    duration: "12:17",
    videoUrl: "https://youtu.be/77KwYQry2_E"
  }
];

/* ===================================
   DOM Elements
   =================================== */

const tutorialsGrid = document.getElementById("tutorialsGrid");
const noResults = document.getElementById("noResults");

const categoryFilter = document.getElementById("categoryFilter");
const levelFilter = document.getElementById("levelFilter");
const searchInput = document.getElementById("searchInput");

/* ===================================
   Helpers
   =================================== */

function getYouTubeThumbnail(url) {
  const id = url.includes("youtu.be")
    ? url.split("youtu.be/")[1]
    : url.split("v=")[1];
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/* ===================================
   Create Tutorial Card
   =================================== */

function createTutorialCard(tutorial) {
  return `
    <div class="tutorial-card">
      <div class="tutorial-thumbnail">
        <img src="${getYouTubeThumbnail(tutorial.videoUrl)}" alt="${tutorial.title}">
      </div>

      <div class="tutorial-content">
        <div class="tutorial-meta">
          <span class="tutorial-tag">${tutorial.category.toUpperCase()}</span>
          <span class="tutorial-tag level-${tutorial.level}">
            ${tutorial.level.toUpperCase()}
          </span>
        </div>

        <h3 class="tutorial-title">${tutorial.title}</h3>
        <p class="tutorial-description">${tutorial.description}</p>

        <div class="tutorial-footer">
          <span class="tutorial-duration">⏱ ${tutorial.duration}</span>
          <a href="${tutorial.videoUrl}" target="_blank"
             class="btn btn-primary"
             style="padding:0.5rem 1rem;font-size:0.85rem;">
            Watch
          </a>
        </div>
      </div>
    </div>
  `;
}

/* ===================================
   Render Tutorials
   =================================== */

function renderTutorials(list) {
  if (!tutorialsGrid) return;

  if (list.length === 0) {
    tutorialsGrid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  tutorialsGrid.innerHTML = list.map(createTutorialCard).join("");
}

/* ===================================
   Filtering Logic (STATELESS)
   =================================== */

function filterTutorials() {
  const category = categoryFilter?.value || "all";
  const level = levelFilter?.value || "all";
  const search = searchInput?.value.toLowerCase() || "";

  const filtered = tutorials.filter(tutorial => {
    const matchesCategory =
      category === "all" || tutorial.category === category;

    const matchesLevel =
      level === "all" || tutorial.level === level;

    const matchesSearch =
      tutorial.title.toLowerCase().includes(search) ||
      tutorial.description.toLowerCase().includes(search);

    return matchesCategory && matchesLevel && matchesSearch;
  });

  renderTutorials(filtered);
}

/* ===================================
   Apply Filters From URL (FIXED)
   =================================== */

function applyFiltersFromURL() {
  if (!levelFilter || !categoryFilter || !searchInput) return;

  // Reset ALL filters first (IMPORTANT)
  categoryFilter.value = "all";
  levelFilter.value = "all";
  searchInput.value = "";

  const params = new URLSearchParams(window.location.search);
  let levelFromUrl = params.get("level");

  // Backward compatibility for old #advanced links
  if (!levelFromUrl && window.location.hash) {
    levelFromUrl = window.location.hash.replace("#", "");
  }

  if (levelFromUrl) {
    levelFilter.value = levelFromUrl;
  }

  filterTutorials();
}

/* ===================================
   Event Listeners
   =================================== */

if (categoryFilter) categoryFilter.addEventListener("change", filterTutorials);
if (levelFilter) levelFilter.addEventListener("change", filterTutorials);

let searchTimeout;
if (searchInput) {
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(filterTutorials, 300);
  });
}

/* ===================================
   Initial Load
   =================================== */

renderTutorials(tutorials);
applyFiltersFromURL();
