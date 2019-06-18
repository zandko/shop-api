module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MemberLevelSchema = new Schema({
    level_name: { type: Number },      // 级别名称
    jybottom: { type: Number },     // 经验下限
    jytop: { type: Number },   // 经验上限
  });

  return mongoose.model("MemberLevel", MemberLevelSchema);
};