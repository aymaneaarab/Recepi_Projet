export default function Recipe({ recipes, selectrecipe, setabierto }) {
  return (
    <>
      {recipes?.map((recipe, i) => (
        
        <div
        key={i}
        className="flex border border-b-1 bg-transparent gap-2 p-4 cursor-pointer hover:bg-gray-200"
        onClick={() => {
          selectrecipe(recipe.recipe.recipe_id);
          setabierto(true);
        }}
        >
           {/* <div data-aos="fade-down"> */}
          {/* {console.log(recipe)} */}
          <img
            src={recipe.recipe.image_url}
            alt={recipe.recipe.title}
            height="80px"
            width="80px"
            className="rounded"
          />

          <div className="text-green-600 p-4">
            <h3 className="text-lg font-extrabold">{recipe.recipe.title}</h3>
            {/* <span>{recipe.recipe.publisher}:الكاتب</span> */}
          </div>
        </div>
        //  </div>
      ))}
    </>
  );
}
