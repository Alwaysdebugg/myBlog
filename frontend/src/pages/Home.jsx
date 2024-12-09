import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="px-8 md:px-[200px] py-8">
      <HomePosts/>
    </div>
    <Footer/>
    </>
  )
}

export default Home
