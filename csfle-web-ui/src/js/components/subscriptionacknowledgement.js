import React, {useEffect, useState} from 'react';
import {useIndex, usePost} from "../common/hook";
import Loader from "./loader";
import '../../scss/components/stayconnected.scss';

function SubscriptionAcknowledgement(props) {
    const [data, loading] = usePost(
        'updateSubscription',
        '/updateSubscription',
        props.subscription
    );

    return (
        <>
            {loading ? (
                <Loader loading={loading} />
            ) : (
                <div className="subscriptionacknowledgementcontainer">
                    <p>
                        <label className="subscriptionacknowledgement">
                            We are delighted that you chose to stay connected with us. We shall keep you informed about our roadmap and plan of launching new services.
                        </label>
                    </p>
                </div>
            )}
        </>
    )

}

export default SubscriptionAcknowledgement;