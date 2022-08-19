import React from "react"
import { UseQueryResult } from "react-query"
import { Data } from "./Types"

export const ProductContex = React.createContext<UseQueryResult<Data[]>[]>([])
