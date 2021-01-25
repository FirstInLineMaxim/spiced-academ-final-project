import {  useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { FaArrowCircleUp, FaSearch } from "react-icons/fa";


export default function FindPeople() {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        let abort;
        
        (async () => {
            if (!query) {
                const { data } = await axios.get("/latest-users");
                if (!abort) {
                    setUsers(data);
                }
            } else {
                const { data } = await axios.get("/find-users/" + query);
                if (!abort) {
                    setUsers(data);
                }
            }
        })();

        return () => {
            abort = true;
        };
    }, [query]);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 100) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 100) {
            setShowScroll(false);
        }
    };
  
    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    
    window.addEventListener('scroll', checkScrollTop);
        
    return (
        <div className="findPeople">
            <h2>Find People</h2>
            <p>Checkout who just joined!</p>
            <p>Are you looking for someone in particular? </p>
            <div className="search-box">
                <input
                    defaultValue=""
                    className="searchInput"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className='icon'>
                    <span>
                        <FaSearch className=""></FaSearch>
                    </span>
                </div>
            </div>
            <div>
                {users.map((users, idx) => (
                    <div key={idx} className="users">
                        <Link
                            to={"/user/" + users.id}
                            className="searchedUsers"
                        >
                            <div className="img-wrapper">
                                <img
                                    src={
                                        users.profile_pic ||
                                        "../default-img.png"
                                    }
                                    alt={`${users.full_name}`}
                                    className="profile-img"
                                ></img>
                            </div>
                            <p>{users.full_name}</p>
                        </Link>
                    </div>
                ))}
                {!users.length && query && <p>Nothing found</p>}
            </div>
            <FaArrowCircleUp
                className="scrollTop"
                onClick={scrollTop}
                style={{ height: 40, display: showScroll ? "flex" : "none" }}
            />
        </div>
    );
}
