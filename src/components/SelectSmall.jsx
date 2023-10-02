import * as React from "react";

export default function SelectSmall({ val, valueOne, valueTwo, valueThree }) {
  return (
    <>
      <select
        id="small"
        className="block w-full p-1 mb-3 text-sm text-placeholder  selectBorders rounded-full bg-inherit "
      >
        <option value={val}>{val}</option>
        <option value="US">{valueOne}</option>
        <option value="CA">{valueTwo}</option>
        {valueThree && <option value="FR">{valueThree}</option>}
      </select>
    </>
  );
}
