import { useState, useEffect } from "react"
import axios, { AxiosError } from "axios"
import RateLimited from "../myComponent/RateLimit"
import toast from "react-hot-toast"
import EventCard from "../myComponent/EventCard"
import EventAvailability from "../myComponent/EventAvailability"
import SearchHeader from "../myComponent/SearchHeader"
import { LoaderIcon } from "lucide-react"

interface EventType {
  _id: string;
  image: string
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
}

const List = () => {
  const [isRateLimited, setIsRateLimted] = useState(false)
  const [events, setEvents] = useState<EventType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(()=>{
    const fetchEvents = async ()=>{
      try{
        // const res = await fetch("https://localhost:5001/api/notes")
        // const data = await res.json()
        // console.log(data);
        const res = await axios.get("http://localhost:3001/api/events");
        setEvents(res.data)
        setIsRateLimted(false)

      } catch(error){
        console.error("Error fetching Events", error)
        console.log(error); 
        const axiosError = error as AxiosError   
        if(axiosError.response?.status === 429){
          setIsRateLimted(true)
        } else{
          toast.error("Fail to load Events")
        }
      } finally{
        setLoading(false)
      }
    }

    fetchEvents();
  }, [])

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  }

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-600">
      {/* <div className="absolute inset-0 bg-blue-900/85 justify-between z-10"></div> */}
      <div className="z-20">
        <SearchHeader searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {isRateLimited && <RateLimited />}
      

      <div className="max-w-7xl mx-auto p-4 mt-6 text-white z-20">
        {loading && <div className="w-full flex justify-center">
            <div className="text-center text-gray-200 py-10 flex gap-2 font-mono"><LoaderIcon className='animate-spin size-5'/>Loading events...</div>
          </div>}

        {!loading && filteredEvents.length === 0 && !isRateLimited && <EventAvailability />}

        {!loading && filteredEvents.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.map(event =>(
                <EventCard key={event._id} event={event}/>
              ))}
          </div>
        )}
      </div>
      </div>

    </div>
  )
}

export default List