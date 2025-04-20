import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoaderPage from "../Adminpage/LoaderPage";

const ManageProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  console.log('====================================');
  console.log(products);
  console.log('====================================');
  //get products
  useEffect(() => {
    setLoading(true);
    fetch("https://api.talukderhomes.com.au/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setProducts(data.data);
          setLoading(false);
        }
      });
  }, []);
  // delete service
  const deleteService = async (id) => {
    try {
      const response = await fetch(
        `https://api.talukderhomes.com.au/api/products/delete/${id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.status === true) {
        const updatedProducts = products.filter((s) => s.id !== id);
        setProducts(updatedProducts);
        window.alert("Product deleted successfully!");
      }

      // Handle response data as needed
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
    }
  };
  return (
    <section className="mt-5 md:mt-0 md:p-5 lg:p-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <h5 className="p-5 text-xl font-semibold text-blue">
            Products: {products?.length}
          </h5>
          <table>
            <thead>
              <th>
                <td>Product</td>
                <td>Quantity</td>
              </th>
            </thead>
          </table>
        </>
      )}
    </section>
  );
};

export default ManageProducts;
