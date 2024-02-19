import React, { useState, useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { IoIosCloseCircleOutline } from 'react-icons/io'; // Import IoIosCloseCircleOutline from react-icons/io
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Aos from "aos";
import 'aos/dist/aos.css';

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
    const isRecipeInBookmarks = bookmarks.some(
      (bookmark) => bookmark.label === recipe.label
    );

    if (!isRecipeInBookmarks) {
      setBookmarks((prevBookmarks) => [...prevBookmarks, recipe]);

      toast.success(`Recipe "${recipe.label}" added to bookmarks!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
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
      <div style={{backgroundImage: 'linear-gradient(to bottom right, #66b539, #4b6a33)'} } className="p-16">
        <div className="bg-gray-100 h-screen container mx-auto  rounded-3xl">
          <Header
            query={query}
            setQuery={setQuery}
            handleViewBookmarksClick={handleViewBookmarksClick}
          />
  
          <div className="grid grid-cols-2 gap-4 h-4/5 mx-auto mt-8 p-4">
            <RecipeList
              query={query}
              recipes={recipes}
              setRecipes={setRecipes}
              selectRecipe={selectRecipe}
            />
  
            {showBookmarkList ? (
              
                <BookmarkList bookmarks={bookmarks} setBookmarks={setBookmarks} />
              
            ) : (
              <RecipeBoard
                selectedRecipeId={selectedId}
                addToBookmarkList={addToBookmarkList}
              />
            )}
          </div>
  
          <ToastContainer />
        </div>
      </div>
    );
  }

function Header({ query, setQuery, handleViewBookmarksClick }) {
  const [bookmarkClicked, setBookmarkClicked] = useState(false);

  const clickbookmark = () => {
    setBookmarkClicked(!bookmarkClicked);
    handleViewBookmarksClick();
  };

  return (
    <div className="bg-gray-200 flex justify-between items-center p-10  text-green-700 rounded-lg">
      <NavLink to="/">
        <div className="flex">
          <span className="text-xl mx-3">🥦</span>
          <p className="font-semibold tracking-widest font-mono justify-self-end text-2xl text-green-700"> RECEPI</p>
        </div>
      </NavLink>
      <div className="">
        <input
          type="text"
          className="placeholder-gray-400 rounded-full text-green-900 p-4 grow w-[32rem] focus:outline-none focus:ring focus:border-green-500 "
          placeholder="Search for a recipe"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="font-semibold">
        <div className="fflex cursor-pointer hover:bg-gray-300 hover:text-black p-2 rounded" onClick={clickbookmark}>
          {!bookmarkClicked ? (
            <CiBookmark className="bookmark" />
          ) : (
            <div>
              <FaBookmark className="bookmark" />
            </div>
          )}
          <pre className="font-semibold text-green-800 text-l">Saved Recipes</pre>
        </div>
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
    <div className="bg-white rounded-xl text-green-600 overflow-auto p-4 border border-gray-100">
      {recipes?.map((recipe, i) => (
        <div
          key={i}
          className="flex border border-b-1 bg-transparent gap-2 p-4 cursor-pointer hover:bg-gray-200"
          onClick={() => selectRecipe(recipe._links.self.href)}
        >
          <img
            src={recipe.recipe.image}
            alt={recipe.recipe.label}
            height="80px"
            width="80px"
            className="rounded"
          />

          <div className="text-green-600 p-4">
            <h3 className="text-lg font-extrabold">{recipe.recipe.label}</h3>
            <span>Author: {recipe.recipe.source}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecipeBoard({ selectedRecipeId, addToBookmarkList }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (selectedRecipeId) {
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
    }
  }, [selectedRecipeId]);

  const handleAddToBookmarkClick = () => {
    addToBookmarkList(data);
  };

  const handleClearRecipe = () => {
    setData(null);
  };

  return (
    <div className="bg-gray-100 rounded-xl text-green-600 overflow-auto p-4 border border-gray-200">
      {data && (
        <div data-aos="fade-left" data-aos-duration="1000">
        <div className="h-3/5">
          <img src={data?.image} alt={data?.label} className="rounded object-cover h-80 w-full" />
</div>
          <div className="mt-2">
            <h2 className="text-xl text-center text-white border bg-green-500 p-2">{data?.label}</h2>
            <p>{data?.description}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-xl text-black text-center mt-2 border border-b underline p-1">Ingredients:</h3>
            <ul className="text-right text-xl font-extrabold">
              {data?.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
          <center>
            <button
              className="bg-green-500 p-4 m-6 text-white text-center"
              onClick={handleAddToBookmarkClick}
            >
              Add to Bookmarks
            </button>
          </center>

          {/* Clear button */}
          <button
            className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-gray-200"
            onClick={handleClearRecipe}
          >
            <AiOutlineCloseCircle size={20} />
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
    <div className="bg-gray-100 rounded-xl text-green-600 overflow-auto p-4 border border-gray-400">
      {bookmarks.length === 0 && <h3 className="text-center font-extrabold text-2xl">Your bookmark list is empty !!!!!!!</h3>}
      {bookmarks.length > 0 && <h3 className="text-center font-extrabold text-2xl">Here are your saved recipes:</h3>}
      {bookmarks.map((recipe, i) => (
        <div data-aos="fade-down">
        <div key={i} className="flex border  border-b-1  bg-transparent gap-3 p-9">
          <div className="flex">
            <img
              src={recipe.image}
              alt={recipe.label}
              height="90px"
              width="90px"
              className="rounded"
            />

            <div className="flex flex-col">
              <div className="flex text-green-900 font-extrabold text-xl">
                <h3 className="text-xl ">{recipe.label}</h3>
              </div>

            </div>
          </div>

          <div className="flex items-center">
            <Popconfirm
              title="Delete Recipe"
              description="Are you sure you want to delete the recipe?"
              cancelText="Cancel"
              okText="Delete"
              onConfirm={() => handleRemoveClick(i)}
              okType="danger"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />} // Assuming QuestionCircleOutlined is defined
            >
              <button className="bg-red-500 text-gray-200 px-3 py-1  rounded hover:bg-gray-200">
                remove
              </button>
            </Popconfirm>
            <div>
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-gray-200 px-3 py-1 rounded hover:bg-gray-200 inline-block"
                >
                  view
                </a>
              </div>            
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}
