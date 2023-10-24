import React, {useState, useContext} from 'react';
import axios from 'axios';
import './ImageSection.css';
import AuthContext from './../../Contexts/authContext';
import { uploadToFirebase } from './../../firebase/storageService';

const ImageSection = () => {
    const [image, updateImage] = useState();
    const [prompt, updatePrompt] = useState();
    const [loading, updateLoading] = useState();
    const {user} = useContext(AuthContext);

    const handleUpload = async () => {
        try {
            await uploadToFirebase(image, user);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    };

    const generate = async (prompt) => {
        updateLoading(true);
        const result = await axios.get(`http://127.0.0.1:80/?prompt=${prompt}`);
        updateImage(result.data);
        updateLoading(false);
    };

    function base64ToBlob(base64) {
        const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/png' });
    }

    function downloadImage(base64, filename = 'download.png') {
        const blob = base64ToBlob(base64);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="imgSection">
            <input
                value={prompt}
                onChange={(e) => updatePrompt(e.target.value)}
                width={"350px"}
            ></input>
            <button onClick={(e) => generate(prompt)}>
                Generate
            </button>

            {loading ? (<p>Your image is generating....</p>): null}

            {image ? (<img className="sd-img" src={`data:image/png;base64,${image}`} />) :(<p>There is currently no image</p>)}
            {user && image && <button onClick={handleUpload}>Save Image</button>}
            {image ? <button onClick={() => downloadImage(image)}>Download Image</button> : null}
        </div>
    )
}

export default ImageSection;