export default function CheckBoxFeat({
  label,
  customLabel1,
  customLabel2,
  name,
  id1,
  id2,
  value,
  handleInputChange,
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="font-semibold">
        {label} <span className="text-red-600">*</span>
      </label>

      <div className="flex w-full items-center gap-4">
        <div>
          <input
            type="checkbox"
            name={name}
            id={id1}
            value="1"
            checked={value === "1"}
            onChange={handleInputChange}
            required={value === ""}
          />{" "}
          <label htmlFor={id1}>{customLabel1 ? customLabel1 : "Yes"}</label>
        </div>
        <div>
          <input
            type="checkbox"
            name={name}
            id={id2}
            value="0"
            checked={value === "0"}
            onChange={handleInputChange}
            required={value === ""}
          />{" "}
          <label htmlFor={id2}>{customLabel1 ? customLabel2 : "No"}</label>
        </div>
      </div>
    </div>
  );
}
