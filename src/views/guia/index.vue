<template>
    <DefaultLayout>
        <b-card no-body>
            <b-card-header>
                <b-row class="align-items-center justify-content-between">
                    <b-col lg="3">
                        <b-card-title>📒 LISTA DE GUIAS DE REMISION</b-card-title>
                    </b-col>
                    <b-col lg="3">
                        <router-link to="/guia/register" type="button" variant="success">
                            <i class="far fa-plus-square ml-3"></i> Registrar Nuevo Guia
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
                            placeholder="Buscar por N° de Guia"
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
                        <label for="motivo_translado-product" class="col-form-label text-lg-end">Motivo de Translado: </label>
                        <b-form-select id="n-type_document" v-model="motivo_translado">
                            <option value="">Selec. Motivo</option>
                            <option value="01">Venta</option>
                            <option value="02">Compra</option>
                            <option value="04">Traslado entre establecimientos de la misma empresa</option>
                            <option value="08">Importación</option>
                            <option value="09">Exportación</option>
                            <option value="13">Otros</option>
                            <option value="14">Venta sujeta a confirmación del comprador</option>
                            <option value="18">Traslado emisor itinerante CP</option>
                        </b-form-select>
                    </b-col>

                    <b-col lg="4" md="4">
                        <label for="type_transport-product" class="col-form-label text-lg-end">Tipo de Transporte: </label>
                        <div class="d-flex">
                            <b-form-radio name="type_transport" @click="type_transport = '02'" value="02" :checked="type_transport == '02'">T. Privado</b-form-radio>
                            {{ " " }}
                            <b-form-radio name="type_transport" @click="type_transport = '01'" value="01" class="mx-1" :checked="type_transport == '01'">T. Publico</b-form-radio>
                            {{ " " }}
                            <b-form-radio name="type_transport" @click="type_transport = '0'" value="0" class="mx-1" :checked="type_transport == '0'">Ninguno</b-form-radio>
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
                                <th>N° de Operación</th>
                                <th>Cliente</th>
                                <th>Fecha de Emisión</th>
                                <th>Tipo</th>
                                <th>Motivo de Translado</th>
                                <th>Punto de Llegada</th>
                                <th>Peso Total</th>
                                <th>N° de Bultos</th>
                                <th>Fac. Elec.</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(guia_remision, index) in guia_remision_list" :key="index">
                                <td style="width: 16px">
                                    {{ guia_remision.n_operacion ?? guia_remision.id }}
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <span>{{ guia_remision.client.full_name }}</span>
                                    </div>
                                </td>
                                <td>{{ guia_remision.created_at_format }}</td>
                                <td>{{ guia_remision.type_transport == '01' ? 'TRANSPORTE PUBLICO' : 'TRANSPORTE PRIVADO' }}</td>
                                <td>{{  getMotivoTranslado(guia_remision.motivo_translado)  }}</td>
                                <td>{{ guia_remision.punto_llegada.region+"/"+guia_remision.punto_llegada.provincia+"/"+guia_remision.punto_llegada.distrito }}</td>
                                <td> 
                                    <span class="text-nowrap">{{ guia_remision.total }} KGM</span>
                                </td>
                                <td>{{ guia_remision.quantity_total }}</td>
                                <td>
                                    <div class="d-flex">
                                        <div v-if="guia_remision.correlativo">
                                            <a :href="guia_remision.xml" v-b-tooltip.hover.top="'Descargar XML'" target="_blank">
                                                <img :src="xmlLg" width="45" alt="">
                                            </a>
                                        </div>
                                        <div v-if="guia_remision.correlativo">
                                            <a :href="guia_remision.cdr" v-b-tooltip.hover.top="'Descargar CDR'" target="_blank">
                                                <img :src="cdrLg" width="45" alt="">
                                            </a>
                                        </div>
                                    </div>
                                </td>
                                <td >
                                <div class="d-flex">
                                    <a href="#" onclick="return false;" @click="showPdf(guia_remision)">
                                        <i class="fas fa-file-pdf text-secondary fs-22"></i>
                                    </a>{{ " " }}
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
import type { Categorie } from "@/types/categories";
import { onMounted, ref } from "vue";
import xmlLg from "@/assets/images/logo-xml.png";
import cdrLg from "@/assets/images/logo-cdr.png";
import type { AxiosResponse } from "axios";
import HttpClient from "@/helpers/http-client";
import type { ProductCategorie, ProductConfigResponse } from "@/types/products";

const search_product = ref<string>("");
const search = ref<string>("");
const search_client = ref<string>("");
const start_date = ref<Date | string>("");
const end_date = ref<Date | string>("");
const categorie_id = ref<string>("");

const motivo_translado = ref<string>('');
const type_transport = ref<string>("0");  

const categories = ref<ProductCategorie[]>([]);
const guia_remision_list = ref<any[]>([]);

const perPageItem = ref(5);
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

const list = async () => {
    try {
        
        const res: AxiosResponse<any> = await HttpClient.post(
            "guia/index?page="+currentPage.value,{
                search_product: search_product.value,
                categorie_id: categorie_id.value,
                search: search.value,
                search_client: search_client.value,
                start_date:start_date.value,
                end_date:end_date.value,
                motivo_translado: motivo_translado.value,
                type_transport: type_transport.value,
            });
        console.log(res); 
        guia_remision_list.value = res.data.guia_remisions.data;
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
    motivo_translado.value = "";
    type_transport.value = "0";
    categorie_id.value = "";
    list();
}

const showPdf = (guia_remision:any) => {
    window.open(import.meta.env.VITE_API_BASE_URL+"guia-remision-pdf/"+guia_remision.id,'_blank');
}

const getMotivoTranslado = (motivo_translado:string) => {
    let MOTIVO_TRANSLADO = "";
    switch (motivo_translado) {
        case '01':
            MOTIVO_TRANSLADO = "Venta"
            break;
        case '02':
            MOTIVO_TRANSLADO = "Compra"
            break;
        case '04':
            MOTIVO_TRANSLADO = "Traslado entre establecimientos de la misma empresa"
             break;
        case '08':
            MOTIVO_TRANSLADO = "Importación"
            break;
        case '09':
            MOTIVO_TRANSLADO = "Exportación"
             break;
        case '13':
            MOTIVO_TRANSLADO = "Otros"
            break;
        case '14':
            MOTIVO_TRANSLADO = "Venta sujeta a confirmación del comprador"
             break;
        case '18':
            MOTIVO_TRANSLADO = "Traslado emisor itinerante CP"
            break;
        default:
            break;
    }
    return MOTIVO_TRANSLADO;
}

onMounted(() => {
  list();  
  config();
})
</script>