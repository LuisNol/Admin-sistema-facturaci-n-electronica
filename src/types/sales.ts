import type { Client } from "./clients"
import type { Product } from "./products"

export type SaleConfig= {
    today:string,
    n_transaction:string,
    clients: {
        data: Client[],
    }
    products: {
        data: Product[]
    }
    product_notes?: {
        data: Product[]
    }
}

export type SaleDetail = {
    id?:string,
    product_id?:string,
    product:Product,
    product_categorie_id?:string,
    product_categorie?: {
        title:string,
    },
    unidad_medida:string,
    quantity:number,
    price_base:number,
    price_final:number,
    discount:number,
    subtotal:number,
    igv:number,
    description?:string,
    tip_afe_igv:number,
    per_icbper?:number,
    icbper:number,
    percentage_isc:number,
    isc:number,
}

export type SaleDetailResponse = {
    sale_detail: SaleDetail,
    discount:number,
    igv:number,
    subtotal:number,
    total:number,
    debt:number,
    message?:string,
    code?:number,
}

export type SalePayment = {
    id:string,
    method_payment:string,
    amount:number,
    date_payment:string,
}
export type Sale = {
    id:string,
    n_transaction:string,
    user_id:string,
    user:{
        full_name:string,
    },
    client_id:string,
    client:{
        id:string,
        full_name:string,
    },
    n_document:string,
    correlativo:string,
    n_operacion:string,
    type_client:number,
    subtotal:number,
    discount:number,
    total:number,
    // 
    igv_general:number,
    total_general:number,
    // 
    igv:number,
    state_sale:number,
    state_payment:number,
    state_entrega:number,
    type_payment:number,
    debt:number,
    paid_out:number,
    description:string,
    created_at:string,
    created_at_format:string,
    sale_details: SaleDetail[],
    payments: SalePayment[],
    // 
    serie:string,
    retencion_igv:number,
    discount_global:number,
    n_comprobante_anticipo:string,
    amount_anticipo:number,
    cdr:string,
    xml:string,
    igv_discount_general:number,
    is_exportacion:number,
    currency:string,
    ce_anticipo:any,
    // 
    notas:any[],
    sales_anticipos?:any[],
}

export type Sales = {
    total: number,
    pagination: number,
    sales: {
        data:Sale[],
    },
}

export type SaleResponse = {
    message:string | number,
    code?:number,
    sale?: Sale,
}