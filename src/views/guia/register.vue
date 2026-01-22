<template>
    <DefaultLayout>
        <div class="d-flex flex-wrap justify-space-between gap-4 mb-6">
            <div class="d-flex flex-column justify-center">
                <h4 class="text-h4 mb-1">
                    📄 Add New Guia de Remisión
                </h4>
                <p class="text-body-1 mb-0">
                    Orders placed across your store
                </p>
            </div>
        </div>

        <b-row >
            <b-col lg="5" md="5">
                <b-card no-body :class="{'border-sale': type_transport == '01'}">
                    <b-card-header class="text-center">
                        <i class="fas fa-truck-moving fs-18" ></i>
                        <b-card-title class="py-1">TRANSPORTE PUBLICO</b-card-title>
                        <b-form-radio name="type_transport" @click="type_transport = '01'" value="1" :checked="type_transport == '01'"></b-form-radio>
                    </b-card-header>
                </b-card>
            </b-col>
            <b-col lg="2" md="2">
            </b-col>
            <b-col lg="5" md="5">
                <b-card no-body :class="{'border-sale': type_transport == '02'}">
                    <b-card-header class="text-center">
                        <i class="fas fa-truck fs-18" ></i>
                        <b-card-title class="py-1">TRANSPORTE PRIVADO</b-card-title>
                        <b-form-radio name="type_transport" @click="type_transport = '02'" value="2" :checked="type_transport == '02'"></b-form-radio>
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
                        <label for="FB" class="col-form-label text-lg-end">Serie: </label>
                        <b-form-select id="FB" v-model="serie">
                            <option value="T001">T001</option>
                        </b-form-select>
                    </b-col>
                    <b-col lg="2" md="3">
                        <label for="n-transaction" class="col-form-label text-lg-end">N° de Operación: </label>
                        <b-form-input
                            type="text"
                            id="n-transaction"
                            v-model="n_transaction"
                            placeholder="F-001"
                        />
                    </b-col>
                    <b-col lg="2" md="3">
                        <label for="n-f-emision" class="col-form-label text-lg-end">Fecha de Emisión: </label>
                        <b-form-input
                            type="date"
                            id="n-f-emision"
                            v-model="today"
                            placeholder="F-001"
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
                        <b v-if="client_selected">{{ client_selected.type_client == 1 ? 'CLIENTE FINAL' : 'CLIENTE EMPRESA' }}</b>
                    </b-col>
                </b-row>
                <b-row v-if="type_transport == '01'">
                    <b-col lg="3" md="3">
                        <label for="n-n_document_ruc" class="col-form-label text-lg-end">Documento de Transportista RUC: </label>
                        <b-form-input
                            type="number"
                            id="n-n_document_ruc"
                            v-model="n_document_ruc"
                            placeholder=""
                        />
                    </b-col>
                    <b-col lg="4" md="4">
                        <label for="n-razon_social" class="col-form-label text-lg-end">Razon Social Transportista: </label>
                        <b-form-input
                            type="text"
                            id="n-razon_social"
                            v-model="razon_social_transportista"
                            placeholder=""
                        />
                    </b-col>
                    <b-col lg="2" md="2">
                        <label for="n-nro_mtc" class="col-form-label text-lg-end">Nro Mtc: </label>
                        <b-form-input
                            type="text"
                            id="n-nro_mtc"
                            v-model="nro_mtc"
                            placeholder=""
                        />
                    </b-col>
                </b-row>
                <b-row v-if="type_transport == '02'">
                    <b-col lg="2" md="2">
                        <label for="n-type_document" class="col-form-label text-lg-end">Tipo Documento Conductor: </label>
                        <b-form-select id="n-type_document" v-model="type_document">
                            <option value="1">DNI</option>
                            <option value="7">PASAPORTE</option>
                            <option value="6">RUC</option>
                            <option value="4">CARNET DE EXTRANJERIA</option>
                        </b-form-select>
                    </b-col>
                    <b-col lg="2" md="2">
                        <label for="n-n_document" class="col-form-label text-lg-end">N° Documento Conductor: </label>
                        <b-form-input
                            type="number"
                            id="n-n_document"
                            v-model="n_document"
                            placeholder=""
                        />
                    </b-col>
                    <b-col lg="2" md="2">
                        <label for="n-n_licencia" class="col-form-label text-lg-end">N° Licencia Conductor: </label>
                        <b-form-input
                            type="text"
                            id="n-n_licencia"
                            v-model="n_licencia"
                            placeholder=""
                        />
                    </b-col>
                    <b-col lg="3" md="3">
                        <label for="n-full_name" class="col-form-label text-lg-end">Nombre Completo Conductor: </label>
                        <b-form-input
                            type="text"
                            id="n-full_name"
                            v-model="full_name_conductor"
                            placeholder=""
                        />
                    </b-col>
                    <b-col lg="2" md="2">
                        <label for="n-placa" class="col-form-label text-lg-end">Placa Vehiculo: </label>
                        <b-form-input
                            type="text"
                            id="n-placa"
                            v-model="placa_vehiculo"
                            placeholder=""
                        />
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>

        <b-card no-body>
            <b-card-header>
                <b-card-title>🚚 Translado</b-card-title>
            </b-card-header>
            <b-card-body class="pt-0">
                <b-row>
                    <b-col lg="12">
                        <h6>Punto de Partida</h6>
                    </b-col>
                    <b-col lg="2">
                        <label for="region-client" class="col-form-label text-lg-end">Región: </label>
                        <b-form-select id="region_list" v-model="ubigeo_region_partida">
                                <template v-for="(REGIONE, index) in REGIONES_L" :key="index">
                                <option :value="REGIONE.id">{{ REGIONE.name }}</option>
                            </template>
                        </b-form-select>
                    </b-col>

                    <b-col lg="2">
                        <label for="provincia-client" class="col-form-label text-lg-end">Provincia: </label>
                        <b-form-select id="provincia_list" v-model="ubigeo_provincia_partida">
                                <template v-for="(PROVINCIA, index) in PROVINCIA_SELECTS" :key="index">
                                <option :value="PROVINCIA.id">{{ PROVINCIA.name }}</option>
                            </template>
                        </b-form-select>
                    </b-col>

                    <b-col lg="2">
                        <label for="distrito-client" class="col-form-label text-lg-end">Distrito: </label>
                        <b-form-select id="distrito_list" v-model="ubigeo_distrito_partida">
                                <template v-for="(DISTRITO, index) in DISTRITO_SELECTS" :key="index">
                                <option :value="DISTRITO.id">{{ DISTRITO.name }}</option>
                            </template>
                        </b-form-select>
                    </b-col>

                    <b-col lg="4">
                        <label for="n-address" class="col-form-label text-lg-end">Dirección: </label>
                        <b-form-input
                            type="text"
                            id="n-address"
                            placeholder="###"
                            v-model="address_partida"
                        />
                    </b-col>
                    <b-col lg="2">
                        <label for="n-address" class="col-form-label text-lg-end">Guardar: </label>
                        <div>
                            <b-button type="button" @click="savePuntoPartida()" variant="success">
                                <i class="far fa-save ml-3"></i>
                            </b-button>
                        </div>
                    </b-col>
                </b-row>

                <b-row class="mt-3">
                    <b-col lg="12">
                        <h6>Punto de Llegada</h6>
                    </b-col>
                    <b-col lg="2">
                        <label for="region_client_llegada" class="col-form-label text-lg-end">Región: </label>
                        <b-form-select id="region_client_llegada" v-model="ubigeo_region_llegada">
                                <template v-for="(REGIONE, index) in REGIONES_L" :key="index">
                                <option :value="REGIONE.id">{{ REGIONE.name }}</option>
                            </template>
                        </b-form-select>
                    </b-col>

                    <b-col lg="2">
                        <label for="provincia-client" class="col-form-label text-lg-end">Provincia: </label>
                        <b-form-select id="provincia_client_llegada" v-model="ubigeo_provincia_llegada">
                                <template v-for="(PROVINCIA, index) in PROVINCIA_SELECTS_LLEGADA" :key="index">
                                <option :value="PROVINCIA.id">{{ PROVINCIA.name }}</option>
                            </template>
                        </b-form-select>
                    </b-col>

                    <b-col lg="2">
                        <label for="distrito-client" class="col-form-label text-lg-end">Distrito: </label>
                        <b-form-select id="distrito_client_llegada" v-model="ubigeo_distrito_llegada">
                                <template v-for="(DISTRITO, index) in DISTRITO_SELECTS_LLEGADA" :key="index">
                                <option :value="DISTRITO.id">{{ DISTRITO.name }}</option>
                            </template>
                        </b-form-select>
                    </b-col>

                    <b-col lg="4">
                        <label for="n-address" class="col-form-label text-lg-end">Dirección: </label>
                        <b-form-input
                            type="text"
                            id="n-address"
                            placeholder="###"
                            v-model="address_llegada"
                        />
                    </b-col>
                    <b-col lg="2">
                        <label for="n-address" class="col-form-label text-lg-end">Guardar: </label>
                        <div>
                            <b-button type="button" @click="savePuntoPuntoLlegada()" variant="success">
                                <i class="far fa-save ml-3"></i>
                            </b-button>
                        </div>
                    </b-col>
                </b-row>

            </b-card-body>
        </b-card>

        <b-card no-body>
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
                        </div>
                    </b-col>

                    <b-col lg="3" md="3">
                        <b-row>
                            <b-col lg="12" md="12" v-if="product_selected">
                                <label for="n-f-unidad" class="col-form-label text-lg-end">Unidades: </label>
                                <b-form-select id="unidad" v-model="unidad_medida">
                                    <option value="">Selec. Unidad</option>
                                    <template v-for="(unit, index) in units" :key="index">
                                        <option :value="unit.code">{{ unit.name }}</option>
                                    </template>
                                </b-form-select>
                            </b-col>
                        </b-row>
                    </b-col>

                    <b-col lg="3" md="3"  v-if="product_selected">
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
                                <label for="n-f-peso" class="col-form-label text-lg-end">Peso: (KGM)</label>
                                <b-form-input
                                    type="number"
                                    id="n-f-peso"
                                    v-model="peso"
                                    placeholder=""
                                />
                            </b-col>
                        </b-row>
                    </b-col>

                    <b-col lg="1" md="1"  v-if="product_selected">
                        <b-button type="button" variant="success" @click="addProduct()">
                            <i class="far fa-plus-square ml-3"></i>
                        </b-button>
                    </b-col>
                    
                </b-row>
            </b-card-body>
        </b-card>

        <b-card no-body>
            <b-card-header>
                <b-card-title>📒 Detalle de la Guia</b-card-title>
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
                                        <th>Cantidad</th>
                                        <th>Unidad</th>
                                        <th>Peso Unitario</th>
                                        <th>Peso Total</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(guia_remision_detail, index) in guia_remision_details" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ guia_remision_detail.product.title }}</td>
                                        <td>{{ guia_remision_detail.quantity }}</td>
                                        <td>{{ guia_remision_detail.unidad_medida }}</td>
                                        <td>{{ guia_remision_detail.peso }} KGM</td>
                                        <td>{{ guia_remision_detail.total }} KGM</td>
                                        <td>
                                            <b-button type="button" variant="danger" @click="deleteGuiaDetail(index)">
                                                <i class="fas fa-prescription-bottle"></i>
                                            </b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </b-col>
                    <b-col lg="6">
                    </b-col>
                    <b-col lg="6" class="mt-2">
                        <table style="width: 90%;">
                            <tr>
                                <td>PESO TOTAL</td>
                                <td> {{ total }} KGM</td>
                            </tr>

                            <tr>
                                <td>CANTIDA DE BULTOS</td>
                                <td> {{ quantity_total }}</td>
                            </tr>
                            
                        </table>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>

        <b-card no-body>
            <b-card-body class="pt-0">
                <b-row class="mt-2 align-items-center justify-content-between">
                    <b-col lg="3" md="3">
                        <label for="n-type_document" class="col-form-label text-lg-end">Motivo de Translado: </label>
                        <b-form-select id="n-type_document" v-model="motivo_translado">
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
                    <b-col lg="6" md="6">
                        <b-row>
                            <b-col lg="6" md="6" v-if="motivo_translado == '08' || motivo_translado == '09'">
                                <label for="n-dam" class="col-form-label text-lg-end">Numero de declaracion aduanera (DAM): </label>
                                <b-form-input
                                    type="text"
                                    id="n-address"
                                    placeholder="###"
                                    v-model="num_dam"
                                />
                            </b-col>
                            <b-col lg="12" md="12">
                                <label for="description-product" class="col-form-label text-lg-end">Descripción: </label>
                                <b-form-textarea type="textarea" v-model="description" rows="3" id="description-product" />
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col lg="3" md="3" class="text-end">
                        <b-button type="button" variant="primary" @click="store()">
                            <i class="far fa-plus-square ml-3"></i> Guardar Guia
                        </b-button>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
    </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { Client, UbigeoClient } from "@/types/clients";
import { onMounted, ref, watch } from "vue";
import REGIONES from "@/views/clients/json/regiones.json";
import PROVINCIAS from "@/views/clients/json/provincias.json";
import DISTRITOS from "@/views/clients/json/distritos.json";
import { Product, UNIT_IMPORTS, UNITS } from "@/types/products";
import type { SaleConfig } from "@/types/sales";
import type { AxiosResponse } from "axios";
import HttpClient from "@/helpers/http-client";
import Selectr from "mobius1-selectr";

import Swal from "sweetalert2/dist/sweetalert2.js";
type TVueSwalInstance = typeof Swal & typeof Swal.fire;

const type_transport = ref<string>("01");
const serie = ref<string>("T001");
const n_transaction = ref<string>("");
const today = ref<Date | string>("");
const clients = ref<Client[]>([]);
const client_selected = ref<Client | undefined>(undefined);

const n_document_ruc = ref<string>("");
const razon_social_transportista = ref<string>("");
const nro_mtc = ref<string>("");

const type_document = ref<string>("1");
const n_document = ref<number>(0);
const n_licencia = ref<string>("");
const full_name_conductor = ref<string>("");
const placa_vehiculo = ref<string>("");

const ubigeo_region_partida = ref<string>("");
const ubigeo_provincia_partida = ref<string>("");
const ubigeo_distrito_partida = ref<string>("");
const address_partida = ref<string>("");

const REGIONES_L = ref<UbigeoClient[]>(REGIONES);
const PROVINCIA_L =ref<UbigeoClient[]>(PROVINCIAS);
const DISTRITO_L = ref<UbigeoClient[]>(DISTRITOS);

const PROVINCIA_SELECTS = ref<UbigeoClient[]>([]);
const DISTRITO_SELECTS = ref<UbigeoClient[]>([]);

const ubigeo_region_llegada = ref<string>("");
const ubigeo_provincia_llegada = ref<string>("");
const ubigeo_distrito_llegada = ref<string>("");
const address_llegada = ref<string>("");

const PROVINCIA_SELECTS_LLEGADA = ref<UbigeoClient[]>([]);
const DISTRITO_SELECTS_LLEGADA = ref<UbigeoClient[]>([]);

const products = ref<Product[]>([]);
const product_selected = ref<Product | undefined>(undefined);
const unidad_medida = ref<string>("NIU");
const units = ref<any[]>(UNITS);
const quantity = ref<number>(0);
const peso = ref<number>(0);

const guia_remision_details = ref<any>([]);

const total = ref<number>(0);
const quantity_total = ref<number>(0);

const motivo_translado = ref<string>("01");
const num_dam = ref<string>("");
const description = ref<string>("");

const clientSelect = ref<any>(null);
const productSelect = ref<any>(null);

const punto_partida = ref<any>(null);
const punto_llegada = ref<any>(null);

const transporte_datos = ref<any>(null);
const conductor_datos = ref<any>(null);

const config = async () => {
    try {
        const res: AxiosResponse<SaleConfig> = await HttpClient.get(
            "guia/config");
        console.log(res);
        today.value = res.data.today;
        n_transaction.value = res.data.n_transaction;

        if(products.value.length == 0){
            products.value = res.data.products.data;
            clients.value = res.data.clients.data;
            setTimeout(() => {
                clientSelect.value = new Selectr("#n-f-clients");
                productSelect.value = new Selectr("#n-f-products");
            }, 50);
        }
        

        setTimeout(() => {
            // clientSelect.value = new Selectr("#n-f-clients");
            clientSelect.value.on("selectr.change",(option:any) => {
                console.log(option.value);
                client_selected.value = clients.value.find((client) => client.id == option.value);
            })

            // productSelect.value = new Selectr("#n-f-products");
            productSelect.value.on("selectr.change",(option:any) => {
                console.log(option.value);
                product_selected.value = products.value.find((product) => product.id == option.value);
            })

        }, 50);
    } catch (error) {
        console.log(error);
    }
}

watch(ubigeo_region_partida,(value) => {
    if(value){
        PROVINCIA_SELECTS.value = PROVINCIA_L.value.filter((prov) => prov.department_id == value);
        DISTRITO_SELECTS.value = [];
        ubigeo_distrito_partida.value = "";
        ubigeo_provincia_partida.value = "";
    }
})

watch(ubigeo_provincia_partida,(value) => {
    if(value){
        DISTRITO_SELECTS.value = DISTRITO_L.value.filter((dst) => dst.province_id == value);
    }
})

const savePuntoPartida = () => {

    if(!ubigeo_region_partida.value || !ubigeo_provincia_partida.value || !ubigeo_distrito_partida.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas seleccionar la REGION , PROVINCIA Y DISTRITO del punto de Partida",
            "error",
        );
        return;
    }
    if(!address_partida.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas llenar la direccción",
            "error",
        );
        return;
    }

    let region = "";
    let provincia = "";
    let distrito = "";

    let REGION_SELECTED = REGIONES_L.value.find((rg) => rg.id == ubigeo_region_partida.value);
    if(REGION_SELECTED){
        region = REGION_SELECTED.name;
    }
    let PROVINCIA_SELECTED = PROVINCIA_L.value.find((prov) => prov.id == ubigeo_provincia_partida.value);
    if(PROVINCIA_SELECTED){
        provincia = PROVINCIA_SELECTED.name;
    }
    let DISTRITO_SELECTED = DISTRITO_L.value.find((DST) => DST.id == ubigeo_distrito_partida.value);
    if(DISTRITO_SELECTED){
        distrito = DISTRITO_SELECTED.name;
    }

    punto_partida.value = {
        ubigeo_region: ubigeo_region_partida.value,
        ubigeo_provincia: ubigeo_provincia_partida.value,
        ubigeo_distrito: ubigeo_distrito_partida.value,
        region: region,
        provincia: provincia,
        distrito: distrito,
        address: address_partida
    };

    (Swal as TVueSwalInstance).fire(
        "Genial!",
        "Los Datos de partida se han llenado correctamente",
        "success",
    );
}

watch(ubigeo_region_llegada,(value) => {
    if(value){
        PROVINCIA_SELECTS_LLEGADA.value = PROVINCIA_L.value.filter((prov) => prov.department_id == value);
        DISTRITO_SELECTS_LLEGADA.value = [];
        ubigeo_distrito_llegada.value = "";
        ubigeo_provincia_llegada.value = "";
    }
})

watch(ubigeo_provincia_llegada,(value) => {
    if(value){
        DISTRITO_SELECTS_LLEGADA.value = DISTRITO_L.value.filter((dst) => dst.province_id == value);
    }
})

const savePuntoPuntoLlegada = () => {

    if(!ubigeo_region_llegada.value || !ubigeo_provincia_llegada.value || !ubigeo_distrito_llegada.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas seleccionar la REGION , PROVINCIA Y DISTRITO del punto de LLegada",
            "error",
        );
        return;
    }
    if(!address_llegada.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas llenar la direccción",
            "error",
        );
        return;
    }

    let region = "";
    let provincia = "";
    let distrito = "";

    let REGION_SELECTED = REGIONES_L.value.find((rg) => rg.id == ubigeo_region_llegada.value);
    if(REGION_SELECTED){
        region = REGION_SELECTED.name;
    }
    let PROVINCIA_SELECTED = PROVINCIA_L.value.find((prov) => prov.id == ubigeo_provincia_llegada.value);
    if(PROVINCIA_SELECTED){
        provincia = PROVINCIA_SELECTED.name;
    }
    let DISTRITO_SELECTED = DISTRITO_L.value.find((DST) => DST.id == ubigeo_distrito_llegada.value);
    if(DISTRITO_SELECTED){
        distrito = DISTRITO_SELECTED.name;
    }

    punto_llegada.value = {
        ubigeo_region: ubigeo_region_llegada.value,
        ubigeo_provincia: ubigeo_provincia_llegada.value,
        ubigeo_distrito: ubigeo_distrito_llegada.value,
        region: region,
        provincia: provincia,
        distrito: distrito,
        address: address_llegada
    };

    (Swal as TVueSwalInstance).fire(
        "Genial!",
        "Los Datos de llegada se han llenado correctamente",
        "success",
    );

}

const addProduct = () => {

    if(!peso.value || peso.value == 0){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas digitar el peso unitario del producto",
            "error",
        );
        return;
    }
    if(!quantity.value || quantity.value == 0){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas digitar la cantidad del producto",
            "error",
        );
        return;
    }

    let PRODUCT_EXITS = guia_remision_details.value.find((sldt:any) => sldt.product.id == product_selected.value?.id && sldt.unidad_medida == unidad_medida.value);
    if(PRODUCT_EXITS){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "El producto ya se encuentra en la lista",
            "error",
        );
        return;
    }

    guia_remision_details.value.push({
        product: product_selected.value,
        unidad_medida: unidad_medida.value,
        peso: peso.value,
        quantity: quantity.value,
        total: Number((peso.value*quantity.value).toFixed(2)),
        description: null,
    });

    sumGuiaDetail();
    resetDataItem();
}

const resetDataItem = () => {
    productSelect.value.setValue("");
    quantity.value = 0;
    peso.value = 0;
    unidad_medida.value = "NIU";
}

const deleteGuiaDetail = (index:number) => {
    guia_remision_details.value.splice(index,1);
    sumGuiaDetail();
}

const sumGuiaDetail = () => {
    total.value = guia_remision_details.value.reduce((sum:number,guia_detail:any) => sum + guia_detail.total,0);
    quantity_total.value = guia_remision_details.value.reduce((sum:number,guia_detail:any) => sum + guia_detail.quantity,0);
}

const store = async () => {

    if(!client_selected.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas seleccionar un cliente",
            "error",
        );
        return;
    }

    if(guia_remision_details.value.length == 0){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas agregar al menos un producto al detallado",
            "error",
        );
        return;
    }

    if(!punto_partida.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas confirmar los datos de punto de partida",
            "error",
        );
        return;
    }
    
    if(!punto_llegada.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas confirmar los datos de punto de llegada",
            "error",
        );
        return;
    }

    if(!description.value){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "Necesitas dar una descripción al motivo del translado",
            "error",
        );
        return;
    }

    if(type_transport.value == '01'){
        conductor_datos.value = null;
        if(!n_document_ruc.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas RUC de Transportista",
                "error",
            );
            return;
        }
        if(!razon_social_transportista.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas Razon Social Transportista",
                "error",
            );
            return;
        }
        if(!nro_mtc.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas Nro Mtc",
                "error",
            );
            return;
        }
        transporte_datos.value = {
            n_document_ruc: n_document_ruc.value,
            razon_social_transportista: razon_social_transportista.value,
            nro_mtc: nro_mtc.value,
        }
    }

    if(type_transport.value == '02'){
        transporte_datos.value = null;
        if(!type_document.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas el Tipo de Documento de Conductor",
                "error",
            );
            return;
        }
        if(!n_document.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas el N° de Documento de Conductor",
                "error",
            );
            return;
        }
        if(!full_name_conductor.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas llenar el nombre completo del Conductor",
                "error",
            );
            return;
        }
        if(!placa_vehiculo.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas llenar la placa del Vehiculo",
                "error",
            );
            return;
        }
        if(!n_licencia.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas llenar la licencia",
                "error",
            );
            return;
        }
        let name_document = 'DNI';
        switch (type_document.value) {
            case '6':
                name_document = 'RUC';
                break;
            case '4':
                name_document = 'CARNET DE EXTRANJERIA';
                break;
            case '7':
                name_document = 'PASAPORTE';
                break;
        }
        conductor_datos.value = {
            type_document: type_document.value,
            name_document: name_document,
            n_document: n_document.value,
            full_name_conductor: full_name_conductor.value,
            placa_vehiculo: placa_vehiculo.value,
            n_licencia: n_licencia.value,
        }
    }

    if(motivo_translado.value == '08' || motivo_translado.value == '09'){
        if(!num_dam.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas el Numero DAM para la importación o exportación",
                "error",
            );
            return;
        }
    }

    let data = {
        client_id: client_selected.value.id,
        type_client: client_selected.value.type_client,
        total: total.value,
        quantity_total: quantity_total.value,
        type_transport: type_transport.value,
        guia_remision_details: guia_remision_details.value,
        description: description.value,
        serie: serie.value,
        motivo_translado: motivo_translado.value,
        punto_partida: punto_partida.value,
        punto_llegada: punto_llegada.value,
        transporte_datos: transporte_datos.value,
        conductor_datos: conductor_datos.value,
        num_dam: num_dam.value,
    }

    const res: AxiosResponse<any> = await HttpClient.post(
            "guia",data);
    
    console.log(res);
    
    if(res.data.error){
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            `(${res.data.error.code}) ${res.data.error.message}`,
            "error",
        );
        return;
    }

    (Swal as TVueSwalInstance).fire(
        "Genial!",
        `La guia de remisión se ha registrado`,
        "success",
    );

    config();
    resetData();

}
const resetData = () => {
    client_selected.value = undefined;
    total.value = 0;
    description.value = "";
    guia_remision_details.value = [];
    clientSelect.value.setValue("");
    type_transport.value = '01'
    motivo_translado.value = '01'
    punto_partida.value = null;
    punto_llegada.value = null;
    transporte_datos.value = null;
    conductor_datos.value = null;
    num_dam.value = "";

    n_document_ruc.value = "";
    razon_social_transportista.value = "";
    nro_mtc.value = "";
    type_document.value = "";
    n_document.value = 0;
    full_name_conductor.value = "";
    placa_vehiculo.value = "";
    n_licencia.value = "";

    address_partida.value = "";
    address_llegada.value = "";

    ubigeo_region_partida.value  = "";
    ubigeo_provincia_partida.value  = "";
    ubigeo_distrito_partida.value  = "";
    address_partida.value  = "";
    ubigeo_region_llegada.value  = "";
    ubigeo_provincia_llegada.value  = "";
    ubigeo_distrito_llegada.value  = "";
    address_llegada.value  = "";
    PROVINCIA_SELECTS.value = [];
    DISTRITO_SELECTS.value = [];
    PROVINCIA_SELECTS_LLEGADA.value = [];
    DISTRITO_SELECTS_LLEGADA.value = [];
    sumGuiaDetail();
}

watch(motivo_translado,(value) => {
    if(value == "08" || value == "09"){
        units.value = UNIT_IMPORTS;
    }else{
        units.value = UNITS;
    }
    if(value == '04'){// || value == '02'
        clientSelect.value.setValue("5");
        // let COMPANY = clients.value.find((client) => client.is_company == true);
        // if(COMPANY){
        //     clientSelect.value.setValue(COMPANY.id);
        // }
    }
    // else{
    //     clientSelect.value.setValue("");
    //     client_selected.value = undefined;
    // }
    num_dam.value = "";
})
watch(type_transport,(value) => {
    n_document_ruc.value = "";
    razon_social_transportista.value = "";
    nro_mtc.value = "";
    type_document.value = "DNI";
    n_document.value = 0;
    n_licencia.value = "";
    full_name_conductor.value = "";
    placa_vehiculo.value = "";
})
onMounted(() => {
  config()  
})
</script>