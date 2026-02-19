const setTitle = (title: string) => {
  return title
    ? `${title} | Rizz Vue - Responsive Admin Dashboard Template`
    : "Rizz Vue | Responsive Admin Dashboard Template";
};

const authRoutes = [
  {
    path: "/auth/sign-in",
    name: "auth.sign-in",
    meta: {
      title: setTitle("Sign In"),
      authLogin:true,
    },
    component: () => import("@/views/auth/login.vue"),
  },
  // {
  //   path: "/products",
  //   name: "products",
  //   meta: {
  //     title: setTitle("Productos"),
  //     authRequired: true,
  //     permission: 'all',
  //   },
  //   component: () => import("@/views/products.vue"),
  // },
  // {
    //   path: "/auth/register",
    //   name: "auth.register",
    //   meta: {
    //     title: setTitle("Register"),
    //   },
    //   component: () => import("@/views/auth/register.vue"),
    // },
    // {
    //   path: "/auth/reset-pass",
    //   name: "auth.reset-pass",
    //   meta: {
    //     title: setTitle("Reset Password"),
    //   },
    //   component: () => import("@/views/auth/reset-pass.vue"),
    // },
    // {
    //   path: "/auth/lock-screen",
    //   name: "auth.lock-screen",
    //   meta: {
    //     title: setTitle("Lock Screen"),
    //   },
    //   component: () => import("@/views/auth/lock-screen.vue"),
    // },
    // {
    //   path: "/auth/maintenance",
    //   name: "auth.maintenance",
    //   meta: {
    //     title: setTitle("Maintenance"),
    //   },
    //   component: () => import("@/views/auth/maintenance.vue"),
  // },
];

const errorRoutes = [
  {
    path: "/auth/error-404",
    name: "error.404",
    meta: {
      title: setTitle("Error 404"),
    },
    component: () => import("@/views/auth/error-404.vue"),
  },
  {
    path: "/auth/error-500",
    name: "error.500",
    meta: {
      title: setTitle("Error 500"),
    },
    component: () => import("@/views/auth/error-500.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/auth/error-404",
  },
];

const dashboardRoutes = [
 // {
 //   path: "/",
 //   name: "dashboards.analytics",
  //  meta: {
  //    title: setTitle("Analytics"),
  //    authRequired: true,
 //     permission: 'all',
  //  },
  //  component: () => import("@/views/dashboards/analytics/index.vue"),
 // },
    {
    path: "/",
    name: "dashboards.analytics",
    meta: {
      title: setTitle("Analytics"),
      authRequired: true,
      permission: 'all',
    },
    component: () => import("@/views/dashboards/fe/index.vue"),
  },
  {
    path: "/dashboards/ecommerce",
    name: "dashboards.ecommerce",
    meta: {
      title: setTitle("Ecommerce"),
      authRequired: true,
      permission: 'all',
    },
    component: () => import("@/views/dashboards/ecommerce/index.vue"),
  },
];

const accessRoutes = [
  {
    path: "/roles",
    name: "roles.index",
    meta: {
      title: setTitle("Roles"),
      authRequired: true,
      permission: 'list_role',
    },
    component: () => import("@/views/role/index.vue"),
  },
   {
    path: "/users",
    name: "users.index",
    meta: {
      title: setTitle("Usuarios"),
      authRequired: true,
      permission: 'list_user',
    },
    component: () => import("@/views/user/index.vue"),
  },
  {
    path: "/configuration",
    name: "configuration.index",
    meta: {
      title: setTitle("Configuracion"),
      authRequired: true,
      permission: 'all',
    },
    component: () => import("@/views/configuration/index.vue"),
  },
];

const comercialRoutes = [
  {
    path: "/categories",
    name: "categories.index",
    meta: {
      title: setTitle("Categorias"),
      authRequired: true,
      permission: 'list_categorie',
    },
    component: () => import("@/views/categorie/index.vue"),
  },
  {
    path: "/product/register",
    name: "products.store",
    meta: {
      title: setTitle("Registrar Producto"),
      authRequired: true,
      permission: 'register_product',
    },
    component: () => import("@/views/product/register.vue"),
  },
  {
    path: "/product/list",
    name: "products.index",
    meta: {
      title: setTitle("Listado Producto"),
      authRequired: true,
      permission: 'list_product',
    },
    component: () => import("@/views/product/index.vue"),
  },
  {
    path: "/product/edit/:id",
    name: "products.edit",
    meta: {
      title: setTitle("Editar Producto"),
      authRequired: true,
      permission: 'edit_product',
    },
    component: () => import("@/views/product/edit.vue"),
  },
  {
    path: "/clients",
    name: "clients.index",
    meta: {
      title: setTitle("Clientes"),
      authRequired: true,
      permission: 'list_client',
    },
    component: () => import("@/views/clients/index.vue"),
  },
  {
    path: "/sale/register",
    name: "sales.store",
    meta: {
      title: setTitle("Registrar Venta"),
      authRequired: true,
      permission: 'register_sale',
    },
    component: () => import("@/views/sales/register.vue"),
  },
  {
    path: "/sale/list",
    name: "sales.index",
    meta: {
      title: setTitle("Listado Ventas"),
      authRequired: true,
      permission: 'list_sale',
    },
    component: () => import("@/views/sales/index.vue"),
  },
  {
    path: "/sale/edit/:id",
    name: "sales.edit",
    meta: {
      title: setTitle("Editar Ventas"),
      authRequired: true,
      permission: 'edit_sale',
    },
    component: () => import("@/views/sales/edit.vue"),
  },
  {
    path: "/nota-debito-credito/:id",
    name: "nota.electronica",
    meta: {
      title: setTitle("Nota Debito/Credito"),
      authRequired: true,
      permission: 'nota_electronica',
    },
    component: () => import("@/views/sales/nota.vue"),
  },
  {
    path: "/guia/register",
    name: "guia.store",
    meta: {
      title: setTitle("Registrar Guia"),
      authRequired: true,
      permission: 'register_guia_remision',
    },
    component: () => import("@/views/guia/register.vue"),
  },
  {
    path: "/guia/list",
    name: "guias.index",
    meta: {
      title: setTitle("Guias de Remisión"),
      authRequired: true,
      permission: 'list_guia_remision',
    },
    component: () => import("@/views/guia/index.vue"),
  },
];

const warehouseRoutes = [
  {
    path: "/purchases/register",
    name: "purchases.register",
    meta: {
      title: setTitle("Registrar Compras"),
      authRequired: true,
      permission: 'register_purchase',
    },
    component: () => import("@/views/warehouse/compras/register.vue"),
  },
  {
    path: "/purchases/list",
    name: "purchases.index",
    meta: {
      title: setTitle("Listado Compras"),
      authRequired: true,
      permission: 'list_purchase',
    },
    component: () => import("@/views/warehouse/compras/index.vue"),
  },
  {
    path: "/transport/register",
    name: "transport.register",
    meta: {
      title: setTitle("Registrar Transporte"),
      authRequired: true,
      permission: 'register_transport',
    },
    component: () => import("@/views/warehouse/transporte/register.vue"),
  },
  {
    path: "/transport/list",
    name: "transport.index",
    meta: {
      title: setTitle("Listado Transporte"),
      authRequired: true,
      permission: 'list_transport',
    },
    component: () => import("@/views/warehouse/transporte/index.vue"),
  },
  {
    path: "/conversion",
    name: "conversion",
    meta: {
      title: setTitle("Conversión"),
      authRequired: true,
      permission: 'list_conversion',
    },
    component: () => import("@/views/warehouse/conversion/index.vue"),
  },
  {
    path: "/kardex",
    name: "kardex",
    meta: {
      title: setTitle("Kardex"),
      authRequired: true,
      permission: 'list_kardex',
    },
    component: () => import("@/views/warehouse/kardex/index.vue"),
  },
];


export const allRoute = [
  ...authRoutes,
  ...errorRoutes,
  ...dashboardRoutes,
  ...accessRoutes,
  ...comercialRoutes,
  ...warehouseRoutes
];
