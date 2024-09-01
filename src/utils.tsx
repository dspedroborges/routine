import { BsCaretRightFill, BsPlusCircle, BsTrash2Fill } from "react-icons/bs";
import { BiCameraMovie } from "react-icons/bi";
import { CiSun } from "react-icons/ci";
import { FaBed, FaCat, FaHandsWash, FaPencilAlt, FaSave, FaShoppingCart, FaShower, FaTooth } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiClothes, GiCoffeeCup, GiHealthNormal, GiMaterialsScience, GiMeal, GiThink } from "react-icons/gi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoBookOutline, IoGameControllerOutline } from "react-icons/io5";
import { LuDog, LuGlassWater, LuPartyPopper } from "react-icons/lu";
import { MdOutlineEggAlt, MdOutlineSportsGymnastics } from "react-icons/md";
import { PiBrain, PiBread, PiHandTapLight, PiToiletPaper } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { SiAwsorganizations } from "react-icons/si";

export type TodoType = {
    title: string;
    details: string;
    icon: string;
    days: string;
    importance: number;
}

export const getIcon = (name: string) => {
    switch (name) {
        case "sun":
            return <CiSun className="text-xl" />;
        case "water":
            return <LuGlassWater className="text-xl" />;
        case "tooth":
            return <FaTooth className="text-xl" />;
        case "coffee":
            return <GiCoffeeCup className="text-xl" />;
        case "gym1":
            return <MdOutlineSportsGymnastics className="text-xl" />;
        case "gym2":
            return <CgGym className="text-xl" />;
        case "book":
            return <IoBookOutline className="text-xl" />;
        case "computer":
            return <HiOutlineComputerDesktop className="text-xl" />;
        case "science":
            return <GiMaterialsScience className="text-xl" />;
        case "movie":
            return <BiCameraMovie className="text-xl" />;
        case "people":
            return <FaPeopleGroup className="text-xl" />;
        case "pencil":
            return <FaPencilAlt className="text-xl" />;
        case "toilet":
            return <PiToiletPaper className="text-xl" />;
        case "shower":
            return <FaShower className="text-xl" />;
        case "meal":
            return <GiMeal className="text-xl" />
        case "game":
            return <IoGameControllerOutline className="text-xl" />
        case "think":
            return <GiThink className="text-xl" />
        case "brain":
            return <PiBrain className="text-xl" />
        case "health":
            return <GiHealthNormal className="text-xl" />
        case "organize":
            return <SiAwsorganizations className="text-xl" />
        case "bread":
            return <PiBread className="text-xl" />
        case "egg":
            return <MdOutlineEggAlt className="text-xl" />
        case "dog":
            return <LuDog className="text-xl" />
        case "cat":
            return <FaCat className="text-xl" />
        case "wash":
            return <FaHandsWash className="text-xl" />
        case "clothes":
            return <GiClothes className="text-xl" />
        case "shop":
            return <FaShoppingCart className="text-xl" />
        case "bed":
            return <FaBed className="text-xl" />
        case "party":
            return <LuPartyPopper className="text-xl" />
        default:
            return "";
    }
}

export const icons = ["sun", "water", "tooth", "coffee", "gym1", "gym2", "book", "computer", "science", "movie", "people", "pencil", "toilet", "shower", "meal", "game", "think", "brain", "health", "organize", "bread", "egg", "dog", "cat", "wash", "clothes", "shop", "bed", "party"];