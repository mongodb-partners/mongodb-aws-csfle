import React, {useEffect, useState} from "react";
import { withRouter} from "react-router-dom";
import { getSessionCookie} from "../common/session";
import Icon from "../common/icon";
import countries  from '../common/countries';
import Title from './title';

function CountryServEase(props) {
    let ddhomeCountry = getSessionCookie('ddhomeCountry');
    if(Object.keys(ddhomeCountry).length === 0 && ddhomeCountry.constructor === Object) {
        let countryMatch = false;
        for(let i in props.countryServEasesData) {
            if(props.countryServEasesData[i].countryCode === props.geolocationData.country_code) {
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
    const [countryCodes, setCountryCodes] = useState([]);
    const [country, setCountry] = useState({
            country_code : ddhomeCountry.country_code,
            country_name : countries[ddhomeCountry.country_code]
        }
    );

    useEffect(() => {
        props.ddhomeCountryCallBack(country);
        let countryCodesDetails = [];
        for(let i in props.countryServEasesData) {
            countryCodesDetails.push(props.countryServEasesData[i].countryCode);
        }

        setCountryCodes([...countryCodesDetails]);
        console.log("countryCodes", countryCodesDetails);
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
        <div className="countryserveaseframe">
            <ul className="countryserveasesgroup">
                {props.countryServEasesData.map((item, index) => (
                    <li key={index} className="countryservease">
                        <Title message={'Top CSFLE Services'} index={index} />
                        <ul className="serveasegroup">
                            {item.servEaseList.map((item1, index1) => (
                                <ServEase key={index1} servEase={item1} countryCode={item.countryCode} handleClick={onCountryServEaseClick}/>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function ServEases(props) {
    return (
        <ul className="serveasegroup">
            {props.countryServEases.map((item, index) => (
                <ServEase key={index} servEase={item} />
            ))}
        </ul>
    )
}

function ServEase(props) {
    let activeClass;
    let messageVisible;
    if(props && props.servEase.available) {
        activeClass = 'serveaseactive';
        messageVisible = 'serveasemessagehidden'
    } else {
        activeClass = 'serveaseactive';
        messageVisible = 'serveasemessagehidden'
    }

    const handleClick = (countryCode, link, model, available) => {
        props.handleClick && props.handleClick(countryCode, link, model, available);
    }

    return (
        <>
            {props ? (
                <li className={'serveasecontainer ' + activeClass} onClick={(e) => handleClick(props.countryCode, props.servEase.link, props.servEase.model, props.servEase.available, e)}>
                    <div style={{display: 'block', position: 'relative'}}>
                        <p className="serveaseicon">
                            <Icon name={props.servEase.icon} fill="rgb(255, 255, 255)" />
                        </p>
                        <p className="serveaseheader">{props.servEase.name}</p>
                        <p className={'serveasemessage ' + messageVisible}><label style={{position: 'relative', bottom: '8.5rem'}}><span>Coming Soon</span></label></p>
                    </div>
                </li>
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default withRouter(CountryServEase);