import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../UI/Button/Button";
import style from "./FrequencyTable.module.css";

const removeDuplicates = (arr)=>{
    return Array.from(new Set(arr));
}
const countDuplicates = (num,data)=>{
    let count=0;
    data.forEach(n=>{
        if(n==num)count++;
    });
    return count;
}

export const FrequencyTable = ()=>{

    const [show,setShowState] = useState(false);
    let content;
    const data =  useSelector(state=>state.data.data);

    let frequencyTable=[];
    const nonIntervalTable  =  ()=>{
        console.log("Exec");
        if(removeDuplicates(data).length<=10){
            console.log("Exec");
            return(
                <table className={style.tabl}>
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>ni</th>
                            <th>Ni</th>
                            <th>fi</th>
                            <th>Fi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {frequencyTable.map((obj,index)=>(
                            <tr key={index}>
                                <td>{obj.variable}</td>
                                <td>{obj.ni}</td>
                                <td>{obj.Ni}</td>
                                <td>{(obj.fi).toFixed(2)}%</td>
                                <td>{(obj.Fi).toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            );
        }
    }

    if(removeDuplicates(data).length<=10){
        let Ni = 0;
        let Fi = 0;
        frequencyTable = removeDuplicates(data).map((num,index)=>{
            let countDuplicatesNum = countDuplicates(num,data);
            Ni = Ni+ countDuplicatesNum;
            Fi = Fi + (countDuplicatesNum / data.length)*100;
            return{
                variable: num,
                ni: countDuplicatesNum,
                Ni,
                fi: (countDuplicatesNum / data.length)*100,
                Fi
            };
            
        });
        content = nonIntervalTable();

    }

    const showContent = ()=>{
        setShowState(true);
    }
    
    return(
        <div className={style.contenedor}>
            {data.length>0 && show? <Button onClick={showContent}>Hecho</Button> : <p>Sin Datos</p>}
            {show && content}
        </div>
    );
}



