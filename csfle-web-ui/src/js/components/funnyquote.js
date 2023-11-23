import React from 'react';
import {NavLink, Link} from "react-router-dom";
import {getSessionCookie, getSessionStorage} from "../common/session";
import {useFetch} from "../common/hook";
import {getQuoteOfTheDay} from "../common/common";
import {FUNNY_QUOTE_URL} from "../common/constants";
import Loader from './loader';
import '../../scss/components/header.scss'

function FunnyQuote(props) {
    const [funnyQuote, funnyQuoteLoading] = useFetch(FUNNY_QUOTE_URL, 'funnyQuote');

    return (
        <div className="links">
            <label className="headertext">
                {funnyQuoteLoading ? (
                    <Loader loading={funnyQuoteLoading} />
                ) : (
                    getQuoteOfTheDay(funnyQuote)
                )}
            </label>
        </div>
    )
}

export default FunnyQuote;