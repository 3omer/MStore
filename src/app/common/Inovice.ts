import { Category } from "./category";
import { InvoiceEntry } from "./InvoiceEntry";

export interface Invoice {
    id?: number // from API 
    notes: string,
    customerName: string,
    categoryId: number,
    invoiceDate:  string,
    invoiceDetails: InvoiceEntry[],
    netAmount?: number // returned from API,
    category?: Category
  }





// TODO: A class contain Invoice logic
// export class Invoice {
//     constructor(){}
    
//     private category: Category
//     private items: Product[]

//     // set Invoice category
//     setCategory(category: Category){
//         // TODO: when category change: clear items ? or throw error
//         if (this.category) console.log(`WARNING: Invoice Category already set to ${category.name}`)
//         this.category = category
//     }
    
//     // add new item
//     addItem(item: Product) {
//         if(item.categoryId !== this.category.id) throw Error(`Invoice is restricted to items with category of type ${this.category.name} only`)
//         this.items.push(item)
//     }

//     // remove an item 
//     dropItem(itemId) {
//         this.items = this.items.filter(item => item.id !== itemId)
//     }

//     // caluclate total cost
//     get cost(): number {
//         const itemsPrices = this.items.map(item => item.price)
//         const totalCost = itemsPrices.reduce((acc, price) => acc + price)
//         return totalCost
//     }

// }