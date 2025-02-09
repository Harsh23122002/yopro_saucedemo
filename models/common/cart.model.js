class Cart {
    constructor() {
        this.products = [];
        this.totalCostBeforeTax = 0;
    }

    addProduct(product) {
        this.products.push(product);
        this.totalCostBeforeTax += product.cost;
    }

    removeProduct(product) {
        this.products = this.products.filter(p => p.name !== product.name);
        this.totalCostBeforeTax -= product.cost;
    }

    checkout() {

    }
}

class Product {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

export default Cart;