import { Link } from "react-router-dom";

import "./LandingPage.css";

function LandingPage() {
  return (
    <body className="landing-body">
      <div className="e14_26463">
        <div className="e14_26469"></div>
        <div className="e14_26470">
          <span className="e14_26471">
            Your AI-powered reminder app for special occasions
          </span>
          <span className="e14_26473">
            Unique SMS reminders, custom messages, and personal event cards
          </span>
        </div>
        <div className="e14_26474">
          <div className="e14_26475">
            <div className="e2302_7000"></div>
          </div>
          <div className="e14_26485">
            <Link to="/login">
              <span className="e14_26486">Sign In</span>
            </Link>
            <Link to="/contact">
              <span className="e14_26489">Contact</span>
            </Link>
          </div>
        </div>
        <div className="e14_26492">
          <div className="e2302_7071">
            <div className="e2302_7072"></div>
          </div>
          <div className="e14_26503">
            <Link to="/login">
              <span className="e14_26504">Sign In</span>
            </Link>
            <Link to="/privacy">
              <span className="e14_26505">Privacy Policy</span>
            </Link>
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
            >
              <span className="e14_26506">Terms of Conditions</span>
            </a>
            <Link to="/contact">
              <span className="e14_26507">Contact</span>
            </Link>
          </div>
        </div>
        <div className="e14_26537">
          <div className="e14_26538">
            <div className="e14_26539"></div>
          </div>
          <div className="e2302_7107"></div>
        </div>
        <div className="e2302_7091">
          <div className="e2302_7092">
            <div className="e2302_7093"></div>
          </div>
          <div className="e2302_7106"></div>
          <div className="e2302_7109"></div>
          <div className="e2304_7112"></div>
        </div>
        <div className="e2302_7096">
          <div className="e2302_7097">
            <div className="e2302_7098"></div>
          </div>
          <div className="e2305_7113"></div>
        </div>
        <div className="e2302_7101">
          <div className="e2302_7102">
            <div className="e2302_7103"></div>
          </div>
          <div className="e2304_7111"></div>
        </div>
        <div className="e2302_7073">
          <div className="e2302_7074">
            <div className="e2302_7078"></div>
          </div>
          <div className="e2302_7082"></div>
        </div>
        <a
          href="https://apps.apple.com/us/app/birthdayai/id6450018228"
          target="_blank"
        >
          <div className="e2302_7001"></div>
        </a>
        <div className="e2302_7083"></div>
        <Link>
          <div className="e2303_7110"></div>
        </Link>
      </div>
    </body>
  );
}

export default LandingPage;
