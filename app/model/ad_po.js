module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdPoSchema = new Schema({
    pos_name: { type: String },       // 广告位名称
    pos_width: { type: String },      // 广告位宽度
    post_height: { type: String }     // 广告位高度
  });

  return mongoose.model("AdPo", AdPoSchema);
};