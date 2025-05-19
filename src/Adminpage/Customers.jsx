import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export default function Customers() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getCustomers = async () => {
      const res = await fetch("https://api.talukderhomes.com.au/api/clients", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
    };

    getCustomers();
  });

  return <div>Customers</div>;
}
