import { useState, useEffect } from "react";

const key = "cbed10cacb9c81e2a7e48b59678ca090";
const app_id = "b90b16e8";

export default function LayoutRecipe() {
  const [recipes, setrecipes] = useState([]);
  const [selectedId, setselectedId] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setquery] = useState("");
  const [showBookmarkList, setShowBookmarkList] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);

  function selectrecipe(id) {
    setselectedId(id);
  }

  function addToBookmarkList(recipe) {
    setBookmarkList((prevList) => [...prevList, recipe]);
  }

  function handleViewBookmarksClick() {
    setShowBookmarkList(true);
  }

  return (
    <div className="bg-green-100 h-screen">
      <Header
        query={query}
        setquery={setquery}
        handleViewBookmarksClick={handleViewBookmarksClick}
      />

      <div className="grid grid-cols-3 h-96 gap-9 my-8">
        {showBookmarkList ? (
          <BookmarkList bookmarkList={bookmarkList} />
        ) : (
          <>
            <RecipeList
              query={query}
              recipes={recipes}
              setrecipes={setrecipes}
              selectrecipe={selectrecipe}
            />

            <div className="h-auto w-1 bg-slate-400 justify-self-center"></div>

            <RecipeBoard selectedrecipe={selectedId} addToBookmarkList={addToBookmarkList} />

            <Footer addToBookmarkList={() => addToBookmarkList(selectedRecipe)} />
          </>
        )}
      </div>
    </div>
  );
}

function Header({ query, setquery, handleViewBookmarksClick }) {
  return (
    <div className="bg-green-200 flex justify-between items-center p-5 rounded text-white content-center">
      <div className="flex">
        <span className="text-xl mx-3">🥦</span>
        <p className="font-semibold tracking-widest font-mono"> RECEPI</p>
      </div>
      <div className="">
        <input
          type="text"
          className="bg-green-300 placeholder-white rounded p-2"
          placeholder="Search for a recipe"
          value={query}
          onChange={(e) => setquery(e.target.value)}
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

function RecipeList({ query, recipes, setrecipes, selectrecipe }) {
  useEffect(() => {
    const controller = new AbortController();

    async function RecipeFetch() {
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

        setrecipes(data.hits);
      } catch (err) {
        console.log(err);
      }
    }

    if (!query.length) {
      setrecipes([]);
      return;
    }

    RecipeFetch();

    return function () {
      controller.abort();
    };
  }, [query, setrecipes]);

  return (
    <div className="bg-green-300 rounded-xl h-96 text-white overflow-auto ml-16 p-2">
      {recipes?.map((recipe, i) => (
        <div
          key={i}
          className="flex border border-b-1 bg-transparent gap-2 p-9"
          onClick={() => selectrecipe(recipe._links.self.href)}
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

function RecipeBoard({ selectedrecipe, addToBookmarkList }) {
  const [data, setdata] = useState();

  useEffect(() => {
    const controller = new AbortController();

    async function RecipeFetch() {
      try {
        const res = await fetch(selectedrecipe, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Failed to fetch recipe details");
        }

        const data = await res.json();
        if (data.response === false) {
          throw new Error("Recipe details not found");
        }

        setdata(data?.recipe);
      } catch (err) {
        console.log(err);
      }
    }

    RecipeFetch();

    return function () {
      controller.abort();
    };
  }, [selectedrecipe]);

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
        onClick={addToBookmarkList}
      >
        Select
      </button>
    </div>
  );
}

function BookmarkList({ bookmarkList }) {
  return (
    <div className="bg-green-300 rounded-xl h-96 text-white overflow-auto ml-16 p-2">
      {bookmarkList.map((recipe, i) => (
        <div key={i} className="flex border border-b-1 bg-transparent gap-2 p-9">
          <img src={recipe.image} alt={recipe.label} height="60px" width="70px" className="rounded" />

          <div className="text-white">
            <h3>{recipe.label}</h3>
            <span>Author: {recipe.source}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

