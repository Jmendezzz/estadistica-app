import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../UI/Button/Button";
import style from "./FrequencyTable.module.css";
import BigNumber from "bignumber.js";

const removeDuplicates = (arr)=>{
    return Array.from(new Set(arr));
}
const countByInterval = (arr,LI, LS)=>{
    return arr.filter(num=>num>LI && num<=LS ).length;
}
const countDuplicates = (num,data)=>{
    let count=0;
    data.forEach(n=>{
        if(n==num)count++;
    });
    return count;
}
const sumArray = (arr)=>{

     return arr.reduce((total,currentNum)=>total+currentNum,0)
    
}
export const FrequencyTable = ()=>{

    const [show,setShowState] = useState(false);
    let content;
    const data =  useSelector(state=>state.data.data);

    let frequencyTable=[];
    const nonIntervalTable  =  ()=>{
        let mediana;
        if(data.length%2 == 0){
            console.log( data.length/2)
            mediana = (data[Math.floor(data.length/2) - 1 ] + data[Math.floor (data.length/2)]) / 2;
        }else mediana = data[Math.floor (data.length/2)];
        console.log(mediana);
        let media = (sumArray(data) / data.length).toFixed(2);
    
        if(removeDuplicates(data).length<=15){
            return(
                <>
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
                

                <h1>Mediana:{mediana}</h1>
                <h1>Media artimetica:{media}</h1>
                </>
                

            );
        }
    }
    const intervalTable=()=>{
        console.log("intervaloss");
        return(
            <table className={style.tabl}>
            <thead>
                <tr>
                    <th>Intervalo</th>
                    <th>Marca de clase</th>
                    <th>ni</th>
                    <th>Ni</th>
                    <th>fi</th>
                    <th>Fi</th>
                </tr>
            </thead>
            <tbody>
                {frequencyTable.map((obj,index)=>(
                    <tr key={index}>
                        <td>( {obj.interval.LI} - {obj.interval.LS} ]</td>
                        <td>{obj.xi}</td>
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

    if(removeDuplicates(data).length<=15){ // Sin intervalos
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
    }else{
        let range = data[data.length-1] - data[0];
        console.log("Rango: " ,range);
        let intervalNumbers =  Math.round(1 + 3.3 * Math.log10(data.length));
        console.log("Intervalo ",intervalNumbers);
        let parts = data[0].toString().split("."); //Convierto en arreglo la parte decimal.
        let decimalLength = parts[1] ? parts[1].length :0; // Si hay decimales se retorna la long, de lo contrario 0.
        decimalLength = parseFloat(decimalLength);
        console.log("Cantidad de decimales:" + decimalLength);
        let factor = Math.pow(10, decimalLength);

        let amplitude =  Math.ceil((range/intervalNumbers)*factor) / factor;

        console.log("Amplitud: " + amplitude);
        let Ra = Math.ceil((amplitude*intervalNumbers)*factor) /factor;
        //En cuanto se amplió el rango
        console.log("Ra: ", Ra);
        let c = parseFloat(((Ra) - range).toFixed(decimalLength)); 
        console.log("C: ",c);
        let c1;
        let c2;
        if(c%2 == 0){
            c1= c/2;
            c2= c/2;

        }else {
            c1 = parseFloat((c/2).toFixed(decimalLength)) ;
            c2 = c - c1;
            console.log(c1 , c2);
        }

        const LI = parseFloat((data[0] - c1).toFixed(decimalLength)); 
        console.log("LI: ",LI);
        const LS = parseFloat((data[data.length-1] +c2).toFixed(decimalLength));
        console.log("LS: ",LS);
        let intervals = [];
    
        for(let i=LI; i<=LS; i=  i+amplitude){
            intervals.push({
                open:Math.ceil(i*factor)/factor,
                closed: Math.ceil((i+amplitude)*factor)/factor
            });
        }
        console.log(intervals);
        let Ni=0;
        let Fi=0;
        frequencyTable = intervals.map(interval=>{
            console.log(interval.open);
            console.log(interval.closed);
            let xi = (interval.open + interval.closed/2);
            let ni = countByInterval(data,interval.open,interval.closed);
            let fi = (countByInterval(data,interval.open,interval.closed) / data.length)*100;
            Ni += countByInterval(data,interval.open,interval.closed);
            Fi += (countByInterval(data,interval.open,interval.closed) / data.length)*100;
        
            return{
                interval:{LI:interval.open, LS: interval.closed},
                xi,
                ni,
                fi,
                Ni,
                Fi
            }
        });
        content = intervalTable();

    }

    const showContent = ()=>{
        setShowState(true);
    }
    
    return(
        <div className={style.contenedor}>
            {data.length>0 ? <Button onClick={showContent}>Hecho</Button> : <p>Sin Datos</p>}
            {show && content}
        </div>
    );
}



