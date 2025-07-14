import Link from "next/link.js";

function Navbar({ links }) {
  return (
    <div className="hidden lg:flex items-center gap-8 grow justify-center">
      {links.map((link) => {
        return (
          <Link
            key={link.id}
            href={link.href}
            className="relative text-gray-800 dark:text-white transition-colors duration-300 hover:text-brandOrange"
          >
            {link.name}
            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full"></span>
          </Link>
        );
      })}
    </div>
  );
}

export default Navbar;