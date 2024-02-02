import { NavLink } from "react-router-dom";
import NavButton from "../../components/NavButton/NavButton";
import "./about.css";

export default function About() {
  return (
    <>
      <div
        className="about-page"
      >
        <div
          className="about-wrapper"
          style={{ position: "relative", width: "50%" }}
        >
          <h1>Welcome!</h1>
          <p>
            This website was made to provide a collection of information of the
            various unique species of moss native to Michigan!
          </p>
          <p>
            All credit for the information found on this website goes to the
            resources on the <NavLink to="/Resources">Resource Page</NavLink>.
            This website is purely for informational and educational purposes.
            This website is also not intended to be cited as a resource for any
            academic purposes, as I can not guarantee it to be 100% up to date
            or accurate! Please look into the resources page for many excellent
            sources of information about moss:
          </p>
          <div className="about-button-wrapper">
            <NavButton text="Resources" route="Resources" />
          </div>
        </div>
        <div className="contact-wrapper">
          <h1>Contact</h1>
          <p>
            If you have any questions, or would like to reach out, please feel
            free to contact me!:
          </p>
          <p>Email: tesscoleman123@gmail.com</p>
        </div>
      </div>
    </>
  );
}
