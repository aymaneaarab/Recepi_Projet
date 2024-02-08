import React, { useState, useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const key = "cbed10cacb9c81e2a7e48b59678ca090";
const app_id = "b90b16e8";

export default function LayoutRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [showBookmarkList, setShowBookmarkList] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  function selectRecipe(id) {
    setSelectedId(id);
  }

  function addToBookmarkList(recipe) {
    const isRecipeInBookmarks = bookmarks.some((bookmark) => bookmark.label === recipe.label);

    if (!isRecipeInBookmarks) {
      setBookmarks((prevBookmarks) => [...prevBookmarks, recipe]);

      // Display a success message using toast
      toast.success(`Recipe "${recipe.label}" added to bookmarks!`, {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Display a message indicating the recipe is already in bookmarks
      toast.warn(`Recipe "${recipe.label}" is already in bookmarks.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  function handleViewBookmarksClick() {
    setShowBookmarkList(!showBookmarkList);
    setSelectedId("");
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecipes() {
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

    fetchRecipes();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="bg-green-100 h-screen">
      <Header query={query} setQuery={setQuery} handleViewBookmarksClick={handleViewBookmarksClick} />

      <div className="grid grid-cols-3 h-96 gap-9 my-8">
        <RecipeList query={query} recipes={recipes} setRecipes={setRecipes} selectRecipe={selectRecipe} />

        <div className="h-auto w-1 bg-slate-400 justify-self-center"></div>

        {showBookmarkList ? (
          <div className="bg-green-300 rounded-xl h-96 text-white overflow-scroll overflow-x-hidden mr-9 p-2">
            <BookmarkList bookmarks={bookmarks} setBookmarks={setBookmarks} />
          </div>
        ) : (
          <RecipeBoard selectedRecipeId={selectedId} addToBookmarkList={addToBookmarkList} />
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

function Header({ query, setQuery, handleViewBookmarksClick }) {
  return (
    <div className="bg-green-200 flex justify-between items-center p-5 rounded text-white content-center">
     <NavLink to="/" >

      <div className="flex">
        <span className="text-xl mx-3">🥦</span>
        <p className="font-semibold tracking-widest font-mono"> RECEPI</p>
      </div>
     </NavLink>
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

    async function fetchRecipes() {
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

    fetchRecipes();

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

function RecipeBoard({ selectedRecipeId, addToBookmarkList, setSelectedRecipe }) {
  const [data, setData] = useState();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecipeDetails() {
      try {
        const res = await fetch(selectedRecipeId, { signal: controller.signal });
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

    fetchRecipeDetails();

    return function () {
      controller.abort();
    };
  }, [selectedRecipeId]);

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

function BookmarkList({ bookmarks, setBookmarks }) {
  const handleRemoveClick = (index) => {
    const updatedBookmarks = [...bookmarks];
    updatedBookmarks.splice(index, 1);
    setBookmarks(updatedBookmarks);
  };

  return (
    <div className="bg-green-300 rounded-xl h-96 text-white p-2">
      {bookmarks.map((recipe, i) => (
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
          </div>

          <div className="flex items-center">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded mr-2"
              onClick={() => handleRemoveClick(i)}
            >
              Remove
            </button>
            {/* Replace 'url' with the actual property containing the recipe URL */}
            <a
              href={recipe.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                View
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
