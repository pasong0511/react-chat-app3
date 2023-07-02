"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var MemberList_1 = __importDefault(require("../members/MemberList"));
var MemberModal_1 = __importDefault(require("../members/MemberModal"));
var MessageLayout = function (_a) {
    var currentSelectRoom = _a.currentSelectRoom, handleCloseRoom = _a.handleCloseRoom, children = _a.children;
    var _b = (0, react_1.useState)(false), memberViewOpen = _b[0], setMemberViewOpen = _b[1];
    var memberViewClose = function () {
        setMemberViewOpen(!memberViewOpen);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ style: { minWidth: "300px" }, className: "modal" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "modal_wrapper" }, { children: currentSelectRoom.id && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("header", { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "modal_header_group" }, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "content-title" }, { children: currentSelectRoom.roomTitle })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleCloseRoom }, { children: "\uB098\uAC00\uAE30" })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: memberViewClose }, { children: "\uBA64\uBC84\uBCF4\uAE30" }))] })) }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "modal_content" }, { children: children }))] })) })) })), currentSelectRoom.id && memberViewOpen && ((0, jsx_runtime_1.jsx)(MemberModal_1["default"], __assign({ title: currentSelectRoom.roomTitle }, { children: (0, jsx_runtime_1.jsx)(MemberList_1["default"], { currentRoom: currentSelectRoom }) })))] }));
};
exports["default"] = MessageLayout;
