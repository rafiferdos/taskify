import axios from "axios";
import Cards from "../components/Cards";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";


const Home = () => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/api/notes")
            .then((response) => {
                setNotes(response.data.notes);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [notes]);

    return (
        <div className="min-h-[calc(100vh-352px)] max-w-7xl container mx-auto w-11/12">
            <div className="grid grid-cols-1 my-16 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 shadow-2xl">
                {
                    notes.map((note) => <Cards key={note._id} note={note} />)
                }

            </div>
        </div>
    );
};

export default Home;