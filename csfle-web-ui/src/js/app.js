import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Auth } from "aws-amplify";
import CookieConsent from "react-cookie-consent";
import { SessionContext, getSessionCookie, setSessionCookie } from "./common/session";
import { useFetch } from "./common/hook";
import { GEOLOCATION_URL } from './common/constants';
import { MENU } from "./common/data";
import AuthenticatedRoute from "./common/authenticatedroute";
import UnauthenticatedRoute from "./common/unauthenticatedroute";
import { onError } from "./common/error";
import ScrollToTop from "./common/scroll";
import ResponsiveNavigation from "./components/responsivenavigation";
import Header from './components/header';
import Navigation from './components/navigation'
import Footer from './components/footer'
import Home from './pages/home';
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ResetPassword from "./pages/resetpassword";
import ChangePassword from "./pages/changepassword";
import Loader from "./components/loader";
import EditCustomerCSFLE from "./pages/editcustomercsfle";
import GetCustomerWithKey from "./pages/getcustomerwithkey";
import GetCustomerNoKey from "./pages/getcustomernokey";
import Error from "./pages/error";
import '../scss/app.scss';

const history = createBrowserHistory();
function App() {
    const [menuList, menuLoading] = [MENU, false];
    const [geolocationData, geolocationLoading] = useFetch(GEOLOCATION_URL, 'geolocation');
    const [ddhomeCountry, setDdhomeCountry] = useState({
        country_code : '',
        country_name : '',
        ip_address: ''
    });
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [session] = useState(getSessionCookie);

    useEffect(async () => {
        await onLoad();
    }, [])

    async function onLoad() {
        try {
            await Auth.currentSession();
            const user = await Auth.currentAuthenticatedUser();
            console.log('user: ', user);
            const email = user.attributes.email;
            userHasAuthenticated(true);
            const credentials = await Auth.currentUserCredentials();
            setSessionCookie("credential", {identityId: credentials.identityId, email: email});
        }
        catch(e) {
            if (e !== 'No current user') {
                onError(e);
            }
        }
    }

    useEffect(() => {
        let ddhomeCountryDetails = getSessionCookie('ddhomeCountry');
        if(Object.keys(ddhomeCountryDetails).length === 0 && ddhomeCountryDetails.constructor === Object) {
            setDdhomeCountry(ddhomeCountry => ({...ddhomeCountry, country_code: geolocationData.country_code, country_name: geolocationData.country_name, ip_address: geolocationData.IPv4}));

            setSessionCookie('ddhomeCountry', {country_code: geolocationData.country_code, country_name: geolocationData.country_name, ip_address: geolocationData.IPv4});
        } else {
            setDdhomeCountry(ddhomeCountry => ({...ddhomeCountry, country_code: ddhomeCountryDetails.country_code, country_name: ddhomeCountryDetails.country_name, ip_address: ddhomeCountryDetails.ip_address}));
        }
    }, [geolocationData]);

    const getDdhomeCountry = (ddhomeCountryCallBack) => {
        if(ddhomeCountryCallBack.country_code !== ddhomeCountry.country_code) {
            setDdhomeCountry({...ddhomeCountry, country_code: ddhomeCountryCallBack.country_code, country_name: ddhomeCountryCallBack.country_name, ip_address: ddhomeCountryCallBack.ip_address});

            setSessionCookie('ddhomeCountry', ddhomeCountryCallBack);
        }
    }

    return (
        <SessionContext.Provider value={{session, isAuthenticated, userHasAuthenticated}}>
            <Router history={history}>
                <ScrollToTop>
                    <div>
                        <CookieConsent
                            location="bottom"
                            buttonText="Accept"
                            declineButtonText="Decline"
                            cookieName="DDHomeCookie"
                            containerClasses="cookieconsentcontainer"
                            contentClasses="cookieconsentcontent"
                            buttonClasses="cookieconsentbutton"
                            declineButtonClasses="cookiedeclinebutton"
                            expires={30}
                            enableDeclineButton={false}
                            onDecline={() => {
                                console.log("User has declined to cookies");
                            }}>
                            <p>
                                This website stores cookies on your device. These cookies are used to collect information about how you interact with our website and allow us to remember you.
                                We use this information in order to improve and customize your browsing experience and for analytics and metrics about our visitors both on this website and other media. To find out more about the cookies we use, see our Privacy Policy.</p>
                            <p>
                                If you decline, your information won’t be tracked when you visit this website. A single cookie will be used in your browser to remember your preference not to be tracked.
                            </p>
                        </CookieConsent>
                        {menuLoading || geolocationLoading ? (
                            <Loader loading={menuLoading || geolocationLoading} />
                        ) : (
                            <>
                                <ResponsiveNavigation menus={menuList} />
                                <Header country={ddhomeCountry} menus={menuList} />
                                <Navigation menus={menuList} />
                                <Switch>
                                    <Route
                                        exact path="/"
                                        render={() => <Home ddhomeCountryCallBack={getDdhomeCountry} geolocationData={geolocationData} />}
                                    />
                                    <UnauthenticatedRoute
                                        exact path="/sign-up"
                                        render={(props) => <SignUp {...props} />}
                                    />
                                    <UnauthenticatedRoute
                                        exact path="/sign-in"
                                        render={(props) => <SignIn {...props} />}
                                    />
                                    <UnauthenticatedRoute
                                        exact path="/reset-password"
                                        render={(props) => <ResetPassword {...props} />}
                                    />
                                    <AuthenticatedRoute
                                        exact path="/change-password"
                                        render={(props) => <ChangePassword {...props} />}
                                    />
                                    <AuthenticatedRoute
                                        path="/save-customer-csfle"
                                        render={(props) => <EditCustomerCSFLE {...props} countryName={ddhomeCountry.country_name} countryCode={ddhomeCountry.country_code} />}
                                    />
                                    <AuthenticatedRoute
                                        path="/get-customer-with-key"
                                        render={(props) => <GetCustomerWithKey {...props} countryName={ddhomeCountry.country_name} countryCode={ddhomeCountry.country_code} />}
                                    />
                                    <AuthenticatedRoute
                                        path="/get-customer-no-key"
                                        render={(props) => <GetCustomerNoKey {...props} countryName={ddhomeCountry.country_name} countryCode={ddhomeCountry.country_code} />}
                                    />
                                    <Route
                                        render={(props) => <Error {...props} />}
                                    />
                                </Switch>
                                <Footer menus={menuList} />
                            </>
                        )}
                    </div>
                </ScrollToTop>
            </Router>
        </SessionContext.Provider>
    )
}

export default App;
