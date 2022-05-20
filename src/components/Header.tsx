import { FiSearch } from 'react-icons/fi';

// sticky top-0 z-30

export default function Header() {
  return (
    <header className="relative z-30 pt-12 bg-secondary">
      <div className="flex gap-x-4 items-center">
        <div className="relative w-full">
          <FiSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 w-5 h-auto text-gray-400" />
          <input
            type="text"
            placeholder="Search new place"
            className="w-full lg:w-auto px-0 lg:px-16 py-3 pl-10 rounded-md outline-none placeholder:text-sm"
          />
        </div>
      </div>
    </header>
  );
}
