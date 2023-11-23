import React from "react";
import '../../scss/common/icon.scss';

function Icon(props) {
    let icon;
    let style={};
    if(props.width) {
        style.width = props.width;
    }
    if(props.height) {
        style.height = props.height;
    }
    if(props.verticalAlign) {
        style.vertifcalAlign = props.vertifcalAlign;
    }
    switch(props.name) {
        case 'user':
            icon =
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{...style}}>
                    <g>
                        <g>
                            <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256c2.581,0,5.099-0.32,7.68-0.384l0.896,0.171
                                c0.704,0.128,1.387,0.213,2.091,0.213c0.981,0,1.984-0.128,2.923-0.405l1.195-0.341C405.056,503.509,512,392.171,512,256
                                C512,114.837,397.163,0,256,0z M408.149,434.325c-1.003-3.264-3.264-6.016-6.549-7.104l-56.149-18.688
                                c-19.605-8.171-28.736-39.552-30.869-52.139c14.528-13.504,27.947-33.621,27.947-51.797c0-6.187,1.749-8.555,1.408-8.619
                                c3.328-0.832,6.037-3.2,7.317-6.379c1.045-2.624,10.24-26.069,10.24-41.877c0-0.875-0.107-1.749-0.32-2.581
                                c-1.344-5.355-4.48-10.752-9.173-14.123v-49.664c0-30.699-9.344-43.563-19.243-51.008c-2.219-15.275-18.581-44.992-76.757-44.992
                                c-59.477,0-96,55.915-96,96v49.664c-4.693,3.371-7.829,8.768-9.173,14.123c-0.213,0.853-0.32,1.728-0.32,2.581
                                c0,15.808,9.195,39.253,10.24,41.877c1.28,3.179,2.965,5.205,6.293,6.037c0.683,0.405,2.432,2.795,2.432,8.96
                                c0,18.176,13.419,38.293,27.947,51.797c-2.112,12.565-11.157,43.925-30.144,51.861l-56.896,18.965
                                c-3.264,1.088-5.611,3.776-6.635,7.04C53.376,391.189,21.291,327.317,21.291,256c0-129.387,105.28-234.667,234.667-234.667
                                S490.624,126.613,490.624,256C490.667,327.339,458.56,391.253,408.149,434.325z" fill={props.fill} />
                        </g>
                    </g>
                </svg>
            break;
        case 'sign-out':
            icon =
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.213 491.213" style={{...style}}>
                    <g>
                        <path d="M318.713,73.106c-32.723,0-64.571,9.208-92.103,26.628c-26.772,16.94-48.365,40.868-62.445,69.196l26.865,13.353
		                    c24.272-48.838,73.198-79.176,127.683-79.176c78.575,0,142.5,63.925,142.5,142.5s-63.925,142.5-142.5,142.5
                            c-54.484,0-103.41-30.338-127.683-79.176l-26.865,13.353c14.08,28.328,35.673,52.256,62.445,69.196
                            c27.531,17.42,59.38,26.628,92.103,26.628c95.117,0,172.5-77.383,172.5-172.5S413.83,73.106,318.713,73.106z" fill={props.fill} />
                        <polygon points="318.713,260.606 318.713,230.606 57.426,230.606 91.819,196.213 70.606,175 0,245.607 70.606,316.213 91.819,295
		                    57.425,260.606" fill={props.fill} />
                    </g>
                </svg>

            break;
        case 'home':
            icon =
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.865 201.865" style={{...style}}>
                    <g>
                        <path d="M200.65,105.892l-21.763-19.709V39.168c0-2.026-1.643-3.665-3.665-3.665h-19.158
                            c-0.973,0-1.908,0.383-2.598,1.074c-0.691,0.691-1.077,1.625-1.066,2.602l0.05,23.059l-47.466-42.993
                            c-1.389-1.256-3.482-1.267-4.889-0.032L1.247,106.278c-1.263,1.109-1.61,2.924-0.841,4.42c0.759,1.485,2.434,2.28,4.066,1.908
                            l21.971-4.96v67.758c-0.021,0.591-0.032,3.647,2.18,5.944c0.981,1.009,2.738,2.222,5.569,2.222c5.282,0,49.027-0.054,49.027-0.054
                            c2.029,0,3.661-1.643,3.665-3.665l0.057-40.509c-0.036-0.472,0.05-1.671,0.537-2.205c0.329-0.351,1.034-0.433,1.557-0.433h20.353
                            c0.913,0,2.147,0.147,2.781,0.805c0.698,0.716,0.687,1.961,0.676,2.154l-0.093,40.058c0,0.97,0.379,1.904,1.07,2.598
                            c0.687,0.687,1.632,1.081,2.598,1.081h48.003c3.264,0,5.268-1.378,6.363-2.527c2.559-2.663,2.473-6.313,2.459-6.564V106.54
                            l24.111,5.64c1.643,0.39,3.307-0.39,4.091-1.868C202.225,108.834,201.896,107.019,200.65,105.892z M159.744,42.836h11.817v36.705
                            l-11.76-10.651L159.744,42.836z M170.409,98.344c-1.081-0.258-2.24,0-3.11,0.698c-0.873,0.694-1.389,1.754-1.389,2.874v72.486
                            c0,0.394-0.143,1.12-0.419,1.403c-0.225,0.222-0.762,0.251-1.07,0.251h-44.328l0.079-36.129c0.032-0.44,0.218-4.366-2.609-7.401
                            c-1.356-1.435-3.858-3.153-8.181-3.153H89.029c-3.654,0-5.83,1.557-7.011,2.859c-2.516,2.788-2.473,6.524-2.409,7.573
                            l-0.057,36.383c-10.629,0.011-41.017,0.05-45.366,0.05c-0.132,0-0.215-0.007-0.268-0.007c-0.007,0-0.018,0-0.025,0
                            c-0.068-0.147-0.118-0.426-0.118-0.676v-72.493c0-1.113-0.515-2.169-1.381-2.867c-0.873-0.694-2.015-0.948-3.096-0.712
                            l-12.433,2.806l85.613-75.406l49.986,45.269v0.218h0.236l32.51,29.447L170.409,98.344z" fill={props.fill} />
                    </g>
                </svg>
            break;
        case 'view':
            icon =
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.794 80.794" style={{...style}}>
                    <g>
                        <g>
                            <path d="M79.351,38.549c-0.706-0.903-17.529-22.119-38.953-22.119c-21.426,0-38.249,21.216-38.955,22.119L0,40.396l1.443,1.847
                                c0.706,0.903,17.529,22.12,38.955,22.12c21.424,0,38.247-21.217,38.953-22.12l1.443-1.847L79.351,38.549z M40.398,58.364
                                c-15.068,0-28.22-13.046-32.643-17.967c4.425-4.922,17.576-17.966,32.643-17.966c15.066,0,28.218,13.045,32.642,17.966
                                C68.614,45.319,55.463,58.364,40.398,58.364z" fill={props.fill} />
                            <path d="M40.397,23.983c-9.052,0-16.416,7.363-16.416,16.414c0,9.053,7.364,16.417,16.416,16.417s16.416-7.364,16.416-16.417
                                C56.813,31.346,49.449,23.983,40.397,23.983z M40.397,50.813c-5.744,0-10.416-4.673-10.416-10.417
                                c0-5.742,4.672-10.414,10.416-10.414c5.743,0,10.416,4.672,10.416,10.414C50.813,46.14,46.14,50.813,40.397,50.813z" fill={props.fill} />
                        </g>
                    </g>
                </svg>
            break;
        case 'folderopen':
            icon =
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" style={{...style}}>
                    <g>
                        <g>
                            <polygon points="56.8,193.3 0,426.2 433.2,426.2 490,193.3" fill={props.fill} />
                            <polygon points="433.2,169.6 433.2,130.3 174.2,130.3 131.5,63.8 0,63.8 0,326.3 38.2,169.6" fill={props.fill} />
                        </g>
                    </g>
                </svg>
            break;
        case 'folderclose':
            icon =
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 440" style={{...style}}>
                    <g>
                        <path d="M420,78.072V60c0-16.5-13.5-30-30-30H240v40h150C400.925,70,411.167,72.949,420,78.072z" fill={props.fill} />
                        <path d="M340.57,211.141c29.914,0,57.487,10.205,79.43,27.311V130c0-16.5-13.5-30-30-30H210V30c0-16.5-13.5-30-30-30H30
		                    C13.5,0,0,13.5,0,30v310.57h211.141C211.141,269.202,269.202,211.141,340.57,211.141z" fill={props.fill} />
                        <path d="M340.57,241.141c-54.825,0-99.43,44.604-99.43,99.43S285.745,440,340.57,440c54.826,0,99.43-44.604,99.43-99.43
		                    S395.396,241.141,340.57,241.141z M402.071,355.57h-46.5v46.5h-30v-46.5h-46.5v-30h46.5v-46.5h30v46.5h46.5V355.57z" fill={props.fill} />
                    </g>
                </svg>
            break;

        case 'property-buy-sell':
            icon =
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{...style}}>
                    <g transform="translate(1 1)">
                        <g>
                            <g>
                                <path d="M141.37,257.95c-1.71-1.97-3.41-2.95-5.97-2.95s-4.27,0.98-5.97,2.95L35.56,366.26c-3.41,3.94-3.41,9.85,0,13.78
                                    l25.6,29.54c1.71,1.97,3.41,2.95,5.97,2.95s4.27-0.98,5.97-2.95l2.56-2.95v55.14c0,5.91,3.41,9.85,8.53,9.85h102.4
                                    c5.12,0,8.53-3.94,8.53-9.85v-55.14l2.56,2.95c1.71,1.97,3.41,2.95,5.97,2.95s4.27-0.98,5.97-2.95l25.6-29.54
                                    c1.71-1.97,2.56-3.94,2.56-6.89c0-2.95-0.85-4.92-2.56-6.89L141.37,257.95z M178.07,451.92H92.73v-64.98l42.67-49.23l42.67,49.23
                                    L178.07,451.92L178.07,451.92z M203.67,388.91l-11.09-12.8l-51.2-59.08c-0.85-1.97-2.56-2.95-4.27-2.95c0,0-0.85,0-1.71,0
                                    c-2.56,0-4.27,0.98-5.97,2.95l-51.2,59.08l-11.09,12.8l-13.65-15.75l81.92-94.52l81.92,94.52L203.67,388.91z" fill={props.fill} />
                                <path d="M263.4,304.23c0,5.91,3.41,9.85,8.53,9.85h162.13c5.12,0,8.53-3.94,8.53-9.85c0-5.91-3.41-9.85-8.53-9.85H271.93
				                    C266.81,294.38,263.4,298.32,263.4,304.23z" fill={props.fill} />
                                <path d="M434.07,353.46h-76.8c-5.12,0-8.53,3.94-8.53,9.85c0,5.91,3.41,9.85,8.53,9.85h76.8c5.12,0,8.53-3.94,8.53-9.85
				                    C442.6,357.4,439.19,353.46,434.07,353.46z" fill={props.fill} />
                                <path d="M271.93,373.15h51.2c5.12,0,8.53-3.94,8.53-9.85s-3.41-9.85-8.53-9.85h-51.2c-5.12,0-8.53,3.94-8.53,9.85
				                    C263.4,369.22,266.81,373.15,271.93,373.15z" fill={props.fill} />
                                <path d="M434.07,412.54H391.4c-5.12,0-8.53,3.94-8.53,9.85c0,5.91,3.41,9.85,8.53,9.85h42.67c5.12,0,8.53-3.94,8.53-9.85
				                    C442.6,416.48,439.19,412.54,434.07,412.54z" fill={props.fill} />
                                <path d="M357.27,412.54h-85.33c-5.12,0-8.53,3.94-8.53,9.85c0,5.91,3.41,9.85,8.53,9.85h85.33c5.12,0,8.53-3.94,8.53-9.85
				                    C365.8,416.48,362.39,412.54,357.27,412.54z" fill={props.fill} />
                                <path d="M433.86,77.77c7.71,12.02,20.12,19.69,34.34,19.69c23.89,0,42.67-21.66,42.67-49.23S492.09-1,468.2-1
                                    c-14.22,0-26.62,7.67-34.34,19.69H7.4c-5.12,0-8.53,3.94-8.53,9.85v39.38c0,5.91,3.41,9.85,8.53,9.85h85.33v39.38H33
                                    c-18.77,0-34.13,17.72-34.13,39.39v315.08C-1.13,493.28,14.23,511,33,511h409.6c18.77,0,34.13-17.72,34.13-39.38V156.54
                                    c0-21.66-15.36-39.38-34.13-39.38h-59.73V77.77H433.86z M468.2,18.69c14.51,0,25.6,12.8,25.6,29.54s-11.09,29.54-25.6,29.54
                                    c-9.14,0-16.93-5.09-21.44-13.04c-0.2-0.6-0.43-1.18-0.75-1.73c-1.23-2.37-2.06-4.74-2.6-7.12c-0.22-0.99-0.39-2-0.52-3.03
                                    c0-0.02-0.01-0.04-0.01-0.06c-0.06-0.47-0.11-0.93-0.15-1.41c-0.01-0.11-0.02-0.22-0.02-0.33c-0.03-0.4-0.06-0.8-0.08-1.2
                                    c-0.02-0.54-0.04-1.09-0.04-1.63c0-0.51,0.01-1.01,0.03-1.51c0-0.03,0-0.05,0-0.08c0.02-0.47,0.05-0.94,0.09-1.41
                                    c0.01-0.11,0.02-0.21,0.03-0.32c0.02-0.2,0.04-0.4,0.06-0.61c0.42-3.62,1.55-7.23,4.05-10.84c0.67-1.16,1.07-2.48,1.21-3.83
                                    C452.7,22.9,459.89,18.69,468.2,18.69z M15.93,38.39h410.42c-0.02,0.1-0.03,0.2-0.05,0.3c-0.77,2.92-0.78,6.69-0.78,9.55
                                    c0,2.86,0.01,6.63,0.78,9.55c0.02,0.1,0.03,0.2,0.05,0.3H15.93V38.39z M442.6,136.85c9.39,0,17.07,8.86,17.07,19.69v315.08
                                    c0,10.83-7.68,19.69-17.07,19.69H33c-9.39,0-17.07-8.86-17.07-19.69V156.54c0-10.83,7.68-19.69,17.07-19.69h59.73v20.95
                                    c-14.68,4.4-25.6,19.86-25.6,38.13c0,21.66,15.36,39.38,34.13,39.38s34.13-17.72,34.13-39.38c0-18.26-10.92-33.73-25.6-38.13
                                    v-20.95h256v20.95c-14.68,4.4-25.6,19.86-25.6,38.13c0,21.66,15.36,39.38,34.13,39.38s34.13-17.72,34.13-39.38
                                    c0-18.27-10.92-33.73-25.6-38.13v-20.95H442.6z M101.27,195.92c5.12,0,8.53-3.94,8.53-9.85v-7.17c5.09,3.42,8.53,9.77,8.53,17.01
                                    c0,10.83-7.68,19.69-17.07,19.69s-17.07-8.86-17.07-19.69c0-7.25,3.45-13.59,8.53-17.01v7.17
                                    C92.73,191.99,96.15,195.92,101.27,195.92z M374.33,195.92c5.12,0,8.53-3.94,8.53-9.85v-7.17c5.09,3.42,8.53,9.77,8.53,17.01
                                    c0,10.83-7.68,19.69-17.07,19.69s-17.07-8.86-17.07-19.69c0-7.25,3.45-13.59,8.53-17.01v7.17
                                    C365.8,191.99,369.21,195.92,374.33,195.92z M365.8,117.15h-256V77.77h256V117.15z" fill={props.fill} />
                            </g>
                        </g>
                    </g>
                </svg>
            break;
        case 'legal-document':
            icon =
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{...style}}>
                    <polygon points="436.89,408.79 436.89,21.77 104.09,21.77 104.09,0 458.49,0 458.49,408.79 " fill={props.fill} />
                    <rect x="155.29" y="129.01" width="149.6" height="21.77" fill={props.fill} />
                    <rect x="104.09" y="180.61" width="252" height="21.77" fill={props.fill} />
                    <rect x="104.09" y="232.21" width="175.2" height="21.77" fill={props.fill} />
                    <path d="M306.89,512c-3.64,0-7.29-0.87-10.56-2.51l-15.04-7.58l-15.05,7.58c-3.26,1.64-6.9,2.51-10.55,2.51
                        c-4.39,0-8.68-1.23-12.4-3.55c-7.01-4.37-11.2-11.93-11.2-20.24V460.4H52.89V51.6h354.4V460.4h-76.8v27.82
                        c0,8.3-4.18,15.87-11.19,20.23C315.57,510.77,311.28,512,306.89,512z M253.69,491.48l27.6-13.91l27.6,13.91V454.8l-2.67,0.96
                        c-8.69,3.12-16.85,4.64-24.93,4.64c-8.08,0-16.24-1.52-24.93-4.64l-2.67-0.96V491.48z M281.29,309.62c41.25,0,74.8,33.82,74.8,75.39
                        c0,18.38-6.91,36.22-19.46,50.25l-3.01,3.37h52.07V73.37H74.49v365.25h154.47l-3.01-3.37c-12.55-14.03-19.46-31.88-19.46-50.25
                        C206.49,343.44,240.04,309.62,281.29,309.62z M281.29,331.39c-29.33,0-53.2,24.05-53.2,53.62s23.87,53.62,53.2,53.62
                        c29.33,0,53.2-24.05,53.2-53.62S310.62,331.39,281.29,331.39z" fill={props.fill} />
                </svg>
            break;
        case 'tax-accounting':
            icon =
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{...style}}>
                    <g>
                        <path d="M311.22,508.92l-17.06-9.79L8.74,336.2l20.9-12l286.82,163.79l162.02-93.01l21.01,12.01L316.67,512L311.22,508.92z
	                        M310.79,451.52l-17.07-9.69L8.74,279.22l20.9-12l286.61,163.47l162.66-93.32l21.11,12.01L316.36,454.7L310.79,451.52z
                             M311.22,394.85l-17.06-9.79L8.74,222.13l20.9-12l286.82,163.79l162.02-93.01l21.01,12L316.67,397.93L311.22,394.85z M310.79,337.45
                            l-17.07-9.69L8.74,165.15l20.9-12l286.61,163.47l162.66-93.32l21.11,12.01L316.36,340.63L310.79,337.45z M314.49,280.91
                            c-2.59,0-5.05-0.57-6.91-1.61L10.53,109.93C8.9,109,8,107.81,8,106.59c0-1.22,0.9-2.41,2.53-3.35L187.6,1.6
                            c1.85-1.03,4.32-1.6,6.94-1.6c2.62,0,5.05,0.57,6.86,1.6l297.06,169.37c1.63,0.93,2.54,2.13,2.54,3.36c0.01,1.22-0.86,2.4-2.45,3.34
                            L321.39,279.31C319.54,280.33,317.09,280.91,314.49,280.91z M310.77,231.3c10.13,0,19.66,2.25,26.83,6.34
                            c2.27,1.22,4.2,2.62,5.76,4.16l0.56,0.55l86.01-49.52l-2.09-0.71c-3.07-1.05-5.45-2.09-7.49-3.28c-7.03-3.96-10.9-9.19-10.93-14.73
                            c-0.02-5.51,3.78-10.74,10.71-14.72c2.18-1.17,4.57-2.22,7.3-3.19l2.06-0.73L226.19,39.52l-0.56,0.5c-1.22,1.1-2.66,2.12-4.29,3.02
                            c-7.13,4.1-16.63,6.35-26.76,6.35c-10.13,0-19.66-2.25-26.83-6.34c-1.76-1.08-3.07-2-4.23-2.96l-0.55-0.45L78.01,88.42l1.9,0.77
                            c1.66,0.67,3.33,1.48,5.11,2.47c7.01,3.95,10.88,9.17,10.91,14.71c0.02,5.51-3.78,10.74-10.71,14.72c-1.54,0.95-3.27,1.79-5.3,2.57
                            l-1.97,0.76L280.5,240.09l0.55-0.42c0.96-0.73,1.86-1.42,2.96-2.02C291.14,233.55,300.64,231.3,310.77,231.3z M351.56,205.25
                            c-1.18,0-2.28-0.26-3.11-0.73l-22.93-13.06c-0.64-0.37-1.01-0.82-1.01-1.24c0-0.42,0.37-0.87,1.01-1.24l13.12-7.48
                            c0.83-0.47,1.94-0.73,3.13-0.73c1.2,0,2.34,0.26,3.22,0.74l22.92,13.05c0.58,0.35,0.92,0.8,0.92,1.22
                            c-0.01,0.43-0.38,0.89-1.03,1.26l-13.12,7.48C353.84,204.99,352.74,205.25,351.56,205.25z M254.73,187.19
                            c-22.16,0-42.97-4.92-58.6-13.85c-15.54-8.85-24.12-20.56-24.14-32.98c-0.03-12.34,8.4-23.99,23.72-32.8
                            c15.58-8.93,36.35-13.84,58.5-13.84c22.14,0,42.97,4.92,58.66,13.85c15.53,8.87,24.08,20.6,24.09,33.02
                            c0.01,12.34-8.43,23.97-23.77,32.76C297.65,182.27,276.89,187.19,254.73,187.19z M221.15,151.09h24.06l53.61,0.11v-15.17l-52.59-0.1
                            v-12.64l-25.09-0.12V151.09z M167.24,100.13c-1.18,0-2.29-0.26-3.11-0.73l-22.93-13.06c-0.64-0.37-1.01-0.82-1.01-1.24
                            c0-0.42,0.37-0.87,1.01-1.24l13.12-7.48c0.83-0.47,1.94-0.73,3.13-0.73c1.2,0,2.34,0.26,3.22,0.74l22.81,13.05
                            c0.64,0.37,1.01,0.82,1.01,1.24c0,0.42-0.37,0.87-1.01,1.24l-13.12,7.48C169.53,99.87,168.42,100.13,167.24,100.13z" fill={props.fill} />
                    </g>
                </svg>
            break;
        case 'uk-eu-relationship':
            icon =
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 125" style={{...style}}>
                    <switch>
                        <foreignObject requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/" x="0" y="0" width="1" height="1"/>
                        <g>
                            <g>
                                <path d="M5273.1,2400.1v-2c0-2.8-5-4-9.7-4s-9.7,1.3-9.7,4v2c0,1.8,0.7,3.6,2,4.9l5,4.9c0.3,0.3,0.4,0.6,0.4,1v6.4
                                    c0,0.4,0.2,0.7,0.6,0.8l2.9,0.9c0.5,0.1,1-0.2,1-0.8v-7.2c0-0.4,0.2-0.7,0.4-1l5.1-5C5272.4,2403.7,5273.1,2401.9,5273.1,2400.1z
                                     M5263.4,2400c-4.8,0-7.4-1.3-7.5-1.8v0c0.1-0.5,2.7-1.8,7.5-1.8c4.8,0,7.3,1.3,7.5,1.8C5270.7,2398.7,5268.2,2400,5263.4,2400z" fill={props.fill} />
                                <path d="M5268.4,2410.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1H5268.4z" fill={props.fill} />
                                <path d="M5272.7,2413.7h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2414.1,5273.3,2413.7,5272.7,2413.7z" fill={props.fill} />
                                <path d="M5272.7,2417h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2417.5,5273.3,2417,5272.7,2417z" fill={props.fill} />
                            </g>
                            <g>
                                <path d="M86.9,61c-1.3,0-2.3,1-2.3,2.3v18c0,4.1-3.3,7.4-7.4,7.4H14.6c-4.1,0-7.4-3.3-7.4-7.4V18.7c0-4.1,3.3-7.4,7.4-7.4h62.6
                                    c4.1,0,7.4,3.3,7.4,7.4v18c0,1.3,1,2.3,2.3,2.3s2.3-1,2.3-2.3v-18c0-6.7-5.4-12.1-12.1-12.1H14.6C7.9,6.6,2.5,12,2.5,18.7v62.6
                                    c0,6.7,5.4,12.1,12.1,12.1h62.6c6.7,0,12.1-5.4,12.1-12.1v-18C89.3,62,88.2,61,86.9,61z" fill={props.fill} />
                                <path d="M46.6,41.9c1.3-0.9,3-0.6,4.4,0.6c0.4,0.4,1,0.6,1.6,0.6c0.6,0,1.2-0.3,1.6-0.7c0.4-0.5,0.6-1,0.6-1.6
                                    c0-0.6-0.3-1.2-0.7-1.6c-2.9-2.7-6.8-3.1-9.9-1c-3.2,2.1-4.4,6-3.1,9.9c0.1,0.1,0.1,0.3,0.1,0.4l0.1,0.5h-2.5
                                    c-1,0-1.8,0.8-1.8,1.8c0,1,0.8,1.8,1.8,1.8h2.7l0,0.3c-0.6,3.8-3,6.3-3.1,6.4c-0.7,0.7-0.9,1.8-0.4,2.7c0.5,0.9,1.5,1.3,2.5,1.1
                                    c0.8-0.2,2.4-0.5,3.7-0.5c0.7,0,1.3,0.1,1.8,0.2c0.8,0.2,1.7,0.4,2.7,0.4c2.1,0,3.9-0.5,4.1-0.6c1.2-0.3,1.9-1.6,1.6-2.8
                                    c-0.2-0.6-0.5-1.1-1.1-1.4c-0.5-0.3-1.1-0.4-1.7-0.2c-0.6,0.2-1.8,0.4-3,0.4c-0.5,0-0.9-0.1-1.3-0.2c-0.7-0.2-1.5-0.4-2.5-0.4
                                    l-0.4,0l0.2-0.3c0.7-1.6,1.2-3.3,1.4-4.9v-0.2h4.1c1,0,1.8-0.8,1.8-1.8c0-1-0.8-1.8-1.8-1.8H46l-0.1-0.2
                                    c-0.1-0.8-0.3-1.5-0.5-2.1C44.6,44.3,45.6,42.6,46.6,41.9z" fill={props.fill} />
                                <path d="M50.4,22.3c0.6-0.5,0.3-1.4-0.5-1.4l-1.9-0.2c-0.3,0-0.6-0.2-0.7-0.5l-0.7-1.8c-0.3-0.7-1.2-0.7-1.5,0l-0.7,1.8
                                    c-0.1,0.3-0.4,0.5-0.7,0.5l-1.9,0.2c-0.7,0.1-1,1-0.5,1.4l1.5,1.2c0.2,0.2,0.3,0.5,0.3,0.8l-0.4,1.9c-0.2,0.7,0.6,1.3,1.2,0.9
                                    l1.6-1c0.3-0.2,0.6-0.2,0.9,0l1.6,1c0.6,0.4,1.4-0.2,1.2-0.9l-0.4-1.9c-0.1-0.3,0-0.6,0.3-0.8L50.4,22.3z" fill={props.fill} />
                                <path d="M27.8,26.8c-0.6,0.4-0.4,1.4,0.3,1.5l1.9,0.4c0.3,0.1,0.5,0.3,0.6,0.6l0.5,1.8c0.2,0.7,1.2,0.8,1.5,0.2l0.9-1.7
                                    c0.1-0.3,0.4-0.4,0.7-0.4l1.9,0c0.7,0,1.1-0.9,0.6-1.4l-1.3-1.4c-0.2-0.2-0.3-0.5-0.2-0.8l0.6-1.8c0.2-0.7-0.5-1.3-1.1-1
                                    l-1.7,0.8c-0.3,0.1-0.6,0.1-0.9-0.1l-1.5-1.2c-0.6-0.4-1.4,0-1.3,0.8l0.2,1.9c0,0.3-0.1,0.6-0.3,0.8L27.8,26.8z" fill={props.fill} />
                                <path d="M27,35.3l-1.8-0.5c-0.3-0.1-0.5-0.3-0.6-0.6l-0.4-1.9c-0.1-0.7-1.1-0.9-1.5-0.3l-1.1,1.6c-0.2,0.3-0.5,0.4-0.8,0.3
                                    l-1.9-0.2c-0.7-0.1-1.2,0.7-0.8,1.3l1.2,1.5c0.2,0.2,0.2,0.6,0.1,0.9L18.6,39c-0.3,0.7,0.3,1.4,1,1.1l1.8-0.6
                                    c0.3-0.1,0.6,0,0.8,0.2l1.4,1.3c0.5,0.5,1.4,0.1,1.4-0.6l0-1.9c0-0.3,0.2-0.6,0.4-0.7l1.7-0.9C27.8,36.4,27.7,35.5,27,35.3z" fill={props.fill} />
                                <path d="M16.8,45.9l-0.2,1.9c0,0.3-0.2,0.6-0.5,0.7l-1.8,0.7c-0.7,0.3-0.7,1.2,0,1.5l1.8,0.7c0.3,0.1,0.5,0.4,0.5,0.7l0.2,1.9
                                    c0.1,0.7,1,1,1.4,0.5l1.2-1.5c0.2-0.2,0.5-0.3,0.8-0.3l1.9,0.4c0.7,0.2,1.3-0.6,0.9-1.2l-1-1.6c-0.2-0.3-0.2-0.6,0-0.9l1-1.6
                                    c0.4-0.6-0.2-1.4-0.9-1.2l-1.9,0.4c-0.3,0.1-0.6,0-0.8-0.3l-1.2-1.5C17.7,44.9,16.8,45.2,16.8,45.9z" fill={props.fill} />
                                <path d="M18.9,66.4l1.9-0.2c0.3,0,0.6,0.1,0.8,0.3l1.1,1.6c0.4,0.6,1.4,0.4,1.5-0.3l0.4-1.9c0.1-0.3,0.3-0.5,0.6-0.6l1.8-0.5
                                    c0.7-0.2,0.8-1.2,0.2-1.5l-1.7-0.9c-0.3-0.1-0.4-0.4-0.4-0.7l0-1.9c0-0.7-0.9-1.1-1.4-0.6l-1.4,1.3c-0.2,0.2-0.5,0.3-0.8,0.2
                                    l-1.8-0.6c-0.7-0.2-1.3,0.5-1,1.1l0.8,1.7c0.1,0.3,0.1,0.6-0.1,0.9l-1.2,1.5C17.7,65.7,18.2,66.5,18.9,66.4z" fill={props.fill} />
                                <path d="M36.9,72.2c0.5-0.5,0.1-1.4-0.6-1.4l-1.9,0c-0.3,0-0.6-0.2-0.7-0.4l-0.9-1.7c-0.4-0.6-1.3-0.5-1.5,0.2l-0.5,1.8
                                    c-0.1,0.3-0.3,0.5-0.6,0.6l-1.9,0.4c-0.7,0.1-0.9,1.1-0.3,1.5l1.6,1.1c0.3,0.2,0.4,0.5,0.3,0.8l-0.2,1.9
                                    c-0.1,0.7,0.7,1.2,1.3,0.8l1.5-1.2c0.2-0.2,0.6-0.2,0.9-0.1l1.7,0.8c0.7,0.3,1.4-0.3,1.1-1l-0.6-1.8c-0.1-0.3,0-0.6,0.2-0.8
                                    L36.9,72.2z" fill={props.fill} />
                                <path d="M41.3,77.7c-0.6,0.5-0.3,1.4,0.5,1.4l1.9,0.2c0.3,0,0.6,0.2,0.7,0.5l0.7,1.8c0.3,0.7,1.2,0.7,1.5,0l0.7-1.8
                                    c0.1-0.3,0.4-0.5,0.7-0.5l1.9-0.2c0.7-0.1,1-1,0.5-1.4L49,76.4c-0.2-0.2-0.3-0.5-0.3-0.8l0.4-1.9c0.2-0.7-0.6-1.3-1.2-0.9l-1.6,1
                                    c-0.3,0.2-0.6,0.2-0.9,0l-1.6-1c-0.6-0.4-1.4,0.2-1.2,0.9l0.4,1.9c0.1,0.3,0,0.6-0.3,0.8L41.3,77.7z" fill={props.fill} />
                                <path d="M64,73.2c0.6-0.4,0.4-1.4-0.3-1.5l-1.9-0.4c-0.3-0.1-0.5-0.3-0.6-0.6l-0.5-1.8c-0.2-0.7-1.2-0.8-1.5-0.2l-0.9,1.7
                                    c-0.1,0.3-0.4,0.4-0.7,0.4l-1.9,0c-0.7,0-1.1,0.9-0.6,1.4l1.3,1.4c0.2,0.2,0.3,0.5,0.2,0.8l-0.6,1.8c-0.2,0.7,0.5,1.3,1.1,1
                                    l1.7-0.8c0.3-0.1,0.6-0.1,0.9,0.1l1.5,1.2c0.6,0.4,1.4,0,1.3-0.8L62.1,75c0-0.3,0.1-0.6,0.3-0.8L64,73.2z" fill={props.fill} />
                                <path d="M64.8,64.7l1.8,0.5c0.3,0.1,0.5,0.3,0.6,0.6l0.4,1.9c0.1,0.7,1.1,0.9,1.5,0.3l1.1-1.6c0.2-0.3,0.5-0.4,0.8-0.3l1.9,0.2
                                    c0.7,0.1,1.2-0.7,0.8-1.3l-1.2-1.5c-0.2-0.2-0.2-0.6-0.1-0.9l0.8-1.7c0.3-0.7-0.3-1.4-1-1.1l-1.8,0.6c-0.3,0.1-0.6,0-0.8-0.2
                                    L68.1,59c-0.5-0.5-1.4-0.1-1.4,0.6l0,1.9c0,0.3-0.2,0.6-0.4,0.7l-1.7,0.9C64,63.6,64.1,64.5,64.8,64.7z" fill={props.fill} />
                                <path d="M97,49.2l-1.8-0.7c-0.3-0.1-0.5-0.4-0.5-0.7l-0.2-1.9c-0.1-0.7-1-1-1.4-0.5l-1.2,1.5c-0.2,0.2-0.5,0.3-0.8,0.3l-1.9-0.4
                                    c-0.7-0.2-1.3,0.6-0.9,1.2l1,1.6c0.2,0.3,0.2,0.6,0,0.9l-1,1.6c-0.4,0.6,0.2,1.4,0.9,1.2l1.9-0.4c0.3-0.1,0.6,0,0.8,0.3l1.2,1.5
                                    c0.5,0.6,1.4,0.3,1.4-0.5l0.2-1.9c0-0.3,0.2-0.6,0.5-0.7l1.8-0.7C97.7,50.5,97.7,49.5,97,49.2z" fill={props.fill} />
                                <path d="M73.6,34.9c0.4-0.6,0-1.4-0.8-1.3l-1.9,0.2c-0.3,0-0.6-0.1-0.8-0.3L69,31.9c-0.4-0.6-1.4-0.4-1.5,0.3l-0.4,1.9
                                    c-0.1,0.3-0.3,0.5-0.6,0.6l-1.8,0.5c-0.7,0.2-0.8,1.2-0.2,1.5l1.7,0.9c0.3,0.1,0.4,0.4,0.4,0.7l0,1.9c0,0.7,0.9,1.1,1.4,0.6
                                    l1.4-1.3c0.2-0.2,0.5-0.3,0.8-0.2l1.8,0.6c0.7,0.2,1.3-0.5,1-1.1l-0.8-1.7c-0.1-0.3-0.1-0.6,0.1-0.9L73.6,34.9z" fill={props.fill} />
                                <path d="M54.9,27.8c-0.5,0.5-0.1,1.4,0.6,1.4l1.9,0c0.3,0,0.6,0.2,0.7,0.4l0.9,1.7c0.4,0.6,1.3,0.5,1.5-0.2l0.5-1.8
                                    c0.1-0.3,0.3-0.5,0.6-0.6l1.9-0.4c0.7-0.1,0.9-1.1,0.3-1.5l-1.6-1.1c-0.3-0.2-0.4-0.5-0.3-0.8l0.2-1.9c0.1-0.7-0.7-1.2-1.3-0.8
                                    l-1.5,1.2c-0.2,0.2-0.6,0.2-0.9,0.1l-1.7-0.8c-0.7-0.3-1.4,0.3-1.1,1l0.6,1.8c0.1,0.3,0,0.6-0.2,0.8L54.9,27.8z" fill={props.fill} />
                                <path d="M76.5,56c0.4,0.4,0.8,0.5,1.3,0.5c0.5,0,0.9-0.2,1.3-0.5l4.7-4.7c0.7-0.7,0.7-1.9,0-2.6L79.1,44c-0.7-0.7-1.9-0.7-2.6,0
                                    c-0.7,0.7-0.7,1.9,0,2.6l1.6,1.6H60.9c-1,0-1.9,0.8-1.9,1.9s0.8,1.9,1.9,1.9h17.2l-1.6,1.6C75.8,54.2,75.8,55.3,76.5,56z" fill={props.fill} />
                            </g>
                        </g>
                    </switch>
                </svg>
            break;
        case 'property-conveyancing':
            icon =
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{...style}}>
                    <g>
                        <g>
                            <path d="M508.16,240.53L262.36,2.78c-3.83-3.71-9.52-3.71-13.36,0L3.21,240.53c-3.22,3.11-4.37,8.13-2.88,12.59
                                s5.3,7.41,9.56,7.41h61.79v240.09c0,6.29,4.57,11.39,10.2,11.39h347.61c5.63,0,10.2-5.1,10.2-11.39V260.53h61.79
                                c4.26,0,8.07-2.95,9.56-7.41C512.53,248.66,511.38,243.64,508.16,240.53z M429.49,237.75c-5.63,0-10.2,5.1-10.2,11.39v240.09
                                H92.08V249.14c0-6.29-4.57-11.39-10.2-11.39H37.23l218.45-211.3l218.45,211.3H429.49z" fill={props.fill} />
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M414.29,203.34l-66.7-65.47c-4.23-4.15-10.67-3.69-14.39,1.03s-3.3,11.92,0.93,16.07l66.7,65.47
			                    c1.94,1.9,4.34,2.83,6.73,2.83c2.83,0,5.65-1.31,7.66-3.87C418.94,214.69,418.52,207.49,414.29,203.34z" fill={props.fill} />
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M323.99,114.71l-3.08-3.02c-4.23-4.16-10.67-3.69-14.39,1.03c-3.72,4.72-3.3,11.92,0.92,16.07l3.08,3.02
			                    c1.94,1.9,4.34,2.84,6.73,2.84c2.83,0,5.65-1.31,7.66-3.87C328.64,126.05,328.22,118.86,323.99,114.71z" fill={props.fill} />
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M376.11,391.23L269.75,272.47c4.89-24.17-1.52-49.35-17.45-67.13c-12.26-13.69-28.56-21.23-45.9-21.23
                                c-17.34,0-33.64,7.54-45.9,21.23c-25.31,28.26-25.31,74.24,0,102.5c15.93,17.78,38.48,24.94,60.12,19.48l7.08,7.91
                                c2.02,2.26,4.83,3.46,7.69,3.32l0.76,3.66c0.43,2.08,1.37,3.98,2.73,5.49l9.97,11.13c1.91,2.13,4.51,3.33,7.21,3.33h2.96v3.31
                                c0,3.02,1.08,5.92,2.99,8.05l7.78,8.68c1.91,2.13,4.51,3.33,7.21,3.33h12.93v14.44c0,3.02,1.08,5.92,2.99,8.05l15.95,17.81
                                c1.91,2.13,4.51,3.33,7.21,3.33h5.89v6.57c0,3.02,1.08,5.92,2.99,8.05l14.43,16.11c1.91,2.13,4.51,3.33,7.21,3.33
                                s5.3-1.2,7.21-3.33l22.3-24.9c1.91-2.14,2.99-5.03,2.99-8.05v-27.68C379.1,396.26,378.02,393.36,376.11,391.23z M358.7,422.25
                                l-12.1,13.51l-4.23-4.72h0V417.8c0-6.29-4.57-11.39-10.2-11.39h-11.86l-9.98-11.14v-21.11c0-6.29-4.57-11.39-10.2-11.39h-18.91
                                l-1.8-2.01v-9.98c0-6.29-4.57-11.39-10.2-11.39h-8.94l-4.91-5.49l-3.53-17.08c-0.83-4.03-3.56-7.24-7.13-8.38
                                c-3.46-1.11-7.18-0.1-9.79,2.64l-4.07-4.55c-2.73-3.04-6.76-4.11-10.42-2.76c-16.1,5.95-33.53,1.34-45.51-12.03
                                c-17.36-19.38-17.36-50.91,0-70.29c8.41-9.39,19.59-14.56,31.48-14.56c11.89,0,23.07,5.17,31.48,14.56
                                c11.98,13.37,16.11,32.84,10.78,50.81c-1.21,4.09-0.26,8.59,2.47,11.63L358.7,404L358.7,422.25L358.7,422.25z" fill={props.fill} />
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M208.33,242.25l-5.61-6.26c-3.98-4.45-10.44-4.45-14.43,0c-3.98,4.45-3.98,11.66,0,16.11l5.61,6.26
			                    c1.99,2.22,4.6,3.33,7.21,3.33s5.22-1.11,7.21-3.33C212.31,253.91,212.31,246.7,208.33,242.25z" fill={props.fill} />
                        </g>
                    </g>
                </svg>
            break;
        case 'mortgage-service':
            icon =
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.003 512.003" style={{...style}}>
                    <path d="M11.85,512c-6.53,0-11.85-5.3-11.85-11.82s5.31-11.82,11.85-11.82h39.55V281.15H24.7c-10.02,0-18.98-5.97-22.81-15.22
                        c-3.84-9.25-1.74-19.79,5.35-26.87l82.71-82.55V51.3c0-13.59,11.08-24.65,24.7-24.65h25.7c13.62,0,24.7,11.06,24.7,24.65v30.27
                        l73.49-73.34C243.2,3.56,249.4,1,256,1c6.6,0,12.8,2.56,17.47,7.21l231.29,230.85c7.08,7.08,9.18,17.62,5.35,26.87
                        c-3.84,9.24-12.8,15.22-22.82,15.22h-26.7v207.21h39.55c6.53,0,11.85,5.3,11.85,11.82S506.67,512,500.14,512H11.85z M75.1,488.35
                        h361.8V257.5h52.82L256,24.23L22.28,257.5H75.1V488.35z M113.65,132.86l27.71-27.65V50.3h-27.71V132.86z" fill={props.fill} />
                    <polygon points="145.54,426.98 349.71,223.2 366.46,239.92 162.29,443.7 " fill={props.fill} />
                    <path d="M191.75,319.62c-27.79,0-50.39-22.56-50.39-50.3c0-27.73,22.61-50.3,50.39-50.3c27.79,0,50.39,22.56,50.39,50.3
                        C242.14,297.06,219.54,319.62,191.75,319.62z M191.75,242.67c-14.72,0-26.7,11.96-26.7,26.65c0,14.7,11.98,26.65,26.7,26.65
                        c14.72,0,26.7-11.96,26.7-26.65C218.45,254.63,206.47,242.67,191.75,242.67z" fill={props.fill} />
                    <path d="M320.25,447.87c-27.79,0-50.39-22.56-50.39-50.3c0-27.73,22.61-50.3,50.39-50.3c27.79,0,50.39,22.56,50.39,50.3
                        C370.64,425.31,348.03,447.87,320.25,447.87z M320.25,370.92c-14.72,0-26.7,11.96-26.7,26.65c0,14.7,11.98,26.65,26.7,26.65
                        c14.72,0,26.7-11.96,26.7-26.65C346.95,382.88,334.97,370.92,320.25,370.92z" fill={props.fill} />
                </svg>
            break;
        case 'money-transfer':
            icon =
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <g>
                        <g>
                            <g>
                                <path d="m473.6,256.6c0-99.3-67.1-185.9-163.3-210.6-9.2-2.4-18.6,3.2-20.9,12.4-2.4,9.2 3.2,18.6 12.4,20.9 80.9,20.7 137.4,93.7 137.4,177.3 0,73.7-43.9,139-109.6,167.7l15.9-37c3.7-8.7-0.3-18.8-9-22.6-8.7-3.7-18.8,0.3-22.6,9l-31,72.2c-3.7,8.7 0.3,18.8 9,22.6l72.2,31c10.8,3.8 19.8-2.5 22.6-9 3.7-8.7-0.3-18.8-9-22.6l-31.4-13.5c76.5-34.6 127.3-111.4 127.3-197.8z" fill={props.fill} />
                                <path d="m210.4,433.9c-80.9-20.8-137.4-93.7-137.4-177.3 0-72.7 42.7-137.2 106.9-166.5l-14.9,34.6c-3.7,8.7 0.1,19.2 9,22.6 10.4,3.9 19.2-0.8 22.6-9l31-72.3c3-7 2.9-17.5-9-22.6l-72.2-31c-8.7-3.7-18.8,0.3-22.6,9-3.7,8.7 0.3,18.8 9,22.6l33.6,14.4c-76.8,34.7-127.8,111.6-127.8,198.2 7.10543e-15,99.3 67.2,185.8 163.3,210.6 11.6,3 18.9-4.6 20.9-12.4 2.3-9.2-3.2-18.5-12.4-20.9z" fill={props.fill} />
                                <path d="m296.6,321.4c8.8-9.2 13.2-20.8 13.2-34.6 0-6.3-1.1-12.1-3.2-17.5-2.1-5.4-5.1-10-9-14-3.9-3.9-9-7.2-15.2-10-3.3-1.4-9.9-3.4-20-5.9v-57.4c6.5,1.3 11.6,4.1 15.4,8.3 3.7,4.2 6.2,10.2 7.4,18l20.6-3.1c-1.8-12.6-7-22.6-15.7-29.8-6.8-5.7-16-9.1-27.6-10.2v-9.5h-11.8v9.5c-13.2,1.3-23.2,5-29.9,10.9-10.1,8.8-15.1,20.3-15.1,34.5 0,8 1.7,15.1 5.2,21.4 3.4,6.3 8.3,11.2 14.7,14.7 8.6,4.8 17,8 25.2,9.5v63.5c-7.8-0.8-14.6-4.8-20.2-11.9-3.9-5-6.7-12.9-8.2-23.6l-20.1,3.8c0.7,10.3 3.4,19.1 7.9,26.3 4.5,7.2 9.9,12.4 16.2,15.6 6.2,3.2 14.4,5.4 24.3,6.7v19.9h11.8v-20.2c14-0.7 25.4-5.7 34.1-14.9zm-45.8-84.5c-9.1-2.7-15.5-6.4-19.3-11-3.8-4.6-5.7-10.3-5.7-17.1 0-6.9 2.2-12.8 6.7-17.8 4.5-5 10.6-8.1 18.3-9.3v55.2zm30.9,72.6c-5.1,5.8-11.5,9.1-19.2,10.1v-60.7c10.7,3.5 17.9,7.4 21.5,11.8 3.6,4.4 5.4,10.2 5.4,17.5-0.1,8.4-2.6,15.6-7.7,21.3z"  fill={props.fill}/>
                            </g>
                        </g>
                    </g>
                </svg>
            break;
        case 'save-customer-csfle':
            icon =
                <svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="System / Save">
                        <path id="Vector" d="M17 21.0002L7 21M17 21.0002L17.8031 21C18.921 21 19.48 21 19.9074 20.7822C20.2837 20.5905 20.5905 20.2843 20.7822 19.908C21 19.4806 21 18.921 21 17.8031V9.21955C21 8.77072 21 8.54521 20.9521 8.33105C20.9095 8.14 20.8393 7.95652 20.7432 7.78595C20.6366 7.59674 20.487 7.43055 20.1929 7.10378L17.4377 4.04241C17.0969 3.66374 16.9242 3.47181 16.7168 3.33398C16.5303 3.21 16.3242 3.11858 16.1073 3.06287C15.8625 3 15.5998 3 15.075 3H6.2002C5.08009 3 4.51962 3 4.0918 3.21799C3.71547 3.40973 3.40973 3.71547 3.21799 4.0918C3 4.51962 3 5.08009 3 6.2002V17.8002C3 18.9203 3 19.4796 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H7M17 21.0002V17.1969C17 16.079 17 15.5192 16.7822 15.0918C16.5905 14.7155 16.2837 14.4097 15.9074 14.218C15.4796 14 14.9203 14 13.8002 14H10.2002C9.08009 14 8.51962 14 8.0918 14.218C7.71547 14.4097 7.40973 14.7155 7.21799 15.0918C7 15.5196 7 16.0801 7 17.2002V21M15 7H9" stroke={props.fill} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                </svg>
            break;
        case 'get-customer-with-key':
            icon =
                <svg viewBox="-3 -3 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path fill={props.fill} d="M13 0l-7 6.1c-0.3-0.1-0.6-0.1-1-0.1-2.8 0-5 2.2-5 5s2.3 5 5 5 5-2.2 5-5c0-0.3 0-0.6-0.1-0.9l1.1-1.1v-2h2v-2h2l1-1v-4h-3zM12 6h-1.7l1.7-1.4v1.4zM15 3.6l-0.4 0.4h-1.9l2.3-2v1.6zM7.3 7.6l0.7 0.4 2-1.7v2.3l-0.8 0.8-0.3 0.4 0.1 0.5c0 0.2 0.1 0.5 0.1 0.7 0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c0.3 0 0.5 0 0.8 0.1l0.5 0.1 0.4-0.3 6.6-5.9h1.6l-7.7 6.6z"></path>
                    <path fill={props.fill} d="M6 11.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path>
                </svg>
            break;
        case 'get-customer-no-key':
            icon =
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke={props.fill} stroke-width="1" d="M7 6.919V6a4.724 4.724 0 015-5 4.724 4.724 0 015 5v5.052M12 23a7 7 0 10-7-7 7 7 0 007 7zm2.985-7h-5.97"/>
                </svg>
            break;
        default:
            icon =
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <g>
                        <g id="question_x5F_mark">
                            <g>
                                <path d="M17.6,30c0,1.102-0.895,2-2,2s-2-0.898-2-2c0-1.109,0.895-2,2-2S17.6,28.891,17.6,30z" fill={props.fill} />
                                <path d="M15.676,25.977c-1.336,0-2.59-0.523-3.535-1.469c-0.945-1.105-1.465-2.359-1.465-3.695
                                    s0.52-2.59,1.465-3.371l6.688-6.688C19.584,9.996,20,8.992,20,7.926c0-1.07-0.416-2.074-1.172-2.828
                                    c-1.559-1.559-4.096-1.562-5.654,0C12.416,5.852,12,6.855,12,7.926H8c0-2.137,0.834-4.148,2.348-5.66
                                    c3.02-3.023,8.285-3.02,11.309,0.004C23.168,3.777,24,5.785,24,7.926c0,2.137-0.832,4.145-2.344,5.656l-6.688,6.523
                                    c-0.389,0.391-0.389,1.023,0,1.414c0.391,0.391,1.023,0.391,1.414,0c0.254-0.258,0.293-0.555,0.293-0.711h4
                                    c0,1.336-0.52,2.594-1.465,3.699C18.266,25.453,17.012,25.977,15.676,25.977L15.676,25.977z" fill={props.fill} />
                            </g>
                        </g>
                    </g>
                </svg>
            break;
    }

    return (
        <>
            {icon}
        </>
    )
}

export default Icon;