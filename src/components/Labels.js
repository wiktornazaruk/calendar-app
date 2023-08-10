import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  function replace_bg_with_text(bg_color) {
    // return bg_color.replace("bg-", "text-"); // for some reason this doesn't work
    switch (bg_color) {
      case "bg-indigo-500":
        return "text-indigo-500";
      case "bg-green-500":
        return "text-green-500";
      case "bg-yellow-500":
        return "text-yellow-500";
      case "bg-red-500":
        return "text-red-500";
      case "bg-orange-500":
        return "text-orange-500";
      case "bg-pink-500":
        return "text-pink-500";
      case "bg-blue-500":
        return "text-blue-500";
      default:
        return "text-indigo-500";
    }
  }
  return (
    <React.Fragment>
      <p className="text-grey-500 font-bold mt-10">Labels</p>
      {labels.map(({ bg_color, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            onChange={() => updateLabel({ bg_color, checked: !checked })}
            type="checkbox"
            className={`form-checkbox h-5 w-5 rounded focus:ring-0 cursor-pointer ${replace_bg_with_text(
              bg_color
            )}`}
            checked={checked}
          />
          <span className="ml-2 text-grey-500 capitalize">
            {bg_color.replace("bg-", "").replace("-500", "")}
          </span>
        </label>
      ))}
    </React.Fragment>
  );
}
