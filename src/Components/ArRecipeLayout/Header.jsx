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
          <NavLink to="/">
      <div className="flex">
        <span className="text-xl mx-3">🥦</span>
        <div className="font-semibold tracking-widest font-mono justify-self-end">
          {/* <img src={Recepi} alt="Recepi Logo" height="20%" width="20%" className="ml-36 lg:ml-96 justify-self-start	" /> */}
            
            RECEPI
        </div>
      </div>{" "}
        </NavLink>
    </div>
  );
}
