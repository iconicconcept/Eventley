import Header from "../myComponent/Header.tsx"
import { Link } from "react-router"

const Home = () => {
  return (
    <div className="sec min-h-screen">
        <div className="absolute inset-0 bg-blue-900/85 z-10 justify-between">
            <Header />

            <div className="flex flex-col items-center justify-center gap-10 md:gap-10 lg:gap-10 xl:gap-10 z-20 px-5 mt-14">
                <h2 className="text-[19px] md:text-[27px] lg:text-[27px] xl:text-[27px] font-bold text-center uppercase text-white md:mt-10 lg:mt-10 xl:mt-10 leading-8">Get to <span className="text-yellow-400 underline-offset-6 underline">Create</span> and <span className="text-yellow-400 underline underline-offset-6">Know</span> the Event Happening in the School</h2>
                <p className="text-[17px] text-white capitalize font-medium text-center"><span className="text-yellow-400 text-[20px]">Eventley</span> is right here for you.</p>
                <p className="text-[17px] text-white capitalize font-normal text-center">You've got an Event you want to Create or Look for?</p>
                <div className="flex flex-col md:flex-row lg:flex-row gap-5 w-full justify-center">
                    <button className="bg-blue-500 w-full md:w-max lg:w-max rounded-[8px] cursor-pointer px-4 md:px-6 lg:px-6 xl:px-6 py-2 text-white"><Link to="/create">Create Event</Link></button>
                    <button className="bg-blue-500 w-full md:w-max lg:w-max rounded-[8px] cursor-pointer px-4 md:px-6 lg:px-6 xl:px-6 py-2 text-white"><Link to="/lists">Check Events</Link></button>
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default Home