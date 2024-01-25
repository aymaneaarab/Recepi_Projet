import { useState, useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { Alert } from "@mui/material";

export default function ArRecipe() {
  const [abierto, setabierto] = useState(true);
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const searchedRecipes = recipes.filter((r) => r?.recipe.title.includes(query));

  const [selectedId, setselectedId] = useState("");

  function selectrecipe(id) {
    setselectedId(id);
  }

  const [bookmark, setbookmark] = useState([]);
  const [bookmarkclicked, setbookmarkclicked] = useState(false);

  function addtobookmark(newb) {
    setbookmark([...bookmark, newb]);
  }

  function clickbookmark() {
    setbookmarkclicked(!bookmarkclicked);
  }

  return (
    <div className="bg-green-100 h-screen">
      <Header
        query={query}
        setquery={setquery}
        clickbookmark={clickbookmark}
        bookmarkclicked={bookmarkclicked}
        bookmark={bookmark}
      />
      <div className="grid grid-cols-3 h-96 gap-9 my-8">
        <RecipeBoard
          selectedrecipe={selectedId}
          addtobookmark={addtobookmark}
          bookmark={bookmark}
          bookmarkclicked={bookmarkclicked}
          abierto={abierto}
          setabierto={setabierto}
        />
        <div className="h-auto w-1 bg-slate-400 justify-self-center"></div>
        <RecipeList
          query={query}
          recipes={searchedRecipes}
          setrecipes={setrecipes}
          selectrecipe={selectrecipe}
          setabierto={setabierto}
        />
      </div>
    </div>
  );
}

function Header({ query, setquery, clickbookmark, bookmarkclicked }) {
  return (
    <div className="bg-green-200 flex justify-between items-center p-5 rounded text-white content-center">
      <div className="flex cursor-pointer" onClick={clickbookmark}>
        {!bookmarkclicked ? (
          <CiBookmark className="bookmark" />
        ) : (
          <div>
            <FaBookmark className="bookmark" />
          </div>
        )}
        <pre>الوصفات المحفوظة</pre>
      </div>
      <div className="">
        <input
          type="text"
          className="bg-green-300 placeholder-white rounded p-2"
          placeholder="ابحث عن وصفة"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
      </div>
      <div className="flex">
        <span className="text-xl mx-3">🥦</span>
        <div className="font-semibold tracking-widest font-mono justify-self-end">
          RECEPI
        </div>
      </div>
    </div>
  );
}

function RecipeList({ query, recipes, setrecipes, selectrecipe, setabierto }) {
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
          throw new Error("Something went wrong");
        }

        const data = await res.json();

        if (data.response === false) {
          throw new Error("Recipe Not found");
        }

        setrecipes(data.recipes);
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
    };
  }, [query, setrecipes]);

  return (
    <div className="bg-green-300 rounded-xl h-96 text-white overflow-auto ml-16 p-2">
      {recipes?.map((recipe, i) => (
        <div
          key={i}
          className="flex border border-b-1 bg-transparent gap-3 p-9"
          onClick={() => {
            selectrecipe(recipe.recipe.recipe_id);
            setabierto(true);
          }}
        >
          <img
            src={recipe.recipe.image_url}
            alt={recipe.recipe.title}
            height="60px"
            width="70px"
            className="rounded"
          />

          <div className="text-white">
            <h3>{recipe.recipe.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecipeBoard({
  selectedrecipe,
  addtobookmark,
  bookmarkclicked,
  bookmark,
  abierto,
  setabierto,
}) {
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function recipeselectedfetch() {
      const res = await fetch("http://localhost:9000/recipes")
        .then((res) => res.json())
        .then((res) => setdata(res.recipes));
    }
    recipeselectedfetch();
  }, [selectedrecipe]);

  const filtredata = Array.isArray(data)
    ? data.filter((d) => d?.recipe?.recipe_id === selectedrecipe)
    : [];

  const newbookmark = {
    title: filtredata[0]?.recipe?.title,
    image_url: filtredata[0]?.recipe?.image_url,
  };

  function recipeboardaddbtn(e) {
    e.preventDefault();
    addtobookmark(newbookmark);
    setabierto(!abierto);
  }

  return (
    <div className="bg-green-300 rounded-xl h-96 text-white overflow-scroll overflow-x-hidden mr-9 p-2">
      {selectedrecipe && filtredata && abierto && !bookmarkclicked && (
        <div>
          <h1>{filtredata[0]?.recipe?.title}</h1>
          <img src={filtredata[0]?.recipe?.image_url} alt="" />
          <span>
            <h6>:المكونات</h6>
            <ul>
              {filtredata[0]?.recipe?.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </span>
          <button
            className="bg-green-500 p-4"
            onClick={(e) => recipeboardaddbtn(e)}
          >
            اضافة للمفضلة
          </button>
        </div>
      )}

      {bookmarkclicked && bookmark && <h6>الوصفات المحفوظة الخاصة بك :</h6>}

      {bookmarkclicked &&
        bookmark &&
        bookmark.map((b, i) => (
          <div key={i} className="flex border border-b-1 bg-transparent gap-3 p-9">
            <img src={b?.image_url} alt={b?.title} width="70px" height="70px" />
            <h6 className="text-slate-50">{b?.title}</h6>
          </div>
        ))}
    </div>
  );
}
