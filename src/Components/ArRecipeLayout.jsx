import { Button, Modal } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useId, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci"; //bookmark vide
import { FaBookmark } from "react-icons/fa"; // bookmark with color
// import Recepi from "../Test/recepi.png";
import { useEffect } from "react";
// import { Alert } from "@mui/material";
// const key = "cbed10cacb9c81e2a7e48b59678ca090	";
// const app_id = "b90b16e8";

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
  function clickbookmark() {
    setbookmarkclicked(!bookmarkclicked);
  }

  function AddTodata(newRec){
setrecipes((recipes)=>[...recipes,newRec])
  }

  return (
    <div className="bg-green-100 h-screen">
      <Header
        query={query}
        setquery={setquery}
        clickbookmark={clickbookmark}
        bookmarkclicked={bookmarkclicked}
        bookmark={bookmark}
      AddRecipe={AddTodata}
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

function Header({ query, setquery, clickbookmark, bookmarkclicked,AddRecipe }) {
  const [open, setOpen] = useState(false);

  // the states for inputs to add a recipe into the database
  const [recipeData, setRecipeData] = useState({
    recipeName: "",
    publisher: "",
    imageUrl: "",
    ingredient1: "",
    ingredient2: "",
    ingredient3: "",
    ingredient4: "",
    ingredient5: "",
    ingredient6: "",
    ingredient7: "",
    ingredient8: "",
    ingredient9: "",
    ingredient10: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // function for adding the recipe into the database
  function handleAddRecipetoData() {
    const newRecipe = {
      recipe: {
        publisher: recipeData.publisher,
        ingredients: [
          recipeData.ingredient1,
          recipeData.ingredient2,
          recipeData.ingredient3,
          recipeData.ingredient3,
          recipeData.ingredient4,
          recipeData.ingredient5,
          recipeData.ingredient6,
          recipeData.ingredient7,
          recipeData.ingredient8,
          recipeData.ingredient9,
          recipeData.ingredient10,
        ],
        source_url: "",
        recipe_id: "",
        image_url: recipeData.imageUrl,

        social_rank: 100.0,
        publisher_url: "#",
        title: recipeData.recipeName,
      },
    };
    AddRecipe(newRecipe);
    setOpen(false)
  }

  return (
    <div className="bg-green-200	flex justify-between items-center p-5 rounded text-white content-center   ">
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
      <div>
        <Button
          type="text"
          className="text-white"
          onClick={() => setOpen(true)}
        >
          اضافة وصفة للقائمة
        </Button>
        <Modal
          title="اضافة وصفة جديدة للقائمة"
          centered
          open={open}
          onOk={() =>handleAddRecipetoData()}
          onCancel={() => setOpen(false)}
          width={1000}
          okButtonProps={{
            style: { backgroundColor: "green" },
          }}
          okText="اضافة"
          cancelText="الغاء"
        >
          <form>
            <div className="p-11">
              <label>
                اسم الوصفة:
                <input
                  type="text"
                  name="recipeName"
                  value={recipeData.recipeName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                ناشر الوصفة:
                <input
                  type="text"
                  name="publisher"
                  value={recipeData.publisher}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                رابط صورة الوصفة:
                <input
                  type="text"
                  name="imageUrl"
                  value={recipeData.imageUrl}
                  onChange={handleInputChange}
                />
              </label>

              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <>
                  <label>المكون {index}:</label>
                  <input
                    type="text"
                    name={`ingredient${index}`}
                    value={recipeData[`ingredient${index}`]}
                    onChange={handleInputChange}
                  />
                </>
              ))}
            </div>
          </form>
        </Modal>{" "}
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
        <div className="font-semibold tracking-widest font-mono justify-self-end">
          {/* <img src={Recepi} alt="Recepi Logo" height="20%" width="20%" className="ml-36 lg:ml-96 justify-self-start	" /> */}
          RECEPI
        </div>
      </div>{" "}
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
    <div className=" bg-green-300 rounded-xl h-96 text-white overflow-auto  ml-16 p-2 ">
      {recipes?.map((recipe, i) => (
        <div
          key={i}
          className=" flex border  border-b-1  bg-transparent gap-3 p-9 "
          onClick={() => {
            selectrecipe(recipe.recipe.recipe_id);
            setabierto(true);
          }}
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

function RecipeBoard({
  selectedrecipe,
  addtobookmark,
  bookmarkclicked,
  bookmark,
  abierto,
  setabierto,
}) {
  // console.log(selectedrecipe)
  const [data, setdata] = useState([]);

  // console.log("data",data)
  const filtredata =
    Array.isArray(data) &&
    data.filter((d) => d?.recipe?.recipe_id === selectedrecipe);
  // console.log("test",filtredata) ;
  useEffect(() => {
    async function recipeselectedfetch() {
      const res = await fetch("http://localhost:9000/recipes")
        .then((res) => res.json())
        .then((res) => setdata(res.recipes));
    }
    recipeselectedfetch();
  }, [selectedrecipe]);

  //
  const [isAdded, setIsAdedd] = useState(false);

  //
  const newbookmark = {
    title: filtredata[0]?.recipe?.title,
    image_url: filtredata[0]?.recipe?.image_url,
  };
  function recipeboardaddbtn(e) {
    e.preventDefault();
    toast.success(
      "تمت الاضافة بنجاح",
      {
        position: "bottom-right",
      },
      {
        duration: 3000,
      }
    );
    addtobookmark(newbookmark);
    setIsAdedd(true);

    setTimeout(() => {
      setIsAdedd(false);
    }, 3000);
    // setabierto(!abierto);
  }
  function closetheboard() {
    setabierto(!abierto);
  }

  return (
    <div className=" bg-green-300 rounded-xl h-96 text-white overflow-scroll overflow-x-hidden mr-9 p-2">
      <div>
        {selectedrecipe && filtredata && abierto && !bookmarkclicked && (
          <div>
            <div className="top-0 left-0">
              <button onClick={closetheboard}>
                <IoIosCloseCircleOutline className="w-16 h-16" />
              </button>
            </div>

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
            <div className="addToBookmarksDiv">
              <button
                className="bg-green-500 p-4"
                onClick={(e) => recipeboardaddbtn(e)}
              >
                اضافة للمفضلة
              </button>
              {isAdded && (
                <Toaster
                  position="bottom-right"
                  reverseOrder={false}
                  toastOptions={{
                    duration: 3000,
                  }}
                />
              )}
            </div>
          </div>
        )}
        {/* {
  bookmark &&
} */}

        {bookmarkclicked && bookmark && <h6>الوصفات المحفوظة الخاصة بك :</h6>}

        {bookmarkclicked &&
          bookmark &&
          bookmark.map((b, i) => (
            <div>
              <div
                key={i}
                className="flex border  border-b-1  bg-transparent gap-3 p-9"
              >
                {/* {console.log("test object structure b", b)} */}

                <img
                  src={b?.image_url}
                  alt={b?.title}
                  width="70px"
                  height="70px"
                />
                {console.log(b?.image_url)}
                <h6 className="text-slate-50">{b?.title}</h6>
                {console.log(b?.title)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

// Component for the notification of add but contains errors

// function AddSucceful (added,setaded){
// useEffect(()=>{
//   toast.success(
//     "تمت الاضافة بنجاح",
//     {
//       position: "bottom-right",
//     },
//     {
//       duration: 10000,
//     }
//   );
// setTimeout(()=>{
//   setaded(false)
// },
// 4000
// )
// },[added,setaded])

// return (
//   <Toaster position="bottom-right" reverseOrder={false}

//   toastOptions={{
//    duration: 10000} }/>
// )
// }

// that the second test component for showing bookmarks , doesent work

// function Bookmarksdisplay(bookmark, bookmarkclicked) {
//   return (
//     <div className="rounded-xl h-96 text-white overflow-auto  ml-16 p-2">
//       {bookmarkclicked &&
//         bookmark &&
//         Array.isArray(bookmark) &&
//         bookmark?.map((b, i) => (
//           <div
//             key={i}
//             className="flex border  border-b-1  bg-transparent gap-3 p-9"
//           >
//             {console.log("test object structure b", b)}
//             <img
//               src={b[0]?.image_url}
//               alt={b[0]?.title}
//               width="70px"
//               height="70px"
//             />
//             {console.log(b[0]?.image_url)}
//             <h6 className="text-slate-50">{b?.title}</h6>
//             {console.log(b[0]?.title)}
//           </div>
//         ))}
//     </div>
//   );
// }

//the code for showing the bookmarks on the other side  it has a lot of errors to tomorow
// {bookmarkclicked &&
//   bookmark?.map((b, i) => (
//     <div
//       key={i}
//       className=" flex border  border-b-1  bg-transparent gap-3 p-9 "
//     >
//       {/* {console.log(recipe)} */}
//       <img
//         src={b?.image_url}
//         alt={b?.title}
//         height="60px"
//         width="70px"
//         className="rounded"
//       />

//       <div className="text-white">
//         <h3>{b?.title}</h3>
//         {/* <span>{recipe.recipe.publisher}:الكاتب</span> */}
//       </div>
//     </div>
//   ))}
