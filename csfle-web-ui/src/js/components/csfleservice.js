import React, {useEffect, useState} from "react";
import { withRouter} from "react-router-dom";
import { getSessionCookie} from "../common/session";
import Icon from "../common/icon";
import countries  from '../common/countries';
import Title from './title';

function CSFLEService(props) {
    let ddhomeCountry = getSessionCookie('ddhomeCountry');
    if(Object.keys(ddhomeCountry).length === 0 && ddhomeCountry.constructor === Object) {
        let countryMatch = false;
        for(let i in props.csfleServiceData) {
            if(props.csfleServiceData[i].countryCode === props.geolocationData.country_code) {
                countryMatch = true;
                break;
            }
        }
        if(countryMatch) {
            ddhomeCountry = {country_code: props.geolocationData.country_code, country_name: props.geolocationData.country_name};
        } else {
            ddhomeCountry = {country_code: 'GB', country_name: countries['GB']};
        }

    }
    const [country, setCountry] = useState({
            country_code : ddhomeCountry.country_code,
            country_name : countries[ddhomeCountry.country_code]
        }
    );

    useEffect(() => {
        props.ddhomeCountryCallBack(country);
    }, [])

    const onCountryServEaseClick = (countryCode, link, model, available) => {
        let countryDetails = country
        countryDetails.country_code = countryCode;
        countryDetails.country_name = countries[countryCode];

        props.ddhomeCountryCallBack(countryDetails);

        setCountry({...country, country_code: countryDetails.country_code, country_name : countryDetails.country_name});
        console.log(countryDetails);

        props.history.push(link, {
            model: model,
            available: available
        });

    }

    return (
        <div className="csfleserviceframe">
            <ul className="csfleservicesgroup">
                {props.csfleServiceData.map((item, index) => (
                    <li key={index} className="csfleservice">
                        <Title message={'CSFLE Services'} index={index} />
                        <ul className="servicegroup">
                            {item.serviceList.map((item1, index1) => (
                                <Service key={index1} service={item1} countryCode={item.countryCode} handleClick={onCountryServEaseClick}/>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function Service(props) {
    let activeClass;
    let messageVisible;
    if(props && props.service.available) {
        activeClass = 'serviceactive';
        messageVisible = 'servicemessagehidden'
    } else {
        activeClass = 'serviceactive';
        messageVisible = 'servicemessagehidden'
    }

    const handleClick = (countryCode, link, model, available) => {
        props.handleClick && props.handleClick(countryCode, link, model, available);
    }

    return (
        <>
            {props ? (
                <li className={'servicecontainer ' + activeClass} onClick={(e) => handleClick(props.countryCode, props.service.link, props.service.model, props.service.available, e)}>
                    <div style={{display: 'block', position: 'relative'}}>
                        <p className="serviceicon">
                            <Icon name={props.service.icon} fill="rgb(255, 255, 255)" />
                        </p>
                        <p className="serviceheader">{props.service.name}</p>
                        <p className={'servicemessage ' + messageVisible}><label style={{position: 'relative', bottom: '8.5rem'}}><span>Coming Soon</span></label></p>
                    </div>
                </li>
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default withRouter(CSFLEService);