import React, { useEffect, useState } from "react";

const App = () => {
  const [getCategory, setGetCategory] = useState([]);

  useEffect(() => {
    const categoryData = async () => {
      try {
        const dataRes = await fetch("http://localhost:3001/categories");
        const fetchResult = await dataRes.json();
        setGetCategory(fetchResult);
      } catch (error) {
        console.log(error.message);
      }
    };
    categoryData();
  }, []);

  // console.log(getCategory);

  // use interaction
  const [activeCategoryClick, setActiveCategory] = useState(null);

  const handleActiveCategoryClick = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <main className="bg-gray-700 ">
      <div className="container mx-auto py-2">
        <div className="flex list-none gap-x-4">
          {getCategory.map((category) => {
            return (
              <div key={category.id}>
                <li
                  className={`text-white cursor-pointer transition-all duration-200  ${
                    activeCategoryClick === category.id ? "font-bold" : ""
                  }`}
                  onClick={() => {
                    handleActiveCategoryClick(category.id);
                  }}
                >
                  {category.name}
                </li>

                {activeCategoryClick === category.id &&
                  category.subCategories && (
                    <ul className="absolute top-[2.5rem] bg-gray-500 px-2 rounded-sm ">
                      {category.subCategories.map((subCategories) => {
                        return (
                          <li
                            key={subCategories.id}
                            className="text-white py-2 "
                          >
                            {subCategories.name}
                          </li>
                        );
                      })}
                    </ul>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default App;
