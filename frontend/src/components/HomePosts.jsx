
const HomePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
      <img 
      src="https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=600" 
      alt="" 
      className="h-full w-full object-cover"
      />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
      10 challenges of machine learning
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
        <p>@jacky</p>
        <div className="flex space-x-2">
        <p>16/06/2023</p>
        <p>16:45</p>
        </div>
      </div>
      <p className="text-sm md:text-lg">life is movie</p>
      </div>

    </div>
  )
}

export default HomePosts
