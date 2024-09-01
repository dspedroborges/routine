"use client";

import { useEffect, useState } from "react";
import LineWrapper from "../components/LineWrapper";

const avg = (list: number[]) => {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum += list[i];
    }
    return sum / list.length;
}


export default function Page() {
    const [historialInfo, setHistorialInfo] = useState({
        avg: 0,
        totalDays: 0,
    });
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
    }, []);

    return (
        <main className="min-h-screen flex justify-center">
            <div className="w-full lg:w-1/2">
                <p className="mt-8 p-2"><span className="text-blue-800 font-bold">Média de compleção:</span> {historialInfo.avg.toFixed(2)}%</p>
                <p className="mb-8 p-2"><span className="text-blue-800 font-bold">Total de dias:</span> {historialInfo.totalDays}</p>
                <div className="w-full mb-8">
                    <LineWrapper
                        labels={completionList.map((c, i) => String(i))}
                        label='# percentuais de compleção'
                        data={completionList}
                        backgroundColor={["dodgerblue"]}
                        borderColor={[]}
                        borderWidth={1}
                    />
                </div>
            </div>
        </main>
    )
}