import { Link } from "react-router"

const EventAvailability = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center z-20">
        <h3 className="text-2xl font-bold">No Event available</h3>
        <p className="text-white">
            Ready to create awareness for your event? Create your Event and make it reach more people here.
        </p>
        <Link to={"/create"}>
            <button className="btn bg-yellow-400 font-mono text-blue-950 px-4 py-2 rounded-full">
                Create your Event
            </button>
        </Link>
    </div>
  )
}

export default EventAvailability