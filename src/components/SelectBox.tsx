import { memo, useState } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';

interface SelectBoxProps {
  name: string;
  items: Array<string | number>;
  selectedItem?: string | number;
  onSelectItem: (name: string, current: string) => void;
}

const SelectBox = ({
  name,
  items,
  selectedItem,
  onSelectItem,
}: SelectBoxProps) => {
  const [value, setValue] = useState(items[0]);

  const handleChangeItem = (event) => {
    onSelectItem(name, event.target.value);
    setValue(event.target.value);
  };

  return (
    <FormControl required style={{ marginRight: '5px' }}>
      <Select
        labelId="item-select-label"
        id="item-select"
        value={selectedItem ?? value}
        onChange={handleChangeItem}
        displayEmpty
      >
        {items.map((element, index) => {
          return (
            <MenuItem key={index} value={element}>
              {element}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default memo(SelectBox);
