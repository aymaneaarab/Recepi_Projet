// import toast, { Toaster } from "react-hot-toast";  // adding to bookmark notification
import { useState } from "react";

import { useEffect } from "react";
import { Header } from "./Header";
import { RecipeList } from "./RecipeList";
import { RecipeBoard } from "./RecipeBoard";

export default function ArRecipe() {
  //state for block of detaille recipe if is opened
  const [abierto, setabierto] = useState(true);

  useEffect(() => {
    setTimeout(() => {}, 5000);
  }, []);
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState();
  let searchedRecipes = recipes?.filter((r) => r?.recipe.title.includes(query));
  if (query === "") {
    searchedRecipes = [];
  }

  const [selectedId, setselectedId] = useState("");
  function selectrecipe(id) {
    setselectedId(id);
  }

  //bookmarks states and functions 👍

  const [bookmark, setbookmark] = useState([]);
  const [bookmarkclicked, setbookmarkclicked] = useState(false);

  function addtobookmark(newb) {
    
    setbookmark([...bookmark, newb]);
  }
  function deletefrombookmark(name){
setbookmark(bookmark.filter((b)=>b.title!==name))
  }
  function clickbookmark() {
    setbookmarkclicked(!bookmarkclicked);
  }

  function AddTodata(newRec) {
    setrecipes((recipes) => [...recipes, newRec]);
  }

  return (
<div style={{backgroundImage: 'linear-gradient(to bottom right, #66b539, #4b6a33)'} } className="p-16"
>

    <div className="bg-gray-100 h-screen container mx-auto  rounded-3xl">
      <Header
        query={query}
        setquery={setquery}
        clickbookmark={clickbookmark}
        bookmarkclicked={bookmarkclicked}
        bookmark={bookmark}
        AddRecipe={AddTodata}
      />
      <div className="grid grid-cols-3 gap-4 h-4/5 mx-10 mt-8 p-4">
        <RecipeBoard
          selectedrecipe={selectedId}
          addtobookmark={addtobookmark}
          bookmark={bookmark}
          bookmarkclicked={bookmarkclicked}
          abierto={abierto}
          setabierto={setabierto}
          deletefrombookmark={deletefrombookmark}
        />
        <div className="h-full w-1 bg-gray-100   justify-self-center"></div>
        <RecipeList
          query={query}
          recipes={searchedRecipes}
          setrecipes={setrecipes}
          selectrecipe={selectrecipe}
          setabierto={setabierto}
        />
      </div>
    </div>
    </div>
  );
}
