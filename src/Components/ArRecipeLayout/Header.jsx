import { Button, Modal, message } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import axios from "axios";
import { NavLink } from "react-router-dom";

export function Header({
  query,
  setquery,
  clickbookmark,
  bookmarkclicked,
  AddRecipe,
}) {
  const [open, setOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

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
        recipe_id: uuidv4(),
        image_url: recipeData.imageUrl,

        social_rank: 100,
        publisher_url: "#",
        title: recipeData.recipeName,
      },
    };

    // fetch("http://localhost:9000/recipes",{
    //   method:"POST",
    //   headers :{
    //     "Content-Type":"application/json"
    //   },
    //   body: JSON.stringify(newRecipe)
    // }).then(repoonse=>repoonse.json()).then(addedrec=>{console.log("new recipe added :",addedrec.recipe)}).catch(err=>console.error('error adding new recipe',err));
    // AddRecipe(newRecipe); actually i used this to just test the adding to array of data it works with errors
    axios
      .post("http://localhost:9000/recipes", newRecipe)
      .then((res) => {
        // alert('added succesfully');
      })
      .catch((err) =>
        console.log(
          "filed to add a new recipe check the console to see the error",
          err
        )
      );
    messageApi.open({
      type: "success",
      content: "تمت الاضافة بنجاح",
      duration: 2,
    });
    setOpen(false);
    setRecipeData({
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
  }
  return (
  <div className="bg-gray-200 flex justify-between items-center p-10  text-green-700 rounded-lg">
      <div className="flex cursor-pointer hover:bg-gray-300 hover:text-black p-2 rounded" onClick={clickbookmark}>
        {!bookmarkclicked ? (
          <CiBookmark className="bookmark" />
        ) : (
          <div>
            <FaBookmark className="bookmark" />
          </div>
        )}
        <pre className="font-semibold text-green-800 text-l">الوصفات المحفوظة</pre>
      </div>
      <div>
        <Button
          type="text"
          className="text-green-800"
          onClick={() => setOpen(true)}
        >
          اضافة وصفة للقائمة
        </Button>
        <Modal
          title="اضافة وصفة جديدة للقائمة"
          centered
          open={open}
          onOk={() => handleAddRecipetoData()}
          onCancel={() => setOpen(false)}
          width={1000}
          okButtonProps={{
            style: { backgroundColor: "green" },
          }}
          okText="اضافة"
          cancelText="الغاء"
        >
          {contextHolder}

          <form>
            <div className="p-11 gap-5">
            <div className="flex flex-wrap gap-5 p-5">

             
                <input
                  type="text"
                  name="recipeName"
                  value={recipeData.recipeName}
                  onChange={handleInputChange}
                  required
                  className="outline-dotted outline-green-600"

                />
                 <label>
                اسم الوصفة
            </label>
             
                <input
                  type="text"
                  name="publisher"
                  value={recipeData.publisher}
                  onChange={handleInputChange}
                  required
                  className="outline-dotted outline-green-600"

                />
             <label>
                ناشر الوصفة
                </label>
             
                <input
                  type="text"
                  name="imageUrl"
                  value={recipeData.imageUrl}
                  onChange={handleInputChange}
                  className="outline-dotted outline-green-600"

                  required
                />
                 <label>
                رابط صورة الوصفة
                </label>
                </div>
                <h3 className="text-center bg-green-500">المكونات</h3> 
<div className="flex flex-row-reverse	 flex-wrap gap-5 p-5">

              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (

            <>
                                                {/* <label>المكون: {index}</label> */}

                  <input
                    type="text"
                    name={`ingredient${index}`}
                    value={recipeData[`ingredient${index}`]}
                    onChange={handleInputChange}
                    required
                    placeholder={`المكون ${index}`}
                    className="outline-dotted outline-green-600"
                  />
</>
         
              ))} </div>

            </div>
          </form>
        </Modal>{" "}
      </div>
      <div className="">
        <input
          type="text"
          className="  placeholder-gray-400 rounded-full text-green-900 p-4 grow w-[32rem] focus:outline-none focus:ring focus:border-green-500 "
          placeholder="ابحث عن وصفة "
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
      </div>
          <NavLink to="/">
      <div className="flex">
        <span className="text-2xl mx-3">🥦</span>
        <div className="font-semibold tracking-widest font-mono justify-self-end text-2xl text-green-700">
          {/* <img src={Recepi} alt="Recepi Logo" height="20%" width="20%" className="ml-36 lg:ml-96 justify-self-start	" /> */}
            
            RECEPI
        </div>
      </div>{" "}
        </NavLink>
    </div>
  );
}
