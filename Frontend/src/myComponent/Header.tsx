import toast from "react-hot-toast"
const Header = () => {
  const clicked = ()=>{
    toast.success("Welcome")
  }
  return (
    <header className="w-full mx-auto bg-blue-950/15 border-b border-b-blue-900 z-20">
      <div className="max-w-6xl mx-auto py-5 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl tracking-tighter font-bold font-mono text-yellow-400">EVENTLEY</h1>
          <button className="px-5 py-2 rounded-[9px] bg-yellow-400 text-blue-950 font-semibold 
            cursor-pointer border border-blue-950 " onClick={clicked}>Get Started</button>
        </div>
      </div>
    </header>
  )
}

export default Header