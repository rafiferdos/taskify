import { useContext } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Cards = ({note}) => {
    const {user} = useContext(AuthContext);
    // eslint-disable-next-line react/prop-types
    const {title, description, image_url, id} = note;

    const handleDelete = () => {
        axios.delete(`http://localhost:9000/api/notes/${id}`)
    }


    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img src={image_url} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    {
                        user ? (
                            <button onClick={()=> handleDelete(id)} className="btn btn-primary">Delete</button>
                        )
                        : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Cards;