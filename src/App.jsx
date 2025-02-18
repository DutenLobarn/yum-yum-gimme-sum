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
    if (apiKey && !tenantCreated) {
      dispatch(createTenant({ tenantName, apiKey }))
        .unwrap()
        .catch((err) => {
          if (err.message.includes("already exists")) {
            // Om servern säger "A Tenant with given name already exists"
            // så sätter vi tenantCreated=true ändå,
            // för vi VET att den finns (skapad vid annat tillfälle).
            console.log("Tenant already exists, we will just use it.");
            // ex. en extra dispatch för att sätta tenantCreated = true i state
            // eller en setState i en slice-reducer
          } else {
            console.error("Error creating tenant:", err);
          }
        });
    }
  }, [apiKey, tenantCreated, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
