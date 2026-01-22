<template>
    <DefaultLayout>
        <div class="d-flex flex-wrap justify-space-between gap-4 mb-6">
            <div class="d-flex flex-column justify-center">
                <h4 class="text-h4 mb-1">
                    💰 Edit Sale/Cotización: # {{ route.params.id }}
                </h4>
                <p class="text-body-1 mb-0">
                    Orders placed across your store
                </p>
            </div>
        </div>

        <b-row class="mt-2">
            <b-col lg="5" md="5">
                <b-card no-body :class="{'border-sale': state_sale == 1}">
                    <b-card-header class="text-center">
                        <i class="fas fa-cart-plus fs-18" ></i>
                        <b-card-title class="py-1">VENTA</b-card-title>
                        <b-form-radio name="state_sale" @click="state_sale = 1" value="1" :checked=" state_sale == 1"></b-form-radio>
                    </b-card-header>
                </b-card>
            </b-col>
            <b-col lg="2" md="2" v-if="sale_selected && !sale_selected?.n_operacion">
            </b-col>
            <b-col lg="5" md="5" v-if="sale_selected && !sale_selected?.n_operacion">
                <b-card no-body :class="{'border-sale': state_sale == 2}">
                    <b-card-header class="text-center">
                        <i class="fas fa-file-alt fs-18" ></i>
                        <b-card-title class="py-1">COTIZACIÓN</b-card-title>
                        <b-form-radio name="state_sale" @click="state_sale = 2" value="2" :checked=" state_sale == 2"></b-form-radio>
                    </b-card-header>
                </b-card>
            </b-col>

            <b-col lg="7" md="7" v-if="sale_selected && sale_selected?.n_operacion">
                <b-card no-body class="border-sale">
                    <b-card-header class="text-center">
                        <i class="fas fa-file-alt fs-18" ></i>
                        <b-card-title class="py-1">COMPROBANTE ELECTRONICO EMITIDO: {{ sale_selected.n_operacion }}</b-card-title>
                    </b-card-header>
                </b-card>
            </b-col>

        </b-row>

        <b-card no-body>
          <b-card-header>
            <b-card-title>🔩 Datos Generales</b-card-title>
          </b-card-header>
          <b-card-body class="pt-0">

            <b-row>
                <b-col lg="2">
                    <label for="is_exportacion-c" class="col-form-label text-lg-end">Exportación: </label>
                    <div class="d-flex">
                        <b-form-radio name="is_exportacion-c" @click="is_exportacion = 0" value="0" :checked="is_exportacion == 0">No</b-form-radio>
                        {{ " " }}
                        <b-form-radio name="is_exportacion-c" class="mx-2" @click="is_exportacion = 1" value="1" :checked="is_exportacion == 1">Si</b-form-radio>
                        {{ " " }}
                    </div>
                </b-col>
                <b-col lg="2" md="3">
                    <label for="n-transaction" class="col-form-label text-lg-end">N° de Venta/Cotización: </label>
                    <b-form-input
                        type="text"
                        id="n-transaction"
                        v-model="n_transaction"
                        placeholder="000000"
                        disabled
                    />
                </b-col>
                <b-col lg="2" md="3">
                    <label for="n-f-emision" class="col-form-label text-lg-end">Fecha de Emisión: </label>
                    <b-form-input
                        type="date"
                        id="n-f-emision"
                        v-model="today"
                        disabled
                    />
                </b-col>
                <b-col lg="5" md="5">
                    <label for="n-f-clients" class="col-form-label text-lg-end">Clientes: </label>
                    <select id="n-f-clients">
                        <option value="">Selec. Cliente</option>
                        <template v-for="(client, index) in clients" :key="index">
                            <option :value="client.id">{{ client.full_name }}</option>
                        </template>
                    </select>
                    <b v-if="client_selected">{{ client_selected.type_client == '1' ? 'CLIENTE FINAL' : 'CLIENTE EMPRESA' }}</b>
                </b-col>

                <b-col lg="5" v-if="is_exportacion == 0">
                    <label for="retencion-igv-c" class="col-form-label text-lg-end">Retenciones IGV: </label>
                    <div class="d-flex">
                        <b-form-radio name="retencion-igv-c" @click="retencion_igv = 0" value="0" :checked="retencion_igv == 0">Ninguno</b-form-radio>
                        {{ " " }}
                        <b-form-radio name="retencion-igv-c" class="mx-2" @click="retencion_igv = 1" value="1" :checked="retencion_igv == 1">Retención</b-form-radio>
                        {{ " " }}
                        <b-form-radio name="retencion-igv-c" class="mx-2" @click="retencion_igv = 2" value="2" :checked="retencion_igv == 2">Detracción</b-form-radio>
                        {{ " " }}
                        <b-form-radio name="retencion-igv-c" class="mx-2" @click="retencion_igv = 3" value="3" :checked="retencion_igv == 3">Percepción</b-form-radio>
                    </div>
                </b-col>

                <b-col lg="2">
                    <label for="is_anticipo-c" class="col-form-label text-lg-end">Anticipo: </label>
                    <div class="d-flex">
                        <b-form-radio name="is_anticipo-c" @click="is_anticipo = 0" value="0" :checked="is_anticipo == 0">No</b-form-radio>
                        {{ " " }}
                        <b-form-radio name="is_anticipo-c" class="mx-2" @click="is_anticipo = 1" value="1" :checked="is_anticipo == 1">Si</b-form-radio>
                        {{ " " }}
                    </div>
                </b-col>
                <b-col lg="2" v-if="is_anticipo == 1">
                    <div class="d-flex align-items-center">
                        <div>
                            <label for="n-of-comprobante" class="col-form-label">N° de Compr. o N° Venta: </label>
                            <b-form-input
                                type="text"
                                id="n-of-comprobante"
                                v-model="n_comprobante_anticipo"
                                @keyup.enter="searchAnticipo()"
                                placeholder=""
                                :disabled="sale_anticipo ? true : false"
                            />
                        </div>
                        <div v-if="sale_anticipo">
                            <!-- <b-button type="button" class="rounded-pill btn btn-info" @click="resetAnticipo()">
                                <i class="fas fa-window-close ml-3"></i>
                            </b-button> -->
                            <b-button type="button" class="rounded-pill btn btn-info" @click="addAnticipo()">
                                <i class="far fa-plus-square ml-3"></i>
                            </b-button>
                            <b-button type="button" class="rounded-pill btn btn-dark" @click="resetAnticipo()">
                                <i class="fas fa-sync ml-3"></i>
                            </b-button>
                        </div>
                    </div>
                    <div class="table-responsive m-0" v-if="sales_anticipos.length > 0">
                        <table>
                            <thead class="table-light">
                                <th>ANTICIPOS</th>
                                <th></th>
                            </thead>
                            <tbody>
                                <tr v-for="(sales_anticipo, index) in sales_anticipos" :key="index">
                                    <td>
                                        {{ sales_anticipo.n_operacion }}
                                    </td>
                                    <td>
                                        <b-button type="button" class="rounded-pill btn btn-danger" @click="removeAnticipo(index)">
                                            <i class="las la-trash-alt ml-3"></i>
                                        </b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </b-col>
                <b-col lg="2">
                  <label for="FB" class="col-form-label text-lg-end">Tipo: </label>
                  <b-form-select id="FB" v-model="serie">
                    <option value="F001">F001</option>
                    <option value="B001">B001</option>
                  </b-form-select>
                </b-col>
            </b-row>

          </b-card-body>
        </b-card>

        <b-card no-body v-if="!sale_selected?.n_operacion">
          <b-card-header>
            <b-card-title>📦 Datos del Producto</b-card-title>
          </b-card-header>
          <b-card-body class="pt-0">
            <b-row>
                <b-col lg="5" md="5">
                    <div class="row">
                        <div class="col-12">
                            <label for="n-f-products" class="col-form-label text-lg-end">Productos: </label>
                            <select id="n-f-products">
                                <option value="">Selec. Producto</option>
                                <template v-for="(product, index) in products" :key="index">
                                    <option :value="product.id">{{ product.title }}</option>
                                </template>
                            </select>
                        </div>
                        <div class="col-12 mt-2" v-if="product_selected">
                            <span v-if="product_selected.is_icbper == 2">Es Bolsa de Plastico</span>
                            <span v-if="product_selected.is_ivap == 2">Es Arroz Pilado</span>
                        </div>
                    </div>
                </b-col>
                <b-col lg="3" md="3">
                    <b-row>
                        <b-col lg="12" md="12" v-if="product_selected && product_selected?.is_ivap == 1 && is_exportacion == 0">
                            <label for="n-f-type-operation" class="col-form-label text-lg-end">Tipo de Operación: </label>
                            <b-form-select id="n-f-type-operation" v-model="type_operation">
                                <option value="10">Gravado - Operación Onerosa</option>
                                <option value="20">Exonerado - Operación Onerosa</option>
                                <option value="30">Inafecta - Operación Onerosa</option>
                                <option value="11">Gravado – Retiro por premio</option>
                            </b-form-select>
                        </b-col>
                        <b-col lg="12" md="12" v-if="product_selected && is_exportacion == 1">
                            <label for="n-f-type-operation" class="col-form-label text-lg-end">Tipo de Operación: </label>
                            <b-form-select id="n-f-type-operation" v-model="type_operation">
                                <option value="40">Exportación de Bienes o Servicios</option>
                            </b-form-select>
                        </b-col>
                        <b-col lg="12" md="12" v-if="product_selected && product_selected?.is_ivap == 2 && is_exportacion == 0">
                            <label for="n-f-type-operation" class="col-form-label text-lg-end">Tipo de Operación: </label>
                            <b-form-select id="n-f-type-operation" v-model="type_operation">
                                <option value="17">Gravado - IVAP</option>
                            </b-form-select>
                        </b-col>
                        <b-col lg="12" md="12" v-if="product_selected && product_selected.is_discount == 2">
                            <label for="n-f-discount" class="col-form-label text-lg-end">Descuento: </label>
                            <b-form-input
                                type="number"
                                id="n-f-discount"
                                v-model="discount"
                                placeholder=""
                                :disabled="Number(type_operation) == 11"
                            />
                        </b-col>
                    </b-row>
                </b-col>
                <b-col lg="3" md="3">
                    <b-row>
                        <b-col lg="12" md="12">
                            <label for="n-f-cantidad" class="col-form-label text-lg-end">Cantidad: </label>
                            <b-form-input
                                type="number"
                                id="n-f-cantidad"
                                v-model="quantity"
                                placeholder=""
                            />
                        </b-col>
                        <b-col lg="12" md="12">
                            <label for="n-f-precio-base" class="col-form-label text-lg-end">Precio Base: </label>
                            <b-form-input
                                type="number"
                                id="n-f-precio-base"
                                v-model="price_base"
                                placeholder=""
                                :disabled="Number(type_operation) == 11"
                            />
                        </b-col>
                    </b-row>
                </b-col>
                <b-col lg="1" md="1">
                    <b-button type="button" variant="success" @click="addProduct()">
                        <i class="far fa-plus-square ml-3"></i>
                    </b-button>
                </b-col>
            </b-row>
          </b-card-body>
        </b-card>

        <b-card no-body>
          <b-card-header>
            <b-card-title>📒 Detalle de la {{ state_sale == 1 ? 'Venta' : 'Cotización' }}</b-card-title>
          </b-card-header>
          <b-card-body class="pt-0">
            <b-row>
                <b-col lg="12">
                    <div class="table-responsive m-0">
                        <table class="table datatable">
                            <thead class="table-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Producto</th>
                                    <th>Unidad</th>
                                    <th>Cantidad</th>
                                    <th>Precio Base</th>
                                    <th>Igv</th>
                                    <th>Descuento</th>
                                    <th>Precio Final</th>
                                    <th>SubTotal</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(sale_detail, index) in sale_details" :key="index">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ sale_detail.product.title }}</td>
                                    <td>{{ sale_detail.unidad_medida }}</td>
                                    <td>{{ sale_detail.quantity }}</td>
                                    <td>{{ currency }} {{ sale_detail.price_base }}</td>
                                    <td>{{ currency }} {{ (sale_detail.igv + sale_detail.icbper).toFixed(2) }}</td>
                                    <td>{{ currency }} {{ sale_detail.discount }}</td>
                                    <td>{{ currency }} {{ sale_detail.price_final }}</td>
                                    <td v-if="![11].includes(Number(sale_detail.tip_afe_igv))">{{ currency }} {{ sale_detail.subtotal }}</td>
                                    <td v-if="[11].includes(Number(sale_detail.tip_afe_igv))">{{ currency }} 0 </td>
                                    <td>
                                        <b-button type="button" variant="danger" v-if="sale_selected && !sale_selected?.n_operacion" @click="deleteSaleDetail(sale_detail)">
                                            <i class="fas fa-prescription-bottle"></i>
                                        </b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </b-col>
                <b-col lg="6">
                    <b-row>
                        <b-col lg="4">
                            <label for="n-discount-global" class="col-form-label text-lg-end">Descuento Global: </label>
                            <b-form-input
                                type="number"
                                id="n-discount-global"
                                v-model="discount_global"
                                @keyup.enter="sumDetails()"
                                placeholder=""
                            />
                        </b-col>
                    </b-row>
                </b-col>
                <b-col lg="6" class="mt-2">
                    <table style="width: 90%;">
                        <tr>
                            <td>IGV</td>
                            <td>{{ currency }} {{ getIgvTotal() }}</td>
                        </tr>

                        <tr>
                            <td>SubTotal</td>
                            <td>{{ currency }} {{ getSubTotalSale() }}</td>
                        </tr>
                        
                        <tr>
                            <td>Total</td>
                            <td>{{ currency }} {{ getTotalSales() }}</td>
                        </tr>
                        
                        <tr v-if="total_retencion > 0">
                            <td>Retención</td>
                            <td>{{ currency }} {{ total_retencion }}</td>
                        </tr>

                        <tr v-if="total_detraccion > 0">
                            <td>Detracción</td>
                            <td>{{ currency }} {{ total_detraccion }}</td>
                        </tr>

                        <tr v-if="total_percepcion > 0">
                            <td>Percepción</td>
                            <td>{{ currency }} {{ total_percepcion }}</td>
                        </tr>

                        <tr v-if="total_anticipos > 0">
                            <td>Total Anticipo</td>
                            <td>{{ currency }} {{ total_anticipos + igv_discount_general }}</td>
                        </tr>

                        <tr v-if="ivap_total > 0">
                            <td>Ivap Total</td>
                            <td>{{ currency }} {{ ivap_total }}</td>
                        </tr>
                        <tr v-if="icbper_total > 0">
                            <td>Icbper Total</td>
                            <td>{{ currency }} {{ icbper_total }}</td>
                        </tr>
                        <tr v-if="isc_total > 0">
                            <td>Isc Total</td>
                            <td>{{ currency }} {{ isc_total }}</td>
                        </tr>
                        
                        <tr>
                            <td>Descuento</td>
                            <td>{{ currency }} {{ discount_total + discount_global }}</td>
                        </tr>
                    </table>
                </b-col>
            </b-row>
          </b-card-body>
        </b-card>

        <b-card no-body>
          <b-card-header>
            <b-card-title>💵 Pagos</b-card-title>
          </b-card-header>
          <b-card-body class="pt-0">
            <b-row>
                <b-col lg="3">
                    <label for="type-pay-c" class="col-form-label text-lg-end">Tipo: </label>
                    <div class="d-flex">
                        <b-form-radio name="type-pay-c" @click="type_payment = 1" value="1" :checked="type_payment == 1">Al contado</b-form-radio>
                        {{ " " }}
                        <b-form-radio name="type-pay-c" class="mx-2" @click="type_payment = 2" value="2" :checked="type_payment == 2">Credito</b-form-radio>
                    </div>
                </b-col>
                <b-col lg="3">
                    <label for="n-f-method-payment" class="col-form-label text-lg-end">Metodo de Pago: </label>
                    <b-form-select id="n-f-method-payment" v-model="method_payment">
                        <option value="EFECTIVO">EFECTIVO</option>
                        <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                        <option value="YAPE">YAPE</option>
                        <option value="PLIN">PLIN</option>
                        <option value="TARJETA DE CREDITO">TARJETA DE CREDITO</option>
                    </b-form-select>
                </b-col>
                <b-col lg="2">
                    <label for="n-f-amount" class="col-form-label text-lg-end">Monto: </label>
                    <b-form-input
                        type="number"
                        id="n-f-amount"
                        v-model="amount"
                        placeholder=""
                    />
                </b-col>
                <b-col lg="3" v-if="type_payment == 2">
                    <label for="n-f-payment" class="col-form-label text-lg-end">Fecha de Pago: </label>
                    <b-form-input
                        type="date"
                        id="n-f-payment"
                        v-model="date_payment"
                    />
                </b-col>
                <b-col lg="1" v-if="sale_selected && !sale_selected?.n_operacion">
                    <label class="col-form-label text-lg-end">Agregar: </label>
                    <b-button type="button" variant="primary" @click="addPayment()">
                        <i class="far fa-plus-square ml-3"></i>
                    </b-button>
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col lg="6">
                    <div class="table-responsive m-0">
                        <table class="table datatable">
                            <thead class="table-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Metodo de Pago</th>
                                    <th>Monto</th>
                                    <th v-if="type_payment == 2">Fecha de Pago</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(sale_payment, index) in sale_payments" :key="index">
                                    <td>{{ index+1 }}</td>
                                    <td>{{ sale_payment.method_payment }}</td>
                                    <td>{{ currency }} {{ sale_payment.amount }}</td>
                                    <td v-if="type_payment == 2">{{ sale_payment.date_payment }}</td>
                                    <td>
                                        <b-button v-if="sale_selected && !sale_selected?.n_operacion" type="button" variant="danger" @click="removePayment(sale_payment)">
                                            <i class="fas fa-prescription-bottle"></i>
                                        </b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </b-col>
                <b-col lg="3" md="3">
                    <label for="description-product" class="col-form-label text-lg-end">Descripción: </label>
                    <b-form-textarea type="textarea" v-model="description" rows="5" id="description-product" />
                </b-col>
                <b-col lg="3" md="3" class="text-end" v-if="sale_selected && !sale_selected?.n_operacion">
                    <b-button type="button" variant="primary" @click="store()">
                        <i class="far fa-plus-square ml-3"></i> Editar {{ state_sale == 1 ? 'Venta' : 'Cotización' }}
                    </b-button>
                </b-col>
            </b-row>

          </b-card-body>
        </b-card>

    </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import type { Client } from "@/types/clients";
import { onMounted, ref, watch } from "vue";
import Selectr from "mobius1-selectr";
import type { Product } from "@/types/products";
import type { AxiosResponse } from "axios";
import type { Sale, SaleConfig, SaleDetail, SaleDetailResponse, SalePayment, SaleResponse } from "@/types/sales";
import HttpClient from "@/helpers/http-client";

import Swal from "sweetalert2/dist/sweetalert2.js";
type TVueSwalInstance = typeof Swal & typeof Swal.fire;

import { useRoute } from "vue-router";
const route = useRoute("sales.edit");

const state_sale = ref<number>(1);
const is_exportacion = ref<number>(0);
const n_transaction = ref<string>("0000000000");
const today = ref<Date | string>("");
const clients = ref<Client[]>([]);
const client_selected = ref<any | undefined>(undefined);
const clientSelect = ref<any>(null);
const retencion_igv = ref<number>(0);
const is_anticipo = ref<number>(0);
const n_comprobante_anticipo = ref<string>("");
const sale_anticipo = ref<any>(null);
const serie = ref<string>("F001");

const products = ref<Product[]>([]);
const product_selected = ref<Product | undefined>(undefined);
const productSelect = ref<any>(null);
const type_operation = ref<number>(10);
const discount = ref<number>(0);
const quantity = ref<number>(0);
const price_base = ref<number>(0);

const sale_details = ref<SaleDetail[]>([]);
const currency = ref<string>("S/.");
const discount_global = ref<number>(0);
const discount_total = ref<number>(0);

const type_payment = ref<number>(1);
const amount = ref<number>(0);
const date_payment = ref<Date | string> ("");
const sale_payments = ref<any>([]);
const description = ref<string>("");
const method_payment = ref<string>("EFECTIVO");
const total_payments = ref<number>(0);

const igv_total = ref<number>(0);
const subtotal = ref<number>(0);
const total_sale = ref<number>(0);
const ivap_total = ref<number>(0);
const icbper_total = ref<number>(0);
const isc_total = ref<number>(0);
const total_retencion = ref<number>(0);
const total_detraccion = ref<number>(0);
const total_percepcion = ref<number>(0);

const sale_selected = ref<Sale | null>(null);

const sales_anticipos = ref<any[]>([]);
const total_anticipos = ref<number>(0);
const discount_global_general = ref<number>(0);
const igv_discount_general = ref<number>(0);

const getPriceBaseCF = () => {
    if(product_selected.value){
        if(product_selected.value?.include_igv == 2 && product_selected.value.percentage_isc > 0){
            // Precio Total=Precio Base ×(1+0.17+(1+0.17)×0.18)
            // Precio Total=Precio Base ×(1+0.17+0.18+0.0306)
            // Precio Total=Precio Base×1.3806
            // Precio Base = Precio Total/1.3806
            let p_isc = product_selected.value.percentage_isc*0.01;
            const factor = ((1+p_isc)+((1+p_isc)*0.18));//1.3806;
            return Number((product_selected.value.price_general/factor).toFixed(6));
        }
        return product_selected.value.include_igv == 1 ? product_selected.value.price_general : Number((product_selected.value.price_general/1.18).toFixed(6));
    }
    return 0;
}
const getPriceBaseCE  = () => {
    if(product_selected.value){
        if(product_selected.value?.include_igv == 2 && product_selected.value.percentage_isc > 0){
            // Precio Total=Precio Base×(1+0.17+(1+0.17)×0.18)
            // Precio Total=Precio Base×(1+0.17+0.18+0.0306)
            // Precio Total=Precio Base×1.3806
           // Precio Base = Precio Total/1.3806
           let p_isc = product_selected.value.percentage_isc*0.01;
           const factor = ((1+p_isc)+((1+p_isc)*0.18));//1.3806;
           return Number((product_selected.value.price_company/factor).toFixed(6));
        }
        return product_selected.value.include_igv == 1 ? product_selected.value.price_company : Number((product_selected.value.price_company/1.18).toFixed(6));
    }
    return 0;
}

const config = async () => {
    try {
        const res: AxiosResponse<SaleConfig> = await HttpClient.get(
            "sales/config");
        console.log(res);
        // today.value = res.data.today;
        // n_transaction.value = res.data.n_transaction;

        if(products.value.length == 0){
            products.value = res.data.products.data;
            clients.value = res.data.clients.data;
            setTimeout(() => {
                clientSelect.value = new Selectr("#n-f-clients");
                productSelect.value = new Selectr("#n-f-products");
            }, 25);
        }
        

        setTimeout(() => {
            // clientSelect.value = new Selectr("#n-f-clients");
            clientSelect.value.on("selectr.change",(option:any) => {
                console.log(option.value);
                client_selected.value = clients.value.find((client) => client.id == option.value);

                if(product_selected.value && client_selected.value){
                    if(client_selected.value.type_client == '1'){//CLIENT FINAL
                        price_base.value = getPriceBaseCF();
                    }else{
                        price_base.value = getPriceBaseCE();
                    }
                }
            })

            // productSelect.value = new Selectr("#n-f-products");
            productSelect.value.on("selectr.change",(option:any) => {
                console.log(option.value);
                product_selected.value = products.value.find((product) => product.id == option.value);
                if(product_selected.value){
                    if(product_selected.value.is_ivap == 2){
                        type_operation.value = 17;
                    }else{
                        type_operation.value = 10;
                    }
                    if(client_selected.value){
                        if(client_selected.value.type_client == '1'){//CLIENT FINAL
                            price_base.value = getPriceBaseCF();
                        }else{
                            price_base.value = getPriceBaseCE();
                        }
                    }else{
                        price_base.value = getPriceBaseCF();
                    }
                }
            })

            show();
        }, 50);
    } catch (error) {
        console.log(error);
    }
}

const store = async () => {
    try {
        if(!client_selected.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas seleccionar un cliente",
                "error",
            );
            return;
        }

        if(sale_details.value.length == 0){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas agregar al menos un producto al detallado",
                "error",
            );
            return;
        }

        if(state_sale.value == 1 && sale_payments.value.length == 0 && getTotalSales() > 0){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas agregar un pago a la venta",
                "error",
            );
            return;
        }
        if(sale_payments.value.length > 0 && getTotalSales() != total_payments.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas eliminar el pago para poder continuar con la edición",
                "error",
            );
            return;
        }
        let STATE_PAYMENT = 1;
        if(state_sale.value == 1){
            if(total_payments.value != getTotalSales()){
                STATE_PAYMENT = 2;
            }
            if(total_payments.value == getTotalSales()){
                STATE_PAYMENT = 3;
            }
        }

        let data = {
            client_id: client_selected.value.id,
            type_client: client_selected.value.type_client,
            // discount: discount_total.value,
            // subtotal: subtotal.value,
            // total: total_sale.value,
            // igv: igv_total.value,
            state_sale: state_sale.value,
            state_payment: STATE_PAYMENT,
            debt: getTotalSales() - total_payments.value,
            paid_out: total_payments.value,
            // sale_details: sale_details.value,
            type_payment: type_payment.value,
            // payments: sale_payments.value,

            retencion_igv: retencion_igv.value,
            discount_global: discount_global.value,
            description: description.value,
            serie: serie.value,
            // amount_anticipo: sale_anticipo.value ? sale_anticipo.value.subtotal : null,
            // n_comprobante_anticipo: sale_anticipo.value ? sale_anticipo.value.n_operacion : null,
            // igv_discount_general: 0,//igv_discount_general.value,
            amount_anticipo: total_anticipos.value > 0 ? total_anticipos.value : null,//sale_anticipo.value ? sale_anticipo.value.subtotal : null,
            n_comprobante_anticipo: null,//sale_anticipo.value ? sale_anticipo.value.n_operacion : null,
            sales_anticipos: sales_anticipos.value.length > 0 ? sales_anticipos.value : null,
            igv_discount_general: igv_discount_general.value,
            is_exportacion: is_exportacion.value,
            currency: currency.value,
        }

        const res: AxiosResponse<any> = await HttpClient.put(
            "sales/"+route.params.id,data);

        if(res.data.error){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                res.data.error.message,
                "error",
            );
            return;
        }

        if(res.data.code == 200){
            (Swal as TVueSwalInstance).fire(
                "Genial!",
                res.data.message,
                "success",
            );
        }
        console.log(res);

    } catch (e:any) {
        console.log(e);
        if(e.response?.data){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                e.response?.data.message,
                "error",
            );
            return;
        }
    }
}

const resetData = () => {
    client_selected.value = undefined;
    discount_total.value = 0;
    subtotal.value = 0;
    total_sale.value = 0;
    igv_total.value = 0;
    state_sale.value = 1;
    total_payments.value = 0;
    description.value = "";
    sale_details.value = [];
    sale_payments.value = [];
    type_payment.value = 1;
    clientSelect.value.setValue("");
    sumDetails();
    retencion_igv.value = 0;
    total_retencion.value = 0;
    total_detraccion.value = 0;
    total_percepcion.value = 0;
    discount_global.value = 0;
    // discount_global_general.value = 0;
    is_anticipo.value = 0;
    n_comprobante_anticipo.value = "";
    sale_anticipo.value = 0;
    // igv_discount_general.value = 0;
}

const searchAnticipo = async () => {
    try {
        const res: AxiosResponse<any> = await HttpClient.get("sales/search_sale/"+n_comprobante_anticipo.value);
        console.log(res);
        if(res.data.code == 403){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                res.data.message,
                "warning",
            );
            n_comprobante_anticipo.value = "";
        }else{
            sale_anticipo.value = res.data.sale;
            (Swal as TVueSwalInstance).fire(
                "Genial!",
                "Se ha encontrado la venta #"+sale_anticipo.value.id,
                "success",
            );
            // sumDetails();
        }
    } catch (e: any) {
        console.log(e);
        if(e.response?.data){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                e.response?.data.message,
                "error",
            );
            return;
        }
    }
}

const addAnticipo = () => {
    sales_anticipos.value.push(sale_anticipo.value);
    resetAnticipo();
    sumDetails();
}

const removeAnticipo = (index:number) => {
    sales_anticipos.value.splice(index,1);
}

const resetAnticipo = () => {
    sale_anticipo.value = null;
    n_comprobante_anticipo.value = "";
}

const addProduct = async () => {

    if(!product_selected.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas seleccionar un producto",
            "error",
        );
        return;
    }

    if(quantity.value == 0){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas digitar una cantidad",
            "error",
        );
        return;
    }
    
    let DISCOUNT_TOTAL = discount.value * quantity.value;
    let TOTAL_VENTA = (quantity.value * price_base.value) - DISCOUNT_TOTAL;
    let ivap = product_selected.value.is_ivap == 2 ? TOTAL_VENTA * 0.04 : 0;

    let PERCENTAGE_IGV = 0.18;
    if(![10,11].includes(Number(type_operation.value))){
        PERCENTAGE_IGV = 0;
    }

    let IGV = 0;
    let percentage_isc = product_selected.value.percentage_isc;
    let isc = TOTAL_VENTA * percentage_isc * 0.01;

    if(product_selected.value.is_ivap == 2){
        IGV =  ivap;
    }else{
        IGV = (TOTAL_VENTA + isc) * PERCENTAGE_IGV;
    }


    let PRICE_FINAL = Number(((TOTAL_VENTA + IGV + isc)/quantity.value).toFixed(5));

    let icbper = product_selected.value.is_icbper == 2 ? 0.50 * quantity.value : 0;

    let data = {
        sale_id: sale_selected.value?.id,
        product: product_selected.value,
        unidad_medida: product_selected.value.unidad_medida,
        price_base: price_base.value,
        price_final: PRICE_FINAL,
        quantity:quantity.value,
        discount:DISCOUNT_TOTAL,
        igv: IGV,
        subtotal: TOTAL_VENTA,

        per_icbper: product_selected.value.is_icbper == 2 ? 0.50 : 0,
        icbper: icbper,
        tip_afe_igv: type_operation.value,
        percentage_isc: percentage_isc,
        isc: isc,
    };

    const res: AxiosResponse<SaleDetailResponse> = await HttpClient.post(
            "sale-details/",data);
    console.log(res.data);
    sale_details.value.unshift(res.data.sale_detail);
    (Swal as TVueSwalInstance).fire(
        "Genial!",
        res.data.message,
        "success",
    );
    sumDetails();
    resetDataItem();
}

const resetDataItem = () => {
    productSelect.value.setValue("");
    product_selected.value = undefined;
    price_base.value = 0;
    quantity.value = 0;
    discount.value = 0;
    type_operation.value = 10;
}

const deleteSaleDetail  = (sale_detail:SaleDetail) => {

    (Swal as TVueSwalInstance)
        .fire({
            title: "Confirmar la eliminación",
            text: "¿Estas seguro de eliminar este producto ''"+ sale_detail.product.title + "'' ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo!",
        })
        .then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    
                    const res: AxiosResponse<any> = await HttpClient.delete(
                        "sale-details/"+sale_detail.id);
                    console.log(res);
                    (Swal as TVueSwalInstance).fire(
                        "Genial!",
                        res.data.message,
                        "success",
                    );

                    let Index = sale_details.value.findIndex((sale_detail) => sale_detail.id == res.data.sale_detail_id);
                    if(Index != -1){
                        sale_details.value.splice(Index,1);
                    }
                    setTimeout(() => {
                        sumDetails();
                    }, 25);
                } catch (error) {
                    console.log(error);
                }
            }
    });
    
}

const sumDetails = () => {
    
    igv_total.value = Number(sale_details.value.filter((sale_detail:any) => ![11].includes(Number(sale_detail.tip_afe_igv)))
                        .reduce((sum:number,sale_detail:any) => sum + (sale_detail.igv),0).toFixed(5));

    discount_global_general.value = 0;
    igv_discount_general.value = 0;
    if(discount_global.value > 0){
        discount_global_general.value = discount_global_general.value + discount_global.value;
    }

    discount_total.value = Number(sale_details.value.filter((sale_detail:any) => ![11].includes(Number(sale_detail.tip_afe_igv)))
    .reduce((sum:number,sale_detail:any) => sum + (sale_detail.discount),0).toFixed(5));

    subtotal.value = Number(sale_details.value.filter((sale_detail:any) => ![11].includes(Number(sale_detail.tip_afe_igv)))
    .reduce((sum:number,sale_detail:any) => sum + (sale_detail.subtotal),0).toFixed(5));

    ivap_total.value = Number(sale_details.value.filter((sale_detail:any) => [17].includes(Number(sale_detail.tip_afe_igv)))
    .reduce((sum:number,sale_detail:any) => sum + (sale_detail.igv),0).toFixed(5));

    icbper_total.value = Number(sale_details.value.filter((sale_detail:any) => ![11].includes(Number(sale_detail.tip_afe_igv)))
    .reduce((sum:number,sale_detail:any) => sum + (sale_detail.icbper),0).toFixed(5));

    isc_total.value = Number(sale_details.value.filter((sale_detail:any) => ![11].includes(Number(sale_detail.tip_afe_igv)))
    .reduce((sum:number,sale_detail:any) => sum + (sale_detail.isc),0).toFixed(5));

    total_sale.value = Number((subtotal.value + igv_total.value).toFixed(5));
    total_payments.value = Number(sale_payments.value.reduce((sum:number,sale_pay:any) => sum + (sale_pay.amount),0).toFixed(5));

    total_anticipos.value =  Number(sales_anticipos.value.reduce((sum:number,sal_antic:any) => sum + Number(sal_antic.subtotal),0).toFixed(2));
    if(total_anticipos.value > 0){
       discount_global_general.value = discount_global_general.value + total_anticipos.value;//sale_anticipo.value.subtotal;
       igv_discount_general.value = Number((total_anticipos.value*0.18).toFixed(2));
    }

    total_retencion.value = 0;
    total_detraccion.value = 0;
    total_percepcion.value = 0;
    switch (retencion_igv.value) {
        case 1: //RETENCIÓN
            total_retencion.value = Number((total_sale.value * 0.03).toFixed(5))
            break;
        case 2: //DETRACCIÓN
            total_detraccion.value = Number((total_sale.value * 0.04).toFixed(5))
            break;
        case 3: //PERCEPCIÓN
            total_percepcion.value = Number((subtotal.value * 0.04).toFixed(5))
            break;
        default:
            break;
    }

    getTotalSales();
}

const getIgvTotal = () => {
    return Number((igv_total.value - igv_discount_general.value).toFixed(6));
}
const getSubTotalSale = () => {
    return Number((subtotal.value - discount_global_general.value).toFixed(6));

}
const getTotalSales = () => {
    return Number(((total_sale.value + icbper_total.value + isc_total.value + total_percepcion.value) 
    - 
    (total_detraccion.value + total_retencion.value + igv_discount_general.value + discount_global_general.value)).toFixed(5));
}

const addPayment = async () => {

    if(!method_payment.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas seleccionar un metodo de pago",
            "error",
        );
        return;
    }
    if(amount.value <= 0){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas ingresar un monto de pago",
            "error",
        );
        return;
    }
    if(type_payment.value == 2 && !date_payment.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas seleccionar una fecha de pago",
            "error",
        );
        return;
    }
    if(getTotalSales() < (total_payments.value + amount.value)){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "No puedes agregar mas pagos, porque supera al total de la venta",
            "error",
        );
        return;
    }
    if(type_payment.value == 1 && (getTotalSales() > (total_payments.value + amount.value))){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas ponerle un monto que sea igual al total de la venta, porque es Al contado",
            "error",
        );
        return;
    }

    let data = {
        sale_id: sale_selected.value?.id,
        method_payment: method_payment.value,
        amount: amount.value,
        date_payment: date_payment.value,
    }

    const res: AxiosResponse<any> = await HttpClient.post(
            "sale-payments/",data);
    console.log(res.data);

    sale_payments.value.unshift(res.data.payment);

    (Swal as TVueSwalInstance).fire(
        "Genial!",
        res.data.message,
        "success",
    );

    setTimeout(() => {
        method_payment.value = "EFECTIVO";
        amount.value = 0;
        date_payment.value = "";
        sumDetails();
    }, 25);
}
const removePayment = (salepayment:SalePayment) => {
    (Swal as TVueSwalInstance)
        .fire({
            title: "Confirmar la eliminación",
            text: "¿Estas seguro de eliminar este pago '"+ salepayment.id + "' ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo!",
        })
        .then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    
                    const res: AxiosResponse<any> = await HttpClient.delete(
                        "sale-payments/"+salepayment.id);
                    console.log(res);
                    (Swal as TVueSwalInstance).fire(
                        "Genial!",
                        res.data.message,
                        "success",
                    );

                    let Index = sale_payments.value.findIndex((sale_payment:any) => sale_payment.id == res.data.sale_payment_id);
                    if(Index != -1){
                        sale_payments.value.splice(Index,1);
                    }
                    setTimeout(() => {
                        sumDetails();
                    }, 25);
                } catch (error) {
                    console.log(error);
                }
            }
    });
}

watch(is_exportacion, (value) => {
    if(value == 1){
        currency.value = "$. "
    }else{
        currency.value = "S/. "
    }
    sale_details.value = [];
    sumDetails();
    discount_global.value = 0;
})

watch(type_operation,(value) => {
    if(Number(value) == 11){
        // price_base.value = 0;
    }else{
        if(product_selected.value){
            if(client_selected.value){
                if(client_selected.value.type_client == '1'){//CLIENT FINAL
                    price_base.value = getPriceBaseCF();
                }else{
                    price_base.value = getPriceBaseCE();
                }
            }else{
                price_base.value = getPriceBaseCF();
            }
        }
    }
})
watch(retencion_igv,(value) => {
    sumDetails();
})
watch(type_payment,(value) => {
    sale_payments.value = [];
    setTimeout(() => {
        method_payment.value = "EFECTIVO";
        amount.value = 0;
        date_payment.value = "";
        sumDetails();
    }, 25); 
})

const show = async() => {
    try {
        
        const res: AxiosResponse<SaleResponse> = await HttpClient.get(
            "sales/"+route.params.id);

        console.log(res.data);

        if(res.data.code != 200){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                res.data.message,
                "error",
            );
            return;
        }else if(res.data.sale){
            sale_selected.value = res.data.sale;

            client_selected.value = sale_selected.value.client;
            
            clientSelect.value.setValue(sale_selected.value.client.id);
            sale_details.value = sale_selected.value.sale_details;
            sale_payments.value = sale_selected.value.payments;
            type_payment.value = sale_selected.value.type_payment;
            description.value = sale_selected.value.description;
            state_sale.value = sale_selected.value.state_sale;

            retencion_igv.value = sale_selected.value.retencion_igv;
            discount_global.value = sale_selected.value.discount_global;
            serie.value = sale_selected.value.serie;

            // if(sale_selected.value.ce_anticipo){
            //     is_anticipo.value = 1;
            //     n_comprobante_anticipo.value = sale_selected.value.n_comprobante_anticipo;
            //     sale_anticipo.value = sale_selected.value.ce_anticipo;
            // }
            // igv_discount_general.value = sale_selected.value.igv_discount_general;
            is_exportacion.value = sale_selected.value.is_exportacion;
            currency.value = sale_selected.value.currency;

            today.value = sale_selected.value.created_at_format;
            n_transaction.value = sale_selected.value.n_transaction;
            if(sale_selected.value.sales_anticipos){
                sales_anticipos.value = sale_selected.value.sales_anticipos;
                is_anticipo.value = 1;
            }
            setTimeout(() => {
                sumDetails();
            }, 25);
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    config();
})

</script>