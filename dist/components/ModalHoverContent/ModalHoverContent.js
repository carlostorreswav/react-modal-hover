"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./ModalHoverContent.css");

const ModalHoverContent = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "ContentMainDiv"
  }, props.content);
};

var _default = ModalHoverContent;
exports.default = _default;