import { Product } from "./Types"

// Entities
// list schema endpoint examples
// https://clients/${clientId}/entities/list-schema?skip={skip}
// https://entities/list-schema?skip={skip}&clientId={clientId}

// universal form schema endpoint examples
// https://entities/form-schema?clientId={clientId} - when creating (may not need client. depends on the product needs)
// https://entities/form-schema?entityId=${entityId} - when updating

// dedicated form schema example
// https://clients/${clientId}/create-schema - when creating
// https://entities/${entityId}/update-schema - when updating

export const products: Product[] = [
  {
    product_name: "clients",
    product_id: "clientId",
    screens: [
      {
        type: "list",
        sidemenu_link_title: "Clients",
        route_path: "/",
        permission_config: {
          get_action: "get_client_list_schema",
        },
        schema_config: {
          get_schema_endpoint: "/clients/list.json",
          params: ["clientId"],
        },
      },
      {
        type: "create",
        route_path: "/create-client",
        schema_config: {
          get_schema_endpoint: "/clients/form.json",
        },
        permission_config: {
          get_action: "get_client_form_schema",
          create_action: "create_client",
        },
      },
      {
        type: "update",
        route_path: "/clients/:clientId/client-details",
        schema_config: {
          get_schema_endpoint: "/clients/form.json",
        },
        sidemenu_link_title: "Client details",
        permission_config: {
          get_action: "get_client_form_schema",
          create_action: "update_client",
          delete_action: "delete_client",
        },
      },
    ],
  },
  {
    product_name: "entities",
    product_id: "entityId",
    screens: [
      {
        type: "list",
        sidemenu_link_title: "Entities",
        route_path: "/clients/:clientId/entities",
        schema_config: {
          get_schema_endpoint: "/entities/list.json",
        },
        permission_config: {
          get_action: "get_entity_list_schema",
        },
      },
      {
        type: "create",
        route_path: "/clients/:clientId/entity-create",
        schema_config: {
          get_schema_endpoint: "/entities/form.json",
        },
        permission_config: {
          get_action: "get_entity_form_schema",
          create_action: "create_entity",
        },
      },
      {
        type: "update",
        route_path: "/entities/:entityId/entity-details",
        schema_config: {
          get_schema_endpoint: "/entities/form.json",
        },
        sidemenu_link_title: "Entity details",
        permission_config: {
          get_action: "get_entity_form_schema",
          create_action: "update_entity",
        },
      },
    ],
  },
  {
    product_name: "access_keys",
    product_id: "accessKeyId",
    screens: [
      {
        type: "list",
        sidemenu_link_title: "Access keys",
        route_path: "/clients/:clientId/access-keys",
        schema_config: {
          get_schema_endpoint: "/accesskeys/list.json",
        },
        permission_config: {
          get_action: "get_access_key_list_schema",
        },
      },
      {
        type: "create",
        route_path: "/clients/:clientId/create-access-key",
        schema_config: {
          get_schema_endpoint: "/accesskeys/form.json",
        },
        permission_config: {
          get_action: "get_access_key_form_schema",
          create_action: "create_access_key",
        },
      },
      {
        type: "update",
        route_path: "/clients/:clientId/access-keys/:accessKeyId",
        schema_config: {
          get_schema_endpoint: "/accesskeys/form.json",
        },
        permission_config: {
          get_action: "get_entity_form_schema",
          update_action: "update_access_key",
          delete_action: "delete_access_key",
        },
      },
    ],
  },
  {
    product_name: "processing_channels",
    product_id: "channelId",
    screens: [
      {
        type: "list",
        sidemenu_link_title: "Processing channels",
        route_path: "/entities/:entityId/processing-channels",
        schema_config: {
          get_schema_endpoint: "/processingchannels/list.json",
        },
        permission_config: {
          get_action: "get_processing_channel_list_schema",
        },
      },
    ],
  },
]
