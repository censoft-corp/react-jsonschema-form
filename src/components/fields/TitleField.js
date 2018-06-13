import PropTypes from "prop-types";
import React from "react";

const REQUIRED_FIELD_SYMBOL = "*";

const titleStyle = {
  display: "block",
  width: "100%",
  padding: "0",
  marginBottom: "20px",
  fontSize: "21px",
  lineHeight: "inherit",
  color: "#333",
  border: "0",
  paddingBottom: "4px",
  borderBottom: "1px solid #e5e5e5",
};
function TitleField(props) {
  const { id, title, required } = props;
  const legend = required ? title + REQUIRED_FIELD_SYMBOL : title;
  return (
    <div id={id} style={titleStyle}>
      {legend}
    </div>
  );
}

if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
  };
}

export default TitleField;
