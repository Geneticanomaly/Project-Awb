import Navbar from "../../components/navbar/Navbar";

function Home() {
    const authToken = true;

    const handleClick = () => {
        console.log("I was clicked!");
    };

    return (
        <>
            <Navbar />
            <div className="home">
                <h1>Swipe right</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? "Signout" : "Create account"}
                </button>
            </div>
        </>
    );
}

export default Home;
