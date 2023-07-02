"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var api_1 = require("../../utils/api");
var MemberItem_1 = __importDefault(require("./MemberItem"));
function MemberList(_a) {
    var _b;
    var currentRoom = _a.currentRoom;
    var _c = (0, react_1.useState)(null), membersData = _c[0], setMembersData = _c[1];
    //채팅방 목록 데이터 패칭
    (0, react_1.useEffect)(function () {
        (0, api_1.fetchChatMember)(currentRoom.id).then(function (res) {
            setMembersData(res.data);
        });
    }, [currentRoom]);
    if (!membersData) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
    return ((0, jsx_runtime_1.jsx)("ul", { children: (_b = membersData.members) === null || _b === void 0 ? void 0 : _b.map(function (members) { return ((0, jsx_runtime_1.jsx)(MemberItem_1["default"], { username: members.username }, members.userId)); }) }));
}
exports["default"] = MemberList;
