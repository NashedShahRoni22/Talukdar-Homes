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
        {label}
      </label>
      <input
        className="px-4 py-2 outline-none border border-gray-400 rounded"
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
