import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import '../../scss/components/loader.scss';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const style = css`
  display: inline-block;  
  border-color: rgb(192, 159, 128);
  position: absolute;
`;

function Loader(props) {
    return (
        <div className="centerloading">
            <ClipLoader
                css={style}
                size={80}
                color={"#76323F"}
                loading={props.loading}
            />
        </div>
    )
}

export default Loader;