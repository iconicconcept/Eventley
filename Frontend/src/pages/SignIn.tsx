import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import axiosInstance from "../lib/axios"
import { type ChangeEvent, useState } from "react"
import { ArrowRightIcon } from "lucide-react"
const SignIn = () => {
  const [number, setNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    
    if(!number.trim() || !password.trim()){
      toast.error("All details are required!");
      return;
    }

    setLoading(true)    

    try{
      await axiosInstance.post("/user/login", {
        number,
        password  
      });
      toast.success("SignIn successfully!")
      navigate("/home")
    } catch(error){
      console.error("Error signing In", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          toast.error("Account not found. Please check your phone number or sign up.");
        } else if (axiosError.response?.status === 401) {
          toast.error("Invalid phone number or password.");
        } else {
          toast.error("Failed to sign in. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
   
    } finally{
      setLoading(false)
    }
  }

  return (
    <>
    <div className="sec relative min-h-screen">
        {/* <div className="absolute inset-0 bg-blue-900/60 z-3"></div> */}
            <div className="mx-auto py-8 px-4 z-20">
                <div className="max-w-xl mx-auto flex flex-col items-center">
                 <div className="flex flex-col mb-7 items-center">
                  <h1 className="text-3xl tracking-tighter font-bold font-mono text-yellow-400 ">EVENTLEY</h1> 
                  <p className="text-[16px] font-mono font-semibold text-white">Welcome</p>
                 </div>
                  <div className="card w-full rounded-[10px] bg-blue-600 text-white">
                        <div className="card-body p-8">
                          <h2 className="text-2xl card-title mb-4">SignIn</h2>
                          <form onSubmit={handleSubmit}>

                            {/* email input */}
                              <div className="form-control mb-4 flex flex-col gap-2">
                                  <label htmlFor="number">Phone Number</label>
                                  <input type="text"
                                      id="number"
                                      name="number"
                                      placeholder="Phone Number"
                                      className="input border px-2 py-2 rounded-[9px]"
                                      value={number} 
                                      onChange={(e: ChangeEvent<HTMLInputElement>)=> setNumber(e.target.value)}
                                  />
                              </div>

                              {/* password input */}
                              <div className="form-control mb-4 flex flex-col gap-2">
                                  <label htmlFor="password">Password</label>
                                  <input type="password"
                                      id="password"
                                      name="password"
                                      placeholder="Enter your password"
                                      className="input border px-2 py-2 rounded-[9px]"
                                      value={password} 
                                      onChange={(e: ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)}
                                  />
                              </div>

                              {/* form submit button */}

                            <div className="card-action flex justify-start bg-green mt-10 w-full">
                                <button type="submit" className="btn w-full md:w-30 lg:w-30 bg-yellow-400 font-medium cursor-pointer rounded-full px-3 py-2 text-blue-950 tracking-tight" disabled={loading}>
                                    {loading ? "Signing..." : "Sign In"}
                                </button>
                            </div>


                            <div className="flex justify-start items-center gap-1 text-sm md:justify-end lg:justify-end mt-10 ">
                              <span>You don't have an Account?</span>
                            <Link to={"/signup"} className="underline text-yellow-400 text-sm gap-1 flex items-center i-center">
                                <span>Sign Up</span>
                                <ArrowRightIcon className=" mt-1 size-3"/>
                            </Link>
                          </div>

                            </form>
                        </div>
                  </div>
                </div>
            </div>
    </div>

    </>
  )
}

export default SignIn