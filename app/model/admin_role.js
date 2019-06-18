module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdminRoleSchema = new Schema({
    admin_id: { type: Schema.Types.ObjectId, ref: "Admin" },
    role_id: { type: Schema.Types.ObjectId, ref: "Role" }
  });

  return mongoose.model("AdminRole", AdminRoleSchema);
};