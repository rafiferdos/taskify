import Cards from "../components/Cards";


const Home = () => {
    return (
        <div className="min-h-[calc(100vh-352px)] max-w-7xl container mx-auto w-11/12">
            <div className="grid grid-cols-1 my-16 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 shadow-2xl">
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />

            </div>
        </div>
    );
};

export default Home;