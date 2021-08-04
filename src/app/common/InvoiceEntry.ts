import { Product } from "./product";

export interface InvoiceEntry {
    productId: number,
    productName: string,
    price: number,
    qty: number,
    discount: number,
    cost: number
    net: number,
    product?: Product // returned by api
}