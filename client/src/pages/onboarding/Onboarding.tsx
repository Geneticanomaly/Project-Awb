import "./Onboarding.css";
import Navbar from "../../components/navbar/Navbar";
import {useState} from "react";
import {Link} from "react-router-dom";

function Onboarding() {
    /* const pixelAmount: number = 570;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); */

    const [formData, setFormData] = useState({
        user_id: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        gender: "",
        show_gender: "",
        about: "",
        url: "",
        matches: [],
    });

    const handleSubmit = () => {
        console.log("Submitted");
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

    return (
        <>
            <Navbar />
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
                                checked={formData.gender === "man"}
                                onChange={handleChange}
                            />
                            <label htmlFor="gender_man">Man</label>

                            <input
                                type="radio"
                                id="gender_woman"
                                name="gender"
                                value="woman"
                                required={true}
                                checked={formData.gender === "woman"}
                                onChange={handleChange}
                            />
                            <label htmlFor="gender_woman">Woman</label>
                        </div>
                        <label>Show me</label>
                        <div className="input-container">
                            <input
                                type="radio"
                                id="show_man"
                                name="show_gender"
                                value="man"
                                required={true}
                                checked={formData.show_gender === "man"}
                                onChange={handleChange}
                            />
                            <label htmlFor="show_man">Man</label>

                            <input
                                type="radio"
                                id="show_woman"
                                name="show_gender"
                                value="woman"
                                required={true}
                                checked={formData.show_gender === "woman"}
                                onChange={handleChange}
                            />
                            <label htmlFor="show_woman">Woman</label>

                            <input
                                type="radio"
                                id="show_everyone"
                                name="show_gender"
                                value="everyone"
                                required={true}
                                checked={formData.show_gender === "everyone"}
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
                        <input type="submit" />
                        {/* <Link to="/dashboard" className="primary-button link-button btn">
                            Submit
                        </Link> */}
                    </section>

                    <section>
                        <label htmlFor="url">Profile picture</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            value={formData.url}
                            placeholder="Profile image"
                            required={true}
                            onChange={handleChange}
                        />
                        <div className="img-container">
                            <img src={formData.url} alt="Picture preview" />
                        </div>
                    </section>
                </form>
            </div>
        </>
    );
}

export default Onboarding;
