import Cart from "./cart.model";

class User {
    constructor(username) {
        this.username = username;
        this.isLoggedIn;
        this.cart = new Cart();
    }
}
export default User;