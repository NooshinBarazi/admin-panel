import ChangeTheme from '../../components/change-theme'
import ChangeLanguage from "../../components/change-language";
import avatar from "@assets/images/avatar.jpg";

const TopNav = () => {
    return ( 
        <nav className="navbar navbar-expand navbar-light navbar-bg">
        <a className="sidebar-toggle" onClick={() => setCollapseSidebar(!collapseSidebar)}>
          <i className="hamburger align-self-center"></i>
        </a>
        <div className="d-flex align-items-center gap-3">
        <ChangeLanguage />
        <ChangeTheme />
        </div>
        <img src={avatar} className={`avatar img-fluid rounded-circle ${language === 'fa' ? 'me-auto' : 'ms-auto'}`}/>
      </nav>
     );
}
 
export default TopNav;