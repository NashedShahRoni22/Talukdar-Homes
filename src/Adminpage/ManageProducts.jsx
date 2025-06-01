import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoaderPage from "../Adminpage/LoaderPage";
import ProductRow from "../components/admin/ProductRow";
import DynamicPagination from "../components/DynamicPagination/DynamicPagination";
import { FiPackage } from "react-icons/fi";

const ManageProducts = () => {
  const [searchParams] = useSearchParams();
  const pageParams = searchParams.get("page");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [nextProducts, setNextProducts] = useState(null);

  //get products
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.talukderhomes.com.au/api/products?page=${pageParams ? pageParams : "1"}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setNextProducts(data.data);
          setLoading(false);
        }
      });
  }, [pageParams]);

  useEffect(() => {
    if (!loading && nextProducts !== null) {
      setProducts(nextProducts);
      setNextProducts(null);
    }
  }, [loading, nextProducts]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageParams]);

  return (
    <section className="p-5">
      {loading && products?.data?.length === 0 && <LoaderPage />}

      <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>

      {products && products?.data?.length > 0 && (
        <>
          <div className="mt-4 overflow-x-auto rounded border border-gray-200 p-6">
            <table className="w-full border-collapse">
              <thead className="border-b border-gray-200 text-gray-900">
                <tr>
                  <th className="px-2.5 py-2 text-left">Product</th>
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
                {products?.data?.map((product, i) => (
                  <ProductRow
                    key={product.id}
                    index={i}
                    product={product}
                    setProducts={setProducts}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <DynamicPagination data={products} url="/admin/manage-products" />
        </>
      )}

      {!loading && !products && (
        <div className="mx-5 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-5 text-center text-gray-600 md:container md:mx-auto md:py-10">
          <FiPackage className="mx-auto text-[40px] text-primary" />
          <p className="mt-4 text-xl font-semibold">No products added yet!</p>
          <Link
            to="/admin/add-product"
            className="mt-2 w-fit rounded bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-all duration-200 ease-in-out hover:bg-primary-hover"
          >
            Add Your First Product
          </Link>
        </div>
      )}
    </section>
  );
};

export default ManageProducts;
