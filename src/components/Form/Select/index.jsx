
const SelectInput = ({ label, options = [], value, onChange, error }) => {
  return (
    <div className="w-[350px] my-5 flex flex-col">
      <label className="text-base mb-1">
        {label} <span className="text-red-500">* </span>
      </label>

      <select
        className={`border ${
          error && " border-2 border-red-500"
        } focus:border-2 focus:border-teal-500 border-teal-950 rounded-sm  text-lg outline-none  py-3 px-3`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option></option>

        {options &&
          options.map((data, index) => (
            <option
              value={data.name ? data.name : data.state ? data.state : data}
              key={index}
            >
              {data.name ? data.name : data.state ? data.state : data}
            </option>
          ))}
      </select>
      <div className="text-red-500 mt-2 font-bold text-sm">{error}</div>
    </div>
  );
};
export default SelectInput;
