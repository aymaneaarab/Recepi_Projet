import { useState } from "react";
// import "./App.css";
import { useEffect } from "react";
const key = "cbed10cacb9c81e2a7e48b59678ca090	";
const app_id = "b90b16e8";

export default function LayoutRecipe() {
  const [recipes, setrecipes] = useState();
  const [selectedId, setselectedId] = useState("");
  const [query, setquery] = useState("");
  function selectrecipe(id) {
    setselectedId(id);
  }

  return (
    <div className="bg-green-100 h-screen">
      <Header query={query} setquery={setquery} />
      <div className="grid grid-cols-3 h-96 gap-9 my-8">
        <RecipeList
          query={query}
          recipes={recipes}
          setrecipes={setrecipes}
          selectrecipe={selectrecipe}
        />
        <div className="h-auto w-1 bg-slate-400 justify-self-center"></div>
        <RecipeBoard selectedrecipe={selectedId} />
      </div>
    </div>
  );
}

function Header({ query, setquery }) {
  return (
    <div className="bg-green-200	flex justify-between items-center p-5 rounded text-white content-center   ">
      <div className="flex">
        <span className="text-xl mx-3">🥦</span>
        <p className="font-semibold tracking-widest font-mono"> Recipe</p>
      </div>
      <div className="">
        <input
          type="text"
          className=" bg-green-300 placeholder-white rounded p-2  "
          placeholder="Search for a recipe"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
      </div>
      <div className="font-semibold">Recipe found :</div>
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
          throw new Error("something wrong ");
        }

        const data = await res.json();
        console.log("type de chainement d api", data);
        if (data.response === false) {
          throw new Error("Recipe Not found");
        }

        setrecipes(data.hits);
        console.log("recipes", data.hits);
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
  }, [query,setrecipes]);

  return (
    <div className=" bg-green-300 rounded-xl h-96 text-white overflow-auto  ml-16 p-2 ">
      {recipes?.map((recipe, i) => (
        <div
          key={i}
          className=" flex border  border-b-1  bg-transparent gap-2 p-9 "
          onClick={() => selectrecipe(recipe._links.self.href)}
        >
          {console.log(recipe)}
          <img
            src={recipe.recipe.image}
            alt={recipe.recipe.label}
            height="60px"
            width="70px"
            className="rounded"
          />

          <div className="text-white">
            <h3>{recipe.recipe.label}</h3>
            <span>Author:{recipe.recipe.source}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// RecipeBoard Component
function RecipeBoard({ selectedrecipe }) {
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

  return (
    <div className="bg-green-300 rounded-xl h-96 text-white overflow-scroll overflow-x-hidden mr-9 p-2">
      {data && (
        <div>
          {/* Recipe image */}
          <img src={data?.image} alt={data?.label} className="rounded" />

          {/* Description */}
          <div className="mt-2">
            <h2>{data?.label}</h2>
            <p>{data?.description}</p>
          </div>

          {/* Ingredients */}
          <div className="mt-4">
            <h3>Ingredients:</h3>
            <ul>
              {data?.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
