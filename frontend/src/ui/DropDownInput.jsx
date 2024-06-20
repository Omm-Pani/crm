import React from "react";

export default function DropDownInput({ name, id, onChange }) {
  return (
    <li id={id} key={id}>
      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
        <input
          id={`checkbox-item-${id}`}
          type="checkbox"
          value={name}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-700 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          htmlFor={`checkbox-item-${id}`}
          className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
        >
          {name}
        </label>
      </div>
    </li>
  );
}
