


export default function RecipePage () {
    return ( 
        <div>
       <div className="bg-white rounded-md overflow-hidden shadow-md flex flex-col md:flex-row items-center px-20 py-5">
  {/* Image Section */}
  <div className="md:w-1/2">
    <img
      src="https://natashaskitchen.com/wp-content/uploads/2023/04/Flan-Recipe-SQ.jpg"
      alt="Mighty Super Cheesecake"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Text Content Section */}
  <div className="bg-blue-50 md:w-1/2 p-8 flex flex-col justify-center">
    {/* "85% would make this again" */}
    <div className="flex items-center text-sm text-gray-600 mb-4">
      <svg
        className="h-4 w-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
      <span>85% would make this again</span>
    </div>

    {/* Title */}
    <h2 className="text-4xl font-semibold text-gray-900 mb-4">
      Mighty Super Cheesecake
    </h2>

    {/* Description */}
    <p className="text-gray-700">
      Look no further for a creamy and ultra smooth classic cheesecake recipe! no
      one can deny its simple decadence.
    </p>
  </div>
</div>
        </div>
    );
}