import "antd/lib/slider/style/css";

import PropTypes from "prop-types";
import React from "react";
import { Slider } from "antd";

function RangeWidget(props) {
  const { schema, value, onChange, disabled } = props;
  return (
    <Slider
      min={schema.minimum}
      max={schema.maximum}
      value={value}
      onChange={onChange}
      disabled={disabled}
      step={schema.multipleOf || 1}
    />
  );
}

if (process.env.NODE_ENV !== "production") {
  RangeWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
}

export default RangeWidget;
