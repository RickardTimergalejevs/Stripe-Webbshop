import { ICartItem } from "../context/CartContext"

export function formatPrice(priceInCents: number) {
    const price = (priceInCents / 100).toFixed(2)
    return price
}

export function totalPrice(cartItems: ICartItem[]) {
    let total = 0;

    for (const item of cartItems) {
        const itemPrice = item.product.price * item.quantity;
        total += itemPrice;
    }

    return formatPrice(total);
}
