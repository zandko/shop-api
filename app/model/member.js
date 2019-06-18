module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const MemberSchema = new Schema({
    mobile: { type: Number },      // 手机号
    password: { type: String },     // 密码
    face: { type: String },   // 头像
    jifen: { type: Number, default: 0 },    // 积分
    jingyan: { type: Number, default: 0 },    // 经验
    created_at: { type: Number, default: d.getTime() },  // 创建时间
    updated_at: { type: Number, default: d.getTime() },  // 修改时间
  });

  return mongoose.model("Member", MemberSchema);
};