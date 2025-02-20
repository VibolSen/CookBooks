



export default function PopularPage () {
    return (
        <div>
        <div className="bg-white max-w-[1400px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
  {/* Image */}
  <div className="bg-white max-w-[1300px] mx-auto py-12 px-4 sm:px-6 lg:px-8">  
  {/* Image */}
  <img
    src="https://spotme.com/wp-content/uploads/2020/07/Hero-1.jpg"
    alt="Black Pizza Toast"
    className="w-full rounded-lg object-cover aspect-video"
  />
</div>

  {/* Title */}
  <h2 className="text-3xl font-bold mt-8 text-gray-900">
    My Favorite Easy Black Pizza Toast Recipe
  </h2>

  {/* Description */}
  <p className="mt-4 text-gray-700">
    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
    gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
    tempor invidunt ut labore et dolore magna aliquyam erat.
  </p>

  {/* Read More Button */}
  <div className="mt-6">
    <a
      href="#"
      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200"
    >
      Read More
      <svg
        className="-mr-1 ml-2 h-5 w-5"
        xmlns="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3DNasCvfOLMIxJyQtbNq7EfLkWnMazHE9xw&s"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  </div>
</div>
        </div>
    );
}