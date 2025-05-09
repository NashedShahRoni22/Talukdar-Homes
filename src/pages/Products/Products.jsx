import { useCallback, useEffect, useState } from "react";
import LoaderPage from "../../Adminpage/LoaderPage.jsx";
import ProductCards from "./ProductCards/ProductCards.jsx";
import ProductFilter from "./ProductFilter/ProductFilter.jsx";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../utils/debounce.js";
import { getMaxPrice } from "../../utils/maxPrice.js";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [rangeValues, setRangeValues] = useState({ min: 0, max: 0 });
  const maxPrice = getMaxPrice(products); // Get max price from products

  // Debounced handleRangeChange function
  const handleRangeChange = useCallback(
    debounce((values) => {
      setRangeValues(values);

      const params = new URLSearchParams(searchParams.toString());
      params.set("price", `${values.min},${values.max}`);
      setSearchParams(params);
    }, 300),
    [searchParams],
  );

  // add filtering search params in url
  const handleSerachParams = (e) => {
    const { name, value, id, checked } = e.target;

    const params = new URLSearchParams(searchParams.toString());

    if (name === "category") {
      if (checked) {
        params.set(name, value);
        params.delete("subcategory");

        const selectedCategory = categories.find((cat) => cat.id == id);
        setSubCategories(
          selectedCategory?.children?.length > 0
            ? selectedCategory?.children
            : [],
        );
      } else {
        params.delete("category");
        params.delete("subcategory");
        setSubCategories([]);
      }
    }

    if (checked) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    setSearchParams(params);
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

    const params = new URLSearchParams(searchParams.toString());

    if (params.has("subcategory")) {
      const sub = params.get("subcategory");
      params.set("category", sub);
    }

    params.delete("subcategory");

    fetch(
      `https://api.talukderhomes.com.au/api/products${params && `?${params.toString()}`}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setProducts(data.data);
          setLoading(false);
        }
      });
  }, [searchParams]);

  return (
    <section className="mx-5 py-5 md:container md:mx-auto md:py-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <div className="relative mt-5 flex items-start gap-5">
          <ProductFilter
            min={0}
            max={maxPrice}
            onChange={handleRangeChange}
            categories={categories}
            subCategories={subCategories}
            searchParams={searchParams}
            handleSerachParams={handleSerachParams}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
            <ProductCards products={products} />
          </div>
        </div>
      )}
    </section>
  );
}
