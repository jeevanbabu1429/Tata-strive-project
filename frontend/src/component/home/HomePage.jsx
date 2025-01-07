import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="home">
            {/* HEADER / BANNER ROOM SECTION */}
            <section className="header-banner-container">
                <header className="header-banner">
                    <img
                        src="./assets/images/image.png"
                        alt="Phegon Hotel"
                        className="header-image"
                    />
                    <div className="overlay"></div>
                    <div className="overlay-content">
                        <h1>
                            Welcome to <span className="phegon-color">ROOM MANAGEMENT SYSTEM</span>
                        </h1>
                       
                    </div>
                </header>
            </section>

            {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
            <RoomSearch handleSearchResult={handleSearchResult} />
            <RoomResult roomSearchResults={roomSearchResults} />

            <div className="all-rooms-link">
                <h4>
                    <a href="/rooms" className="view-rooms-home">
                        View All Rooms
                    </a>
                </h4>
            </div>

          
        </div>
    );
};

export default HomePage;
