<template>
    <DefaultLayout>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-card>
                    <b-card-header>
                        <b-card-title>Información General</b-card-title>
                    </b-card-header>
                    <b-card-body class="pt-0">
                        <b-row>
                            <b-col lg="3">
                                <label for="purchase-requester" class="col-form-label text-lg-end">Solicitante</label>
                                <b-form-input id="purchase-requester" value="Super-Admin User" readonly />
                            </b-col>

                            <b-col lg="3">
                                <label for="purchase-branch" class="col-form-label text-lg-end">Sucursal</label>
                                <b-form-input id="purchase-branch" value="Lima" readonly />
                            </b-col>

                            <b-col lg="3">
                                <label for="purchase-warehouse" class="col-form-label text-lg-end">Almacenes</label>
                                <b-form-select id="purchase-warehouse">
                                    <option value="">Seleccione</option>
                                </b-form-select>
                            </b-col>

                            <b-col lg="3">
                                <label for="purchase-provider" class="col-form-label text-lg-end">Proveedores</label>
                                <b-form-select id="purchase-provider">
                                    <option value="">Seleccione</option>
                                </b-form-select>
                            </b-col>

                            <b-col lg="3">
                                <label for="purchase-date" class="col-form-label text-lg-end">Fecha de emisión</label>
                                <b-form-input id="purchase-date" type="date" value="2025-03-24" />
                            </b-col>

                            <b-col lg="3">
                                <label for="purchase-voucher" class="col-form-label text-lg-end">Tipo de Comprobantes</label>
                                <b-form-select id="purchase-voucher">
                                    <option value="">Seleccione</option>
                                </b-form-select>
                            </b-col>

                            <b-col lg="3">
                                <label for="purchase-voucher-number" class="col-form-label text-lg-end">N° de Comprobante</label>
                                <b-form-input id="purchase-voucher-number" type="text" placeholder="N° de Comprobante" />
                            </b-col>

                            <b-col lg="3">
                                <label for="purchase-note" class="col-form-label text-lg-end">Nota final</label>
                                <b-form-textarea id="purchase-note" rows="3" placeholder="Nota final" />
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>

                <b-card>
                    <b-card-header>
                        <b-card-title>Producto Solicitado</b-card-title>
                    </b-card-header>
                    <b-card-body class="pt-0">
                        <b-row class="align-items-end">
                            <b-col lg="7">
                                <label for="purchase-product" class="col-form-label text-lg-end">¿Que agregamos?</label>
                                <b-form-input id="purchase-product" type="text" placeholder="¿Que agregamos?" />
                            </b-col>

                            <b-col lg="1">
                                <label for="purchase-unit" class="col-form-label text-lg-end">Unidad</label>
                                <b-form-select id="purchase-unit">
                                    <option value="">Unidades</option>
                                </b-form-select>
                            </b-col>

                            <b-col lg="1">
                                <label for="purchase-price" class="col-form-label text-lg-end">Precio</label>
                                <b-form-input id="purchase-price" type="number" value="0" />
                            </b-col>

                            <b-col lg="1">
                                <label for="purchase-quantity" class="col-form-label text-lg-end">Cantidad</label>
                                <b-form-input id="purchase-quantity" type="number" value="0" />
                            </b-col>

                            <b-col lg="2" class="d-flex justify-content-end">
                                <b-button type="button" variant="primary" class="w-100">
                                    <i class="fas fa-plus-circle"></i>
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>

                <b-card>
                    <b-card-header>
                        <b-card-title>Detalle de la compra</b-card-title>
                    </b-card-header>
                    <b-card-body class="pt-0">
                        <div class="table-responsive m-0">
                            <table class="table datatable" id="datatable_purchase">
                                <thead class="table-light">
                                    <tr>
                                        <th>PRODUCTO</th>
                                        <th>UNIDAD</th>
                                        <th>PRECIO UNITARIO</th>
                                        <th>CANTIDAD</th>
                                        <th>TOTAL</th>
                                        <th>ACCIÓN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <label class="form-label mb-0">Importe</label>
                                            <b-form-input type="number" value="0" readonly />
                                        </td>
                                        <td>
                                            <label class="form-label mb-0">Igv</label>
                                            <b-form-input type="number" value="0" readonly />
                                        </td>
                                        <td>
                                            <label class="form-label mb-0">Total</label>
                                            <b-form-input type="number" value="0" readonly />
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </b-card-body>
                </b-card>

                <b-button type="button" variant="primary" class="w-100">
                    Registrar Una Compra
                </b-button>
            </b-col>
        </b-row>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
</script>
