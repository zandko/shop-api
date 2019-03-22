module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const AdminSchema = new Schema({
        role_name: { type: String },      // 角色名称
    });

    return mongoose.model('Roles', AdminSchema);
}