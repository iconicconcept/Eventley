import { useState, type ChangeEvent } from "react"
import { useNavigate, Link } from "react-router"
import { ArrowLeftIcon } from "lucide-react"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast" 

const Create = () => {
    const navigate = useNavigate()
    const [ title, setTitle ] = useState<string>("")
    const [ venue, setVenue ] = useState<string>("")
    const [ date, setDate ] = useState<string>("")
    const [ time, setTime ] = useState<string>("")
    const [ description, setDescription ] = useState<string>("")
    const [ image, setImage ] = useState<File | null>(null)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    if(!title.trim() || !description.trim() || !venue.trim() || !date.trim() || !time.trim() || !image){
      toast.error("All fields are required!");
      return;
    }

    setLoading(true)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("venue", venue);
    formData.append("date", date);
    formData.append("time", time);
    if (image) {
      formData.append("image", image);
    }

    try{
      await axiosInstance.post("/events", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Event created successfully!")
      navigate("/lists")
    } catch(error){
      console.error("Error Creating Event", error);
      toast.error("Failed to create event. Please try again.")
   
    } finally{
      setLoading(false)
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  }

  return (
    <div className="sec relative min-h-screen">
        {/* <div className="absolute inset-0 bg-blue-900/60 z-3"></div> */}
            <div className="mx-auto py-8 px-4 z-20">
                <div className="max-w-2xl mx-auto">
                    <Link to={"/home"} className="btn text-white cursor-pointer mb-6 flex items-center gap-1 bg-blue-600 hover:bg-transparent hover:border hover:border-yellow-400 w-max px-3 py-1 rounded-full">
                        <ArrowLeftIcon className="size-4"/>
                        <span className="tracking-tight">Back</span>
                    </Link>

                    <div className="card w-full rounded-[10px] bg-blue-600 text-white">
                        <div className="card-body p-8">
                        <h2 className="text-2xl card-title mb-4">Create New Event</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-4 flex flex-col gap-2">
                                <label htmlFor="title">Title</label>
                                <input type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter event title"
                                    className="input border px-2 py-2 rounded-[9px]"
                                    value={title} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>)=> setTitle(e.target.value)}
                                />
                            </div>

                            <div className="form-control mb-4 flex flex-col gap-2 mt-2">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe the event"
                                    className="input border px-2 py-1 rounded-[9px] max-h-18 min-h-18"
                                    value={description} 
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>)=> setDescription(e.target.value)}
                                />
                            </div>

                            <div className="form-control mb-4 flex flex-col gap-2 mt-2">
                                <label htmlFor="venue">Venue</label>
                                <input type="text"
                                    id="venue"
                                    name="venue"
                                    placeholder="Give the event venue"
                                    className="input border rounded-[9px] px-2 py-2"
                                    value={venue}
                                    onChange={(e: ChangeEvent<HTMLInputElement>)=> setVenue(e.target.value)}
                                />
                            </div>

                            <div className="form-control mb-4 flex flex-col gap-2 mt-2">
                                <label htmlFor="date">Date</label>
                                <input type="text"
                                    id="date"
                                    name="date"
                                    placeholder="YYYY-MM-DD"
                                    className="input border px-2 py-2 rounded-[9px]"
                                    value={date}
                                    onChange={(e: ChangeEvent<HTMLInputElement>)=> setDate(e.target.value)}
                                />
                            </div>

                            <div className="form-control mb-4 flex flex-col gap-2 mt-2">
                                <label htmlFor="time">Time</label>
                                <input type="text"
                                    id="time"
                                    name="time"
                                    placeholder="HH:MM AM/PM"
                                    className="input border px-2 py-2 rounded-[9px]"
                                    value={time} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>)=> setTime(e.target.value)}
                                />
                            </div>

                            <div className="form-control mb-4 flex flex-col gap-2 mt-2">
                                <label htmlFor="image">Event Image</label>
                                <input type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    className="input border px-2 py-2 rounded-[9px] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                                    onChange={handleImageChange}
                                />
                            </div>
                    
                            <div className="card-action flex flex-col md:flex-row lg:flex-row justify-between items-center bg-green mt-10">
                                <p className="text-red-400 text-[16px] font-medium mt-4 md:mt-0 lg:mt-0 leading-tight order-2 md:order-1 lg:order-1 text-center">Ensure all details are well filled before creating!</p>
                                <button type="submit" className="btn bg-yellow-400 font-medium cursor-pointer rounded-full px-3 py-2 text-blue-950 tracking-tight" disabled={loading}>
                                    {loading ? "Creating..." : "Create Event"}
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
  )
}

export default Create
