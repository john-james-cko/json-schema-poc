import { useQueries, UseQueryResult } from "react-query"
import { ProductContex } from "./ProductContext"
import { products } from "./products"
import { Data } from "./Types"

type ProductProps = {
  children: React.ReactNode
}

export const ProductProvider: React.FC<ProductProps> = ({ children }) => {
  const queries: UseQueryResult<Data[]>[] = useQueries(
    products.map((product) => {
      return {
        queryKey: product.product_name,
        queryFn: () => {
          const uniqueEndpoints = Array.from(
            new Set(product.screens.map((screen) => screen.get_schema_endpoint))
          )

          const fetchAll = async (endpoints: string[]) => {
            const responses = await Promise.all(endpoints.map((endpoint) => fetch(endpoint)))

            const jsons = await Promise.all(responses.map((response) => response.json()))

            return jsons
          }

          return fetchAll(uniqueEndpoints)
        },
      }
    })
  )

  return <ProductContex.Provider value={queries}>{children}</ProductContex.Provider>
}
