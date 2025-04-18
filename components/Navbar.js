import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Cookbook
        </Link>
        <div className="space-x-4">
          <Link href="/explore" className="text-gray-600 hover:text-black">
            Explore
          </Link>
          <Link href="/scanner" className="text-gray-600 hover:text-black">
            Scan Ingredients
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-black">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;