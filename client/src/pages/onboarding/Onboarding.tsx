import './Onboarding.css';
import Navbar from '../../components/navbar/Navbar';
import {useState, useEffect} from 'react';

function Onboarding() {
    const pixelAmount: number = 570;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [imageOption, setImageOption] = useState({
        link: true,
        file: false,
    });

    const [formData, setFormData] = useState({
        user_id: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        gender: '',
        show_gender: '',
        about: '',
        url: '',
        matches: [],
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitted', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Set the specific formData attribute with the use of its name and value
        // Only change the attribute that is being edited
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        console.log(formData);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Clicked');
        const target = e.target as HTMLButtonElement;

        setImageOption((prevState) => ({
            ...prevState,
            link: target.id === 'link',
            file: target.id === 'file',
        }));

        console.log(imageOption);
    };

    // Save uploaded file to the formData set
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imageUrl = URL.createObjectURL(e.target.files?.[0]);
            setFormData((prevState) => ({
                ...prevState,
                url: imageUrl,
            }));
        }
        console.log(formData);
    };

    // Used for displaying the second section in the right place - Profile picture
    // If windows size is smaller than 570px display everything in a column instead
    useEffect(() => {
        // Update the window width when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="onboarding-container">
            <Navbar authToken={false} />
            <div className="onboarding">
                <h2>Fill out your information</h2>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            name="first_name"
                            type="text"
                            id="first_name"
                            placeholder="First name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            name="last_name"
                            type="text"
                            id="last_name"
                            placeholder="Last name"
                            required={true}
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        <label>Birthday</label>
                        <div className="input-container">
                            <input
                                type="number"
                                id="dob_day"
                                name="dob_day"
                                placeholder="Day"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                id="dob_month"
                                name="dob_month"
                                placeholder="Month"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                id="dob_year"
                                name="dob_year"
                                placeholder="Year"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>
                        <label>Gender</label>
                        <div className="input-container">
                            <input
                                type="radio"
                                id="gender_man"
                                name="gender"
                                value="man"
                                required={true}
                                checked={formData.gender === 'man'}
                                onChange={handleChange}
                            />
                            <label htmlFor="gender_man">Man</label>

                            <input
                                type="radio"
                                id="gender_woman"
                                name="gender"
                                value="woman"
                                required={true}
                                checked={formData.gender === 'woman'}
                                onChange={handleChange}
                            />
                            <label htmlFor="gender_woman">Woman</label>
                        </div>
                        <label>Show me</label>
                        <div className="input-container">
                            <input
                                className="show-me"
                                type="radio"
                                id="show_man"
                                name="show_gender"
                                value="man"
                                required={true}
                                checked={formData.show_gender === 'man'}
                                onChange={handleChange}
                            />
                            <label htmlFor="show_man">Man</label>

                            <input
                                className="show-me"
                                type="radio"
                                id="show_woman"
                                name="show_gender"
                                value="woman"
                                required={true}
                                checked={formData.show_gender === 'woman'}
                                onChange={handleChange}
                            />
                            <label htmlFor="show_woman">Woman</label>

                            <input
                                className="show-me"
                                type="radio"
                                id="show_everyone"
                                name="show_gender"
                                value="everyone"
                                required={true}
                                checked={formData.show_gender === 'everyone'}
                                onChange={handleChange}
                            />
                            <label htmlFor="show_everyone">Everyone</label>
                        </div>
                        <label htmlFor="about" className="about">
                            About
                        </label>
                        <input
                            type="text"
                            id="about"
                            name="about"
                            placeholder="Tell about yourself"
                            value={formData.about}
                            required={true}
                            onChange={handleChange}
                        />

                        {windowWidth <= pixelAmount && (
                            <section>
                                <div className="picture-container">
                                    <label htmlFor="url">Profile picture</label>
                                    <span className="btn" id="link" onClick={handleClick}>
                                        Link
                                    </span>
                                    <span className="btn" id="file" onClick={handleClick}>
                                        File
                                    </span>
                                </div>

                                {imageOption.link ? (
                                    <input
                                        type="url"
                                        name="url"
                                        id="url"
                                        value={formData.url}
                                        placeholder="Profile image"
                                        required={true}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        className="input-file"
                                        type="file"
                                        name="url"
                                        id="file"
                                        required={true}
                                        onChange={handleFileChange}
                                    />
                                )}

                                <div className="img-container">
                                    <img src={formData.url} alt="Picture preview" />
                                </div>
                            </section>
                        )}

                        <input type="submit" />
                        {/* <Link to="/dashboard" className="primary-button link-button btn">
                            Submit
                        </Link> */}
                    </section>

                    {windowWidth > pixelAmount && (
                        <section>
                            <div className="picture-container">
                                <label htmlFor="url">Profile picture</label>
                                <span className="btn" id="link" onClick={handleClick}>
                                    Link
                                </span>
                                <span className="btn" id="file" onClick={handleClick}>
                                    File
                                </span>
                            </div>

                            {imageOption.link ? (
                                <input
                                    type="url"
                                    name="url"
                                    id="url"
                                    value={formData.url}
                                    placeholder="Profile image"
                                    required={true}
                                    onChange={handleChange}
                                />
                            ) : (
                                <input
                                    className="input-file"
                                    type="file"
                                    name="url"
                                    id="file"
                                    required={true}
                                    onChange={handleFileChange}
                                />
                            )}

                            <div className="img-container">
                                <img src={formData.url} alt="Picture preview" />
                            </div>
                        </section>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Onboarding;
