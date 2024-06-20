// interface inputBoxType {
//   label: string;
//   placeholder: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   type?: string;
// }

export default function InputBox({
  placeholder,
  label,
  onChange,
  onClick,
  type,
  value,
}) {
  return (
    <div>
      <label className="block mb-2 text-xs font-normal text-white pt-4 ">
        {label}
        <div className="flex  border border-gray-500 rounded-lg bg-neutral-800  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
          <input
            onChange={onChange}
            onClick={onClick}
            type={type || "text"}
            className="text-white bg-transparent text-sm block w-full p-1 outline-none border-none focus:outline-none focus:ring-0"
            value={value}
            placeholder={placeholder}
            required
          />

          <span className="material-icons-outlined cursor-pointer">
            arrow_drop_down
          </span>
        </div>
      </label>
    </div>
  );
}
