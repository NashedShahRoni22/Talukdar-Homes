import { useCallback, useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function ProductFilter({
  categories,
  subCategories,
  searchParams,
  handleSearchParams,
  min,
  currentMin,
  max,
  currentMax,
  trackColor = "#cecece",
  onChange,
  rangeColor = "#99a1af",
  width = "210px",
  currencyText = "$",
  showFilter,
  setShowFilter,
}) {
  const [minVal, setMinVal] = useState(currentMin ?? min);
  const [maxVal, setMaxVal] = useState(currentMax ?? max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // set width of the range to decrease from the left side
  /* useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]); */

  // set the width of the range to decrease from right side
  /* useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]); */

  // Get min and max values when their state changes
  /* useEffect(() => {
    if (minVal != minValRef.current || maxVal != maxValRef.current) {
      onChange({ min: minVal, max: maxVal });
      minValRef.current = minVal;
      maxValRef.current = maxVal;
    }
  }, [minVal, maxVal, onChange]); */

  /* useEffect(() => {
    setMinVal(currentMin >= min ? currentMin : min);
    setMaxVal(currentMax <= max ? currentMax : max);
  }, [min, max, currentMin, currentMax]); */

  return (
    <div
      className={`fixed right-0 top-0 z-50 flex h-[calc(100vh-0px)] w-full min-w-64 max-w-64 flex-col gap-4 overflow-y-auto rounded border border-gray-200 bg-gray-50 p-3 transition-transform duration-200 ease-linear md:relative md:top-0 md:h-fit md:min-w-[207px] md:max-w-[207px] ${showFilter ? "translate-x-0" : "translate-x-[100%] md:translate-x-0"}`}
    >
      {/* mobile filter menu close button */}
      <div className="md:hidden">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="cursor-pointer rounded border border-gray-200 bg-white p-1 transition-all duration-200 ease-in-out hover:text-primary"
        >
          <IoClose className="text-xl" />
        </button>
      </div>

      {/* pricing */}
      {/* <div className="rounded border border-gray-200 bg-white px-1 py-3">
        <h4 className="px-1 font-medium text-gray-800">Price Range</h4>
        <div className="mt-2 flex w-full flex-col items-center justify-center pb-3">
          <div className="flex w-full items-center justify-between gap-x-5 px-1">
            <p className="text-sm font-medium text-gray-800">
              {currencyText}
              {minVal}
            </p>

            <div className="mt-1 flex-1 border border-dashed border-gray-600"></div>

            <p className="text-sm font-medium text-gray-800">
              {currencyText}
              {maxVal}
            </p>
          </div>

          <div
            className="multi-slide-input-container mt-2 md:!w-[165px]"
            style={{ width }}
          >
            <input
              type="range"
              min={min}
              max={max}
              value={minVal}
              onChange={(event) => {
                const value = Math.min(Number(event.target.value), maxVal - 1);
                setMinVal(value);
              }}
              className="thumb thumb-left md:!w-[165px]"
              style={{
                width,
                zIndex: minVal > max - 100 || minVal === maxVal ? 5 : undefined,
              }}
            />

            <input
              type="range"
              min={min}
              max={max}
              value={maxVal}
              onChange={(event) => {
                const value = Math.max(Number(event.target.value), minVal + 1);
                setMaxVal(value);
              }}
              className="thumb thumb-right md:!w-[165px]"
              style={{
                width,
                zIndex: minVal > max - 100 || minVal === maxVal ? 4 : undefined,
              }}
            />

            <div className="slider">
              <div
                style={{ backgroundColor: trackColor }}
                className="track-slider"
              />

              <div
                ref={range}
                style={{ backgroundColor: rangeColor }}
                className="range-slider"
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* category */}
      <div className="rounded border border-gray-200 bg-white px-1 py-3">
        <h4 className="px-1 font-medium text-gray-800">Category</h4>
        <div className="mt-2">
          {categories &&
            categories?.length > 0 &&
            categories?.map((category) => (
              <div
                key={category?.id}
                className="flex cursor-pointer items-center gap-2 rounded px-1 hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  id={category?.id}
                  name="category"
                  value={category?.slug}
                  checked={searchParams.get("category") === category?.slug}
                  onChange={handleSearchParams}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor={category?.id}
                  className="w-full cursor-pointer py-1.5 text-sm text-gray-700"
                >
                  {category?.title}
                </label>
              </div>
            ))}
        </div>
      </div>

      {/* sub-category */}
      <div className="rounded border border-gray-200 bg-white px-1 py-3">
        <h4 className="px-1 font-medium text-gray-800">Sub Category</h4>
        <div className="mt-2">
          {subCategories && subCategories?.length > 0 ? (
            subCategories.map((subCategory) => (
              <div
                key={subCategory?.id}
                className="flex cursor-pointer items-center gap-2 rounded px-1 hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  id={subCategory?.id}
                  name="subcategory"
                  value={subCategory?.slug}
                  checked={
                    searchParams.get("subcategory") === subCategory?.slug
                  }
                  onChange={handleSearchParams}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor={subCategory?.id}
                  className="w-full cursor-pointer py-1.5 text-sm text-gray-700"
                >
                  {subCategory?.title}
                </label>
              </div>
            ))
          ) : (
            <p className="px-1 text-sm text-gray-500">
              {searchParams.get("category")
                ? "No sub-categories found"
                : "Select a category to view sub-categories"}
            </p>
          )}
        </div>
      </div>

      {/* availability */}
      <div className="rounded border border-gray-200 bg-white px-1 py-3">
        <h4 className="px-1 font-medium text-gray-800">Highlights</h4>
        <div className="mt-2">
          <div className="flex cursor-pointer items-center gap-2 rounded px-1 py-1.5 hover:bg-gray-200">
            <input
              type="checkbox"
              id="flash-sale"
              name="availability"
              value="flash-sale"
              checked={searchParams.get("availability") === "flash-sale"}
              onChange={handleSearchParams}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="flash-sale"
              className="w-full cursor-pointer text-sm text-gray-700"
            >
              Flash Sale
            </label>
          </div>

          <div className="flex cursor-pointer items-center gap-2 rounded px-1 py-1.5 hover:bg-gray-200">
            <input
              type="checkbox"
              id="best-selling"
              name="availability"
              value="best-selling"
              checked={searchParams.get("availability") === "best-selling"}
              onChange={handleSearchParams}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="best-selling"
              className="w-full cursor-pointer text-sm text-gray-700"
            >
              Best Selling
            </label>
          </div>

          <div className="flex cursor-pointer items-center gap-2 rounded px-1 py-1.5 hover:bg-gray-200">
            <input
              type="checkbox"
              id="featured"
              name="availability"
              value="featured"
              checked={searchParams.get("availability") === "featured"}
              onChange={handleSearchParams}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="featured"
              className="w-full cursor-pointer text-sm text-gray-700"
            >
              Featured
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
