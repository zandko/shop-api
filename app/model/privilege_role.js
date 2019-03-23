module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PrivilegeRoleSchema = new Schema({
    role_id: {type: Schema.Types.ObjectId, ref: "Role"},  // 角色ID
    privilege_id: {type: Schema.Types.ObjectId, ref: "Privilege"} // 权限ID
  });

  return mongoose.model("PrivilegeRole", PrivilegeRoleSchema);
};