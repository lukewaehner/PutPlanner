import Image from "next/image";
import logo from "/public/images/logo.png"; // Replace with your actual logo path

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <Image src={logo} alt="Logo" width={48} height={48} />
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Showing coaches near 06437"
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <div className="flex space-x-2">
          <button className="bg-gray-200 p-2 rounded-full">☰</button>
          <button className="bg-gray-200 p-2 rounded-full">⚙</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
