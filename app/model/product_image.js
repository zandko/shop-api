module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const ProductImageSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId },          // 产品ID
    product_color_id: { type: Schema.Types.Mixed, default:'' },       // 产品颜色ID
    url: { type: String },                                // 图片链接
    sort: { type: Number, default: 1 },                   // 排序
    status: { type: Number, default: 1 },                 // 状态
    created_at: { type: Number, default: d.getTime() },   // 创建时间
    updated_at: { type: Number, default: d.getTime() },   // 修改时间
  });

  return mongoose.model("ProductImage", ProductImageSchema);
};