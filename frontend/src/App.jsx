import {Route,Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreatePost from "./pages/CreatePost"
import './index.css';
import PostDetails from './pages/PostDetails';
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import { UserProvider } from './context/UserContext'
const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/write" element={<CreatePost/>}/>
        <Route exact path="/edit/:id" element={<EditPost/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/posts/post/:id" element={<PostDetails/>}/>
      </Routes>
    </UserProvider>
  )
}

export default App
