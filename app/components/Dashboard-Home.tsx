import React from "react";
import Link from "next/link"; // Corrected import statement
import "@fortawesome/fontawesome-free/css/all.min.css";

export const DashboardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="bg-gray-100 p-5 rounded-lg text-center">
        <h1 className="text-xl font-semibold">Hello, Austine Robertson</h1>
        <p className="text-gray-600">Get FREE delivery on every weekend.</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-2 hover:bg-blue-600">
          + Post Events
        </button>
        <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded mt-4 hover:bg-blue-500 hover:text-white">
          Check Events
        </button>
      </header>

      <section className="my-8">
        <h2 className="text-lg font-semibold mb-4">Recipe Category</h2>
        <div className="flex justify-center gap-4">
          <div className="bg-gray-200 p-3 rounded text-center">Soup</div>
          <div className="bg-gray-200 p-3 rounded text-center">Stir fries</div>
          <div className="bg-gray-200 p-3 rounded text-center">Drinks</div>
          <div className="bg-gray-200 p-3 rounded text-center">Desserts</div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Occasion</h2>
        <div className="flex justify-center gap-4">
          <div className="bg-gray-200 p-3 rounded text-center">Birthday</div>
          <div className="bg-gray-200 p-3 rounded text-center">Phchum ben</div>
          <div className="bg-gray-200 p-3 rounded text-center">
            Luna New Year
          </div>
        </div>
      </section>
    </div>
  );
};
