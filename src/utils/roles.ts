export enum Roles {
  Admin = 'admin',
  User = 'user',
}

export const Permissions = {
  [Roles.Admin]: ['create', 'read', 'update', 'delete'],
  [Roles.User]: ['read'],
};
