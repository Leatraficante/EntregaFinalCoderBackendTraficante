export default class CartsDto {
    constructor(cart) {
        this.user = cart.user;
        this.products = cart.products;
    }
}