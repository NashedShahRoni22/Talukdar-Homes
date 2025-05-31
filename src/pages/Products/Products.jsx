import { useCallback, useEffect, useRef, useState } from "react";
import LoaderPage from "../../Adminpage/LoaderPage.jsx";
import ProductCards from "./ProductCards/ProductCards.jsx";
import ProductFilter from "./ProductFilter/ProductFilter.jsx";
import { Link, useSearchParams } from "react-router-dom";
import { debounce } from "../../utils/debounce.js";
import { getMaxPrice } from "../../utils/maxPrice.js";
import { FaBarsStaggered } from "react-icons/fa6";
import { Spinner } from "@material-tailwind/react";

export default function Products() {
  const hasMounted = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState({ initial: false, filter: false });
  const [data, setData] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [absolutePriceRange, setAbsolutePriceRange] = useState({
    min: 0,
    max: 0,
  });
  const [rangeValues, setRangeValues] = useState({ min: 0, max: 0 });

  // Debounced handleRangeChange function
  const handleRangeChange = useCallback(
    debounce((values) => {
      if (!hasMounted.current) {
        hasMounted.current = true;
        return;
      }

      setRangeValues(values);

      const params = new URLSearchParams(searchParams.toString());

      const { min, max } = absolutePriceRange;
      const isDefaultRange = values.min === min && values.max === max;

      if (isDefaultRange) {
        params.delete("price");
      } else {
        params.set("price", `${values.min},${values.max}`);
      }
      setSearchParams(params);
    }, 300),
    [searchParams]
  );

  // add filtering search params in url
  const handleSearchParams = (e) => {
    const { name, value, type, id, checked } = e.target;

    const params = new URLSearchParams(searchParams.toString());

    if (name === "category") {
      if (checked) {
        params.set(name, value);
        params.delete("subcategory");

        const selectedCategory = categories.find((cat) => cat.id == id);
        setSubCategories(
          selectedCategory?.children?.length > 0
            ? selectedCategory?.children
            : []
        );
      } else {
        params.delete("category");
        params.delete("subcategory");
        setSubCategories([]);
      }
    }

    if (type === "checkbox") {
      if (checked) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    } else {
      params.set(name, value);
    }

    if (value === "") {
      params.delete(name);
    }

    setSearchParams(params);
  };

  // get categories and all products data
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      setLoading((prev) => ({ ...prev, initial: true }));
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("https://api.talukderhomes.com.au/api/products"),
          fetch("https://api.talukderhomes.com.au/api/categories"),
        ]);

        const [prodData, catData] = await Promise.all([
          prodRes.json(),
          catRes.json(),
        ]);

        if (prodData.status === true) {
          setData(prodData.data);
        }

        if (catData.status === true) {
          setCategories(catData.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading((prev) => ({ ...prev, initial: false }));
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  //get products data
  useEffect(() => {
    setLoading((prev) => ({ ...prev, filter: true }));

    const params = new URLSearchParams(searchParams.toString());

    fetch(
      `https://api.talukderhomes.com.au/api/products${params && `?${params.toString()}`}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          const max = getMaxPrice(data.data.data);
          setProducts(data.data.data);
          setData(data.data);
          setAbsolutePriceRange({ min: 0, max });

          const priceParam = searchParams.get("price");
          if (!priceParam) {
            setRangeValues({ min: 0, max });
          }
          setLoading((prev) => ({ ...prev, filter: false }));
        }
      });
  }, [searchParams]);

  // set price range values from URL params
  useEffect(() => {
    const priceParam = searchParams.get("price");
    if (priceParam) {
      const [min, max] = priceParam.split(",").map(Number);
      setRangeValues({ min, max });
    }
  }, [searchParams]);

  if (loading.initial) {
    return <LoaderPage />;
  }

  return (
    <section className="mx-5 min-h-[calc(100vh-80px)] py-5 md:container md:mx-auto md:py-10">
      <div className="relative mt-5 flex items-start gap-5">
        <ProductFilter
          min={absolutePriceRange.min}
          max={absolutePriceRange.max}
          currentMin={rangeValues.min}
          currentMax={rangeValues.max}
          categories={categories}
          subCategories={subCategories}
          searchParams={searchParams}
          showFilter={showFilter}
          onChange={handleRangeChange}
          handleSearchParams={handleSearchParams}
          setShowFilter={setShowFilter}
        />

        {/* products grid container */}
        <div className="w-full">
          {/* price filtering and mobile device filter button */}
          <div
            className={`flex items-center justify-between rounded border border-gray-200 bg-gray-50 p-2.5 ${showFilter && "no-doc-scroll"}`}
          >
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-1 rounded border border-gray-300 bg-white p-1 text-gray-700 md:hidden"
            >
              <FaBarsStaggered className="min-w-fit" />
              <span className="text-sm font-medium">Filter</span>
            </button>

            <p className="hidden font-semibold text-gray-900 md:block">
              Products
            </p>

            <div className="flex items-center gap-1">
              <p className="text-sm font-medium text-gray-600">Sort By:</p>
              <select
                className="rounded border border-gray-300 bg-white p-1 text-sm text-gray-700 outline-none"
                name="order"
                value={searchParams.get("order") || ""}
                onChange={handleSearchParams}
              >
                <option value="">Default</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* filtered product loading indicator */}
          <div className="mt-4">
            {loading.filter && (
              <div className="flex items-center justify-center">
                <Spinner className="h-7 w-7" />
              </div>
            )}

            {!loading.filter && products?.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
                <ProductCards products={products} />
              </div>
            )}

            {!loading.filter && products?.length === 0 && (
              <div>
                <p className="text-center text-lg font-semibold text-gray-700">
                  No products found
                </p>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Please try a different filter or search term.
                </p>
              </div>
            )}

            {/* pagination buttons */}
            <div className="flex items-center flex-wrap justify-center gap-5 mt-5 md:mt-10">
              {data?.links?.length > 1 &&
                data?.links?.slice(1, data?.links?.length - 1)?.map((page) => (
                  <Link
                    key={page?.label}
                    to={`/products?page=${page?.label}`}
                    className={`rounded border transition-all duration-200 ease-in-out px-3 py-1 ${
                      page?.active === true
                        ? "bg-primary text-white  cursor-default"
                        : "cursor-pointer hover:bg-[#FFE4D6]"
                    }`}
                  >
                    {page?.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
