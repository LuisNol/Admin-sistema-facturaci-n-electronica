import type { MenuItemType } from "@/types/menu";

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: "main",
    label: "Main Menu",
    isTitle: true,
  },
  {
    key: "dashboards",
    icon: "iconoir-home-simple",
    label: "Dashboards",
    route: { name: "dashboards.analytics" },
    parentKey: "dashboards",
    permission: "all",
  },
  {
    key: "Accesos",
    label: "ACCESS",
    isTitle: true,
    permissions: ['list_role','list_user','list_branch_office','list_warehouse','list_categorie','list_supplier','list_unit']
  },
  {
    key: "roles",
    icon: "fas fa-unlock",
    label: "Roles y Permisos",
    route: { name: "roles.index" },
    parentKey: "roles",
    permission: 'list_role',
  },
  {
    key: "usuarios",
    icon: "fas fa-users",
    label: "Usuarios",
    route: { name: "users.index" },
    parentKey: "usuarios",
    permission: 'list_user',
  },
  {
    key: "configurat",
    label: "Configuraciones",
    isTitle: false,
    icon: "fas fa-wrench",
    children: [
      {
        key: "configuration_info",
        label: "Sucursales",
        route: { name: "configuration.sucursales.index" },
        parentKey: "configurat",
        permission: 'list_branch_office',
      },
      {
        key: "warehouses",
        label: "Almacenes",
        route: { name: "configuration.warehouses.index" },
        parentKey: "configurat",
        permission: 'list_warehouse',
      },
      {
        key: "categories",
        label: "Categorias",
        route: { name: "configuration.categories.index" },
        parentKey: "configurat",
        permission: 'list_categorie',
      },
      {
        key: "suppliers",
        label: "Proveedores",
        route: { name: "configuration.providers.index" },
        parentKey: "configurat",
        permission: 'list_supplier',
      },
      {
        key: "units",
        label: "Unidades",
        route: { name: "configuration.units.index" },
        parentKey: "configurat",
        permission: 'list_unit',
      },
    ],
  },

  {
    key: "Comercial",
    label: "COMERCIAL",
    isTitle: true,
    permissions: ['list_product','register_product','list_client','register_sale','list_sale',
      'register_guia_remision','list_guia_remision'
    ]
  },

  {
    key: "products",
    label: "Productos",
    isTitle: false,
    icon: "fas fa-qrcode",
    children: [
      {
        key: "register_product",
        label: "Registrar",
        route: { name: "products.store" },
        parentKey: "products",
        permission: 'register_product',
      },
      {
        key: "list_products",
        label: "Listar",
        route: { name: "products.index" },
        parentKey: "products",
        permission: 'list_product',
      },
    ],
  },
  {
    key: "clients",
    icon: "fas fa-user-plus",
    label: "Clientes",
    route: { name: "clients.index" },
    parentKey: "clients",
    permission: 'list_client',
  },
  {
    key: "sales",
    label: "Ventas",
    isTitle: false,
    icon: "fas fa-money-check-alt",
    children: [
      {
        key: "register_sale",
        label: "Registrar",
        route: { name: "sales.store" },
        parentKey: "sales",
        permission: 'register_sale',
      },
      {
        key: "list_sales",
        label: "Listar",
        route: { name: "sales.index" },
        parentKey: "sales",
        permission: 'list_sale',
      },
    ],
  },
  {
    key: "guias",
    label: "Guia de Remisión",
    isTitle: false,
    icon: "fas fa-file-alt",
    children: [
      {
        key: "register_guia",
        label: "Registrar",
        route: { name: "guia.store" },
        parentKey: "guias",
        permission: 'register_guia_remision',
      },
      {
        key: "list_guia",
        label: "Listar",
        route: { name: "guias.index" },
        parentKey: "guias",
        permission: 'list_guia_remision',
      },
    ],
  },
 
     
   {
    key: "warehouse",
    label: "ALMACEN",
    isTitle: true,
    permissions: ['list_purchase','register_purchase','register_transport',
      'list_transport','list_conversion','list_kardex']
  },
  {
    key: "purchases",
    icon: "fas fa-shopping-bag",
    label: "Compras",
    isTitle: false,
    children: [
      {
        key: "register_purchase",
        label: "Registrar",
        route: { name: "purchases.register" },
        parentKey: "purchases",
        permission: 'register_purchase',
      },
      {
        key: "list_purchases",
        label: "Listado",
        route: { name: "purchases.index" },
        parentKey: "purchases",
        permission: 'list_purchase',
      },
    ],
  },
  {
    key: "transport",
    icon: "fas fa-route",
    label: "Transporte",
    isTitle: false,
    children: [
      {
        key: "register_transport",
        label: "Registrar",
        route: { name: "transport.register" },
        parentKey: "transport",
        permission: 'register_transport',
      },
      {
        key: "list_transport",
        label: "Listado",
        route: { name: "transport.index" },
        parentKey: "transport",
        permission: 'list_transport',
      },
    ],
  },
  {
    key: "conversion",
    icon: "fas fa-exchange-alt",
    label: "Conversión",
    route: { name: "conversion" },
    parentKey: "warehouse",
    permission: 'list_conversion',
  },
  {
    key: "kardex",
    icon: "fas fa-clipboard-list",
    label: "Kardex",
    route: { name: "kardex" },
    parentKey: "warehouse",
    permission: 'list_kardex',
  },
  



]