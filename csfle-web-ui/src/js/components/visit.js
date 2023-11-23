import React, {useState, useEffect} from 'react';
import Map from "../components/map";
import '../../scss/components/visit.scss'

function Visit(props) {
    const[mapColor, setMapColor] = useState({});

    useEffect(() => {
        let colors = mapColor;
        for(let i in props.data) {
            for(let j in props.data[i].countries) {
                colors[props.data[i].countries[j].countryCode] = props.data[i].backgroundColor;
            }
        }
        setMapColor(mapColor => ({...mapColor, colors}));
    }, [])

    return (
        <div>
            <Map visitData={props.data} mapColor={mapColor}/>
            <ul className="visitstatusgroup">
                {props.data.map((item, index) => (
                    <li key={index} className="visitstatusitem"  style={{color: item.color, backgroundColor: item.backgroundColor}}>
                        <p className="visitstatustitle">{item.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Visit;