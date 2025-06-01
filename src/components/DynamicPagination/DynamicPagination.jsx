import { Link } from "react-router-dom";

export default function DynamicPagination({ data, url }) {
  return (
    <div className="mt-5 md:mt-10">
      <div className="flex flex-wrap items-center justify-center gap-5">
        {data?.links?.length > 3 &&
          data?.links?.slice(1, data?.links?.length - 1)?.map((page) => (
            <Link
              key={page?.label}
              to={page?.label === "..." ? "" : `${url}?page=${page?.label}`}
              className={`rounded border px-3 py-1 transition-all duration-200 ease-in-out ${
                page?.active
                  ? "cursor-default bg-primary text-white"
                  : page?.label === "..."
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-[#FFE4D6]"
              }`}
            >
              {page?.label}
            </Link>
          ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-5">
        <Link
          to={
            data?.current_page > 1
              ? `${url}?page=${data?.current_page - 1}`
              : ""
          }
          className={`rounded border px-3 py-1 transition-all duration-200 ease-in-out ${data?.current_page > 1 ? "cursor-pointer bg-primary text-white hover:bg-primary-hover" : "cursor-default"}`}
        >
          Previous
        </Link>

        <Link
          to={
            data?.current_page < data?.last_page
              ? `${url}?page=${data?.current_page + 1}`
              : `${url}?page=${data?.current_page}`
          }
          className={`rounded border px-3 py-1 transition-all duration-200 ease-in-out ${
            data?.current_page < data?.last_page
              ? "cursor-pointer bg-primary text-white hover:bg-primary-hover"
              : "cursor-pointer hover:bg-[#FFE4D6]"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
