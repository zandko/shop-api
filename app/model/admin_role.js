module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdminRoleSchema = new Schema({
    admin_id: {type: Schema.Types.ObjectId},
    role_id: {type: Schema.Types.ObjectId}
  });

  return mongoose.model('Admin_role', AdminRoleSchema);
};