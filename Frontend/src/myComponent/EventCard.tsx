import { Link } from "react-router";
import { PercentSquareIcon } from "lucide-react"

interface EventType {
  _id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  image: string;
}

interface EventCardProps {
    event: EventType
}

const EventCard = ({ event }: EventCardProps) => {

    const imageUrl = event.image ? `http://localhost:3001${event.image}` : null;

  return (
    <div
      className="card bg-blue-700 hover:shadow-xl transition-all duration-300 ease-in-out border-t-4 border-solid border-yellow-500 rounded-lg z-20 flex flex-col overflow-hidden"
    >
        {imageUrl && event.image.trim() !== "" ? ( // Check if imageUrl is valid and event.image is not just whitespace
            <img src={imageUrl} className="w-full h-48 object-contain border border-blue-500" />
        ) : (
            <div className="w-full h-48 bg-blue-800 flex items-center justify-center text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
        )}
        <div className="card-body p-5 flex flex-col gap-3 flex-grow">
            <div className="flex flex-col gap-2 flex-grow">
                <h3 className="text-2xl tracking-tight font-bold font-sans text-white">{event.title}</h3>
                <p className="font-normal text-sm text-blue-200 line-clamp-3 flex-grow">{event.description}</p>
                <div className="mt-2">
                    <p className="text-sm font-semibold text-blue-100"><span className="font-bold text-yellow-400">Venue:</span> {event.venue}</p>
                </div>
                <div className="flex gap-4">
                    <p className="text-sm font-semibold text-blue-100"><span className="font-bold text-yellow-400">Date:</span> {event.date}</p>
                    <p className="text-sm font-semibold text-blue-100"><span className="font-bold text-yellow-400">Time:</span> {event.time}</p>
                </div>
            </div>
            <Link to={`/edit/${event._id}`}  className="flex justify-end mt-auto pt-3">
                    <PercentSquareIcon className="size-5 cursor-pointer text-yellow-400 hover:text-yellow-300" />
            </Link>

        </div>
    </div>
  )
}

export default EventCard



{/* <div className="flex justify-between items-center mt-6">
    <span className="text-sm text-gray-300">{formatDate(new Date(event.createdAt))}</span>
    <div className="flex items-center gap-2">
        <PercentSquareIcon className="size-4 cursor-pointer" />
            <button className="btn btn-xs text-red-700 cursor-pointer" onClick={(e)=> handleDelete(e, note._id)}>
            <Trash2Icon className="size-4"/>
        </button>
    </div>
</div> */}