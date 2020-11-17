// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Textfield } from '../text-field/text-field';
import { Button } from '../button';
import './search-field.scss';
import '../../styles/theme.scss';

export const SearchField = (props: {
  defaultValue?: string;
  items: any[];
  itemFilter: { text: string; value: string };
  showButton?: boolean;
  onChangeResults: (filtredItems: any) => void;
  className?: string;
  buttonLabel?: string;
  fieldLabel?: string;
}) => {
  const [filtredItems, setFiltredItems] = useState(props.items || []);

  useEffect(() => {
    props.onChangeResults(filtredItems);
  }, [filtredItems]);

  const filterItems = (fieldValue: string) => {
    let items = filtredItems.filter((item) => {
      let formattedText = (
        String(item[props.itemFilter.value]) || ''
      ).toLowerCase();
      return formattedText.indexOf(fieldValue) !== -1;
    });
    props.onChangeResults(items);
  };

  return (
    <div className={`search-field ${props.className}`}>
      <Textfield
        id="searchField"
        name="searchField"
        type="text"
        label={props.fieldLabel}
        onChange={(fieldValue) => filterItems(fieldValue)}
      />
      {props.showButton ? (
        <Button
          onClick={() => {
            /* warning this, require test */
            filterItems(props.defaultValue);
          }}
          label={props.buttonLabel || 'Search'}
          className="search-btn"
        />
      ) : null}
    </div>
  );
};
