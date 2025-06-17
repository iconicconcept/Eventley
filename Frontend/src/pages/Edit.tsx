import { useEffect, useState, type ChangeEvent} from 'react'
import { useNavigate, useParams, Link } from 'react-router'

import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'

interface EventType {
  _id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  time: string;
  image?: string;
}

const Edit = () => {
  const [events, setEvents] = useState<EventType | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [errorFetching, setErrorFetching] = useState<string | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  


  useEffect(()=>{
    const fetchNote = async ()=>{
      try {
        const res = await axiosInstance.get(`/events/${id}`)
        setEvents(res.data)
        setErrorFetching(null)
      } catch (error) {
        console.error("Error in fetching events", error);
        toast.error("Fail to fetch the events")
        setErrorFetching("Failed to load event data. Please try again!")
      } finally {
        setLoading(false)
      };
    }

    fetchNote();
  }, [id])

  const handleDelete = async ()=>{
    if(!window.confirm("Are you sure you want to delete this event data?")) return;

    try {
      await axiosInstance.delete(`/events/${id}`);
      toast.success("Event deleted successfully!");
      navigate("/lists")
    } catch (error) {
      console.log("Error deleting this event", error);
      toast.error("Fail to delete event");
    }
  };

  const handleSave = async ()=>{
    if(!events) return;
    if(!events.title.trim() || !events.description.trim() || !events.venue.trim() || !events.date.trim() || !events.time.trim()){
      toast.error("Please add a title & content");
      return
    }
    if(!window.confirm("Are you sure you want to update this event Data?")) return;

    setSaving(true)
    const formData = new FormData();
    formData.append("title", events.title);
    formData.append("description", events.description);
    formData.append("venue", events.venue);
    formData.append("date", events.date);
    formData.append("time", events.time);
    if (newImageFile) {
      formData.append("image", newImageFile);
    }

    try {
      await axiosInstance.put(`http://localhost:3001/api/events/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success("Event data updated Successfully!")
      navigate("/lists")
    } catch (error) {
      console.log("Error saving event data", error);
      toast.error("Fail to update event data");  
    } finally{
        setSaving(false)
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setNewImageFile(e.target.files[0]);
  };

  if (loading){
    return (
      <div className='min-h-screen flex bg-blue-950 items-center justify-center'>
        <LoaderIcon className='animate-spin size-10 text-white'/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-800">
      <div className="mx-auto py-8 px-4 container">
        {errorFetching && (
          <div className="max-w-2xl mx-auto p-4 mb-4 text-center text-red-700 bg-red-100 border border-red-400 rounded">
            {errorFetching}
             <Link to="/lists" className="block mt-2 text-blue-500 hover:underline">Go back to list</Link>
          </div>
        )}

        {!loading && !errorFetching && events && ( // Render form only if data is loaded and no error
        <div className="max-w-2xl mx-auto">
          
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/lists"} className="btn text-white cursor-pointer mb-6 flex items-center gap-1 hover:border bg-blue-600 hover:border-green-900 px-3 py-1 rounded-full">
              <ArrowLeftIcon className="size-4"/>
              <span className="tracking-tight">Back</span>
            </Link>
            <button className="btn border border-red-500 hover:bg-red-500 text-[14px] rounded-full px-2 py-1 text-white flex items-center gap-1" onClick={handleDelete}>
              <Trash2Icon className='h-4 w-4'/>
              Delete Note
            </button>
          </div>

          {events.image && !newImageFile && (
            <div className="mb-4">
              <p className="text-sm text-white mb-1">Current Image:</p>
              <img src={`http://localhost:3001${events.image}`} alt={events.title} className="max-w-xs max-h-48 rounded object-cover"/>
            </div>
          )}
          {newImageFile && <p className="text-sm text-white mb-2">New image selected: {newImageFile.name}</p>}

          <div className="card w-full rounded-[10px] bg-blue-600 text-white">
            <div className="card-body p-5">
              <div className="form-control mb-4 flex flex-col gap-2">
                  <label htmlFor="title">Title</label>
                  <input type="text"
                    placeholder="Enter event title"
                    className="input border px-2 py-2 rounded-[9px]"
                    value={events.title}
                    onChange={(e)=> setEvents(prevEvent=> prevEvent?{...prevEvent, title: e.target.value}: null)}
                  />
                </div>

                <div className="form-control mb-4 flex flex-col gap-2 mt-2">
                  <label htmlFor="title">Description</label>
                  <input type="text"
                    id="title"
                    name="title"
                    placeholder="Describe the event"
                    className="input border px-2 py-1 rounded-[9px] max-h-18 min-h-18"
                    value={events.description}
                    onChange={(e)=> setEvents(prevEvent=> prevEvent?{...prevEvent, description: e.target.value}: null)}
                  />
                </div>
                <div className="form-control mb-4 flex flex-col gap-2">
                  <label htmlFor="venue">Venue</label>
                  <input type="text"
                    id="venue"
                    name="venue"
                    placeholder="Describe the event"
                    className="input border px-2 py-2 rounded-[9px]"
                    value={events.venue}
                    onChange={(e)=> setEvents(prevEvent=> prevEvent?{...prevEvent, venue: e.target.value}: null)}
                  />
                </div>
                <div className="form-control mb-4 flex flex-col gap-2">
                  <label htmlFor="date">Date</label>
                  <input type="text"
                    id="date"
                    name="date"
                    placeholder="YYYY-MM-DD"
                    className="input border px-2 py-2 rounded-[9px]"
                    value={events.date}
                    onChange={(e)=> setEvents(prevEvent=> prevEvent?{...prevEvent, date: e.target.value}: null)}
                  />
                </div>
                <div className="form-control mb-4 flex flex-col gap-2">
                  <label htmlFor="time">Time</label>
                  <input type="text"
                    id="time"
                    name="time"
                    placeholder="HH:MM AM/PM"
                    className="input border px-2 py-2 rounded-[9px]"
                    value={events.time}
                    onChange={(e)=> setEvents(prevEvent=> prevEvent?{...prevEvent, title: e.target.value}: null)}
                  />
                </div>

                <div className="form-control mb-4 flex flex-col gap-2">
                  <label htmlFor="image">Change Event Image (Optional)</label>
                  <input type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="input border px-2 py-2 rounded-[9px] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                      onChange={handleImageChange}
                  />
                </div>

                <div className="card-action flex justify-end bg-green mt-10">
                  <button type="submit" className="btn cursor-pointer bg-yellow-400 font-medium rounded-full px-3 py-2 text-blue-950 tracking-tight" disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save Event"}
                  </button>
                </div>
            </div>
          </div>
        </div>)}
        
      </div>
    </div>
  )
}

export default Edit