<template>
    <DefaultLayout>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-card no-body>
                    <b-card-header>
                        <b-row class="align-items-center justify-content-between">
                            <b-col lg="3">
                                <b-card-title>💁 Clientes / 🏤 Empresas</b-card-title>
                            </b-col>
                            <b-col lg="4">
                                <b-button type="button" variant="success" @click="openModalClientFinal = !openModalClientFinal">
                                    <i class="far fa-plus-square ml-3"></i> Cliente Final
                                </b-button>
                                <b-button class="mx-2" type="button" variant="success" @click="openModalClientEmpresa = !openModalClientEmpresa">
                                    <i class="far fa-plus-square ml-3"></i> Cliente Empresa
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-row class="align-items-center justify-content-between py-2">
                            <b-col lg="5">
                                <b-form-input
                                    type="text"
                                    v-model="search"
                                    placeholder="Buscar por nombre,apellido,telefono,n_documento"
                                />
                            </b-col>
                            <b-col lg="3" md="3">
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
                            <table class="table datatable" id="datatable_1">
                                <thead class="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>NOMBRE / RAZON SOCIAL</th>
                                        <th>TIPO DE CLIENTE</th>
                                        <th>PHONE</th>
                                        <!-- <th>TIPO DOCUMENTO</th> -->
                                        <th>N DE DOCUMENTO</th>
                                        <th>UBIGEO</th>
                                        <th>ESTADO</th>
                                        <th>F.REGISTRO</th>
                                        <TH>ACCIÓN</TH>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(client, index) in clients" :key="index">
                                        <td>{{client.id}}</td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <span class="thumb-md justify-content-center d-flex align-items-center bg-purple-subtle text-purple rounded-circle me-2">{{ avatarText(client.full_name) }}</span>
                                                <span>{{ client.full_name }}</span>
                                            </div>
                                        </td>
                                        <td>{{ client.type_client == '1' ? 'CLIENTE FINAL' : 'CLIENTE EMPRESA' }}</td>
                                        <td>{{ client.phone }}</td>
                                        <td>{{ client.type_document }} ({{ client.n_document }})</td>
                                        <td>{{ client.region+" / " + client.provincia + " / "+ client.distrito }}</td>
                                        <td>
                                            <b-badge variant="primary" v-if="client.state == 1">Activo</b-badge>
                                            <b-badge variant="danger" v-if="client.state == 2">Inactivo</b-badge>
                                        </td>
                                        <td>{{ client.created_at }}</td>
                                        <td>
                                            <a href="#" onclick="return false;" @click="editClient(client)">
                                                <i class="las la-pen text-secondary fs-22"></i></a>{{ " " }}
                                            <a href="#" onclick="return false;" @click="deleteClient(client)">
                                                <i class="las la-trash-alt text-secondary fs-22"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </b-card-body>
                </b-card>
                <b-pagination v-model="currentPage" :total-rows="totalPage" :per-page="perPageRows" 
                    prev-text="Previous" next-text="Next"
                />
            </b-col>
        </b-row>
        <b-modal
            v-model="openModalClientFinal"
            :title="`🔐 ${client_selected ? 'Editar' : 'Registrar'} un Cliente Final`"
            :header-class="`bg-${themeColor}`"
            title-class="m-0 text-white"
            ok-title="Save changes"
            :ok-variant="themeColor"
            cancel-title="Close"
            centered
            hide-footer
            size="lg"
        >
            <b-row>
                <b-col lg="5">
                    <label for="name-client" class="col-form-label text-lg-end">Nombre: </label>
                    <b-form-input
                        type="text"
                        id="name-client"
                        v-model="name"
                        placeholder="Example: Jose"
                    />
                </b-col>
                <b-col lg="5">
                    <label for="surname-client" class="col-form-label text-lg-end">Apellido: </label>
                    <b-form-input
                        type="text"
                        id="surname-client"
                        v-model="surname"
                        placeholder="Example: Jose"
                    />
                </b-col>

                <b-col lg="4">
                    <label for="email-client" class="col-form-label text-lg-end">Email: </label>
                    <b-form-input
                        type="text"
                        id="email-client"
                        v-model="email"
                        placeholder="Example: nolberto.sumaran@gmail.com"
                    />
                </b-col>

                <b-col lg="4">
                    <label for="phone-client" class="col-form-label text-lg-end">Telefono: </label>
                    <b-form-input
                        type="number"
                        id="phone-client"
                        v-model="phone"
                        placeholder="Example: nolberto.sumaran@gmail.com"
                    />
                </b-col>

                <b-col lg="4">
                    <label for="type-document-client" class="col-form-label text-lg-end">Tipo de documento: </label>
                    <b-form-select id="type_document" v-model="type_document">
                        <option value="DNI">DNI</option>
                        <option value="PASAPORTE">PASAPORTE</option>
                        <option value="CARNET DE EXTRANJERIA">CARNET DE EXTRANJERIA</option>
                        <option value="TARJETA MILITAR">TARJETA MILITAR</option>
                    </b-form-select>
                </b-col>

                <b-col lg="4">
                    <label for="n_document-client" class="col-form-label text-lg-end">N° de Documento: </label>
                    <b-form-input
                        type="number"
                        id="n_document-client"
                        v-model="n_document"
                        placeholder="Example: ######"
                    />
                </b-col>

                <b-col lg="4">
                    <label for="birth_date-client" class="col-form-label text-lg-end">Fecha de Nacimiento: </label>
                    <b-form-input
                        type="date"
                        id="birth_date_client"
                        name="birth_date"
                        v-model="birth_date"
                        placeholder="Example: 2011-08-19"
                    />
                </b-col>

                <b-col lg="4">
                    <label for="type-client-client" class="col-form-label text-lg-end">Tipo de Cliente: </label>
                    <b-form-select id="type_client_list" v-model="type_client">
                        <option value="1">CLIENTE FINAL</option>
                    </b-form-select>
                </b-col>

                <b-col lg="3">
                    <label for="gender-client-c" class="col-form-label text-lg-end">Genero: </label>
                    <b-form-radio name="gender-client-c" @click="gender = 'M'" value="M" :checked="gender == 'M'">Masculino</b-form-radio>
                    {{ " " }}
                    <b-form-radio name="gender-client-c" @click="gender = 'F'" value="F" :checked="gender == 'F'">Femenino</b-form-radio>
                </b-col>

                <b-col lg="3">
                    <label for="state-client-e" class="col-form-label text-lg-end">Estado: </label>
                    <b-form-radio name="state-client-e" @click="state = 1" value="1" :checked="state == 1">Activo</b-form-radio>
                    {{ " " }}
                    <b-form-radio name="state-client-e" @click="state = 2" value="2" :checked="state == 2">Inactivo</b-form-radio>
                </b-col>
                
                <b-col lg="6">
                    <label for="address-client" class="col-form-label text-lg-end">Dirección: </label>
                    <b-form-input
                        type="text"
                        id="address-client"
                        v-model="address"
                        placeholder="Example: Psje Lt 18"
                    />
                </b-col>
                
                <b-col lg="4">
                    <label for="region-client" class="col-form-label text-lg-end">Región: </label>
                    <b-form-select id="region_list" v-model="ubigeo_region">
                            <template v-for="(REGIONE, index) in REGIONES_L" :key="index">
                            <option :value="REGIONE.id">{{ REGIONE.name }}</option>
                        </template>
                    </b-form-select>
                </b-col>

                <b-col lg="4">
                    <label for="provincia-client" class="col-form-label text-lg-end">Provincia: </label>
                    <b-form-select id="provincia_list" v-model="ubigeo_provincia">
                            <template v-for="(PROVINCIA, index) in PROVINCIA_SELECTS" :key="index">
                            <option :value="PROVINCIA.id">{{ PROVINCIA.name }}</option>
                        </template>
                    </b-form-select>
                </b-col>

                <b-col lg="4">
                    <label for="distrito-client" class="col-form-label text-lg-end">Distrito: </label>
                    <b-form-select id="distrito_list" v-model="ubigeo_distrito">
                            <template v-for="(DISTRITO, index) in DISTRITO_SELECTS" :key="index">
                            <option :value="DISTRITO.id">{{ DISTRITO.name }}</option>
                        </template>
                    </b-form-select>
                </b-col>

                <b-col lg="12" class="mt-3">
                    <div class="modal-footer">
                        <b-button
                            type="button"
                            variant="secondary"
                            data-bs-dismiss="modal"
                            @click="openModalClientFinal = !openModalClientFinal"
                        >
                            Cerrar
                        </b-button>
                        <b-button type="button" variant="primary" @click="store">
                            {{ client_selected ? 'Editar' : 'Guardar' }}
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </b-modal>
        
        <b-modal
            v-model="openModalClientEmpresa"
            :title="`🏤 ${client_selected ? 'Edición' : 'Registro'} de Cliente Empresa`"
            :header-class="`bg-${themeColor}`"
            title-class="m-0 text-white"
            :ok-variant="themeColor"
            hide-footer
            centered
            size="lg"
            >
            <b-row>
                <b-col lg="8">
                    <label for="fullname-client" class="col-form-label text-lg-end">Razon Social: </label>
                    <b-form-input
                        type="text"
                        id="fullname-client"
                        v-model="full_name"
                        placeholder="Example: Jose"
                    />
                </b-col>
                <b-col lg="4">
                </b-col>

                <b-col lg="4">
                    <label for="email-client" class="col-form-label text-lg-end">Email: </label>
                    <b-form-input
                        type="text"
                        id="email-client"
                        v-model="email"
                        placeholder="Example: nolberto.sumaran@gmail.com"
                    />
                </b-col>

                <b-col lg="4">
                    <label for="phone-client" class="col-form-label text-lg-end">Telefono: </label>
                    <b-form-input
                        type="number"
                        id="phone-client"
                        v-model="phone"
                        placeholder="Example: nolberto.sumaran@gmail.com"
                    />
                </b-col>

                <b-col lg="4">
                    <label for="type-document-client" class="col-form-label text-lg-end">Tipo de documento: </label>
                    <b-form-select id="type_document" v-model="type_document">
                        <option value="RUC">RUC</option>
                        <option value="RUC20">RUC20</option>
                    </b-form-select>
                </b-col>

                <b-col lg="4">
                    <label for="n_document-client" class="col-form-label text-lg-end">N° de Documento: </label>
                    <b-form-input
                        type="number"
                        id="n_document-client"
                        v-model="n_document"
                        placeholder="Example: ######"
                    />
                </b-col>

                <b-col lg="4">
                    <label for="birth_date-client-company" class="col-form-label text-lg-end">Fecha de Aniversario: </label>
                    <b-form-input
                        type="date"
                        id="birth_date_client-company"
                        v-model="birth_date"
                        placeholder="Example: 2011-08-19"
                    />
                </b-col>

                <b-col lg="4">
                    <label for="type-client-client" class="col-form-label text-lg-end">Tipo de Cliente: </label>
                    <b-form-select id="type_client" v-model="type_client">
                        <option value="2">CLIENTE EMPRESA</option>
                    </b-form-select>
                </b-col>

                <b-col lg="3">
                    <label for="state-client" class="col-form-label text-lg-end">Estado: </label>
                    <b-form-radio name="state-client" @click="state = 1" value="1" :checked="state == 1">Activo</b-form-radio>
                    {{ " " }}
                    <b-form-radio name="state-client" @click="state = 2" value="2" :checked="state == 2">Inactivo</b-form-radio>
                </b-col>
                
                <b-col lg="6">
                    <label for="address-client" class="col-form-label text-lg-end">Dirección: </label>
                    <b-form-input
                        type="text"
                        id="address-client"
                        v-model="address"
                        placeholder="Example: Psje Lt 18"
                    />
                </b-col>

               <b-col lg="4">
                    <label for="region-client" class="col-form-label text-lg-end">Región: </label>
                    <b-form-select id="region_list" v-model="ubigeo_region">
                            <template v-for="(REGIONE, index) in REGIONES_L" :key="index">
                            <option :value="REGIONE.id">{{ REGIONE.name }}</option>
                        </template>
                    </b-form-select>
                </b-col>

                <b-col lg="4">
                    <label for="provincia-client" class="col-form-label text-lg-end">Provincia: </label>
                    <b-form-select id="provincia_list" v-model="ubigeo_provincia">
                            <template v-for="(PROVINCIA, index) in PROVINCIA_SELECTS" :key="index">
                            <option :value="PROVINCIA.id">{{ PROVINCIA.name }}</option>
                        </template>
                    </b-form-select>
                </b-col>

                <b-col lg="4">
                    <label for="distrito-client" class="col-form-label text-lg-end">Distrito: </label>
                    <b-form-select id="distrito_list" v-model="ubigeo_distrito">
                            <template v-for="(DISTRITO, index) in DISTRITO_SELECTS" :key="index">
                            <option :value="DISTRITO.id">{{ DISTRITO.name }}</option>
                        </template>
                    </b-form-select>
                </b-col>
                

                <b-col lg="12" class="mt-3">
                    <div class="modal-footer">
                        <b-button
                            type="button"
                            variant="secondary"
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </b-button>
                        <b-button type="button" variant="primary" @click="store">
                            {{ client_selected ? 'Editar' : 'Guardar' }}
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </b-modal>
    </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import type { AxiosResponse } from "axios";
import { onMounted, ref, watch } from "vue";
import HttpClient from "@/helpers/http-client";
import REGIONES from "./json/regiones.json";
import PROVINCIAS from "./json/provincias.json";
import DISTRITOS from "./json/distritos.json"

import Swal from "sweetalert2/dist/sweetalert2.js";
import type { Client, ClientResponse, Clients, UbigeoClient } from "@/types/clients";
type TVueSwalInstance = typeof Swal & typeof Swal.fire;

const clients = ref<Client[]>([]);
const name = ref<string>("");
const surname = ref<string>("");
const email = ref<string>("");
const type_document = ref<string>("DNI");
const n_document = ref<number>();
const phone = ref<number>();
const gender = ref<string>("M");
const state = ref<number>(1);
const birth_date = ref<Date | string>("");
const address = ref<string>("");
const ubigeo_region = ref<string>("");
const ubigeo_provincia = ref<string>("");
const ubigeo_distrito = ref<string>("");
const region = ref<string>("");
const provincia = ref<string>("");
const distrito = ref<string>("");

const type_client = ref<string>("1");

const full_name = ref<string>("");

const openModalClientFinal = ref(false);
const openModalClientEmpresa = ref(false);
const themeColor = ref<any>("primary");

const client_selected = ref<Client>();

const REGIONES_L = ref<UbigeoClient[]>(REGIONES);
const PROVINCIA_L =ref<UbigeoClient[]>(PROVINCIAS);
const DISTRITO_L = ref<UbigeoClient[]>(DISTRITOS);

const PROVINCIA_SELECTS = ref<UbigeoClient[]>([]);
const DISTRITO_SELECTS = ref<UbigeoClient[]>([]);

const currentPage = ref<number>(1);
const totalPage = ref<number>(0);
const perPageRows = ref<number>(1);
const search = ref<string>("");

const list = async () => {
    try {
        const res: AxiosResponse<Clients> = await HttpClient.get(
            "clients?page="+currentPage.value+"&search="+(search.value ?? ''));
        console.log(res);

        clients.value = res.data.clients.data;
        totalPage.value = res.data.total;
        perPageRows.value = res.data.pagination;
    } catch (error) {
        console.log(error);
    }
}
const reset = () => {
    search.value = "";
    list();
}
const store = async () => {
    try {
        if(type_client.value == "1"){
            if(!name.value){
                (Swal as TVueSwalInstance).fire(
                    "Upps!",
                    "El campo nombre es obligatorio",
                    "error",
                );
                return;
            }
            if(!surname.value){
                (Swal as TVueSwalInstance).fire(
                    "Upps!",
                    "El campo apellido es obligatorio",
                    "error",
                );
                return;
            }
        }else{
            if(!full_name.value){
                (Swal as TVueSwalInstance).fire(
                    "Upps!",
                    "La razon social es obligatorio",
                    "error",
                );
                return;
            }
        }
        if(!email.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "El campo email es obligatorio",
                "error",
            );
            return;
        }
        if(!phone.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "El campo telefono es obligatorio",
                "error",
            );
            return;
        }
        if(!n_document.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "El campo numero de documento es obligatorio",
                "error",
            );
            return;
        }

        if(!birth_date.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas seleccionar una fecha para el cliente",
                "error",
            );
            return;
        }

        if(!address.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas una dirección para el cliente",
                "error",
            );
            return;
        }

        if(!ubigeo_region.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas una región para el cliente",
                "error",
            );
            return;
        }
        if(!ubigeo_provincia.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas una provincia para el cliente",
                "error",
            );
            return;
        }
        if(!ubigeo_distrito.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "Necesitas un distrito para el cliente",
                "error",
            );
            return;
        }

        let REGION_SELECTED = REGIONES_L.value.find((rg) => rg.id == ubigeo_region.value);
        if(REGION_SELECTED){
            region.value = REGION_SELECTED.name;
        }
        let PROVINCIA_SELECTED = PROVINCIA_L.value.find((prov) => prov.id == ubigeo_provincia.value);
        if(PROVINCIA_SELECTED){
            provincia.value = PROVINCIA_SELECTED.name;
        }
        let DISTRITO_SELECTED = DISTRITO_L.value.find((DST) => DST.id == ubigeo_distrito.value);
        if(DISTRITO_SELECTED){
            distrito.value = DISTRITO_SELECTED.name;
        }

        let data = {
            name: name.value,
            surname: surname.value,
            full_name: type_client.value == "1" ? name.value+" "+surname.value : full_name.value,
            email: email.value,
            phone: phone.value,
            type_document: type_document.value,
            n_document: n_document.value,
            address: address.value,
            birth_date: birth_date.value,
            ubigeo_region: ubigeo_region.value,
            ubigeo_provincia: ubigeo_provincia.value,
            ubigeo_distrito: ubigeo_distrito.value,
            region: region.value,
            provincia: provincia.value,
            distrito: distrito.value,
            type_client:type_client.value,
            state: state.value,
            gender:gender.value,
        }
        let res;
        if(client_selected.value){
            const resp: AxiosResponse<ClientResponse> = await HttpClient.put(
            "clients/"+client_selected.value.id,data);
            res = resp;
        }else{
            const resp: AxiosResponse<ClientResponse> = await HttpClient.post(
                "clients",data);
            res = resp;
        }
        console.log(res);
            if(res.data.code == 405){
                (Swal as TVueSwalInstance).fire(
                    "Upps!",
                    res.data.message,
                    "error",
                );
            }else{
                if(client_selected.value && res.data.client){
                    let Index = clients.value.findIndex((usr) => usr.id == client_selected.value?.id);
                    if(Index != -1){
                        clients.value[Index] = res.data.client;
                    }
                }else if(res.data.client){
                    clients.value.unshift(res.data.client);
                    clearField();
                }

                openModalClientFinal.value = false;
                openModalClientEmpresa.value = false;
                (Swal as TVueSwalInstance).fire(
                    "Genial!",
                    res.data.message,
                    "success",
                );
            }
    } catch (error) {
        console.log(error);
    }
}

const deleteClient = async(client:Client) => {
    (Swal as TVueSwalInstance)
        .fire({
            title: "Confirmar la eliminación",
            text: "¿Estas seguro de eliminar este cliente ''"+ client.full_name + "'' ?",
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
                        "clients/"+client.id);
                    console.log(res);
                    (Swal as TVueSwalInstance).fire(
                        "Genial!",
                        res.data.message,
                        "success",
                    );

                    let Index = clients.value.findIndex((clt) => clt.id == client.id);
                    if(Index != -1){
                        clients.value.splice(Index,1);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
    });
}

const editClient = (client:Client) => {
    if(client.type_client == "1"){
        name.value = client.name;
        surname.value = client.surname ?? '';
        openModalClientFinal.value = true;
    }else{
        full_name.value = client.full_name;
        openModalClientEmpresa.value = true;
    }

    email.value = client.email;
    phone.value = client.phone;
    state.value = client.state;

    ubigeo_region.value = client.ubigeo_region;
    setTimeout(() => {
        ubigeo_provincia.value = client.ubigeo_provincia;
        ubigeo_distrito.value = client.ubigeo_distrito;
    }, 25);

    address.value = client.address;
    type_client.value = client.type_client;
    birth_date.value = client.birth_date ?? '';

    type_document.value = client.type_document ?? '';
    n_document.value = client.n_document;
    gender.value = client.gender;
    state.value = client.state;

    client_selected.value = client;
}

const avatarText = (value:string) => {
    if (!value)
        return ''
    const nameArray = value.split(' ')
    
    return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

const clearField = () => {
    name.value = '';
    surname.value = '';
    full_name.value = "";
    email.value = '';
    phone.value = 0;
    state.value = 1;
    type_client.value = "1";
    birth_date.value = "";
    address.value = "";
    ubigeo_distrito.value = "";
    ubigeo_provincia.value = "";
    ubigeo_region.value = "";
    region.value = "";
    distrito.value = "";
    provincia.value = "";
    type_document.value = '';
    n_document.value = 0;
    gender.value = '';
    state.value = 1;
}

watch(ubigeo_region,(value) => {
    if(value){
        PROVINCIA_SELECTS.value = PROVINCIA_L.value.filter((prov) => prov.department_id == value);
        DISTRITO_SELECTS.value = [];
        ubigeo_distrito.value = "";
        ubigeo_provincia.value = "";
    }
})

watch(ubigeo_provincia,(value) => {
    if(value){
        DISTRITO_SELECTS.value = DISTRITO_L.value.filter((dst) => dst.province_id == value);
    }
})

watch(openModalClientFinal,(value) => {
    if(value == false){
        client_selected.value = undefined;
        clearField();
    }
    if(value == true){
        type_client.value = "1";
    }
})
watch(openModalClientEmpresa,(value) => {
    if(value == false){
        client_selected.value = undefined;
        clearField();
    }
    if(value == true){
        type_client.value = "2";
    }
})

onMounted(() => {
    list();
})
</script>