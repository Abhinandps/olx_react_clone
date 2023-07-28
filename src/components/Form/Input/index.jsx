export const InputField = ({
  label,
  type = "text",
  onChange,
  value,
  error,
}) => {
  return (
    <div className="w-[350px] my-5 flex flex-col">
      <label className="text-base mb-1">
        {label} <span className="text-red-500">* </span>
      </label>
      <input
        value={value}
        type={type}
        className={`border ${
          error && " border-2 border-red-500"
        } focus:border-2 focus:border-teal-500 border-teal-950 rounded-sm  text-lg outline-none  py-3 px-3`}
        onChange={(e) => onChange && onChange(e.target.value)}
      />

      <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
    </div>
  );
};

export const TextArea = ({ label, value, onChange, error }) => {
  return (
    <>
      <div className="w-[350px] my-5 flex flex-col">
        <label className="text-base mb-1">
          {label} <span className="text-red-500">* </span>
        </label>
        <textarea
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className={`${
            error && "border-2 border-red-500"
          } border focus:border-2 focus:border-teal-500 border-teal-950 rounded-sm  text-lg outline-none  py-3 px-3`}
        ></textarea>
      </div>
      <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
    </>
  );
};
