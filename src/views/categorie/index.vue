<template>
    <DefaultLayout>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-card no-body>
                    <b-card-header>
                        <b-row class="align-items-center justify-content-between">
                            <b-col lg="3">
                                <b-card-title>🧮 Categories</b-card-title>
                            </b-col>
                            <b-col lg="2">
                                <b-button type="button" v-if="authStore.isPermitedRoute('register_categorie')" variant="success" @click="openModal = !openModal">
                                    <i class="far fa-plus-square ml-3"></i> Registrar
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-row class="align-items-center justify-content-between">
                            <b-col lg="5">
                                <b-form-input
                                    type="text"
                                    id="role"
                                    v-model="search"
                                    placeholder="Buscar por nombre"
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
                                        <th>Id</th>
                                        <th>Categoria</th>
                                        <th>Estado</th>
                                        <th>Fecha R.</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(categorie, index) in categories" :key="index">
                                        <td>{{ categorie.id }}</td>
                                        <td>
                                            <img :src="categorie.imagen" width="32" alt="">
                                            <span class="mx-2">{{ categorie.title }}</span> 
                                        </td>
                                        <td>
                                            <b-badge variant="primary" v-if="categorie.state == 1">Activo</b-badge>
                                            <b-badge variant="danger" v-if="categorie.state == 2">Inactivo</b-badge>
                                        </td>
                                        <td>{{ categorie.created_at }}</td>
                                        <td>
                                            <a href="#" onclick="return false;" v-if="authStore.isPermitedRoute('edit_categorie')"  @click="editCategorie(categorie)">
                                                <i class="las la-pen text-secondary fs-22"></i></a>{{ " " }}
                                            <a href="#" onclick="return false;" v-if="authStore.isPermitedRoute('delete_categorie')" @click="deleteCategorie(categorie)">
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
            v-model="openModal"
            :title="`🔐 ${categorie_selected ? 'Editar' : 'Registrar'} un Categoria`"
            :header-class="`bg-${themeColor}`"
            title-class="m-0 text-white"
            ok-title="Save changes"
            :ok-variant="themeColor"
            cancel-title="Close"
            centered
            hide-footer
            size="md"
        >
            <b-row>
                <b-col cols="9" class="mb-3">
                    <label
                        for="categorie"
                        class="col-form-label text-lg-end"
                    >Nombre del Categoria</label>
                    <b-form-input
                        type="text"
                        id="categorie"
                        v-model="title"
                        placeholder=""
                  />
                </b-col>
                
                <b-col lg="6">
                    <label for="avatar-user" class="col-form-label text-lg-end">Avatar de Usuario: </label>
                    <b-input-group class="mb-3">
                        <b-form-file @change="loadFile($event)"  />
                        <b-input-group-text>Upload</b-input-group-text>
                    </b-input-group>

                    <img v-if="IMAGEN_PREVIZUALIZA" :src="IMAGEN_PREVIZUALIZA" alt="" width="100px" class="rounded d-block mx-auto" />
                </b-col>

                <b-col lg="6">
                    <label for="state-categorie" class="col-form-label text-lg-end">Estado: </label>
                    <b-form-radio name="state-categorie" @click="state = 1" value="1" :checked="state == 1">Activo</b-form-radio>
                    {{ " " }}
                    <b-form-radio name="state-categorie" @click="state = 2" value="2" :checked="state == 2">Inactivo</b-form-radio>
                </b-col>

                <b-col lg="12" class="mt-3">
                    <div class="modal-footer">
                        <b-button
                            type="button"
                            variant="secondary"
                            @click="openModal = false"
                        >
                            Cerrar
                        </b-button>
                        <b-button type="button" variant="primary" @click="store">
                           {{ categorie_selected ? 'Editar' : 'Guardar' }}
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

import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
import type { Categorie,CategorieResponse } from "@/types/categories";

type TVueSwalInstance = typeof Swal & typeof Swal.fire;

const authStore = useAuthStore();

const categories = ref<Categorie[]>([]);
const title = ref<string>("");
const state = ref<number>(1);

const openModal = ref(false);
const themeColor = ref<any>("primary");


const categorie_selected = ref<Categorie>();

const currentPage = ref<number>(1);
const totalPage = ref<number>(0);
const perPageRows = ref<number>(1);
const search = ref<string>("");

const IMAGEN_PREVIZUALIZA = ref<any>(null);
const FILE_IMAGEN = ref<File | null>(null);

const list = async () => {
    try {
        const res: AxiosResponse<CategorieResponse> = await HttpClient.get(
            "categories?page="+currentPage.value+"&search="+(search.value ?? ''));
        console.log(res);

        categories.value = res.data.categories;
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

const loadFile = ($event:any) => {
    if($event.target.files[0].type.indexOf("image") < 0){
        IMAGEN_PREVIZUALIZA.value = null;
        FILE_IMAGEN.value = null;
        (Swal as TVueSwalInstance).fire(
            "Upps!",
            "SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN",
            "error",
        );
        // "SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN";
        return;
    }
    FILE_IMAGEN.value = $event.target.files[0];
    let reader = new FileReader();
    if(FILE_IMAGEN.value){
        reader.readAsDataURL(FILE_IMAGEN.value);
        reader.onloadend = () => IMAGEN_PREVIZUALIZA.value = reader.result;
    }
}

const store = async () => {
    try {
        if(!title.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "El campo nombre es obligatorio",
                "error",
            );
            return;
        }

        if(!categorie_selected && !FILE_IMAGEN.value){
            (Swal as TVueSwalInstance).fire(
                "Upps!",
                "El campo imagen es obligatorio",
                "error",
            );
            return;
        }

        let formData = new FormData();
        formData.append("title",title.value);
        formData.append("state",state.value+"");
        if(FILE_IMAGEN.value){
            formData.append("image",FILE_IMAGEN.value);
        }
        let res;
        if(categorie_selected.value){
            const resp: AxiosResponse<CategorieResponse> = await HttpClient.post(
            "categories/"+categorie_selected.value.id,formData);
            res = resp;
        }else{
            const resp: AxiosResponse<CategorieResponse> = await HttpClient.post(
                "categories",formData);
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
                if(categorie_selected.value){
                    let Index = categories.value.findIndex((categorie:Categorie) => categorie.id == categorie_selected.value?.id);
                    if(Index != -1){
                        categories.value[Index] = res.data.categorie;
                    }
                }else{
                    categories.value.unshift(res.data.categorie);
                }

                openModal.value = false;
                title.value = "";
                state.value = 1;
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

const deleteCategorie = async(categorie:Categorie) => {
    (Swal as TVueSwalInstance)
        .fire({
            title: "Confirmar la eliminación",
            text: "¿Estas seguro de eliminar esta categoria ''"+ categorie.name + "'' ?",
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
                        "categories/"+categorie.id);
                    console.log(res);
                    (Swal as TVueSwalInstance).fire(
                        "Genial!",
                        res.data.message,
                        "success",
                    );

                    let Index = categories.value.findIndex((ctg:Categorie) => ctg.id == categorie.id);
                    if(Index != -1){
                        categories.value.splice(Index,1);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
    });
}

const editCategorie = (categorie:Categorie) => {
    openModal.value = true;
    title.value = categorie.title;
    categorie_selected.value = categorie;
    state.value = categorie.state;
    IMAGEN_PREVIZUALIZA.value = categorie.imagen;
}

watch(openModal,(value) => {
    if(value == false){
        categorie_selected.value = undefined;
        title.value = '';
        state.value = 1;
        IMAGEN_PREVIZUALIZA.value = '';
        FILE_IMAGEN.value = null;
    }
})

watch(currentPage,(value) => {
    list()
})

onMounted(() => {
    list();
})
</script>