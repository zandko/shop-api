module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const ProductTypeAttributeSchema = new Schema({
    product_type_id: { type: Schema.Types.ObjectId },   // 类型ID
    title: { type: String },                            // 属性名称
    attr_type: { type: Number, default: 1 },            // 属性类型
    attr_value: { type: String },                       // 属性值
    status: { type: Number, default: 1 },               // 状态
    created_at: { type: Number, default: d.getTime() }, // 创建时间
    updated_at: { type: Number, default: d.getTime() }, // 修改时间
  });

  return mongoose.model("ProductTypeAttribute", ProductTypeAttributeSchema);
};