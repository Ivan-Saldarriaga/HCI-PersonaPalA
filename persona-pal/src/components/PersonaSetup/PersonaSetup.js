import './PersonaSetup.css'
import Navbar from '../Navbar/Navbar'
import ImageSection from '../ImageSection/ImageSection';
import Multiselect from "multiselect-react-dropdown";
import SelectTraits from '../../assets/Select Traits.svg';
import arrowIcon from "../../assets/arrow.svg";
import baseImg from "../../assets/512.png";
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../Contexts/authContext';
import { getUserImages, uploadToFirebase } from '../../firebase/storageService';
import axios from 'axios';

const promptTemplate = "${0}, ${1}, ${3}, ${2} ${4}, masterpiece, best quality, high quality";
const ProfileSetup = () => {
    const [selection1, setSelection1] = useState(["Clean","Creative","Peacefull","Reverant"]);
    const [selection2, setSelection2] = useState(["Charismatic","Mischievous","Comedic","Leader"]);
    const [selection3, setSelection3] = useState(["Medieval","Modern","Futuristic","Ancient"]);
    const [selection4, setSelection4] = useState(["Proud","Lazy","Depressed","Gluttonous"]);
    const [selection5, setSelection5] = useState(["Human","Orc","Elf","Fairy"]);
    const [selectedOptions, setSelectedOptions] = useState(["", "", "", "", ""]);
    {/* Firebase states*/}
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);
    {/* Image States */}
    const [image, updateImage] = useState();
    const [prompt, updatePrompt] = useState();

    const handleDropdownSelect = (index, selectedOption) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index - 1] = selectedOption;
        setSelectedOptions(newSelectedOptions);
    };

    const handleDropdownRemove = (index) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index - 1] = "";
        setSelectedOptions(newSelectedOptions);
    };
    const handleSubmit = () => {
        // Check if any of the selected strings are empty
        if (selectedOptions.some((option) => option === "")) {
            // If any of the strings are empty, prevent the submission
            console.log("Please select an option from all dropdowns.");
            return;
        }

        // If all strings are selected, proceed with the submission
        console.log(selectedOptions);
        // You can use selectedOptions as needed for the submission.
        // Input is all good to go
        const prompt = promptTemplate.replace(/\$\{(\d)\}/g, (match, index) => selectedOptions[index])
        console.log(prompt);
        generate(prompt);
    };

    {/* Firbase Code Section */}
    useEffect(() => {
        const fetchImages = async () => {
            if (!user || !user.uid) {
                console.warn('User not available.');
                setLoading(false);
                return;
            }
            try {
                const imageURLs = await getUserImages(user);
                setImages(imageURLs);
            } catch (error) {
                console.error("Error fetching user images:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchImages();
    }, [user]);

    {/* Image functions */}
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
        setLoading(true);
        const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
        updateImage(result.data);
        setLoading(false);
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



    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const [imageFlipped, flipImage] = useState(false);
    const toggleVisibility = () => {
        setDrawerVisibility(!drawerVisibility);
        flipImage(!imageFlipped);
    }
    return (  
        <>
            <Navbar/>
            <div className = "page-container">
                <div className="independentVar">
                    <img src={SelectTraits} alt='header'/>
                    <div className='dropdown'>
                        <Multiselect
                        options={selection1}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(1, selectedOption)}
                        onRemove={() => handleDropdownRemove(1)}
                        placeholder="Needs" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection2}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(2, selectedOption)}
                        onRemove={() => handleDropdownRemove(2)}
                        placeholder="Skill" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection3}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(3, selectedOption)}
                        onRemove={() => handleDropdownRemove(3)}
                        placeholder="Period" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection4}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(4, selectedOption)}
                        onRemove={() => handleDropdownRemove(4)}
                        placeholder="Vice" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection5}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(5, selectedOption)}
                        onRemove={() => handleDropdownRemove(5)}
                        placeholder="Race" // Property name to display in the dropdown options
                        />
                    </div>
                    <div className='buttonArea'>
                        <button className='submitButton' onClick={handleSubmit}>Submit!</button>
                    </div>
                </div>
                <div className='imageArea'>
                    <div className='imageHolder'>
                        <div className='imageContainer'>
                            {loading ? (<p>Your image is generating....</p>): null}

                            {image ? (<img className="sd-img" src={`data:image/png;base64,${image}`} />) :(<p>There is currently no image</p>)}
                            {/*
                            {user && image && <button onClick={handleUpload}>Save Image</button>}
                            {image ? <button onClick={() => downloadImage(image)}>Download Image</button> : null}
                            */}
                        </div>
                    </div>
                </div>
                <div className='savedImages'>
                    <div className='arrowArea'>
                        <img src={arrowIcon} alt='arrowIcon' onClick={toggleVisibility} className={imageFlipped ? 'flipped' : ''}/>
                    </div>
                    {drawerVisibility && (
                        <div className='savedDetails'>
                            {user ? <div className="userImages">{images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt="User's saved" style={{ width: '150px', margin: '10px' }} />
                            ))}</div> : <div>Please log in</div>}
                        </div>
                    )}
                </div>
                {/* adds overlay infornt of everything excepot the saved iamges div (goes away on click of the arrow) NOT NECESARY */}
                {drawerVisibility && (
                        <div className='overlay'>
                        </div>
                    )}
            </div>
        </>
    );
}
 
export default ProfileSetup;