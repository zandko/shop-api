module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const ProductCategorySchema = new Schema({
    title: { type: String },                            // 分类名称
    icon: { type: String },                             // 分类ICON
    filter_attr: { type: String },                      // 筛选ID
    link: { type: String },                             // 分类链接
    parent_id: { type: Schema.Types.Mixed },            // 父ID
    template: { type: String },                         // 分类模板
    sub_title: { type: String },                        // SEO
    keywords: { type: String },                         // SEO
    description: { type: String },                      // SEO
    sort: { type: Number, default: 1 },                 // 排序
    status: { type: Number, default: 1 },               // 状态
    created_at: { type: Number, default: d.getTime() }, // 创建时间
    updated_at: { type: Number, default: d.getTime() }, // 修改时间
  });

  return mongoose.model("ProductCategory", ProductCategorySchema);
};