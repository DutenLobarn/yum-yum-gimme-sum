import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "@mandus/router"; // var du nu la din router
import { fetchApiKey, createTenant } from "@mandus/order-page";

function App() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.order.apiKey);
  const tenantCreated = useSelector((state) => state.order.tenantCreated);
  const tenantName = useSelector((state) => state.order.tenantName);

  useEffect(() => {
    // hämta API-nyckel
    dispatch(fetchApiKey());
  }, [dispatch]);

  useEffect(() => {
    // Skapa tenant (om inte redan skapad)
    if (apiKey && !tenantCreated) {
      // Använd tenantName från store
      dispatch(createTenant({ tenantName, apiKey }));
    }
  }, [apiKey, tenantCreated, tenantName, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
