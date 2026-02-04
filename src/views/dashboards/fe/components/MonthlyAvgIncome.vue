<template>
  <b-col md="12" lg="8">
    <b-card no-body>
      <b-card-header>
        <b-row class="align-items-center">
          <div class="col-8">
            <b-card-title>Monthly Avg. Income</b-card-title>
          </div>
          <div class="col-4">
            <div class="d-flex">
              <div class="">
                <select
                    class="form-control form-select-solid fw-bolder"
                    name="year_2"
                    placeholder="Filtrar por Año"
                    v-model="year"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                </select>
                <small class="form-text text-muted"><b>Filtrar</b> por Año</small >
              </div>
            </div>
          </div>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0">
        <div v-if="error" class="alert alert-warning" role="alert">
           {{ error }}
        </div>
        <ApexChart
          v-else-if="!loading && monthlyIncomeChart.series[0].data.length > 0"
          :chart="monthlyIncomeChart"
          class="apex-charts"
          id="monthly_income"
        />
        <div v-else-if="loading" class="text-center p-4">
          <div class="spinner-border" role="status"></div>
        </div>
        <div v-else class="alert alert-info">No hay datos disponibles</div>
        <b-row>
          <b-col
            md="6"
            lg="3"
            v-for="(item, idx) in monthlyIncomeData"
            :key="idx"
          >
            <MonthlyIncomeCard :item="item" />
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup lang="ts">
import ApexChart from "@/components/ApexChart.vue";
import MonthlyIncomeCard from "@/views/dashboards/ecommerce/components/MonthlyIncomeCard.vue";

import { onMounted, ref, watch } from "vue";
import HttpClient from "@/helpers/http-client";
import type { AxiosResponse } from "axios";
import type { ApexChartType } from "@/types";

const error = ref("");
const year = ref<number>(new Date().getFullYear());
const loading = ref<boolean>(false);
const monthlyIncomeData = ref<any>([]);

const sales_x_month_of_year_func = async () => {
  loading.value = true;
  try {
    const res: AxiosResponse<any> = await HttpClient.post("kpi/sales_x_month_of_year",
      {
        year: year.value
      }
    );
    console.log(res);
    loading.value = false;
    let data_sales: number[] = [];
    let data_month_name: string[] = [];
    const totalMonths = res.data.sales_x_month_of_year_current.length;
    let totalSales = 0;
    
    res.data.sales_x_month_of_year_current.forEach((sale_month:any) => {
      data_sales.push(sale_month.total_sales);
      data_month_name.push(res.data.months_name[sale_month.num_month - 1]);
      totalSales += sale_month.total_sales;
    });
    
    const avgMonthly = totalMonths > 0 ? totalSales / totalMonths : 0;
    const prevTotalSales = res.data.sales_x_month_of_year_before.reduce((sum:number, m:any) => sum + m.total_sales, 0);
    const prevAvgMonthly = totalMonths > 0 ? prevTotalSales / totalMonths : 0;
    const avgVariation = prevAvgMonthly > 0 ? (((avgMonthly - prevAvgMonthly) / prevAvgMonthly) * 100) : 0;
    
    monthlyIncomeChart.value.series = [{
      name: "Ventas Mensuales",
      data: data_sales,
    }];
    
    if(monthlyIncomeChart.value.options.xaxis){
      monthlyIncomeChart.value.options.xaxis.categories = data_month_name;
    }
    
    monthlyIncomeData.value = [
      {
        title: "Total Anual",
        stat: "S/. " + res.data.total_sales_year_current.toFixed(2),
      },
      {
        title: "Promedio Mensual",
        stat: "S/. " + avgMonthly.toFixed(2),
      },
      {
        title: "Variación %",
        stat: avgVariation.toFixed(2) + "%",
      },
      {
        title: "Año Anterior",
        stat: "S/. " + res.data.total_sales_year_before.toFixed(2),
      },
    ];
    } catch (e: any) {
        console.error('Error en sales_x_month_of_year:', e);
        loading.value = false;
        error.value = 'Error al cargar datos de ingresos mensuales';
    }
};

const monthlyIncomeChart = ref<ApexChartType>({
  height: 270,
  type: "bar",
  series: [
    {
      name: "Ventas Mensuales",
      data: [],
    },
  ],
  options: {
    chart: {
      height: 270,
      type: "bar",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 5,
        blur: 5,
        color: "#45404a2e",
        opacity: 0.35,
      },
    },
    colors: [
      "#22c55e",
      "#22c55e",
      "#22c55e",
      "#22c55e",
      "#22c55e",
      "#22c55e",
      "#22c55e",
      "#22c55e",
      "#22c55e",
      "#22c55e",
      "#22c55e",
      "#22c55e",
    ],
    plotOptions: {
      bar: {
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
        columnWidth: "50",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#8997bd"],
      },
    },
    xaxis: {
      categories: [],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + " PEN";
        },
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.2,
      },
      strokeDashArray: 2.5,
    },
    legend: {
      show: false,
    },
  },
});

watch(year, (val) => {
  sales_x_month_of_year_func();
})

onMounted(() => {
  sales_x_month_of_year_func();
})

</script>
