<template>
    <DefaultLayout>
        <b-card>
            <b-card-header>
                <b-row class="align-items-center justify-content-between">
                    <b-col lg="3">
                        <b-card-title>📒 LISTA DE VENTAS</b-card-title>
                    </b-col>
                    <b-col lg="3">
                        <router-link to="/sale/register" type="button" variant="success">
                            <i class="far fa-plus-square ml-3"></i> Registrar Nuevo Venta
                        </router-link>
                    </b-col>
                </b-row>
                <b-row class="align-items-center mt-3">
                    <b-col lg="4" md="4">
                        <b-form-input
                            type="text"
                            v-model="search_product"
                            id="name-product"
                            placeholder="Buscar por nombre o sku del producto"
                        />
                    </b-col>
                    <b-col lg="3" md="3">
                        <b-form-select id="categorie-product" v-model="categorie_id">
                            <template v-for="(categorie, index) in categories" :key="index">
                                <option :value="categorie.id">{{ categorie.title }}</option>
                            </template>
                        </b-form-select>

                    </b-col>
                    <b-col lg="2" md="2">
                        <b-form-input
                            type="number"
                            v-model="search"
                            id="n_ventas"
                            placeholder="Buscar por N° de Venta"
                        />
                    </b-col>
                    <b-col lg="3" md="3">
                        <b-form-input
                            type="text"
                            v-model="search_client"
                            id="n_ventas"
                            placeholder="Buscar por nombre de cliente"
                        />
                    </b-col>

                    <b-col lg="2" md="2">
                        <label for="state_sale-product" class="col-form-label text-lg-end">Tipo: </label>
                        <div class="">
                            <b-form-radio name="state_sale" @click="state_sale = 1" value="1" :checked="state_sale == 1">Venta</b-form-radio>
                            {{ " " }}
                            <b-form-radio name="state_sale" @click="state_sale = 2" value="2" class="" :checked="state_sale == 2">Cotización</b-form-radio>
                            {{ " " }}
                            <b-form-radio name="state_sale" @click="state_sale = 0" value="0" class="" :checked="state_sale == 0">Ninguno</b-form-radio>
                        </div>
                    </b-col>
                    <b-col lg="4" md="4">
                        <label for="type_payment-product" class="col-form-label text-lg-end">Tipo de Pago: </label>
                        <div class="d-flex">
                            <b-form-radio name="type_payment" @click="type_payment = 1" value="1" :checked="type_payment == 1">Al Contado</b-form-radio>
                            {{ " " }}
                            <b-form-radio name="type_payment" @click="type_payment = 2" value="2" class="mx-1" :checked="type_payment == 2">Credito</b-form-radio>
                            {{ " " }}
                            <b-form-radio name="type_payment" @click="type_payment = 0" value="0" class="mx-1" :checked="type_payment == 0">Ninguno</b-form-radio>
                        </div>
                    </b-col>
                    <b-col lg="2" md="2">
                        <b-form-input
                            type="date"
                            id="n-f-start_date"
                            v-model="start_date"
                            placeholder=""
                        />
                        <small>Fecha de Inicio</small>
                    </b-col>
                    <b-col lg="2" md="2">
                        <b-form-input
                            type="date"
                            id="n-f-end_date"
                            v-model="end_date"
                            placeholder=""
                        />
                        <small>Fecha de Fin</small>
                    </b-col>
                    <b-col lg="2" md="2">
                        <b-button type="button" @click="list" variant="success">
                            <i class="fas fa-search"></i>
                        </b-button>
                        <b-button type="button" @click="reset" variant="dark" class="mx-2">
                            <i class="fas fa-sync"></i>
                        </b-button>
                    </b-col>
                </b-row>
            </b-card-header>
            <b-card-body class="pt-0">
            <div class="table-responsive m-0">
                <table class="table datatable">
                    <thead class="table-light">
                        <tr>
                            <th>N° de Venta</th>
                            <th>Cliente</th>
                            <th>Fecha de Emisión</th>
                            <th>Tipo</th>
                            <th>Estado de Pago</th>
                            <th>Tipo de Pago</th>
                            <th>Igv</th>
                            <th>Comprobante</th>
                            <th>Total</th>
                            <th>Fac. Elec.</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(sale, index) in sale_list" :key="index">
                            <td style="width: 16px">
                                {{ sale.id }}
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <span>{{ sale.client.full_name }}</span>
                                </div>
                            </td>
                            <td>{{ sale.created_at_format }}</td>
                            <td>{{ sale.state_sale == 1 ? 'VENTA' : 'COTIZACIÓN' }}</td>
                            <td>{{  getStatePayment(sale.state_payment)  }}</td>
                            <td>{{ sale.type_payment == 1 ? 'AL CONTADO' : 'CREDITO' }}</td>
                            <td style="text-wrap-mode: nowrap;">{{ sale.currency }} {{ sale.igv_general }}</td>

                            <td>{{ sale.serie }}</td>
                            <td style="text-wrap-mode: nowrap;">{{ sale.currency }} {{ sale.total_general }}</td>
                            <td>
                                <div class="d-flex">

                                    <div v-if="!sale.correlativo">
                                        <a v-if="sale.state_sale == 1" href="#" v-b-tooltip.hover.top="'Enviar a Sunat'" onclick="return false;" @click="seendSunat(sale)">
                                            <img :src="sunatLg" width="45" alt="">
                                        </a>
                                    </div>
                                    <div v-if="sale.correlativo">
                                        <a :href="sale.xml" v-b-tooltip.hover.top="'Descargar XML'" target="_blank">
                                            <img :src="xmlLg" width="45" alt="">
                                        </a>
                                    </div>
                                    <div v-if="sale.correlativo">
                                        <a :href="sale.cdr" v-b-tooltip.hover.top="'Descargar CDR'" target="_blank">
                                            <img :src="cdrLg" width="45" alt="">
                                        </a>
                                    </div>

                                    <div v-if="sale.correlativo && sale.serie == 'F001'">
                                        <a href="#" onclick="return false;" v-b-tooltip.hover.top="'Generar Nota'" @click="notaSale(sale)">
                                            <img :src="notaCLg" width="40" alt="">
                                        </a>
                                    </div>
                                </div>
                            </td>
                            <td >
                                <div class="d-flex">
                                    <DropDown v-if="sale.notas.length > 0" custom-class="float-start" class="mx-1">
                                        <a
                                            href="#"
                                            class="text-muted fs-16 dropdown-toggle p-1"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="true"
                                            v-b-tooltip.hover.top="'Notas'"
                                        >
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </a>
                                        <div
                                            class="dropdown-menu dropdown-menu-end"
                                            data-popper-placement="bottom-end"
                                            style="position: absolute;inset: 0px 0px auto auto;margin: 0px;transform: translate(0px, 30px);"
                                        >
                                            <template  v-for="(nota, index) in sale.notas" :key="index">
                                                <a v-if="nota.doc_nota == '07'" class="dropdown-item" target="_blank" :href="nota.url">
                                                    <i class="fas fa-file-medical fs-18" ></i> N. Credito: {{ nota.n_operacion }}
                                                </a>
                                                <a v-if="nota.doc_nota == '08'" class="dropdown-item" target="_blank" :href="nota.url">
                                                    <i class="fas fa-file-alt fs-18" ></i> N. Debito: {{ nota.n_operacion }}
                                                </a>
                                            </template>
                                        </div>
                                    </DropDown>
                                    
                                    <a href="#" onclick="return false;" @click="showPdf(sale)">
                                        <i class="fas fa-file-pdf text-secondary fs-22"></i>
                                    </a>{{ " " }}
                                    <a href="#" onclick="return false;" @click="editSale(sale)">
                                        <i class="las la-pen text-secondary fs-22"></i>
                                    </a>{{ " " }}
                                    <a href="#" onclick="return false;" @click="deleteSale(sale)">
                                        <i class="las la-trash-alt text-secondary fs-22"></i>
                                    </a>
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <b-pagination
                v-model="currentPage"
                :total-rows="totalPage"
                :per-page="perPageItem"
                prev-text="Previous"
                next-text="Next"
            />
          </b-card-body>
        </b-card>
    </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import type { ProductCategorie, ProductConfigResponse } from "@/types/products";
import type { AxiosResponse } from "axios";
import { onMounted, ref } from "vue";
import HttpClient from "@/helpers/http-client";
import type { Sale, Sales } from "@/types/sales";

import sunatLg from "@/assets/images/sunat-logo.png";
import xmlLg from "@/assets/images/logo-xml.png";
import cdrLg from "@/assets/images/logo-cdr.png";
import notaCLg from "@/assets/images/nota-c.png";
import router from "@/router";

import Swal from "sweetalert2/dist/sweetalert2.js";
type TVueSwalInstance = typeof Swal & typeof Swal.fire;

const search_product = ref<string>("");
const categorie_id = ref<string>("");
const categories = ref<ProductCategorie[]>([]);

const search = ref<string>("");
const search_client = ref<string>("");
const state_sale = ref<number>(0);
const type_payment = ref<number>(0);
const start_date = ref<string | Date>("");
const end_date = ref<string | Date>("");

const sale_list = ref<Sale[]>([]);

const perPageItem = ref(25);
const totalPage = ref(0);
const currentPage = ref(1);

const config = async () => {
    try {
        const res: AxiosResponse<ProductConfigResponse> = await HttpClient.get(
            "products/config");
        console.log(res);
        categories.value = res.data.categories;
    } catch (error) {
        console.log(error);
    }
}

const getStatePayment = (state_payment:number) => {
    if(state_payment == 1){
        return "PENDIENTE";
    }else if(state_payment == 2){
        return "PARCIAL";
    }else{
        return "TOTAL";
    }
}

const list = async() => {
    try {
        
        const res: AxiosResponse<Sales> = await HttpClient.post(
            "sales/index?page="+currentPage.value,{
                search_product: search_product.value,
                categorie_id: categorie_id.value,
                search: search.value,
                search_client: search_client.value,
                state_sale: state_sale.value,
                type_payment: type_payment.value,
                start_date:start_date.value,
                end_date:end_date.value,
            });
        console.log(res); 
        sale_list.value = res.data.sales.data;
        totalPage.value = res.data.total;
        perPageItem.value = res.data.pagination;
    } catch (error) {
        console.log(error);
    }
}

const reset = () => {
    search_product.value = "";
    search.value = "";
    search_client.value = "";
    start_date.value = "";
    end_date.value = "";
    state_sale.value = 0;
    type_payment.value = 0;
    categorie_id.value = "";
    list();
}

const showPdf = async(sale:Sale) => {
    window.open(import.meta.env.VITE_API_BASE_URL+"sales-pdf/"+sale.id,'_blank');
}
const editSale = async(sale:Sale) => {
    router.push({
        name:'sales.edit',
        params:{
            id: sale.id
        }
    })
}
const deleteSale = async(sale:Sale) => {
    (Swal as TVueSwalInstance)
        .fire({
            title: "Confirmar la eliminación",
            text: `¿Estas seguro de eliminar esta ${sale.state_sale == 1 ? 'VENTA' : 'COTIZACIÓN'} '${sale.id}' ?`,
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
                        "sales/"+sale.id);
                    console.log(res);
                    (Swal as TVueSwalInstance).fire(
                        "Genial!",
                        res.data.message,
                        "success",
                    );

                    let Index = sale_list.value.findIndex((vt) => vt.id == sale.id);
                    if(Index != -1){
                        sale_list.value.splice(Index,1);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
    });

}


const seendSunat = async(sale:Sale) => {
    try {
        const res: AxiosResponse<any> = await HttpClient.post("seend_sunat",
            {
                sale_id: sale.id,
            }
        );
        
        console.log(res);

        if(res.data.error){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                `(${res.data.error.code}) ${res.data.error.message}`,
                "error",
            );
            return;
        }

        if(res.data.sale){
            let INDEX = sale_list.value.findIndex((sale) => sale.id == res.data.sale.id);
            if(INDEX != -1){
                sale_list.value[INDEX] = res.data.sale;
                (Swal as TVueSwalInstance).fire(
                    "Genial!",
                    "Tu venta ha sido reportada a SUNAT, podras tener la constancia del XML y del CDR",
                    "success",
                );
            }
        }

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

const notaSale = async(sale:Sale) => {
    router.push({
        name:'nota.electronica',
        params:{
            id: sale.id
        }
    })
}

onMounted(() => {
  config();  
  list();
})
</script>