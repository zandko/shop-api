module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const ProductTypeSchema = new Schema({
    title: { type: String },
    description: { type: String },
    status: { type: Number, default: 1 },
    created_at: { type: Number, default: d.getTime() },  // 创建时间
    updated_at: { type: Number, default: d.getTime() },  // 修改时间
  });

  return mongoose.model("ProductType", ProductTypeSchema);
};