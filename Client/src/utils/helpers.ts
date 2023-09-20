import { ICartItem } from "../context/CartContext"

export function formatPrice(priceInCents: number) {
    const price = (priceInCents / 100).toFixed(2).replace('.', ',')
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

export function formatDate(orderDate: number) {
    const date = new Date(orderDate * 1000);
    const fullDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const fullTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    return `${fullTime} - ${fullDate}`;
}