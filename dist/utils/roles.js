"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["Admin"] = "admin";
    Roles["User"] = "user";
})(Roles || (exports.Roles = Roles = {}));
exports.Permissions = {
    [Roles.Admin]: ['create', 'read', 'update', 'delete'],
    [Roles.User]: ['read'],
};
