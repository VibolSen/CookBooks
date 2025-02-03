export default function Contact() {
  return (
    <div className=" bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-6 y-10 m-10">
      <h2 className="text-2xl font-bold m-auto text-center">Contact Us</h2>
      <p className="text-center mb-4">
        Any question or remarks? Just write us a message!
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 p-4 bg-gray-300 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="mb-2">Say something to start a live chat!</p>
          <p className="mt-4 text-gray-600">+102 3468 789</p>
          <p className="mb-2 text-gray-600">demo@gmail.com</p>
          <p className="mb-2">Royal University of Phnom Penh</p>
          <p className="mb-2">Open: Classes Every Monday</p>
          <p className="mb-2">45 (232) - University of Phnom Penh</p>
          <p className="mb-4">Russian Federation Blvd (100) 823 840</p>
        </div>
        <div className="flex-1 p-4">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-2 mb-4"
            placeholder="First Name"
          />

          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-2 mb-4"
            placeholder="Last Name"
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="border border-gray-300 rounded w-full p-2 mb-4"
            placeholder="Email"
          />

          <label className="block mb-2">Phone Number</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-2 mb-4"
            placeholder="Phone Number"
          />

          <label className="block mb-2">Message</label>
          <textarea
            className="border border-gray-300 rounded w-full p-2 mb-4"
            rows="4"
            placeholder="Your message..."
          ></textarea>

          <button className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
