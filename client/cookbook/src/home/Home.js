import React from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const history = useNavigate();
  // const onClickSearch = () => <Link to="/recipe";

  return (
    <React.Fragment>
      <div
        className="bg-cover flex h-screen items-center justify-center"
        style={{
          backgroundImage:
            "url(https://www.expatica.com/app/uploads/sites/5/2014/05/french-food-1920x1080.jpg)",
        }}
      >
        <div className="flex-col flex items-center bg-black bg-opacity-60 w-full p-6">
          <div className="font-black text-5xl pb-6 text-green-400">
            Cookbook
          </div>
          <input
            type="text"
            id="first_name"
            className="items-center w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button class="mt-6 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
            <Link to="/recipe" />
            Search
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
