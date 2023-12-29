function Home() {
    return (
        <div className="bg-white w-full">
            <div className="w-full h-fit relative ">
                <img
                    src="./background.png"
                    alt="banner"
                    className="w-full object-cover h-[750px]"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-6 flex-col">
                    <h1 className="text-5xl text-white ">
                        Find Your Dream Home
                    </h1>
                    <span className="text-white text-lg flex items-center flex-col">
                        <span>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </span>
                        <span></span>
                        Cupiditate totam repudiandae, officia, molestias natus
                        ad quo dolor inventore numquam ullam, delectus quod aut
                    </span>
                </div>
            </div>
            <div className="w-main mx-auto">Content</div>
        </div>
    );
}

export default Home;
