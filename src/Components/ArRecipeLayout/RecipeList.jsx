import { useEffect } from "react";

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
    <div className=" bg-green-300 rounded-xl h-96 text-white overflow-auto  mx-16 p-2 ">
      {recipes?.map((recipe, i) => (
        <div
          key={i}
          className=" flex border  border-b-1  bg-transparent gap-3 p-9 "
          onClick={() => {
            selectrecipe(recipe.recipe.recipe_id);
            setabierto(true);
          }}
        >
          {console.log(recipe)}
          <img
            src={recipe.recipe.image_url}
            alt={recipe.recipe.title}
            height="60px"
            width="70px"
            className="rounded"
          />

          <div className="text-white">
            <h3>{recipe.recipe.title}</h3>
            {/* <span>{recipe.recipe.publisher}:الكاتب</span> */}
          </div>
        </div>
      ))}
    </div>
  );
}
