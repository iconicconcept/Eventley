import Home from "./pages/Home"
import Create from "./pages/Create"
import List from "./pages/List"
import Edit from "./pages/Edit"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import TC from "./pages/T&C" 

import {Routes, Route} from "react-router"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/lists" element={<List />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/term" element={<TC />} />
      </Routes>
    </>
  )
}

export default App