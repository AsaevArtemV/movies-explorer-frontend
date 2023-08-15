import "./NavTab.css";

function NavTab() {
  return (
    <nav
      className="nav-tab"
      aria-label="Навигация страницы"
    >
      <a className="nav-tab__link" href="#project">О проекте</a>
      <a className="nav-tab__link" href="#technologies">Технологии</a>
      <a className="nav-tab__link" href="#stydent">Студент</a>
    </nav>
  );
}

export default NavTab;