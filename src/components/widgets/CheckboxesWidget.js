import "antd/lib/checkbox/style/css";
import "antd/lib/row/style/css";
import "antd/lib/col/style/css";

import { Checkbox, Col, Row } from "antd";

import PropTypes from "prop-types";
import React from "react";

const CheckboxGroup = Checkbox.Group;

function CheckboxesWidget(props) {
  const { id, disabled, options, value, autofocus, readonly, onChange } = props;
  const { enumOptions, inline } = options;
  return (
    <CheckboxGroup
      style={{ width: "100%" }}
      value={value}
      onChange={values => {
        onChange(values);
      }}>
      <Row>
        {enumOptions.map((option, index) => {
          const disabledValue = disabled || readonly ? "disabled" : "";
          const checkbox = (
            <Checkbox
              key={option.value}
              value={option.value}
              id={`${id}_${index}`}
              disabled={disabledValue || readonly}
              autoFocus={autofocus && index === 0}>
              {option.label}
            </Checkbox>
          );
          return inline ? (
            <label key={index}>{checkbox}</label>
          ) : (
            <Col span={8} key={index}>
              {checkbox}
            </Col>
          );
        })}
      </Row>
    </CheckboxGroup>
  );
}

CheckboxesWidget.defaultProps = {
  autofocus: false,
  options: {
    inline: false,
  },
};

if (process.env.NODE_ENV !== "production") {
  CheckboxesWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default CheckboxesWidget;
