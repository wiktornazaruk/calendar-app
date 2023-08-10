import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-grey-500 font-bold mt-10">Labels</p>
      {labels.map(({ color, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            onChange={() => updateLabel({ color, checked: !checked })}
            type="checkbox"
            className={`form-checkbox h-5 w-5 text-${color}-400 rounded focus:ring-0 cursor-pointer`}
            checked={checked}
          />
          <span className="ml-2 text-grey-500 capitalize">{color}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
