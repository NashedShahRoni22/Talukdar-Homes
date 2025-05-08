import { useEffect, useState } from "react";
import LoaderPage from "../../Adminpage/LoaderPage.jsx";
import ProductCards from "./ProductCards/ProductCards.jsx";
import ProductFilter from "./ProductFilter/ProductFilter.jsx";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // add filtering search params in url
  const handleSerachParams = (e) => {
    const { name, value, id } = e.target;

    const params = new URLSearchParams(searchParams.toString());

    if (name === "category") {
      params.set("category", value);
      params.delete("subcategory");

      setSearchParams(params);

      const selectedCategory = categories.find((cat) => cat.id == id);
      setSubCategories(
        selectedCategory?.children?.length > 0
          ? selectedCategory?.children
          : [],
      );
    }

    if (name === "subcategory") {
      params.set("subcategory", value);
      setSearchParams(params);
    }
  };

  // get categories data
  useEffect(() => {
    setLoading(true);
    fetch("https://api.talukderhomes.com.au/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setCategories(data.data);
          setLoading(false);
        }
      });
  }, []);

  //get products data
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

  return (
    <section className="mx-5 py-5 md:container md:mx-auto md:py-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <div className="mt-5 grid grid-cols-12 gap-4">
          <ProductFilter
            categories={categories}
            subCategories={subCategories}
            searchParams={searchParams}
            handleSerachParams={handleSerachParams}
          />
          <ProductCards products={products} />
        </div>
      )}
    </section>
  );
}
