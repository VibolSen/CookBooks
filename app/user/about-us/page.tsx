export default function TeamSectionPage() {
  return (
    <div className="px-20 py-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Our Team Member</h1>
      <p className="mb-6 text-center text-gray-600">
        We aim to make cooking accessible and enjoyable for everyone, no matter
        your skill level.
      </p>

      <div className="flex justify-center space-x-10 mb-10">
  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-xs">
    <img
      src="../team/team.png"
      alt="Mr. Sen Vibol"
      className="w-[300px] h-[300px] object-cover rounded-full mb-2"
    />
    <p className="font-semibold">Mr. Sen Vibol</p>
    <div className="flex space-x-6 mt-2">
      <a href="#" className="text-blue-500 hover:underline">
        <i className="fab fa-facebook-f w-6 h-6"></i> {/* Facebook Icon */}
      </a>
      <a href="#" className="text-blue-500 hover:underline">
        <i className="fab fa-instagram w-6 h-6"></i> {/* Instagram Icon */}
      </a>
      <a href="#" className="text-blue-500 hover:underline">
        <i className="fab fa-github w-6 h-6"></i> {/* GitHub Icon */}
      </a>
    </div>
  </div>

  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-xs">
    <img
      src="../team/team.png"
      alt="Mr. Khorn Soukhouch"
      className="w-[300px] h-[300px] object-cover rounded-full mb-2"
    />
    <p className="font-semibold">Mr. Khorn Soukhouch</p>
    <div className="flex space-x-6 mt-2">
      <a href="#" className="text-blue-500 hover:underline">
        <i className="fab fa-facebook-f w-6 h-6"></i> {/* Facebook Icon */}
      </a>
      <a href="#" className="text-blue-500 hover:underline">
        <i className="fab fa-instagram w-6 h-6"></i> {/* Instagram Icon */}
      </a>
      <a href="#" className="text-blue-500 hover:underline">
        <i className="fab fa-github w-6 h-6"></i> {/* GitHub Icon */}
      </a>
    </div>
  </div>

  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg max-w-xs">
    <img
      src="../team/team.png"
      alt="Ms. Sam Nisa"
      className="w-[300px] h-[300px] object-cover rounded-full mb-2"
    />
    <p className="font-semibold">Ms. Sam Nisa</p>
    <div className="flex space-x-6 mt-2">
      <a href="#" className="text-blue-500 hover:underline">
        <i className="fab fa-facebook-f w-6 h-6"></i> {/* Facebook Icon */}
      </a>
      <a href="#" className="text-blue-500 hover:underline">
        <i className="fab fa-instagram w-6 h-6"></i> {/* Instagram Icon */}
      </a>
      <a href="#" className="text-blue-500 hover:underline">
        <i className="fab fa-github w-6 h-6"></i> {/* GitHub Icon */}
      </a>
    </div>
  </div>
</div>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Our Visions</h2>
        <p className="text-gray-600 mb-2">What is our vision to do next?</p>
        <p className="text-gray-700">
          Our team is made up of food enthusiasts, recipe developers, and
          culinary storytellers. We are committed to testing and refining every
          recipe, so you can be confident that when you cook with us, you're
          making something truly special.
        </p>
      </div>
    </div>
  );
}
