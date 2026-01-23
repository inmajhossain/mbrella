import { FaArrowRight } from "react-icons/fa";

function Expert() {
  return (
    <div className="flex md:flex-row flex-col justify-between items-center gap-5 lg:gap-0 bg-yellow-400 mx-auto mt-12.5 mb-12.5 p-5 lg:p-15 max-w-7xl">
      <div>
        <h3 className="mb-2 lg:mb-5 font-bold text-gray-800 text-2xl lg:text-4xl">
          Get Expert Tips In Your Inbox
        </h3>
        <h4 className="font-sans text-gray-600 lg:text-lg">
          Subscribe to our newsletter and stay updated.
        </h4>
      </div>
      <div className="flex flex-row justify-between items-center bg-white p-2 rounded-sm lg:w-105 min-w-85 h-20">
        <input
          type="email"
          placeholder="Enter your e-mail"
          className="px-2 py-4 border-none lg:w-85 font-sans"
        />
        <button className="bg-gray-700 hover:bg-blue-600 p-4 text-white transition">
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Expert;
