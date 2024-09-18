"use client";

import { useEffect, useState } from "react";
import { Sofia } from "next/font/google";
import { BsCheckCircleFill } from "react-icons/bs";
import { getIcon, TodoType } from "@/utils";
const sofia = Sofia({ weight: ["400"], subsets: ["latin"] });

const numberToWeekDay = (value: number) => {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return days[value];
}

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [positionsDone, setPositionsDone] = useState<number[]>([]);
  const [isUserSure, setIsUserSure] = useState(false);

  const calculatePercentual = () => {
    let totalOfImportance = 0;
    for (let i = 0; i < todos.length; i++) {
      totalOfImportance += todos[i].importance;
    }

    let importanceCreated = 0;
    for (let i = 0; i < positionsDone.length; i++) {
      importanceCreated += todos[positionsDone[i]].importance;
    }

    const percentual = ((importanceCreated / totalOfImportance) * 100);

    return isNaN(percentual) ? 0 : Number(percentual.toFixed(2));
  }

  useEffect(() => {
    const savedPositionsDone = localStorage.getItem("positionsDone");
    if (savedPositionsDone) {
      setPositionsDone(JSON.parse(savedPositionsDone));
    }
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos && savedTodos !== "[]") {
      let toBeChecked = JSON.parse(savedTodos);
      let filter = [];
      for (let i = 0; i < toBeChecked.length; i++) {
        let [step, value] = toBeChecked[i].days.split("#");
        step = Number(step);
        const currentWeekDay = new Date().getDay();
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        switch (step) {
          case 0: {
            const currentWeekDayName = numberToWeekDay(currentWeekDay);
            if (value.search(currentWeekDayName) !== -1) filter.push(toBeChecked[i]);
          } break;
          case 1: {
            const days = value.split("/").map((e: string) => Number(e));
            if (days[0] === currentDay && days[1] === currentMonth) filter.push(toBeChecked[i]);
          } break;
          case 2: {
            const days = value.split("/").map((e: string) => Number(e));
            if (days[0] === currentDay && days[1] === currentMonth && days[2] === currentYear) filter.push(toBeChecked[i]);
          } break;
        }
      }
      setTodos(filter);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <div className="p-2 mb-12">
        {
          todos.length > 0 && (
            <div className="border rounded-xl h-8 my-8">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-800 rounded-xl flex items-center justify-center text-white font-extrabold" style={{ width: isNaN((positionsDone.length / todos.length * 100)) ? "0%" : (positionsDone.length / todos.length * 100).toFixed(2) + "%" }}>
                {
                  calculatePercentual() + "%"
                }
              </div>
            </div>
          )
        }
        {
          todos.map((t, i) => {
            return (
              <div key={i} className={`border ${positionsDone.includes(i) ? "bg-green-50 hover:bg-green-100" : "bg-white hover:bg-gray-100"} px-4 py-2 rounded-xl cursor-pointer mb-2 flex items-center justify-between gap-2 shadow`} title={t.details} onClick={() => {
                if (!positionsDone.includes(i)) {
                  setPositionsDone([...positionsDone, i]);
                  localStorage.setItem("positionsDone", JSON.stringify([...positionsDone, i]));
                } else {
                  setPositionsDone(positionsDone.filter(item => item !== i));
                  localStorage.setItem("positionsDone", JSON.stringify(positionsDone.filter(item => item !== i)));
                }
              }}>
                <div className="flex gap-2 items-center">
                  <span className="text-2xl text-blue-800">{getIcon(t.icon)}</span>{t.title}
                </div>
                {
                  positionsDone.includes(i) && <BsCheckCircleFill className="text-green-600 text-xl" />
                }
              </div>
            )
          })
        }

        {
          todos.length === 0 && (
            <p className="text-center mt-12">Você ainda não criou nenhum afazer!</p>
          )
        }

        {
          todos.length > 0 && (
            <>
              {
                !isUserSure ? (
                  <button onClick={() => {
                    setIsUserSure(true);
                    setTimeout(() => {
                      setIsUserSure(false);
                    }, 3000)
                  }} className="fixed bottom-2 w-[95%] left-1/2 -translate-x-1/2 bg-opacity-90 bg-white text-blue-800 border border-blue-800 p-2 rounded-xl cursor-pointer hover:scale-95">Novo dia</button>
                ) : (
                  <button className="fixed bottom-2 w-[95%] left-1/2 -translate-x-1/2 bg-opacity-90 bg-white text-blue-800 border border-blue-800 p-2 rounded-xl cursor-pointer" onClick={() => {
                    setPositionsDone([]);
                    localStorage.setItem("positionsDone", JSON.stringify([]));
                  }}>Tenho certeza</button>
                )
              }
            </>
          )
        }
      </div>
    </main>
  );
}
