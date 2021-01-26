import { IoMenuOutline } from "react-icons/io5";

export default function Menu({ toggleMenu }) {
    
    return <IoMenuOutline onClick={() => toggleMenu()}></IoMenuOutline>;
}