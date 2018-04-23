import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

const localization = {
  ru: {
    home: "Домой",
    "sign-in": "Войти",
    "sign-up": "Зарегестрироваться",
    "new-post": "Добавить статью",
    settings: "Настройки"
  },
  en: {
    home: "Home",
    "sign-in": "Sign in",
    "sign-up": "Sign up",
    "new-post": "New post",
    settings: "Settings"
  }
};
const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            {localization[props.locale]["home"]}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            {localization[props.locale]["sign-in"]}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            {localization[props.locale]["sign-up"]}
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            {localization[props.locale]["home"]}
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose" />&nbsp;{
              localization[props.locale]["new-post"]
            }
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a" />&nbsp;{
              localization[props.locale]["settings"]
            }
          </Link>
        </li>

        <li className="nav-item">
          <Link to={`/@${props.currentUser.username}`} className="nav-link">
            <img src={props.currentUser.image} className="user-pic" alt="" />
            {props.currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

const LocaleView = ({ locale, changeLocale }) => {
  return (
    <ul className="nav navbar-nav">
      <li className="nav-item">
        <button
          to="/"
          onClick={() => changeLocale("ru")}
          className={`nav-link ${locale === "ru" ? "active" : ""}`}
        >
          Ru
        </button>
      </li>

      <li className="nav-item">
        <button
          to="/editor"
          onClick={() => changeLocale("en")}
          className={`nav-link ${locale === "en" ? "active" : ""}`}
        >
          En
        </button>
      </li>
    </ul>
  );
};

@inject("userStore", "commonStore")
@observer
class Header extends React.Component {
  render() {
    const commonStore = this.props.commonStore;
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {this.props.commonStore.appName.toLowerCase()}
          </Link>
          <LocaleView
            locale={commonStore.locale}
            changeLocale={commonStore.changeLocale}
          />
          <LoggedOutView
            locale={commonStore.locale}
            currentUser={this.props.userStore.currentUser}
          />

          <LoggedInView
            locale={commonStore.locale}
            currentUser={this.props.userStore.currentUser}
          />
        </div>
      </nav>
    );
  }
}

export default Header;
