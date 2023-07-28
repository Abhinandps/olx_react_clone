import { FaAngleDown } from "react-icons/fa";

const tempCategories = [
  "Cars",
  "Motorcycles",
  "Mobile Phones",
  "For Sale: Hourses & Apartments",
  "Scooters",
  "Commercial & Other Vehicles",
  "For Rent:House & Apartments",
];

const CategoryList = () => {
  return (
    <div className="px-8 py-2 mt-1 mb-10 shadow-sm border-2 border-r-0 border-l-0">
      <div className="wrapper flex gap-3 items-center justify-start">
        <SelectCategory />
        <ul className="hidden lg:inline-flex gap-3 justify-between items-center">
          {tempCategories.map((item, i) => {
            return (
              <li className="text-sm text-slate-600 " key={i}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

function SelectCategory({ size = 25 }) {
  return (
    <div className="flex cursor-pointer relative">
      <span className="text-teal-950 text-sm font-bold uppercase">
        ALL CATEGORIES
      </span>
      <FaAngleDown size={size} className="text-black mx-2" />

      {/* <ul className="rounded-sm w-[200px] bg-white absolute top-16 right-0 drop-shadow-md">
          {languages.map((lang, i) => {
            return (
              <li
                className="flex items-center justify-between py-3 px-3 text-teal-950 text-sm font-bold"
                key={i}
              >
                {lang}
                <FaCheck size={20} className="text-teal-800" />
              </li>
            );
          })}
        </ul>
         */}
    </div>
  );
}

export default CategoryList;
