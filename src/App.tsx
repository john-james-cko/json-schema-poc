import { BrowserRouter, Switch, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ThemeDefaultProvider } from "@cko/primitives"
import { Navigation } from "./Navigation"
import { Routes } from "./Routes"
import { PermissionProvider } from "./PermissionProvider"

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
    <ThemeDefaultProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PermissionProvider>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ padding: "16px", width: "300px" }}>
                <Navigation />
              </div>

              <div style={{ padding: "16px", width: "100%" }}>
                <Switch>
                  <Routes />

                  <Route children={<h1>Route doesn't exist</h1>} />
                </Switch>
              </div>
            </div>
          </PermissionProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeDefaultProvider>
  )
}
