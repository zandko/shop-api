module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const ProductSchema = new Schema({
    title: { type: String },                              // 名称
    subsidiary_title: { type: String, default: '' },      // 长标题
    sn: { type: Number, default: '' },                    // SN
    product_category_id: { type: Schema.Types.ObjectId }, // 产品分类ID
    product_type_id: { type: Schema.Types.ObjectId },     // 产品类型ID
    image: { type: String },                              // 封面图
    stock: { type: Number, default: 0 },                  // 库存量
    pageviews: { type: Number, default: 0 },              // 浏览量
    price: { type: Number, default: 0 },                  // 价格
    market_price: { type: Number, default: 0 },           // 市场价格
    attrs: { type: String, default: '' },                 // 更多属性
    gift: { type: String, default: '' },                  // 赠品
    fitting: { type: String, default: '' },               // 配件
    version: { type: String, default: '' },               // 版本
    relation: { type: String, default: '' },              // 关联产品
    color: { type: String, default: '' },                 // 颜色
    keywords: { type: String, default: '' },              // 关键字
    description: { type: String, default: '' },           // 描述
    content: { type: String },                            // 产品内容
    comment_star: { type: Number, default: 0 },           // 评论星级
    comment_count: { type: Number, default: 0 },          // 评论数量
    sort: { type: Number, default: 1 },                   // 排序
    // is_onsale: { type: Number, default: 1 },           // 是否上架
    is_best: { type: Number, default: 0 },                // 是否精品
    is_new: { type: Number, default: 0 },                 // 是否新品
    is_rec: { type: Number, default: 0 },                 // 是否推荐
    is_delete: { type: Number, default: 0 },              // 是否删除
    status: { type: Number, default: 1 },                 // 状态
    onsale_at: { type: Number, default: 0 },             // 上架时间
    created_at: { type: Number, default: d.getTime() },   // 创建时间
    updated_at: { type: Number, default: d.getTime() }    // 修改时间
  });

  return mongoose.model("Product", ProductSchema);
};