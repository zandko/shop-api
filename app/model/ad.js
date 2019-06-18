module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdSchema = new Schema({
    pos_id: { type: Schema.Types.ObjectId },      // 广告位ID
    ad_name: { type: String },     // 广告名称
    ad_type: { type: Number },  // 广告类型
    content: { type: String }  // 广告内容
  });

  return mongoose.model("Ad", AdSchema);
};