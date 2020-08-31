import { InputGroup, FormControl } from "react-bootstrap";
import React from "react";
export const NumberInput = ({ title, onChange, value }) => {
  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">{title}:</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="10000"
        aria-label={title}
        aria-describedby="basic-addon1"
        onChange={onChange}
        type="number"
        min={0}
        max={1000000}
        value={value}
      />
      <InputGroup.Append>
        <InputGroup.Text id="basic-addon1">€</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};

export const DateInput = ({ title, onChange, value }) => {
  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">{title}:</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="2013-06-27"
        aria-label={title}
        aria-describedby="basic-addon1"
        onChange={onChange}
        type="date"
        value={value}
      />
    </InputGroup>
  );
};
