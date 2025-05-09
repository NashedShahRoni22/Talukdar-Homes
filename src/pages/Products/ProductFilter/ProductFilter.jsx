export default function ProductFilter({
  categories,
  subCategories,
  searchParams,
  handleSerachParams,
}) {
  return (
    <div className="col-span-2 border border-gray-200 flex flex-col gap-4 rounded bg-gray-50 p-3">
      {/* pricing */}
      <div className="rounded border border-gray-200 bg-white px-1 py-3">
        <h4 className="px-1 font-medium text-gray-800">Price Range</h4>
        <div className="mt-2">price range slider will be here</div>
      </div>

      {/* category */}
      <div className="rounded border border-gray-200 bg-white px-1 py-3">
        <h4 className="px-1 font-medium text-gray-800">Category</h4>
        <div className="mt-2">
          {categories &&
            categories?.length > 0 &&
            categories?.map((category) => (
              <div
                key={category?.id}
                className="flex cursor-pointer items-center gap-2 rounded px-1 py-1.5 hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  id={category?.id}
                  name="category"
                  value={category?.slug}
                  checked={searchParams.get("category") === category?.slug}
                  onChange={handleSerachParams}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor={category?.id}
                  className="cursor-pointer text-sm text-gray-700"
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
                className="flex cursor-pointer items-center gap-2 rounded px-1 py-1.5 hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  id={subCategory?.id}
                  name="subcategory"
                  value={subCategory?.slug}
                  checked={
                    searchParams.get("subcategory") === subCategory?.slug
                  }
                  onChange={handleSerachParams}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor={subCategory?.id}
                  className="cursor-pointer text-sm text-gray-700"
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
    </div>
  );
}
