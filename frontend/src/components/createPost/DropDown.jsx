import DropDownInput from "../../ui/DropDownInput";

export default function DropDown({ list, selected, setSelected }) {
  const onChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const selections = selected;
    console.log(value, checked);
    console.log(selections);
    // Case 1 : The user checks the box
    // if (checked) {
    //   setSelected({
    //     selections: [...selections, value],
    //     response: [...selections, value],
    //   });
    // }
    if (checked) {
      setSelected([...selections, value]);
    }
    // Case 2  : The user unchecks the box
    //   else {
    //     setSelected({
    //       selections: selections.filter((e) => e !== value),
    //       response: selections.filter((e) => e !== value),
    //     });
    //   }
    // };
    else {
      setSelected(selected.filter((e) => e !== value));
    }
  };
  return (
    <div>
      <div className="z-10 w-full bg-white rounded-lg absolute shadow dark:bg-gray-700">
        <ul
          className="px-3 py-2 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownSearchButton"
        >
          {list.map((list, key) => (
            <DropDownInput name={list} key={key} id={key} onChange={onChange} />
          ))}
        </ul>
      </div>
    </div>
  );
}
