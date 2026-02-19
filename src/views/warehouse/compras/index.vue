<template>
    <DefaultLayout>
        <b-card>
            <b-card-header>
                <b-row class="align-items-center justify-content-between">
                    <b-col lg="4">
                        <b-card-title>🗂️ Purchases</b-card-title>
                    </b-col>
                </b-row>

                <b-row class="align-items-center mt-3">
                    <b-col lg="3" md="6">
                        <b-form-input
                            type="text"
                            v-model="searchPurchase"
                            id="purchase-number"
                            placeholder="Search N° Purchase"
                        />
                    </b-col>

                    <b-col lg="3" md="6">
                        <b-form-select id="warehouse-filter" v-model="warehouse">
                            <option value="">Almacenes</option>
                            <option v-for="(item, index) in warehouses" :key="index" :value="item">{{ item }}</option>
                        </b-form-select>
                    </b-col>

                    <b-col lg="3" md="6">
                        <b-form-select id="unit-filter" v-model="unit">
                            <option value="">Unidades</option>
                            <option v-for="(item, index) in units" :key="index" :value="item">{{ item }}</option>
                        </b-form-select>
                    </b-col>

                    <b-col lg="3" md="6">
                        <b-form-select id="provider-filter" v-model="provider">
                            <option value="">Proveedor</option>
                            <option v-for="(item, index) in providers" :key="index" :value="item">{{ item }}</option>
                        </b-form-select>
                    </b-col>
                </b-row>

                <b-row class="align-items-center mt-3">
                    <b-col lg="3" md="6">
                        <b-form-select id="voucher-filter" v-model="voucherType">
                            <option value="">Tipo de Comprobantes</option>
                            <option value="FACTURA ELECTRÓNICA">FACTURA ELECTRÓNICA</option>
                            <option value="NOTA DE CREDITO">NOTA DE CREDITO</option>
                        </b-form-select>
                    </b-col>

                    <b-col lg="3" md="6">
                        <b-form-input
                            type="text"
                            v-model="dateRange"
                            id="date-range"
                            placeholder="Rango de fecha"
                        />
                    </b-col>

                    <b-col lg="3" md="6">
                        <b-form-input
                            type="text"
                            v-model="searchProduct"
                            id="search-product"
                            placeholder="Search Product"
                        />
                    </b-col>

                    <b-col lg="3" md="6" class="d-flex justify-content-lg-end mt-3 mt-lg-0">
                        <b-button type="button" variant="info" class="me-2" @click="filterPurchases">
                            <i class="fas fa-search"></i>
                        </b-button>
                        <b-button type="button" variant="secondary" @click="resetFilters">
                            <i class="fas fa-sync"></i>
                        </b-button>
                    </b-col>
                </b-row>

                <b-row class="align-items-center mt-3">
                    <b-col lg="3" class="ms-lg-auto d-flex justify-content-lg-end">
                        <router-link to="/purchases/register" class="btn btn-primary w-100 text-center">
                            Add Purchase <i class="fas fa-plus ms-1"></i>
                        </router-link>
                    </b-col>
                </b-row>
            </b-card-header>

            <b-card-body class="pt-0">
                <div class="table-responsive m-0">
                    <table class="table datatable" id="datatable_purchases">
                        <thead class="table-light">
                            <tr>
                                <th>N° PURCHASE</th>
                                <th>ALMACEN</th>
                                <th>PROVEEDOR</th>
                                <th>FECHA DE EMISIÓN</th>
                                <th>TIPO DE COMPROBANTE</th>
                                <th>N° DE COMPROBANTE</th>
                                <th>ESTADO DE E.</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in purchaseRows" :key="index">
                                <td>{{ item.number }}</td>
                                <td>{{ item.warehouse }}</td>
                                <td>{{ item.provider }}</td>
                                <td>{{ item.emissionDate }}</td>
                                <td>{{ item.voucherType }}</td>
                                <td>{{ item.voucherNumber }}</td>
                                <td>
                                    <span class="badge rounded-pill" :class="statusClass(item.status)">
                                        {{ item.status }}
                                    </span>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <a href="#" onclick="return false;" class="me-2">
                                            <i class="far fa-file-alt text-secondary fs-20"></i>
                                        </a>
                                        <a href="#" onclick="return false;" class="me-2">
                                            <i class="las la-pen text-secondary fs-22"></i>
                                        </a>
                                        <a v-if="item.status === 'Solicitud'" href="#" onclick="return false;">
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
                    :total-rows="purchaseRows.length"
                    :per-page="perPageRows"
                    first-number
                    last-number
                    class="justify-content-center mt-3"
                />
            </b-card-body>
        </b-card>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { ref } from "vue";

type PurchaseRow = {
    number: number;
    warehouse: string;
    provider: string;
    emissionDate: string;
    voucherType: string;
    voucherNumber: string;
    status: "Completo" | "Parcial" | "Solicitud";
};

const searchPurchase = ref("");
const searchProduct = ref("");
const warehouse = ref("");
const unit = ref("");
const provider = ref("");
const voucherType = ref("");
const dateRange = ref("");

const warehouses = ref(["Lima", "Trujillo"]);
const units = ref(["Unidades", "Cajas"]);
const providers = ref(["Soluciones Tec S.a.c", "Mayorista de cómputos S.A.C."]);

const currentPage = ref(1);
const perPageRows = ref(10);

const purchaseRows = ref<PurchaseRow[]>([
    {
        number: 1006,
        warehouse: "Lima",
        provider: "Soluciones Tec S.a.c",
        emissionDate: "2025-03-05",
        voucherType: "FACTURA ELECTRÓNICA",
        voucherNumber: "F-0015",
        status: "Completo",
    },
    {
        number: 1005,
        warehouse: "Lima",
        provider: "Mayorista de cómputos S.A.C.",
        emissionDate: "2025-02-26",
        voucherType: "FACTURA ELECTRÓNICA",
        voucherNumber: "F-0005",
        status: "Completo",
    },
    {
        number: 1004,
        warehouse: "Trujillo",
        provider: "Mayorista de cómputos S.A.C.",
        emissionDate: "2025-02-17",
        voucherType: "FACTURA ELECTRÓNICA",
        voucherNumber: "005000",
        status: "Parcial",
    },
    {
        number: 1003,
        warehouse: "Lima",
        provider: "Mayorista de cómputos S.A.C.",
        emissionDate: "2025-02-16",
        voucherType: "NOTA DE CREDITO",
        voucherNumber: "00550",
        status: "Completo",
    },
    {
        number: 1002,
        warehouse: "Trujillo",
        provider: "Soluciones Tec S.a.c",
        emissionDate: "2025-02-15",
        voucherType: "NOTA DE CREDITO",
        voucherNumber: "000250",
        status: "Completo",
    },
    {
        number: 1001,
        warehouse: "Lima",
        provider: "Soluciones Tec S.a.c",
        emissionDate: "2025-02-17",
        voucherType: "FACTURA ELECTRÓNICA",
        voucherNumber: "0000150",
        status: "Solicitud",
    },
]);

const statusClass = (status: PurchaseRow["status"]) => {
    if (status === "Completo") return "bg-primary-subtle text-primary";
    if (status === "Parcial") return "bg-warning-subtle text-warning";
    return "bg-danger-subtle text-danger";
};

const filterPurchases = () => {
    return;
};

const resetFilters = () => {
    searchPurchase.value = "";
    searchProduct.value = "";
    warehouse.value = "";
    unit.value = "";
    provider.value = "";
    voucherType.value = "";
    dateRange.value = "";
};
</script>
