module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const ProductAttributeSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId },                // 产品ID
    product_category_id: { type: Schema.Types.ObjectId },       // 产品分类ID
    product_type_attribute_id: { type: Schema.Types.ObjectId }, // 产品类型属性ID
    url: { type: String },                                      // 图片链接
    type: { type: String },                                     // 属性类型
    title: { type: String },                                    // 属性标题
    value: { type: String },                                    // 属性值
    sort: { type: Number, default: 1 },                         // 排序
    status: { type: Number, default: 1 },                       // 状态
    created_at: { type: Number, default: d.getTime() },         // 创建时间
    updated_at: { type: Number, default: d.getTime() },         // 修改时间
  });

  return mongoose.model("ProductAttribute", ProductAttributeSchema);
};