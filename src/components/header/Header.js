import "./Header.css";
import Logo from '../../Logo.PNG';

function Header() {
  return (
    <header className="App-header">
      <div className="header-container">
        <div>
          <img src={ Logo } className="logo-img" alt="logo"/>
        </div>
        <div className="wrapper">
          <h1 className="heading" data-heading="So many books, so little time ...">So many books, so little time ...</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;