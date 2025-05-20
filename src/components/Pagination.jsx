import { getPaginationRange } from "../utils/getPaginationRange";

export default function Pagination({ current, last, onPageChange }) {
  const pages = getPaginationRange(current, last);

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded border px-3 py-1 ${
              current === page
                ? "bg-primary text-white hover:bg-primary-hover"
                : ""
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === last}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
