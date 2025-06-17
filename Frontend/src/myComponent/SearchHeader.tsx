import { type ChangeEvent } from "react";
import { SearchIcon } from "lucide-react"

interface SearchHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}
const SearchHeader = ({ searchTerm, onSearchChange }: SearchHeaderProps) => {
  return (
    <header className="w-full mx-auto bg-blue-950/22 border-b border-b-blue-800 z-20">
      <div className="max-w-6xl mx-auto py-5 px-4">
        <div className="flex flex-col md:flex-row lg:flex-row gap-4  justify-between">
          <h1 className="text-3xl tracking-tighter font-bold font-mono text-yellow-400">EVENTLY</h1>
          <div className="relative flex gap-2">
            <p className="text-white text-[19px] font-normal font-mono mt-1">search</p>
            <SearchIcon  className="text-yellow-400 size-4 absolute mt-[9px] ml-21 md:ml-20 lg:ml-20"/>
            <input type="text" 
                className="text-white border pl-9 pr-2 py-1 rounded-3xl border-yellow-400 md:w-80 lg:w-80 " 
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
                placeholder="search events..."
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default SearchHeader