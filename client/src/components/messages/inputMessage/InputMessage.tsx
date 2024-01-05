import './InputMessage.css';
import {CiImageOn} from 'react-icons/ci';
import {IoMdAttach} from 'react-icons/io';

function InputMessage() {
    return (
        <div className="input-message">
            <IoMdAttach size={25} className="input-attach-icon" />
            <input type="text" placeholder="Type something..." />
            <div className="send">
                <input type="file" style={{display: 'none'}} id="file" />
                <label htmlFor="file">
                    <CiImageOn size={25} />
                </label>
                <button className="send-button">Send</button>
            </div>
        </div>
    );
}

export default InputMessage;
