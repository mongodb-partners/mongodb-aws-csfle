import React, {useEffect, useState} from 'react';
import {getSessionCookie} from "../common/session";
import {usePost} from "../common/hook";
import Loader from "./loader";
import LoaderButton from "./loaderbutton";
import {API} from "aws-amplify";
import {dateTimeFormatToString} from '../common/common';
import '../../scss/components/emailadmin.scss';

function EmailAdmin(props) {
    const ddhomeCountry = getSessionCookie('ddhomeCountry');
    const[inboxData, inboxDataLoading] = usePost(
        'findMessageList',
        '/messageList',
        {
            folder: 'Inbox'
        }
    );
    const[sentData, sentDataLoading] = usePost(
        'findMessageList',
        '/messageList',
        {
            folder: 'Sent'
        }
    );

    const [isLoading, setIsLoading] = useState(false);

    const loadEmail = async (submitEvent) => {
        submitEvent.preventDefault();
        setIsLoading(true);
        await API.post("processStoredMessage", "/processMessage", {
            response: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: {prefix: "Inbox"}
        });
        setIsLoading(false);
    }

    return (
        <>
            {inboxDataLoading || sentDataLoading ? (
                <Loader loading={inboxDataLoading || sentDataLoading} />
            ) : (
                <>
                    <form key="LoginForm" name="EmailForm" onSubmit={loadEmail}>
                        <div style={{width: '100%', float: 'left'}}>
                            <LoaderButton
                                name="ProcessMessageButton"
                                label="Load Email"
                                type="submit"
                                disabled={false}
                                isLoading={isLoading}
                            />
                        </div>
                        <div className="emailcontainer" style={{width: '100%', float: 'left', borderLeft: '1px solid rgb(71, 75, 79)',  borderTop: '1px solid rgb(71, 75, 79)'}}>
                            <div style={{width: 'calc(10% - 1px);', float: 'left'}}>
                                <ul className="emailfoldergroup">
                                    <li className="emailfolderitem">Inbox</li>
                                    <li className="emailfolderitem">Sent</li>
                                </ul>
                            </div>
                            <div style={{width: 'calc(30% - 1px);', float: 'left', borderLeft: '1px solid rgb(71, 75, 79)',  borderTop: '1px solid rgb(71, 75, 79)'}}>
                                <ul className="emailpreviewgroup" >
                                    {inboxData.map((item, index) => (
                                        <li className="emailpreviewitem">
                                            <p>{item.from} on {dateTimeFormatToString(new Date(item.date))}</p>
                                            <p>{item.subject}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{width: 'calc(60% - 1px);', float: 'left', borderLeft: '1px solid rgb(71, 75, 79)',  borderTop: '1px solid rgb(71, 75, 79)'}}>
                                <h2>Message 1 Details</h2>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    )
}

export default EmailAdmin;