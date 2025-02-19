import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { router } from "@mandus/router";
import { fetchApiKey, createTenant } from "@mandus/order-page";

function App() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.order.apiKey);
  const tenantCreated = useSelector((state) => state.order.tenantCreated);
  const tenantName = useSelector((state) => state.order.tenantName);

  useEffect(() => {
    dispatch(fetchApiKey());
  }, [dispatch]);

  useEffect(() => {
    if (apiKey && !tenantCreated) {
      dispatch(createTenant({ tenantName, apiKey }))
        .unwrap()
        .catch((err) => {
          if (err.message.includes("already exists")) {
            console.log("Tenant already exists, we will just use it.");
          } else {
            console.error("Error creating tenant:", err);
          }
        });
    }
  }, [apiKey, tenantCreated, dispatch, tenantName]);

  return <RouterProvider router={router} />;
}

export default App;
