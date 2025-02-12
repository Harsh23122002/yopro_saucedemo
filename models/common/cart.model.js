class Cart {
    constructor() {
        this.products = [];
        this.totalCostBeforeTax = 0;
    }

    addProduct(product, cost) {
        this.products.push(product);
        this.totalCostBeforeTax += cost;
    }

    removeProduct(product, cost) {
        this.products = this.products.filter(p => p.name !== product.name);
        this.totalCostBeforeTax -= cost;
    }

}

// class Product {
//     constructor(name, cost) {
//         this.name = name;
//         this.cost = cost;
//     }
// }

export default Cart;