import { useState } from "react";
// import "./App.css";
import { useEffect } from "react";
const key = "cbed10cacb9c81e2a7e48b59678ca090	";
const app_id = "b90b16e8";

export default function ArRecipe() {
useEffect(()=>{
  setTimeout(() => {
    
  }, 5000);
},[])



  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState();
  let searchedRecipes = recipes?.filter((r)=>r?.recipe.title.includes(query) );
  if (query===""){
    searchedRecipes =[]
  }


  const [selectedId, setselectedId] = useState("");
  function selectrecipe(id) {
    setselectedId(id);
  }

  return (
    <div className="bg-green-100 h-screen">
      <Header query={query} setquery={setquery} />
      <div className="grid grid-cols-3 h-96 gap-9 my-8">
        <RecipeBoard selectedrecipe={selectedId} />
        <div className="h-auto w-1 bg-slate-400 justify-self-center"></div>
        <RecipeList
          query={query}
          recipes={searchedRecipes}
          setrecipes={setrecipes}
          selectrecipe={selectrecipe}
        />
      </div>
    </div>
  );
}

function Header({ query, setquery }) {
  return (
    <div className="bg-green-200	flex justify-between items-center p-5 rounded text-white content-center   ">
      <div className="flex">
        {/* <span className="text-xl mx-3">🥦</span>
        <p className="font-semibold tracking-widest font-mono"> Recipe</p>
       */}
       
      </div>
      <div className="">
        <input
          type="text"
          className=" bg-green-300 placeholder-white rounded p-2  "
          placeholder="ابحث عن وصفة "
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
      </div>
      <div className="flex">
        <span className="text-xl mx-3">🥦</span>
        <p className="font-semibold tracking-widest font-mono"> Recipe</p>
      </div>    </div>
  );
}
function RecipeList({ query, recipes, setrecipes, selectrecipe }) {
  useEffect(() => {
    const controller = new AbortController();
   const timefetching = setTimeout(()=>{RecipeFetch()}, 5000);
    async function RecipeFetch() {
      try {
        const res = await fetch(
         "http://localhost:9000/recipes"   ,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("something wrong ");
        }

        const data = await res.json();
        // console.log("type de chainement d api", data);
        if (data.response === false) {
          throw new Error("Recipe Not found");
        }

        setrecipes(data.recipes);
        // console.log("recipes", data.recipes);
      } catch (err) {
        console.log(err);
      }
    }
    if (!query.length || query.length<1 || query==="") {
      setrecipes([]);
      return;
    }
    RecipeFetch();
    return function () {
      clearTimeout(timefetching);
      controller.abort();
    }; // component unmount
  }, [query,setrecipes]);

  return (
    <div className=" bg-green-300 rounded-xl h-96 text-white overflow-auto  ml-16 p-2 ">
      {recipes?.map((recipe, i) => (
        <div
          key={i}
          className=" flex border  border-b-1  bg-transparent gap-2 p-9 "
          onClick={() => selectrecipe(recipe._links.self.href)}
        >
          {/* {console.log(recipe)} */}
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

function RecipeBoard({ selectedrecipe }) {
  const [data, setdata] = useState();
  // useEffect(() => {
  //   const controller = new AbortController();
  //   async function RecipeFetch() {
  //     try {
  //       const res = await fetch(selectedrecipe, { signal: controller.signal });
  //       if (!res.ok) {
  //         throw new Error("something wrong ");
  //       }

  //       const data = await res.json();
  //       console.log("type de chainement d api", data);
  //       if (data.response === false) {
  //         throw new Error("Recipe Not found");
  //       }

  //       setdata(data?.recipe);
  //       console.log("recipe", data?.recipe);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   RecipeFetch();
  //   return function () {
  //     controller.abort();
  //   };
  // }, [selectedrecipe]);
  return (
    <div className=" bg-green-300 rounded-xl h-96 text-white overflow-scroll overflow-x-hidden mr-9 p-2">
      {/* <div>{selectedrecipe && <img src={data?.image} alt="" />}</div> */}
    </div>
  );
}
