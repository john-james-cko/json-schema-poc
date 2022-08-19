import { BrowserRouter, Switch, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ProductProvider } from "./ProductProvider"
import { Navigation } from "./Navigation"
import { Routes } from "./Routes"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ProductProvider>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ padding: "16px", width: "300px" }}>
              <p>Navigation</p>

              <Navigation />
            </div>

            <div style={{ padding: "16px", width: "100%" }}>
              <p>Content</p>

              <Switch>
                <Routes />

                <Route children={<h1>Route doesn't exist</h1>} />
              </Switch>
            </div>
          </div>
        </ProductProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
