

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
North America offers diverse fishing environments, from freshwater lakes and rivers to coastal saltwater. Research the specific bodies of water you'll be fishing in to understand the local species, seasonal patterns, and fishing regulations.
Tailor your fishing gear to the type of fishing you'll be doing. For freshwater fishing, consider a medium-action rod and reel combo. For saltwater fishing, heavier gear may be necessary. 
Ensure you have the appropriate lures or baits for the species you're targeting.
Different fish species have varying habits. Learn about the feeding patterns and preferred habitats of your target species. For example, bass are often found near structures like submerged rocks or vegetation, while trout prefer cooler, clear water.
Local fishing forums, guides, and bait shops can provide valuable insights into current fishing conditions and hotspots. Don’t hesitate to ask for advice from experienced anglers in the area.
Practice Patience and Technique: Fishing requires patience and skill. Pay attention to your casting technique, the retrieve speed, and how you present your bait. Practice makes perfect, so spend time honing your skills.
Adhere to local fishing regulations, including size and bag limits, to ensure sustainable fishing practices and protect fish populations. Always check the latest rules before heading out.
Safety is paramount. Wear a life jacket when fishing from a boat, and be aware of weather conditions. Bring necessary safety equipment, including a first-aid kit, and inform someone of your fishing plans.
      </p>
      </div>

    </div>
  )
}

export default ProfilePosts
