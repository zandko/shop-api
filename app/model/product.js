module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const ProductSchema = new Schema({
    category_id: { type: Schema.Types.ObjectId },     // 分类ID
    name: { type: String },     // 商品名称
    description: { type: String },     // 商品描述
    stock: { type: Number, default: 0 },    // 库存量
    price: { type: Number },      // 商品价格
    attr_list: { type: String },     // 属性列表
    sort_num: { type: String },     // 排序数字
    is_onsale: { type: String },     // 是否上架，0：下架 1：上架
    comment_star: { type: String },     // 评论星级
    comment_count: { type: String },     // 评论数量
    is_rec: { type: Number, default: 0 },     // 是否推荐
    is_delete: { type: Number, default: 0 },     // 是否删除
    onsale_at: { type: Number },     // 上架时间
    created_at: { type: Number, default: d.getTime() },  // 创建时间
    updated_at: { type: Number, default: d.getTime() }  // 修改时间
  });

  return mongoose.model("Product", ProductSchema);
};