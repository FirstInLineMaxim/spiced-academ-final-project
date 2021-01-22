import {FaEllipsisV} from "react-icons/fa";

export default function Menu({ toggleMenu }) {
    
    return (
        <FaEllipsisV 
            onClick={() => toggleMenu()}>
        </FaEllipsisV>
    );
}