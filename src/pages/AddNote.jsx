import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImageUrl] = useState('');

    const handleAddNote = async () => {
        try {
            await axios.post('/api/notes', { title, description, image_url }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTitle('');
            setDescription('')
            setImageUrl('');
            toast.success('Note added successfully');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while adding the note');
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen flex-col space-y-5">
            <Toaster />
            <label className="input input-bordered flex items-center gap-2">
                Title
                <input 
                    type="text" 
                    className="grow" 
                    placeholder="Daisy" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </label>
            <textarea 
                className="textarea textarea-bordered" 
                placeholder="Bio" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label className="input input-bordered flex items-center gap-2">
                Image URL
                <input 
                    type="text" 
                    className="grow"
                    value={image_url} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                />
            </label>
            <button 
                className="btn btn-secondary btn-outline" 
                onClick={handleAddNote}
            >
                Add Note
            </button>
        </div>
    );
};

export default AddNote;