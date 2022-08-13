import facebook from "../../assets/img/icon/facebook.svg"
import twitter from "../../assets/img/icon/twitter.svg"
import github from "../../assets/img/icon/github.svg"
import dribble from "../../assets/img/icon/facebook.svg"

import "./footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">© 2021 Themesberg, LLC. All rights reserved.</p>
            <div className="footer__social">
                <a href="#"><img src={facebook} alt="" /></a>
                <a href="#"><img src={twitter} alt="" /></a>
                <a href="#"><img src={github} alt="" /></a>
                <a href="#"><img src={dribble} alt="" /></a>
            </div>
        </footer>
    );
}
export default Footer;
