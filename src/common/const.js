export const statusCodes = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  movedPermanently: 301,
  found: 302,
  notModified: 304,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  conflict: 409,
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
};

export const tableNames = {
  users: "users",
  vehicleType: "vehicleType",
  packages: "packages",
  services: "services",
  bookings: "bookings",
  customer: "customer",
  payment: "payment",
  outOfService: "outOfService",
  incomeAndExpense: "incomeAndExpense",
  template: "template",
  permissions: "permissions",
  employee : "employee"
};

export const errorMessage = {
  notFound: "Not Found",
  registerSuccessfully: "Successfully Registered",
  successfullyUpdate: "Updated Successfully",
  alreadyExist: "Already Exist",
  userNotGet: "Fetching Error User",
  slot_unavailable: "Slot Not Available",
  notCreated: "Not Created",
  notUpdated: " Not Updated",
  notDeleted: " Not Deleted",
  notRegistered: "User Not Registered",
  wrongPassword: "Wrong Password",
  loginSuccessfully: "Login Successfully",
  loginError: "Login Error",
  notUpdate : 'Update Failed'
};
