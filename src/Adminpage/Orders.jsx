import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export default function Orders() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch(
        "https://api.talukderhomes.com.au/api/purchase-histories",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
    };

    getOrders();
  });

  return <div>Orders</div>;
}
