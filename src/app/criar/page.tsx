"use client";

import { useEffect, useState } from "react";
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

const getEmptyTodo = () => {
    return {
        title: "",
        details: "",
        icon: "",
        days: "",
        importance: 0,
    } as TodoType;
}

const getIcon = (name: string) => {
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

const icons = ["sun", "water", "tooth", "coffee", "gym1", "gym2", "book", "computer", "science", "movie", "people", "pencil", "toilet", "shower", "meal", "game", "think", "brain", "health", "organize", "bread", "egg", "dog", "cat", "wash", "clothes", "shop", "bed", "party"];

export default function Page() {
    const [todos, setTodos] = useState([getEmptyTodo()])

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos && savedTodos !== "[]") {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    const handleDaySelect = (info: Record<string, string>, currentTodo: number) => {
        const copy = JSON.parse(JSON.stringify(todos));
        switch (info.step) {
            case "0": {
                copy[currentTodo].days = `${info.step}#${info.selectedDays}`
            } break;
            case "1": {
                copy[currentTodo].days = `${info.step}#${info.selectedDate}`
            } break;
            case "2": {
                copy[currentTodo].days = `${info.step}#${info.selectedDate}`
            }
        }
        setTodos(copy);
    }

    const handleIconSelect = (selectedIcon: string, currentTodo: number) => {
        const copy = JSON.parse(JSON.stringify(todos));
        copy[currentTodo].icon = selectedIcon;
        setTodos(copy);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {
                todos.length > 0 && todos.map((todo, i) => {
                    return (
                        <div key={i} className="border-b-4 border-dotted border-blue-800 p-8 w-full lg:w-1/2 mx-auto my-8">
                            <BsTrash2Fill className="text-red-800 text-6xl text-left ml-[80%] lg:ml-[95%] hover:scale-90 cursor-pointer" onClick={() => {
                                let copy = JSON.parse(JSON.stringify(todos));
                                let filter = [];
                                for (let j = 0; j < copy.length; j++) {
                                    if (j !== i) filter.push(copy[j]);
                                }
                                setTodos(filter);
                            }} />
                            <h3 className="text-2xl font-bold text-blue-800 text-center">Afazer #{i + 1}</h3>
                            <div>
                                <label htmlFor={`title_${i}`} className="block font-bold text-blue-800 my-4 cursor-pointer">Título</label>
                                <input type="text" id={`title_${i}`} className="border p-2 w-full rounded-xl outline-blue-800" onChange={(e) => {
                                    const copy = JSON.parse(JSON.stringify(todos));
                                    copy[i].title = e.target.value;
                                    setTodos(copy);
                                }} value={todo.title} />
                            </div>
                            <div>
                                <label htmlFor={`details_${i}`} className="block font-bold text-blue-800 my-4 cursor-pointer">Detalhes</label>
                                <textarea id={`details_${i}`} className="border p-2 w-full min-h-[100px] rounded-xl outline-blue-800" onChange={(e) => {
                                    const copy = JSON.parse(JSON.stringify(todos));
                                    copy[i].details = e.target.value;
                                    setTodos(copy);
                                }} value={todo.details} />
                            </div>
                            <div>
                                <label htmlFor="icon" className="block font-bold text-blue-800 my-4 cursor-pointer">Ícone</label>
                                <IconSelect onChange={handleIconSelect} currentTodo={i} value={todo.icon} />
                            </div>
                            <div>
                                <label htmlFor="days" className="block font-bold text-blue-800 my-4 cursor-pointer">Dias</label>
                                <DaySelect onChange={handleDaySelect} currentTodo={i} value={todo.days} />
                            </div>
                            <div>
                                <label htmlFor={`importance_${i}`} className="block font-bold text-blue-800 my-4 cursor-pointer">Importância</label>
                                <select id={`importance_${i}`} onChange={(e) => {
                                    const copy = JSON.parse(JSON.stringify(todos));
                                    copy[i].importance = Number(e.target.value);
                                    console.log(e.target.value);
                                    setTodos(copy);
                                }} value={todo.importance} className="w-full p-2 rounded-xl border outline-blue-800">
                                    <option value="">Selecione uma opção</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                    )
                })
            }

            <div className="flex justify-center items-center gap-4 mx-auto">
                <BsPlusCircle className="text-6xl text-blue-800 hover:scale-90 cursor-pointer" onClick={() => setTodos([...todos, getEmptyTodo()])} />
                <FaSave className="text-6xl text-green-800 hover:scale-90 cursor-pointer" onClick={(() => {
                    localStorage.setItem("todos", JSON.stringify(todos));
                    console.log(JSON.stringify(todos));
                })} />
            </div>
        </div>
    )
}

function IconSelect({ onChange, value, currentTodo }: { onChange: Function, value: string, currentTodo: number }) {
    const [selectedIcon, setSelectedIcon] = useState(value);
    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
        setSelectedIcon(value);
    }, [value]);

    useEffect(() => {
        onChange(selectedIcon, currentTodo);
    }, [selectedIcon]);

    return (
        <>
            <div onClick={() => setShowIcons(true)} className="border p-2 rounded-xl flex items-center justify-between px-4 cursor-pointer hover:outline outline-blue-800 outline-2"> {getIcon(selectedIcon) || "Selecione um ícone"} <PiHandTapLight /> </div>
            {
                showIcons && (
                    <div onClick={() => setShowIcons(false)} className="z-50 fixed top-0 left-0 bg-black bg-opacity-90 w-full h-screen flex items-center justify-center">
                        <div className="bg-white rounded-xl p-8 min-h-[300px] grid grid-cols-8 gap-2" onClick={(e) => e.stopPropagation()}>
                            {
                                icons.map((icon, i) => {
                                    return <span key={i} className={`hover:scale-110 cursor-pointer p-2 hover:outline hover:outline-blue-800 rounded-xl h-8 ${selectedIcon === icon && "outline outline-green-800"}`} onClick={() => setSelectedIcon(icon)}>{getIcon(icon)}</span>
                                })
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

function DaySelect({ onChange, value, currentTodo }: { onChange: Function, value: string, currentTodo: number }) {
    const [step, setStep] = useState(0);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState({
        day: "",
        month: "",
        year: ""
    });

    useEffect(() => {
        const [currentStep, trueValue] = value.split("#");

        if (currentStep && trueValue) {
            setStep(Number(currentStep));

            if (currentStep === "0") {
                setSelectedDays(trueValue.split("|"));
            } else if (currentStep === "1") {
                const [day, month] = trueValue.split("/");
                setSelectedDate({ ...selectedDate, day, month })
            } else {
                const [day, month, year] = trueValue.split("/");
                setSelectedDate({ ...selectedDate, day, month, year })
            }
        }

    }, [value]);

    const handleSelectedDay = (day: string) => {
        if (!selectedDays.includes(day)) {
            setSelectedDays([...selectedDays, day]);
        } else {
            setSelectedDays(selectedDays.filter(e => e !== day));
        }
    }

    useEffect(() => {
        switch (step) {
            case 0: {
                onChange({ step: String(step), selectedDays: selectedDays.join("|") }, currentTodo)
            } break;
            case 1: {
                onChange({ step: String(step), selectedDate: `${selectedDate.day}/${selectedDate.month}` }, currentTodo)
            } break;
            case 2: {
                onChange({ step: String(step), selectedDate: `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}` }, currentTodo)
            } break;
        }
    }, [selectedDays, selectedDate]);

    return (
        <div className="text-xs lg:text-base relative border p-2 flex items-center justify-center gap-2 lg:gap-8 rounded-xl hover:outline outline-blue-800 outline-1 lg:outline-2">
            {
                step === 0 && (
                    <div className="flex flex-col lg:flex-row gap-1 lg:gap-8">
                        <span className={`hover:outline hover:font-bold rounded-xl cursor-pointer p-2 outline-1 outline-blue-800 ${selectedDays.includes("Seg") && "outline outline-green-800 font-bold"}`} onClick={() => handleSelectedDay("Seg")}>Seg</span>
                        <span className={`hover:outline hover:font-bold rounded-xl cursor-pointer p-2 outline-1 outline-blue-800 ${selectedDays.includes("Ter") && "outline outline-green-800 font-bold"}`} onClick={() => handleSelectedDay("Ter")}>Ter</span>
                        <span className={`hover:outline hover:font-bold rounded-xl cursor-pointer p-2 outline-blue-800 ${selectedDays.includes("Qua") && "outline outline-green-800 font-bold"}`} onClick={() => handleSelectedDay("Qua")}>Qua</span>
                        <span className={`hover:outline hover:font-bold rounded-xl cursor-pointer p-2 outline-1 outline-blue-800 ${selectedDays.includes("Qui") && "outline outline-green-800 font-bold"}`} onClick={() => handleSelectedDay("Qui")}>Qui</span>
                        <span className={`hover:outline hover:font-bold rounded-xl cursor-pointer p-2 outline-1 outline-blue-800 ${selectedDays.includes("Sex") && "outline outline-green-800 font-bold"}`} onClick={() => handleSelectedDay("Sex")}>Sex</span>
                        <span className={`hover:outline hover:font-bold rounded-xl cursor-pointer p-2 outline-1 outline-blue-800 ${selectedDays.includes("Sáb") && "outline outline-green-800 font-bold"}`} onClick={() => handleSelectedDay("Sáb")}>Sáb</span>
                        <span className={`hover:outline hover:font-bold rounded-xl cursor-pointer p-2 outline-1 outline-blue-800 ${selectedDays.includes("Dom") && "outline outline-green-800 font-bold"}`} onClick={() => handleSelectedDay("Dom")}>Dom</span>
                    </div>
                )
            }

            {
                step === 1 && (
                    <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
                        <input type="number" placeholder="Dia" className="border p-2 text-center max-w-24 rounded-xl" onChange={(e) => setSelectedDate({ ...selectedDate, day: e.target.value })} />
                        <span>/</span>
                        <input type="number" placeholder="Mês" className="border p-2 text-center max-w-24 rounded-xl" onChange={(e) => setSelectedDate({ ...selectedDate, month: e.target.value })} />
                    </div>
                )
            }

            {
                step === 2 && (
                    <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
                        <input type="number" placeholder="Dia" className="border p-2 text-center max-w-24 rounded-xl" onChange={(e) => setSelectedDate({ ...selectedDate, day: e.target.value })} />
                        <span>/</span>
                        <input type="number" placeholder="Mês" className="border p-2 text-center max-w-24 rounded-xl" onChange={(e) => setSelectedDate({ ...selectedDate, month: e.target.value })} />
                        <span>/</span>
                        <input type="number" placeholder="Ano" className="border p-2 text-center max-w-24 rounded-xl" onChange={(e) => setSelectedDate({ ...selectedDate, year: e.target.value })} />
                    </div>
                )
            }

            <BsCaretRightFill className="text-blue-800 text-2xl cursor-pointer hover:scale-90" onClick={() => step < 2 ? setStep(step + 1) : setStep(0)} />
        </div>
    )
}

export { getIcon, icons };