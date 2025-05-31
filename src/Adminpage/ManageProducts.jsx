import { useEffect, useState } from "react";
import LoaderPage from "../Adminpage/LoaderPage";
import ProductRow from "../components/admin/ProductRow";

const ManageProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  //get products
  useEffect(() => {
    setLoading(true);
    fetch("https://api.talukderhomes.com.au/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setProducts(data.data.data);
          setLoading(false);
        }
      });
  }, []);

  return (
    <section className="mt-5 md:mt-0 md:p-5 lg:p-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <h5 className="px-5 py-2.5 text-xl font-semibold text-orange-500">
            Total Products: {products?.length || 0}
          </h5>
          {products && products.length > 0 ? (
            <table className="w-full overflow-x-auto">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-2.5 py-2">Product</th>
                  <th className="px-2.5 py-2">Price</th>
                  {/* <th className="whitespace-nowrap px-2.5 py-2">
                    Discounted Price
                  </th> */}
                  {/* <th className="px-2.5 py-2">Shipping</th> */}
                  <th className="px-2.5 py-2">Quantity</th>
                  <th className="px-2.5 py-2">Category</th>
                  <th className="px-2.5 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    setProducts={setProducts}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-5 text-xl font-semibold">No Products added yet!</p>
          )}
        </>
      )}
    </section>
  );
};

export default ManageProducts;
