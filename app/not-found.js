"use client"; // Required for hooks in Next.js App Router
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen px-6 md:px-20 gap-10">
      {/* Left Side: Image */}
      <div className="md:w-1/2 flex justify-center">
        <Image
          src="/Oops! 404 Error with a broken robot.gif"
          alt="404 illustration"
          width={600}
          height={450}
          className="w-full h-auto max-w-lg transition-transform duration-500 transform hover:scale-110 mix-blend-multiply"
        />
      </div>

      {/* Right Side: Text & Button */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-800">
          Oops! Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-3 border border-blue-600 text-blue-600 text-lg font-semibold rounded-lg shadow-md hover:border-blue-700 hover:bg-blue-50 transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
