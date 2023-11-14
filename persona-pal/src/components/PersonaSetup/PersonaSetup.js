import './PersonaSetup.css'
import Navbar from '../Navbar/Navbar'
import ImageSection from '../ImageSection/ImageSection';
import Multiselect from "multiselect-react-dropdown";
import SelectTraits from '../../assets/Select Traits.svg';
import arrowIcon from "../../assets/arrow.svg";
import baseImg from "../../assets/512.png";
import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../Contexts/authContext';
import { getUserImages, uploadToFirebase, getDownloadUrlForFile, removeImageByUrl } from '../../firebase/storageService';
import { storage } from './../../firebase/config';
import axios from 'axios';

// Images
import clean from "../../assets/selections/clean.png";
import creative from "../../assets/selections/creative.png";
import peaceful from "../../assets/selections/peaceful.png";
import reverant from "../../assets/selections/reverant.png";
import charismatic from "../../assets/selections/charismatic.png";
import mischievous from "../../assets/selections/mischievous.png";
import comedic from "../../assets/selections/comedic.png";
import leader from "../../assets/selections/leader.png";
import medieval from "../../assets/selections/medieval.png";
import modern from "../../assets/selections/modern.png";
import futuristic from "../../assets/selections/futuristic.png";
import ancient from "../../assets/selections/ancient.png";
import proud from "../../assets/selections/proud.png";
import lazy from "../../assets/selections/lazy.png";
import depressed from "../../assets/selections/depressed.png";
import gluttonous from "../../assets/selections/gluttonous.png";
import human from "./../../assets/selections/human.png";
import orc from "./../../assets/selections/orc.png";
import elf from "./../../assets/selections/elf.png";
import fairy from "./../../assets/selections/fairy.png";

const promptTemplate = "${0}, ${1}, ${3}, ${2} ${4}, masterpiece, best quality, high quality, self portrait";
const ProfileSetup = () => {
    const [selection1, setSelection1] = useState(["Clean","Creative","Peaceful","Reverant"]);
    const [selection2, setSelection2] = useState(["Charismatic","Mischievous","Comedic","Leader"]);
    const [selection3, setSelection3] = useState(["Medieval","Modern","Futuristic","Ancient"]);
    const [selection4, setSelection4] = useState(["Proud","Lazy","Depressed","Gluttonous"]);
    const [selection5, setSelection5] = useState(["Human","Orc","Elf","Fairy"]);

    const selectionImages1 = [
        clean,
        creative,
        peaceful,
        reverant,
    ];
    const selectionImages2 = [
        charismatic,
        mischievous,
        comedic,
        leader,
    ];
    const selectionImages3 = [
        medieval,
        modern,
        futuristic,
        ancient,
    ];
    const selectionImages4 = [
        proud,
        lazy,
        depressed,
        gluttonous,
    ];
    const selectionImages5 = [
        human,
        orc,
        elf,
        fairy,
    ];

    const [selectedOptions, setSelectedOptions] = useState(["", "", "", "", ""]);
    {/* Firebase states*/}
    const [images, setImages] = useState([]);
    const [userImage1, setUserImage1] = useState();
    const [userImage2, setUserImage2] = useState();
    const [userImage3, setUserImage3] = useState();
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);
    {/* Image States */}
    const [image, updateImage] = useState();
    const [prompt, updatePrompt] = useState();

    {/*selector state */}
    const [currentStep, setCurrentStep] = useState(0);
    
    const handleNext = () => {
        if (currentStep < 4 ) setCurrentStep(currentStep + 1);
    }

    const handleBack = () => {
        if (currentStep > 0 ) setCurrentStep(currentStep - 1);
    }

    const handleDropdownSelect = (index, selectedOption) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = selectedOption;
        setSelectedOptions(newSelectedOptions);
    };

    const renderOptions = (name, options, stepIndex) => (
        <div>
            <p className="options-title">{name}</p>
            <div className="options-grid">
                {options.map(option => (
                <div
                    key={option.name}
                    className={`option ${selectedOptions[stepIndex] === option.name ? 'selected' : ''}`}
                    onClick={() => handleDropdownSelect(stepIndex, option.name)}
                >
                    <img src={option.image} alt={option.name} />
                    <p>{option.name}</p>
                </div>
                ))}
            </div>
        </div>
    );

    const renderCurrentStep = () => {
        let options;
        let images;
        let name;
        switch (currentStep) {
            case 0:
                name = "Needs";
                options = selection1;
                images = selectionImages1;
                break;
            case 1:
                name = "Skills";
                options = selection2;
                images = selectionImages2;
                break;
            case 2:
                name = "Period";
                options = selection3;
                images = selectionImages3;
                break;
            case 3:
                name = "Vice";
                options = selection4;
                images = selectionImages4;
                break;
            case 4:
                name = "Race";
                options = selection5;
                images = selectionImages5;
                break;
        }

        const combinedOptions = options.map((name, index) => ({
            name, 
            image: images[index]
        }));

        return renderOptions(name, combinedOptions, currentStep);
    }

    const handleDropdownRemove = (index) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index - 1] = "";
        setSelectedOptions(newSelectedOptions);
    };

    const handleSubmit = () => {
        // Check if any of the selected strings are empty
        console.log(selectedOptions);
        if (!user) {
            alert("Please Log In.");
            return;
        }
        if (selectedOptions.some((option) => option === "")) {
            // If any of the strings are empty, prevent the submission
            alert("Please select an option from all dropdowns.");
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
                getDownloadUrlForFile(`userImages/${user.uid}/image1.png`)
                    .then((downloadURL) => {
                        if (downloadURL !== null) {
                            setUserImage1(downloadURL);
                        }
                    });
                getDownloadUrlForFile(`userImages/${user.uid}/image2.png`)
                .then((downloadURL) => {
                    if (downloadURL !== null) {
                        setUserImage2(downloadURL);
                    }
                });
                getDownloadUrlForFile(`userImages/${user.uid}/image3.png`)
                .then((downloadURL) => {
                    if (downloadURL !== null) {
                        setUserImage3(downloadURL);
                    }
                });
                
            } catch (error) {
                console.error("Error fetching user images:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchImages();
    }, [user]);

    {/* Image functions */}
    const handleUpload = async (index) => {
        try {
            await uploadToFirebase(image, user, index);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
        const downloadUrl = getDownloadUrlForFile(`userImages/${user.uid}/image${index}.png`)
        if (index === 1) {
            setUserImage1(downloadUrl);
        }
        if (index === 2) {
            setUserImage2(downloadUrl);
        }
        if (index === 3) {
            setUserImage3(downloadUrl);
        }
    };

    const handleRemove = async(index) => {
        try {
            await removeImageByUrl(`userImages/${user.uid}/image${index}.png`)
            alert('Image removed Sucessfully!');
        } catch (error) {
            console.error('Error removing image:', error);
            alert('Failed to remove image');
        }
        if (index === 1) {
            setUserImage1(null);
        }
        if (index === 2) {
            setUserImage2(null);
        }
        if (index === 3) {
            setUserImage3(null);
        }
    }

    const handleLoadImage = async(index) => {
        
        getDownloadUrlForFile(`userImages/${user.uid}/image${index}.png`)
        .then((url) => {
            return fetch(url);
        })
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
            let base64String = reader.result;
            // Remove the data URL header (e.g., 'data:image/png;base64,')
            base64String = base64String.replace(/^data:image\/(png|jpeg);base64,/, '');
            updateImage(base64String);
            };
            reader.readAsDataURL(blob);
        })
        .catch((error) => {
            console.error('Error fetching and converting image:', error);
        });    
    };

    const handleDownload = async() => {
        if (!user || !image) {
            alert("Please log in or generate an image!");
        }
        else {
            downloadImage(image);
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
    };

    function downloadImage(base64, filename = 'download.png') {
        const blob = base64ToBlob(base64);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



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
                        {renderCurrentStep()}
                        <div className="selector-buttons">
                            <button onClick={handleBack} disabled={currentStep === 0}>Back</button>
                            <button onClick={handleNext} disabled={currentStep === 4}>Next</button>
                        </div>
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
                    <button className="download-btn" onClick={handleDownload}>Download Image</button>
                </div>

                <div className='savedImages'>
                    <div className='arrowArea'>
                        <img src={arrowIcon} alt='arrowIcon' onClick={toggleVisibility} className={imageFlipped ? 'flipped' : ''}/>
                    </div>
                    {drawerVisibility && (
                        <div className='savedDetails'>
                            {user ?
                            (<div className="user-images">
                                <div className="userImage-1">
                                    {userImage1 ? 
                                    <div className="saved-render">
                                        <div className="saved-buttons">
                                            <button onClick={() => handleLoadImage(1)}>Load</button>
                                            <button onClick={() => handleRemove(1)}>Remove</button>
                                        </div>
                                        <img className="saved-img" src={userImage1} alt="User's saved" style={{ width: '150px', margin: '10px' }} />
                                    </div> 
                                    : 
                                    <div>
                                        <button class="save-btn" onClick={() => handleUpload(1)}>Save to slot 1</button>
                                    </div>}
                                </div>

                                <div className="userImage-2">
                                    {userImage2 ? 
                                    <div className="saved-render">
                                        <div className="saved-buttons">
                                            <button onClick={() => handleLoadImage(2)}>Load</button>
                                            <button onClick={() => handleRemove(2)}>Remove</button>
                                        </div>
                                        <img className="saved-img" src={userImage2} alt="User's saved" style={{ width: '150px', margin: '10px' }} />
                                    </div> 
                                    : 
                                    <div>
                                        <button class="save-btn" onClick={() => handleUpload(2)}>Save to slot 2</button>
                                    </div>}
                                </div>

                                <div className="userImage-3">
                                    {userImage3 ? 
                                    <div className="saved-render">
                                        <div className="saved-buttons">
                                            <button onClick={() => handleLoadImage(3)}>Load</button>
                                            <button onClick={() => handleRemove(3)}>Remove</button>
                                        </div>
                                        <img className="saved-img" src={userImage3} alt="User's saved" style={{ width: '150px', margin: '10px' }} />
                                    </div> 
                                    : 
                                    <div>
                                        <button class="save-btn" onClick={() => handleUpload(3)}>Save to slot 3</button>
                                    </div>}
                                </div>
                            </div>)
                            :
                            (<div className="pls-login"> Please Log In</div>) }
                            
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