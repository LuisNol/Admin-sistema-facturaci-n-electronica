<template>
    <DefaultLayout>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-card no-body>
                    <b-card-header>
                        <b-row class="align-items-center justify-content-between">
                            <b-col lg="3">
                                <b-card-title>🛍️ Productos</b-card-title>
                            </b-col>
                            <b-col lg="2">
                                <b-button type="button" variant="success" @click="router.push({name:'products.store'})">
                                    <i class="far fa-plus-square ml-3"></i> Registrar
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-row class="align-items-center py-2">
                            <b-col lg="4">
                                <b-form-input
                                    type="text"
                                    v-model="search"
                                    placeholder="Buscar por producto"
                                />
                            </b-col>
                            <b-col lg="2">
                                <b-form-select id="type_category_list" v-model="categorie_id">
                                    <option value="">Selec. Categoria</option>
                                    <template v-for="(categorie, index) in categories" :key="index">
                                        <option :value="categorie.id">{{ categorie.title }}</option>
                                    </template>
                                </b-form-select>
                            </b-col>
                            <b-col lg="2">
                                <b-form-select id="type_units_list" v-model="unidad_medida">
                                    <option value="">Selec. Unidad</option>
                                    <template v-for="(unit, index) in units" :key="index">
                                        <option :value="unit.code">{{ unit.name }}</option>
                                    </template>
                                </b-form-select>
                            </b-col>
                            <b-col lg="2">
                                <b-form-select id="type_state_list" v-model="state">
                                    <option value="">Todos</option>
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                </b-form-select>
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
                            <table class="table datatable" id="datatable_1">
                                <thead class="table-light">
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre Del Producto</th>
                                        <th>Sku</th>
                                        <th>Categoria</th>
                                        <th>Precio</th>
                                        <th>Unidad</th>
                                        <th>Stock</th>
                                        <th>Estado</th>
                                        <th>Fecha de registro</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in products" :key="index">
                                        <td>{{product.id}}</td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img :src="product.imagen" alt="categorie" class="thumb-md rounded-circle" />
                                                <span>{{ product.title }}</span>
                                            </div>
                                        </td>
                                        <td>{{ product.sku }}</td>
                                        <td>{{ product.categorie.title }}</td>
                                        <td>S/. {{ product.price_general }} PEN</td>
                                        <td> {{ getUnit(product.unidad_medida) }} </td>
                                        <td>{{ product.stock }}</td>
                                        <td>
                                            <b-badge variant="primary" v-if="product.state == 1">Activo</b-badge>
                                            <b-badge variant="danger" v-if="product.state == 2">Inactivo</b-badge>
                                        </td>
                                        <td>
                                            {{ product.created_at }}
                                        </td>
                                        <td>
                                            <a href="#" onclick="return false;" @click="editProduct(product)">
                                                <i class="las la-pen text-secondary fs-22"></i></a>{{ " " }}
                                            <a href="#" onclick="return false;" @click="deleteProduct(product)">
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
    </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import type { AxiosResponse } from "axios";
import { onMounted, ref, watch } from "vue";
import HttpClient from "@/helpers/http-client";

import Swal from "sweetalert2/dist/sweetalert2.js";
import { UNITS, type Product, type ProductCategorie, type ProductConfigResponse, type Products } from "@/types/products";
import router from "@/router";
type TVueSwalInstance = typeof Swal & typeof Swal.fire;

const products = ref<Product[]>([]);
const units = ref(UNITS);
const categories = ref<ProductCategorie[]>([]);

const currentPage = ref<number>(1);
const totalPage = ref<number>(0);
const perPageRows = ref<number>(1);
const search = ref<string>("");
const unidad_medida = ref<string>("");
const categorie_id = ref<string>("");
const state = ref<string>("");

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
        const res: AxiosResponse<Products> = await HttpClient.get(
            "products?page="+currentPage.value+"&search="+(search.value ?? '')+
            "&categorie_id="+(categorie_id.value ?? '')+
            "&unidad_medida="+(unidad_medida.value ?? '') +
            "&state="+(state.value ?? ''));
        console.log(res);

        products.value = res.data.products.data;
        totalPage.value = res.data.total;
        perPageRows.value = res.data.pagination;
    } catch (error) {
        console.log(error);
    }
}
const reset = () => {
    search.value = "";
    categorie_id.value = "";
    unidad_medida.value = "";
    state.value = "";
    currentPage.value = 1;
    list();
}

const deleteProduct = async(product:Product) => {
    (Swal as TVueSwalInstance)
        .fire({
            title: "Confirmar la eliminación",
            text: "¿Estas seguro de eliminar este producto ''"+ product.title + "'' ?",
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
                        "products/"+product.id);
                    console.log(res);
                    (Swal as TVueSwalInstance).fire(
                        "Genial!",
                        res.data.message,
                        "success",
                    );

                    let Index = products.value.findIndex((prd) => prd.id == product.id);
                    if(Index != -1){
                        products.value.splice(Index,1);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
    });
}

const getUnit = (unidad_medida:string) => {
    let UNIT = units.value.find((unidad) => unidad.code == unidad_medida);
    if(UNIT){
        return UNIT.name;
    }
    return "---";
}

const editProduct = (product:Product) => {
    router.push({
        name:'products.edit',
        params: {
            id:product.id,
        }
    })
}

onMounted(() => {
    list();
    config();
})
</script>