module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ProductColorSchema = new Schema({
    name: { type: String },                    // 颜色名称
    value: { type: String },                   // 颜色值
    status: { type: Number, default: 1 },      // 状态
  });

  return mongoose.model("ProductColor", ProductColorSchema);
};