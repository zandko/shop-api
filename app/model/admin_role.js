module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdminRoleSchema = new Schema({
    admin_id: { type: Schema.Types.ObjectId, ref: "Admin" },  // 管理员ID
    role_id: { type: Schema.Types.ObjectId, ref: "Role" }     // 角色ID
  });

  return mongoose.model("AdminRole", AdminRoleSchema);
};