import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { PhoneAuthProvider } from "firebase/auth";
import { authForFirebaseUI } from "../firebase/firebaseConfig";
import "./LoginPage.css";

const LoginPage = () => {
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /snapchat after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/home",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      {
        provider: PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: "image", // 'audio'
          size: "normal", // 'invisible' or 'compact'
          badge: "bottomleft", //' bottomright' or 'inline' applies to invisible.
        },
        defaultCountry: "US", // Set default country to the United Kingdom (+44).
        // You can also pass the full phone number string instead of the 'defaultCountry' key.
        //defaultNationalNumber: '1234567890',
        // You can also use 'defaultNationalNumber' key to set default national number.
        // This will only be observed if only phone Auth provider is used since
        // it could be different from the default country that is set.
        //defaultNationalNumber: '1234567890',
        // You can also use 'loginHint' key to prefill the national number up to the last four digits.
        //loginHint: '+1234567890',
        // You can also use 'whitelistedCountries' key to specify only the countries you want to
        // provide them as an array of country codes. The default is all countries.
        whitelistedCountries: ["US", "CA"],
      },
    ],
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <img
          className="login-logo"
          src={`${process.env.PUBLIC_URL}/../../images/Login/Red_Cup_Logo.png`}
          alt="Logo"
        ></img>
        <h2 className="welcome-text">Welcome!</h2>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={authForFirebaseUI}
        />
      </div>
    </div>
  );
};

export default LoginPage;
