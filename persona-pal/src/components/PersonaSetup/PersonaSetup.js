import './PersonaSetup.css'
import Navbar from '../Navbar/Navbar'
import Multiselect from "multiselect-react-dropdown";
import SelectTraits from '../../assets/Select Traits.svg';
import arrowIcon from "../../assets/arrow.svg"
import { useState } from 'react';
const ProfileSetup = () => {
    const [selection1, setSelection1] = useState(["op1","op2","op3","op4"]);
    const [selection2, setSelection2] = useState(["op1","op2","op3","op4"]);
    const [selection3, setSelection3] = useState(["op1","op2","op3","op4"]);
    const [selection4, setSelection4] = useState(["op1","op2","op3","op4"]);
    const [selection5, setSelection5] = useState(["op1","op2","op3","op4"]);
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
                        onSelect={(event) => {console.log(event)}} // Function will trigger on select event
                        onRemove={(event) => {console.log(event)}} // Function will trigger on remove event
                        placeholder="selection1" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection2}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(event) => {console.log(event)}} // Function will trigger on select event
                        onRemove={(event) => {console.log(event)}} // Function will trigger on remove event
                        placeholder="selection2" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection3}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(event) => {console.log(event)}} // Function will trigger on select event
                        onRemove={(event) => {console.log(event)}} // Function will trigger on remove event
                        placeholder="selection3" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection4}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(event) => {console.log(event)}} // Function will trigger on select event
                        onRemove={(event) => {console.log(event)}} // Function will trigger on remove event
                        placeholder="selection4" // Property name to display in the dropdown options
                        />
                        <Multiselect
                        options={selection5}
                        isObject = {false}
                        singleSelect = {true}
                        onSelect={(event) => {console.log(event)}} // Function will trigger on select event
                        onRemove={(event) => {console.log(event)}} // Function will trigger on remove event
                        placeholder="selection5" // Property name to display in the dropdown options
                        />
                    </div>
                    <div className='buttonArea'>
                        <button className='submitButton'>Submit!</button>
                    </div>
                </div>
                <div className='imageArea'>
                    img area
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
                {drawerVisibility && (
                        <div className='overlay'>
                        </div>
                    )}
            </div>
        </>
    );
}
 
export default ProfileSetup;