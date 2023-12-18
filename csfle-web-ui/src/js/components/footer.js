import React from 'react';
import { NavLink } from "react-router-dom";
import '../../scss/components/footer.scss'

function Footer(props) {
    let count = 0;
    let menus = props.menus.map((item) => {
        //let separator = '   |   ';
        if(item.position === 'Footer') {
            count++
            return (
                <div key={count} className="footermenu">
                    <NavLink key={item.id} to={item.link}>
                        {item.name}
                    </NavLink>
                </div>
            )
        } else {
            return <></>
        }
    });

    let date = new Date();
    let year = date.getFullYear();

    return (
        <div className="footerbar">
            <div className="container">
                <div className="footer">
                    <div className="copyright">
                        &copy; {year} CSFLE Service.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;