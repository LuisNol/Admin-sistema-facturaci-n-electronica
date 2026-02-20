export type Role = {
    id:number
    name:string
    permissions:any[]
    created_at:string
}

export type ResponseRole = {
    roles: Role[],
    total:number,
    pagination:number,
}
export type CreatedRole = {
    role: Role,
    code:number,
    message:string
}
export const PERMISOS = [
    {
        'name': 'Dashboard',
        'permisos': [
            {
                name: 'Graficos',
                permiso: 'dashboard',
            },
        ]
    },
    {
        'name': 'Roles',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_role',
            },
            {
                name: 'Listado',
                permiso: 'list_role',
            },
            {
                name: 'Editar',
                permiso: 'edit_role',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_role',
            }
        ]
    },
    {
        'name': 'Usuarios',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_user',
            },
            {
                name: 'Listado',
                permiso: 'list_user',
            },
            {
                name: 'Editar',
                permiso: 'edit_user',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_user',
            },
        ]
    },
    {
        'name': 'Sucursales',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_branch_office',
            },
            {
                name: 'Listado',
                permiso: 'list_branch_office',
            },
            {
                name: 'Editar',
                permiso: 'edit_branch_office',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_branch_office',
            },
        ]
    },
    {
        'name': 'Almacenes',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_warehouse',
            },
            {
                name: 'Listado',
                permiso: 'list_warehouse',
            },
            {
                name: 'Editar',
                permiso: 'edit_warehouse',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_warehouse',
            },
        ]
    },
    {
        'name': 'Proveedores',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_supplier',
            },
            {
                name: 'Listado',
                permiso: 'list_supplier',
            },
            {
                name: 'Editar',
                permiso: 'edit_supplier',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_supplier',
            },
        ]
    },
    {
        'name': 'Unidades',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_unit',
            },
            {
                name: 'Listado',
                permiso: 'list_unit',
            },
            {
                name: 'Editar',
                permiso: 'edit_unit',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_unit',
            },
        ]
    },
    {
        'name': 'Categorias',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_categorie',
            },
            {
                name: 'Listado',
                permiso: 'list_categorie',
            },
            {
                name: 'Editar',
                permiso: 'edit_categorie',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_categorie',
            },
        ]
    },
    {
        'name': 'Productos',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_product',
            },
            {
                name: 'Listado',
                permiso: 'list_product',
            },
            {
                name: 'Editar',
                permiso: 'edit_product',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_product',
            },
        ]
    },
    {
        'name': 'Clientes',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_client',
            },
            {
                name: 'Listado',
                permiso: 'list_client',
            },
            {
                name: 'Editar',
                permiso: 'edit_client',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_client',
            },
        ]
    },
    {
        'name': 'Venta',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_sale',
            },
            {
                name: 'Listado',
                permiso: 'list_sale',
            },
            {
                name: 'Editar',
                permiso: 'edit_sale',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_sale',
            },
        ]
    },
    {
        'name': 'Nota Eletrónica',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'nota_electronica',
            },
            {
                name: 'Listado',
                permiso: 'list_nota_electronica',
            },
        ]
    },
    {
        'name': 'Guia de Remisión',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_guia_remision',
            },
            {
                name: 'Listado',
                permiso: 'list_guia_remision',
            },
        ]
    },
    {
        'name': 'Compras',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_purchase',
            },
            {
                name: 'Listado',
                permiso: 'list_purchase',
            },
            {
                name: 'Editar',
                permiso: 'edit_purchase',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_purchase',
            },
        ]
    },
    {
        'name': 'Transporte',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_transport',
            },
            {
                name: 'Listado',
                permiso: 'list_transport',
            },
            {
                name: 'Editar',
                permiso: 'edit_transport',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_transport',
            },
        ]
    },
    {
        'name': 'Conversión',
        'permisos': [
            {
                name: 'Registrar',
                permiso: 'register_conversion',
            },
            {
                name: 'Listado',
                permiso: 'list_conversion',
            },
            {
                name: 'Editar',
                permiso: 'edit_conversion',
            },
            {
                name: 'Eliminar',
                permiso: 'delete_conversion',
            },
        ]
    },
    {
        'name': 'Kardex',
        'permisos': [
            {
                name: 'Listado',
                permiso: 'list_kardex',
            },
        ]
    },
    // Agrega más módulos y permisos según sea necesario 
];