export default function InputField({
  label,
  id,
  name,
  value,
  required,
  handleInputChange,
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="font-semibold" htmlFor={id}>
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        className="rounded border border-gray-400 px-4 py-2 outline-none"
        type="text"
        id={id}
        name={name}
        value={value}
        required={required ? true : false}
        onChange={handleInputChange}
      />
    </div>
  );
}
