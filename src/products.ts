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
        breadcrumb: "Clients",
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
  {
    product_name: "entities",
    screens: [
      {
        type: "list",
        // get_schema_endpoint: "https://entities/json-schema-list?clientId=test",
        get_schema_endpoint: "/entities.json",
        permission: "get_entities",
        path: "/clients/:clientId/entities",
        breadcrumb: "Entities",
      },
      {
        type: "create",
        get_schema_endpoint: "/form.json",
        permission: "create_entity",
        path: "/clients/:clientId/entity-create",
        breadcrumb: "Create entity",
      },
      {
        type: "update",
        get_schema_endpoint: "/form.json",
        permission: "update_entity",
        path: "/entities/:entityId/entity-details",
        breadcrumb: "Entity details",
      },
    ],
  },
  {
    product_name: "access_keys",
    screens: [
      {
        type: "list",
        get_schema_endpoint: "/accesskeys.json",
        permission: "get_access_keys",
        path: "/clients/:clientId/access-keys",
        breadcrumb: "Access keys",
      },
      {
        type: "create",
        get_schema_endpoint: "/form.json",
        permission: "create_access_key",
        path: "/clients/:clientId/create-access-key",
        breadcrumb: "Create access key",
      },
      {
        type: "update",
        get_schema_endpoint: "/form.json",
        permission: "update_access_key",
        path: "/clients/:clientId/access-keys/:accessKeyId/access-key-details",
        breadcrumb: "Access key details",
      },
    ],
  },
]
