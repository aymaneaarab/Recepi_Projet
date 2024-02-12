import { useEffect } from "react";
import Recipe from "./Recipe";

export function RecipeList({
  query,
  recipes,
  setrecipes,
  selectrecipe,
  setabierto,
}) {
  useEffect(() => {
    const controller = new AbortController();
    const timefetching = setTimeout(() => {
      RecipeFetch();
    }, 5000);
    async function RecipeFetch() {
      try {
        const res = await fetch("http://localhost:9000/recipes", {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error("something wrong ");
        }

        const data = await res.json();
        console.log("type de chainement d api", data);
        if (data.response === false) {
          throw new Error("Recipe Not found");
        }

        setrecipes(data);
        // console.log("recipes", data.recipes);
      } catch (err) {
        console.log(err);
      }
    }
    if (!query.length || query.length < 1 || query === "") {
      setrecipes([]);
      return;
    }
    RecipeFetch();
    return function () {
      clearTimeout(timefetching);
      controller.abort();
    }; // component unmount
  }, [query, setrecipes]);

  function recipee(e) {
    e.preventDefault();
    setabierto(true);
  }
  return (
    <div className="bg-gray-100 rounded-xl text-green-600 overflow-auto p-4 border border-gray-400">
      <Recipe recipes={recipes} selectrecipe={selectrecipe} setabierto={setabierto}/>
    </div>
  );
}

