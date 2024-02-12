import { message } from "antd";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect } from "react";
import { Tooltip } from "antd";
import { Button, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Aos from "aos";

export function RecipeBoard({
  selectedrecipe,
  addtobookmark,
  bookmarkclicked,
  bookmark,
  abierto,
  setabierto,
  deletefrombookmark,
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
  const confirm = (e) => {
    message.success("تمت الحدف بنجاح");
  };
  //
  const newbookmark = {
    title: filtredata[0]?.recipe?.title,
    image_url: filtredata[0]?.recipe?.image_url,
  };
  function recipeboardaddbtn(e) {
    e.preventDefault();

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
  const cancel = (e) => {
    message.error("تم الغاء العملية");
  };
  function closetheboard() {
    setabierto(!abierto);
  }
  function deletefrombookm(name) {
    deletefrombookmark(name);
  }
  useEffect(() => {
    Aos.init();
  }, [selectedrecipe,abierto]);
  return (
    <div className="bg-gray-100 rounded-xl text-green-600 overflow-scroll p-4 border border-gray-400">
      <div>
        {selectedrecipe && filtredata && abierto && !bookmarkclicked && (
          <div className="relative">
            <div className=" z-50	absolute top-0 left-0">
              <Tooltip placement="top" title="اغلاق صفحة الوصفة">
                <button onClick={closetheboard}>
                  <IoIosCloseCircleOutline className="w-16 h-16" />
                </button>
              </Tooltip>
            </div>
            <div data-aos="fade-left" data-aos-duration="1000">

            <img
              src={filtredata[0]?.recipe?.image_url}
              alt=""
              className="rounded w-full"
            />
            <h1 className="text-xl text-center text-white border bg-green-500 p-2">
              {filtredata[0]?.recipe?.title}
            </h1>
            <span>
              <h6 className="text-xl text-black text-center mt-2 border border-b underline p-1">
                :المكونات
              </h6>
              <ul className="text-right text-xl font-extrabold">
                {filtredata[0]?.recipe?.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </span>
            <div className="addToBookmarksDiv">
              <>
                {contextHolder}
                <center>
                  <button
                    className="bg-green-500 p-4 text-white text-center"
                    onClick={(e) => recipeboardaddbtn(e)}
                  >
                    اضافة للمفضلة
                  </button>
                </center>
              </>
            </div>
            </div>
          </div>
        )}

        {bookmarkclicked && bookmark && (
          <h6 className="text-center font-extrabold text-2xl">
            : الوصفات المحفوظة الخاصة بك
          </h6>
        )}

        {bookmarkclicked &&
          bookmark &&
          bookmark.map((b, i) => (
            <div>
              <div data-aos="fade-down">
              <div
                key={i}
                className="flex border  border-b-1  bg-transparent gap-3 p-9"
              >
                {/* {console.log("test object structure b", b)} */}

                <img
                  src={b?.image_url}
                  alt={b?.title}
                  width="90px"
                  height="90px"
                />
                <div className="flex text-green-900 font-extrabold text-xl">
                  <h6>{b?.title}</h6>
                </div>
                <div className="flex items-end">
                  <Popconfirm
                    title="حدف الوصفة"
                    description="هل انت متاكد من حدف الوصفة?"
                    cancelText="الغاء"
                    okText="حدف"
                    onConfirm={() => deletefrombookm(b?.title)}
                    okType="danger"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <button className="bg-red-600 text-white p-2">
                      حدف الوصفة
                    </button>
                  </Popconfirm>
                </div>
              </div>
              </div>

            
            </div>
          ))}
      </div>
    </div>
  );
}
