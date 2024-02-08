import { message } from "antd";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect } from "react";

export function RecipeBoard({
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
  // console.log("test",filtredata)
  useEffect(() => {
    async function recipeselectedfetch() {
      const res = await fetch("http://localhost:9000/recipes")
        .then((res) => res.json())
        .then((res) => setdata(res));
    }
    recipeselectedfetch();
  }, [selectedrecipe]);

  //
  const [isAdded, setIsAdedd] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  //
  const newbookmark = {
    title: filtredata[0]?.recipe?.title,
    image_url: filtredata[0]?.recipe?.image_url,
  };
  function recipeboardaddbtn(e) {
    e.preventDefault();
    // toast.success(
    //   "تمت الاضافة بنجاح",
    //   {
    //     position: "bottom-right",
    //   },
    //   {
    //     duration: 3000,
    //   }
    // );
    messageApi.open({
      type: "success",
      content: "تمت الاضافة بنجاح",
      duration: 2,
    });
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
    <div className=" bg-green-300 rounded-xl h-96 text-white overflow-scroll overflow-x-hidden mx-9 p-2">
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
              <>
                {contextHolder}
                <button
                  className="bg-green-500 p-4"
                  onClick={(e) => recipeboardaddbtn(e)}
                >
                  اضافة للمفضلة
                </button>
              </>
              {/* {isAdded && (
                      <Toaster position="bottom-right"
                        reverseOrder={false}
                        toastOptions={{
                          duration: 3000,
                        }}
                      />
                    )} */}
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
                {console.log("test object structure b", b)}

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
