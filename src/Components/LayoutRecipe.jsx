import { useState, useEffect } from "react";

const key = "cbed10cacb9c81e2a7e48b59678ca090";
const app_id = "b90b16e8";

export default function LayoutRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState("");
  const [showBookmarkList, setShowBookmarkList] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);

  function selectRecipe(id) {
    setSelectedId(id);
  }

  function addToBookmarkList(recipe) {
    setBookmarkList((prevList) => [...prevList, { ...recipe, id: Math.random() }]);
  }

  function handleViewBookmarksClick() {
    setShowBookmarkList(true);
  }

  function removeFromBookmarkList(recipe) {
    setBookmarkList((prevList) => prevList.filter((r) => r.id !== recipe.id));
  }

  return (
    <div className="bg-green-100 h-screen">
      <Header query={query} setQuery={setQuery} handleViewBookmarksClick={handleViewBookmarksClick} />

      <div className="grid grid-cols-3 h-96 gap-9 my-8">
        {showBookmarkList ? (
          <BookmarkList bookmarkList={bookmarkList} removeFromBookmarkList={removeFromBookmarkList} />
        ) : (
          <>
            <RecipeList
              query={query}
              recipes={recipes}
              setRecipes={setRecipes}
              selectRecipe={selectRecipe}
            />

            <div className="h-auto w-1 bg-slate-400 justify-self-center"></div>

            <RecipeBoard selectedRecipe={selectedId} addToBookmarkList={addToBookmarkList} />

            <Footer addToBookmarkList={() => addToBookmarkList(selectedRecipe)} />
          </>
        )}
      </div>
    </div>
  );
}

function Header({ query, setQuery, handleViewBookmarksClick }) {
  return (
    <div className="bg-green-200 flex justify-between items-center p-5 rounded text-white content-center">
      <div className="flex">
        <span className="text-xl mx-3">🥦</span>
        <p className="font-semibold tracking-widest font-mono"> Recipe</p>
      </div>
      <div className="">
        <input
          type="text"
          className="bg-green-300 placeholder-white rounded p-2"
          placeholder="Search for a recipe"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="font-semibold">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleViewBookmarksClick}
        >
          View Bookmarks
        </button>
      </div>
    </div>
  );
}

function RecipeList({ query, recipes, setRecipes, selectRecipe }) {
  useEffect(() => {
    const controller = new AbortController();

    async function recipeFetch() {
      try {
        const res = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=${query}&app_id=${app_id}&app_key=${key}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await res.json();

        if (data.response === false) {
          throw new Error("Recipe not found");
        }

        setRecipes(data.hits);
      } catch (err) {
        console.log(err);
      }
    }

    if (!query.length) {
      setRecipes([]);
      return;
    }

    recipeFetch();

    return function () {
      controller.abort();
    };
  }, [query, setRecipes]);

  return (
    <div className="bg-green-300 rounded-xl h-96 text-white overflow-auto ml-16 p-2">
      {recipes?.map((recipe, i) => (
        <div
          key={i}
          className="flex border border-b-1 bg-transparent gap-2 p-9"
          onClick={() => selectRecipe(recipe._links.self.href)}
        >
          <img
            src={recipe.recipe.image}
            alt={recipe.recipe.label}
            height="60px"
            width="70px"
            className="rounded"
          />

          <div className="text-white">
            <h3>{recipe.recipe.label}</h3>
            <span>Author: {recipe.recipe.source}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecipeBoard({ selectedRecipe, addToBookmarkList }) {
  const [data, setData] = useState();

  useEffect(() => {
    const controller = new AbortController();

    async function recipeFetch() {
      try {
        const res = await fetch(selectedRecipe, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Failed to fetch recipe details");
        }

        const data = await res.json();
        if (data.response === false) {
          throw new Error("Recipe details not found");
        }

        setData(data?.recipe);
      } catch (err) {
        console.log(err);
      }
    }

    recipeFetch();

    return function () {
      controller.abort();
    };
  }, [selectedRecipe]);

  const handleAddToBookmarkClick = () => {
    addToBookmarkList(data);
  };

  return (
    <div className="bg-green-300 rounded-xl h-96 text-white overflow-scroll overflow-x-hidden mr-9 p-2">
      {data && (
        <div>
          <img src={data?.image} alt={data?.label} className="rounded" />

          <div className="mt-2">
            <h2>{data?.label}</h2>
            <p>{data?.description}</p>
          </div>

          <div className="mt-4">
            <h3>Ingredients:</h3>
            <ul>
              {data?.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
          </div>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleAddToBookmarkClick}
          >
            Add to Bookmarks
          </button>
        </div>
      )}
    </div>
  );
}

function Footer({ addToBookmarkList }) {
  return (
    <div className="col-span-3 flex justify-center mt-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => addToBookmarkList()}
      >
        Select
      </button>
    </div>
  );
}

function BookmarkList({ bookmarkList, removeFromBookmarkList }) {
  return (
    <div className="bg-green-300 rounded-xl h-96 text-white overflow-auto ml-16 p-2">
      {bookmarkList.map((recipe, i) => (
        <div key={i} className="flex border border-b-1 bg-transparent gap-2 p-9">
          <img
            src={recipe.image}
            alt={recipe.label}
            height="60px"
            width="70px"
            className="rounded"
          />

          <div className="text-white">
            <h3>{recipe.label}</h3>
            <span>Author: {recipe.source}</span>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => removeFromBookmarkList(recipe)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
