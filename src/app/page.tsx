"use client";

import { useEffect, useState } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { CiSun } from "react-icons/ci";
import { FaBed, FaCat, FaHandsWash, FaPencilAlt, FaShoppingCart, FaShower, FaTooth } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiClothes, GiCoffeeCup, GiHealthNormal, GiMaterialsScience, GiMeal, GiThink } from "react-icons/gi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoBookOutline, IoGameControllerOutline } from "react-icons/io5";
import { LuDog, LuGlassWater, LuPartyPopper } from "react-icons/lu";
import { MdOutlineEggAlt, MdOutlineSportsGymnastics } from "react-icons/md";
import { PiBrain, PiBread, PiToiletPaper } from "react-icons/pi";
import { Sofia } from "next/font/google";
import { CgGym } from "react-icons/cg";
import { SiAwsorganizations } from "react-icons/si";
import LineWrapper from "./components/LineWrapper";
const sofia = Sofia({ weight: ["400"], subsets: ["latin"] });

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

const avg = (list: number[]) => {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i];
  }
  return sum / list.length;
}

const icons = ["sun", "water", "tooth", "coffee", "gym1", "gym2", "book", "computer", "science", "movie", "people", "pencil", "toilet", "shower", "meal", "game", "think", "brain", "health", "organize", "bread", "egg", "dog", "cat", "wash", "clothes", "shop", "bed", "party"];

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [showCreation, setShowCreation] = useState(false);
  const [positionsDone, setPositionsDone] = useState<number[]>([]);
  const [historialInfo, setHistorialInfo] = useState({
    avg: 0,
    totalDays: 0,
  });
  const [isUserSure, setIsUserSure] = useState(false);
  const [completionList, setCompletionList] = useState([]);

  useEffect(() => {
    const lsCompletionList = localStorage.getItem("completionList");
    if (lsCompletionList) {
      setCompletionList(JSON.parse(lsCompletionList));
      setHistorialInfo({
        avg: avg(JSON.parse(lsCompletionList)),
        totalDays: JSON.parse(lsCompletionList).length
      });
    }
    const lsTodos = localStorage.getItem("todos");
    const lsPositionsDone = localStorage.getItem("positionsDone");
    if (lsTodos) {
      setTodos(JSON.parse(lsTodos));
    } else {
      setShowCreation(true);
    }
    if (lsPositionsDone) setPositionsDone(JSON.parse(lsPositionsDone));
  }, []);

  return (
    <main className="min-h-screen">
      {
        showCreation ? (
          <>
            <form className="p-2 w-full lg:w-1/2 mx-auto" action={(data) => {
              const list = (data.get("todos") as string).split("\n");
              if (list) {
                setTodos(list);
                setPositionsDone([]);
                setShowCreation(false);
                localStorage.setItem("todos", JSON.stringify(list));
                localStorage.setItem("positionsDone", JSON.stringify([]));
              }
            }}>
              <div>
                <label htmlFor="todos" className="block font-bold cursor-pointer my-4 text-blue-800">Afazeres:</label>
                <span className="block my-4 font-extralight">Você pode definir ícones para cada afazer colocando o nome do ícone após ponto e vírgula. Por exemplo: Banho;shower. Cada afazer deve ocupar uma linha, então após definir um, aperte enter para definir outro.</span>
                <textarea name="todos" id="todos" className="w-full border rounded-xl min-h-[300px] focus:outline-blue-800 p-4" defaultValue={todos.join("\n")}></textarea>
              </div>

              <button className="bg-blue-50 p-2 rounded-xl cursor-pointer hover:bg-blue-100 w-full">Enviar</button>
            </form>

            <h3 className="text-center font-bold text-blue-800 text-xl mt-8 mb-4">Ícones disponíveis</h3>
            <div className="grid grid-cols-2 lg:grid-cols-8 gap-4 w-full lg:w-1/2 mx-auto p-4">
              {
                icons.map((icon, i) => {
                  return (
                    <div key={i} className="flex flex-col justify-center items-center hover:scale-110">
                      <span className="text-xs">{icon}</span>
                      {getIcon(icon)}
                    </div>
                  )
                })
              }
            </div>

            {
              todos.length > 0 && (
                <button className="fixed bottom-2 left-2 bg-red-50 p-2 rounded-xl cursor-pointer hover:bg-red-100 shadow" onClick={() => {
                  setShowCreation(false);
                }}>Cancelar alteração</button>
              )
            }
          </>
        ) : (
          <div className="p-2 mb-12">
            <h2 className={`text-5xl font-extrabold text-blue-800 text-center my-8 ${sofia.className}`}>Afazeres</h2>
            <div className="border rounded-xl h-8 my-8">
              <div className="h-full bg-green-500 animate-pulse rounded-xl flex items-center justify-center text-white" style={{ width: `${positionsDone.length / todos.length * 100}%` }}>
                {(positionsDone.length / todos.length * 100).toFixed(2)}%
              </div>
            </div>

            <p className="mt-8 p-2"><span className="text-blue-800 font-bold">Média de compleção:</span> {historialInfo.avg.toFixed(2)}%</p>
            <p className="mb-8 p-2"><span className="text-blue-800 font-bold">Total de dias:</span> {historialInfo.totalDays}</p>
            <div className="w-full lg:w-1/3 mb-8">
              <LineWrapper
                labels={completionList.map((c, i) => String(i))}
                label='# percentuais de compleção'
                data={completionList}
                backgroundColor={["dodgerblue"]}
                borderColor={[]}
                borderWidth={1}
              />
            </div>

            {
              todos.map((t, i) => {
                return (
                  <div key={i} className={`${positionsDone.includes(i) ? "bg-green-50 hover:bg-green-100" : "bg-red-50 hover:bg-red-100"} p-2 rounded-xl cursor-pointer mb-2 flex items-center gap-2`} onClick={() => {
                    if (!positionsDone.includes(i)) {
                      setPositionsDone([...positionsDone, i]);
                      localStorage.setItem("positionsDone", JSON.stringify([...positionsDone, i]));
                    } else {
                      setPositionsDone(positionsDone.filter(item => item !== i));
                      localStorage.setItem("positionsDone", JSON.stringify(positionsDone.filter(item => item !== i)));
                    }
                  }}>
                    {
                      t.split(";").length > 1 ? (
                        <>{getIcon(t.split(";")[1].trim())}{t.split(";")[0].trim()}</>
                      ) : (
                        <>{t.trim()}</>
                      )
                    }
                  </div>
                )
              })
            }

            <button className="fixed bottom-2 left-2 bg-blue-50 p-2 rounded-xl cursor-pointer hover:bg-blue-100" onClick={() => {
              setShowCreation(true);
            }}>Alterar afazeres</button>

            {
              !isUserSure ? (
                <button onClick={() => {
                  setIsUserSure(true);
                  setTimeout(() => {
                    setIsUserSure(false);
                  }, 3000)
                }} className="fixed bottom-2 right-2 bg-green-500 p-2 rounded-xl cursor-pointer hover:bg-green-600 text-white">Novo dia</button>
              ) : (
                <button className="fixed bottom-2 right-2 bg-orange-500 p-2 rounded-xl cursor-pointer hover:bg-orange-600 text-white" onClick={() => {
                  const lsCompletionList = localStorage.getItem("completionList");
                  const percentual = (positionsDone.length / todos.length * 100);
                  if (lsCompletionList) {
                    localStorage.setItem("completionList", JSON.stringify([...JSON.parse(lsCompletionList), percentual]));
                  } else {
                    localStorage.setItem("completionList", JSON.stringify([percentual]));
                  }
                  setPositionsDone([]);
                  localStorage.setItem("positionsDone", JSON.stringify([]));
                }}>Tenho certeza</button>
              )
            }
          </div>
        )
      }
    </main>
  );
}
