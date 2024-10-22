const Home = () => {
  return (
    <div className="ml-[250px] flex items-center flex-col home min-h-screen">
      <div className="w-[90%] flex justify-between items-center bg-black h-[500px] rounded-2xl relative overflow-hidden">
        <div></div>
        <div className="relative  h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-10" />
          <img
            className="h-[400px] w-full object-contain"
            src=" https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/10/yhwach-ichigo-and-the-soul-king-in-bleach-thousand-year-blood-war.jpg"
            alt="anime-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
