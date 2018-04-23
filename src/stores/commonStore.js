import { observable, action, reaction } from "mobx";
import editorStore from "./editorStore";
import agent from "../agent";

const LOCALES = ["en", "ru"];

class CommonStore {
  @observable appName = "B_log";
  @observable token = window.localStorage.getItem("jwt");
  @observable appLoaded = false;
  @observable locale = "en";
  @observable tags = [];
  @observable isLoadingTags = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
    reaction(
      () => this.locale,
      value => {
        console.log("value: ", value);
        if (value === "ru") {
          editorStore.tagList.push(value);
        } else {
          editorStore.tagList.clear();
        }
      }
    );
  }
  @action
  changeLocale = locale => {
    if (LOCALES.indexOf(locale) !== -1) {
      this.locale = locale;
      localStorage.setItem("locale", locale);
    } else {
      throw new Error(`locale ${locale} not found`);
    }
  };

  @action
  loadTags() {
    this.isLoadingTags = true;
    return agent.Tags.getAll()
      .then(
        action(({ tags }) => {
          this.tags = tags.map(t => t.toLowerCase());
        })
      )
      .finally(
        action(() => {
          this.isLoadingTags = false;
        })
      );
  }

  @action
  setToken(token) {
    this.token = token;
  }

  @action
  setAppLoaded() {
    this.appLoaded = true;
  }
}
const store = new CommonStore();
store.locale = localStorage.getItem("locale") || "en";
export default store;
