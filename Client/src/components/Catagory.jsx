import React from "react";
import { useNavigate } from "react-router-dom";
const Catagory = () => {
    const navigate = useNavigate();
  const categories = [
    { name: "Latest Releases", bgColor: "bg-red-600", link:"/latestmovies"},
    { name: "Bollywood Films", bgColor: "bg-blue-600" },
    { name: "South Movies", bgColor: "bg-green-600" },
    { name: "Most Popular", bgColor: "bg-yellow-500" },
    { name: "Hollywood Movies", bgColor: "bg-purple-700" },
    { name: "Telugu Movie", bgColor: "bg-gray-700" },
    { name: "Tamil Movies", bgColor: "bg-gray-700" },
    { name: "Kannada Movie", bgColor: "bg-gray-700" },
    { name: "Punjabi Films", bgColor: "bg-gray-700" },
    { name: "Malayalam Movie", bgColor: "bg-gray-700" },
    { name: "Comedy Film", bgColor: "bg-gray-700" },
    { name: "Mysterious Show", bgColor: "bg-gray-700" },
    { name: "Reviews", bgColor: "bg-gray-700" },
    { name: "Hindi Dubbed", bgColor: "bg-gray-700" },
    { name: "Web Series", bgColor: "bg-gray-700" },
    { name: "TV Shows", bgColor: "bg-gray-700" },
    { name: "South Dubbed", bgColor: "bg-gray-700" },
    { name: "English Series", bgColor: "bg-gray-700" },
    { name: "Romantic", bgColor: "bg-gray-700" },
    { name: "K-Drama Hindi", bgColor: "bg-gray-700" },
    { name: "Bengali Movies", bgColor: "bg-gray-700" },
  ];

  return (
    <div className="bg-black text-white p-6 rounded-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {categories.map((category, idx) => (
          <button onClick={()=>navigate(category.link)}
            key={idx}
            className={`${category.bgColor} text-white font-medium py-2 px-4 rounded hover:opacity-80`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="text-center bg-gray-800 text-sm p-4 rounded mb-4">
        Please Save the URL <span className="font-bold">"KolaMovies.com"</span>,
        and Visit our Website to Get All Movies and Web Series Updates!
      </div>
      <div className="text-center flex justify-center">
        <button className="bg-blue-500 text-white font-medium py-2 px-6 rounded hover:bg-blue-600 flex items-center justify-center gap-2">
          <span className="material-icons text-center">telegram</span> Join our Telegram Group
        </button>
      </div>
    </div>
  );
};

export default Catagory;
