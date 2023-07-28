export const FooterSlide = ({ popular = [], heading }) => {
  return (
    <>
      <div className="">
        <div className="font-bold">{heading}</div>
        <ul className="text-xs pt-3 text-gray-400">
          {popular.map((items, i) => {
            return (
              <li
                key={i}
                className="curser-pointer cursor-pointer hover:underline pt-1"
              >
                {items}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
