import { Product } from "./Types"

export const products: Product[] = [
  {
    product_name: "clients",
    screens: [
      {
        type: "list",
        get_schema_endpoint: "/clients.json",
        permission: "get_clients",
        path: "/",
        breadcrumb: "Client list",
      },
      {
        type: "create",
        get_schema_endpoint: "/form.json",
        permission: "create_client",
        path: "/clients/create-client",
        breadcrumb: "Create client",
      },
      {
        type: "update",
        get_schema_endpoint: "/form.json",
        permission: "update_client",
        path: "/clients/:clientId/client-details",
        breadcrumb: "Client details",
      },
    ],
  },
  // {
  //   product_name: "entities",
  //   screens: [
  //     {
  //       type: "list",
  //       get_schema_endpoint: "entities.json",
  //       permission: "get_entities",
  //     },
  //     {
  //       type: "create",
  //       get_schema_endpoint: "https://api/forwwwwm/json-schema?clientId=test",
  //       permission: "create_entity",
  //     },
  //     {
  //       type: "update",
  //       get_schema_endpoint: "https://api/foaddrm/jdson-schema?clientId=test",
  //       permission: "update_entity",
  //     },
  //   ],
  // },
]
