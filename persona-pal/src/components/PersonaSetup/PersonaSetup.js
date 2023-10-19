import './PersonaSetup.css'
import Navbar from '../Navbar/Navbar'
import Multiselect from "multiselect-react-dropdown";
import SelectTraits from '../../assets/Select Traits.svg';
import arrowIcon from "../../assets/arrow.svg";
import baseImg from "../../assets/512.png";
import { useState } from 'react';
const ProfileSetup = () => {
    const [selection1, setSelection1] = useState(["op1","op2","op3","op4"]);
    const [selection2, setSelection2] = useState(["op1","op2","op3","op4"]);
    const [selection3, setSelection3] = useState(["op1","op2","op3","op4"]);
    const [selection4, setSelection4] = useState(["op1","op2","op3","op4"]);
    const [selection5, setSelection5] = useState(["op1","op2","op3","op4"]);
    const [selectedOptions, setSelectedOptions] = useState(["", "", "", "", ""]);
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
                        <Multiselect
                        options={selection1}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(1, selectedOption)}
                        onRemove={() => handleDropdownRemove(1)}
                        placeholder="selection1" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection2}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(2, selectedOption)}
                        onRemove={() => handleDropdownRemove(2)}
                        placeholder="selection2" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection3}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(3, selectedOption)}
                        onRemove={() => handleDropdownRemove(3)}
                        placeholder="selection3" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection4}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(4, selectedOption)}
                        onRemove={() => handleDropdownRemove(4)}
                        placeholder="selection4" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection5}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(selectedOption) => handleDropdownSelect(5, selectedOption)}
                        onRemove={() => handleDropdownRemove(5)}
                        placeholder="selection5" // Property name to display in the dropdown options
                        />
                    </div>
                    <div className='buttonArea'>
                        <button className='submitButton' onClick={handleSubmit}>Submit!</button>
                    </div>
                </div>
                <div className='imageArea'>
                    <div className='imageHolder'>
                        <div className='imageContainer'>
                            {/* <img src={baseImg} alt='baseimg'/> */}
                        </div>
                    </div>
                </div>
                <div className='savedImages'>
                    <div className='arrowArea'>
                        <img src={arrowIcon} alt='arrowIcon' onClick={toggleVisibility} className={imageFlipped ? 'flipped' : ''}/>
                    </div>
                    {drawerVisibility && (
                        <div className='savedDetails'>
                            NO SAVED IMAGES
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