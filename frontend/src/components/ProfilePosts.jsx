

const ProfilePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
      <img 
      src="https://fishingbooker-prod-blog-backup.s3.amazonaws.com/blog/media/2019/02/14153142/Cutthroat-Trout.jpg" 
      alt="" 
      className="h-full w-full object-cover"
      />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
      Best fishing practices in North America
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
        <p>@jacky</p>
        <div className="flex space-x-2">
        <p>16/06/2024</p>
        <p>16:45</p>
        </div>
      </div>
      <p className="text-sm md:text-lg">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
      </div>

    </div>
  )
}

export default ProfilePosts
