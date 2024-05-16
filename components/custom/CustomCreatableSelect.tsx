import React from 'react';
import CreatableSelect from 'react-select/creatable';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: string[];
  onCreateFunction: (option: string) => void;
  selectName: string;
  onChange: (selectedOption: Option | null, actionMeta: any) => void;
  defaultInput: string ;
};

export default function CustomCreateSelect({ options, onCreateFunction, selectName, onChange, defaultInput }: Props) {
  const optionsForSearch: Option[] = options.map((option) => ({
    label: option.charAt(0).toUpperCase() + option.slice(1),
    value: option,
  }));

  // Sort the options alphabetically
  optionsForSearch.sort((a, b) => a.label.localeCompare(b.label));

  const classNameMultiSelect = "w-full justify-center text-left font-normal rounded-md";

  return (
    <div>
      <CreatableSelect
        className={`${classNameMultiSelect} my-react-select-container`}
        classNamePrefix="my-react-select"
        isClearable
        required
        options={optionsForSearch}
        onCreateOption={onCreateFunction}
        name={selectName}
        // inputValue={defaultInput}
        onChange={onChange}
      />
    </div>
  );
}
