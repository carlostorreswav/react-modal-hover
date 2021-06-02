"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./ModalHover.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ModelHover = props => {
  const childRef = (0, _react.useRef)({});
  const contRef = (0, _react.useRef)({});
  const idBack = (0, _react.useRef)({});
  const idChild = (0, _react.useRef)({});
  const idCont = (0, _react.useRef)({});
  const idMain = (0, _react.useRef)({});

  const openBack = () => {
    document.getElementById(idBack.current).style.display = "block";
    document.getElementById(idBack.current).classList.add("OpenBack");
    document.getElementById(idChild.current).style.position = "relative";
  };

  const openCont = () => {
    document.getElementById(idCont.current).style.display = "block";
    document.getElementById(idCont.current).classList.add("OpenBack");
  };

  const closeBack = () => {
    document.getElementById(idBack.current).classList.remove("OpenBack");
    document.getElementById(idBack.current).classList.add("CloseBack");
    setTimeout(() => {
      document.getElementById(idBack.current).style.display = "none";
      document.getElementById(idBack.current).classList.remove("CloseBack");
      document.getElementById(idChild.current).style.position = "";
    }, 300);
  };

  const closeCont = () => {
    document.getElementById(idCont.current).classList.remove("OpenBack");
    document.getElementById(idCont.current).classList.add("CloseBack");
    setTimeout(() => {
      document.getElementById(idCont.current).style.display = "none";
      document.getElementById(idCont.current).classList.remove("CloseBack");
      document.getElementById(idMain.current).style.visibility = "hidden";
    }, 300);
  };

  const calcPos = () => {
    const childDiv = document.getElementById(idChild.current).firstChild;
    const contDiv = document.getElementById(idCont.current);
    const childData = childDiv.getBoundingClientRect();
    contDiv.style.display = "block";
    const contData = document.getElementById(idCont.current).getBoundingClientRect();
    contDiv.style.display = "none";
    const heightBreak = window.innerHeight / 2;
    const widthBreakL = window.innerWidth / 3;
    const widthBreakR = widthBreakL * 2;
    let contPos = {
      hUp: false,
      hDw: false,
      wLeft: false,
      wCenter: false,
      wRight: false,
      isBig: false
    };

    if (childData.y + childData.height >= heightBreak / 2) {
      contPos = _objectSpread(_objectSpread({}, contPos), {}, {
        hDw: true
      });
    } else {
      contPos = _objectSpread(_objectSpread({}, contPos), {}, {
        hUp: true
      });
    }

    if (childData.x + childData.width >= widthBreakL && childData.x + childData.width <= widthBreakR) {
      contPos = _objectSpread(_objectSpread({}, contPos), {}, {
        wCenter: true
      });
    }

    if (childData.x + childData.width <= widthBreakL) {
      contPos = _objectSpread(_objectSpread({}, contPos), {}, {
        wLeft: true
      });
    } else {
      contPos = _objectSpread(_objectSpread({}, contPos), {}, {
        wRight: true
      });
    }

    if (contData.width >= window.innerWidth / 2) {
      contPos = _objectSpread(_objectSpread({}, contPos), {}, {
        isBig: true
      });
    }

    moveProc(contPos, childData, contData, contDiv);
  };

  const moveProc = (contPos, childData, contData, contDiv) => {
    let newPosX = 0;
    let newPosY = 0;

    if (contPos.hDw) {
      newPosY = -(contData.height + childData.height);
    }

    if (contPos.wLeft && !contPos.isBig) {
      newPosX = childData.left + childData.width;
    }

    if (contPos.wCenter) {
      const childCenter = childData.left + childData.width / 2;
      const contCenter = contData.width / 2;
      newPosX = childCenter - contCenter;
    }

    if (contPos.wRight) {
      newPosX = childData.left - contData.width;
    }

    if (contPos.isBig) {
      newPosX = (window.innerWidth - contData.width) / 2;
    }

    contDiv.style.transform = "translate(".concat(newPosX, "px, ").concat(newPosY, "px)");
  };

  const openMain = () => {
    document.getElementById(idMain.current).style.visibility = "visible";
  };

  const openMainProc = () => {
    openMain();
    calcPos();
    openBack();
    openCont();
  };

  const closeMainProc = () => {
    closeBack();
    closeCont();
  };

  const checkClose = () => {
    setTimeout(() => {
      if (childRef.current !== true && contRef.current !== true) {
        closeMainProc();
      }
    }, 250);
  };

  const onMouseEnterChild = () => {
    childRef.current = true;
    setTimeout(() => childRef.current && openMainProc(), 200);
  };

  const onMouseLeaveChild = () => {
    childRef.current = false;
    checkClose();
  };

  const onMouseEnterCont = () => {
    contRef.current = true;
  };

  const onMouseLeaveCont = () => {
    contRef.current = false;
    checkClose();
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ModalHoverMainDiv",
    id: idMain.current = 'Main-' + Math.floor(Math.random() * 1000)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ModalHoverBack",
    id: idBack.current = 'Back-' + Math.floor(Math.random() * 1000)
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "ModalHoverChild",
    onMouseEnter: () => onMouseEnterChild(),
    onMouseLeave: () => onMouseLeaveChild(),
    id: idChild.current = 'Child-' + Math.floor(Math.random() * 1000)
  }, props.children), /*#__PURE__*/_react.default.createElement("div", {
    className: "ModalHoverCont",
    id: idCont.current = 'Cont-' + Math.floor(Math.random() * 1000),
    onMouseEnter: () => onMouseEnterCont(),
    onMouseLeave: () => onMouseLeaveCont()
  }, props.onHover));
};

var _default = ModelHover;
exports.default = _default;