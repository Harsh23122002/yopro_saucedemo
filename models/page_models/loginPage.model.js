import HomePage from "./homePage.model";
import User from "../common/user.model"

class LoginPage {
    static instance;
    constructor(page) {
        if (LoginPage.instance) {
            throw new Error("Use LoginPage.getInstance() instead of new.");
        }
        this.page = page;
        this.usernameField = '#user-name';
        this.passwordField = '#password';
        this.loginButton = '#login-button';
        this.homePage;
        this.user;
        console.log("LoginPage instance created");
        LoginPage.instance = this;

    }
    static getSingletonsInstance() {
        if (!LoginPage.instance) {
            throw new Error("No Instance found, use new LoginPage(page) to create a new instance");

        }
        return LoginPage.instance;
    }
    static destroy() {
        LoginPage.instance = null;
        console.log("LoginPage instance destroyed");
        HomePage.destroy();
    }

    async login(username, password) {
        await this.page.fill(this.usernameField, username);
        await this.page.fill(this.passwordField, password);
        await this.page.click(this.loginButton);
        this.user = new User(username);
        this.user.isLoggedIn = true;
        this.homePage = new HomePage(this.page, this.user);
    }
}

export default LoginPage;
