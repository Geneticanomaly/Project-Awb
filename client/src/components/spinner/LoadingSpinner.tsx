import {ClipLoader} from 'react-spinners';
import './LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <>
            <div className="spinner-body">
                <h2>Loading...</h2>
                <ClipLoader className="spinner" color="#D0021B" size={50} />
            </div>
        </>
    );
}

export default LoadingSpinner;
