module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const ArticleSchema = new Schema({
    cat_id: { type: Schema.Types.ObjectId },
    title: { type: String },
    content: { type: String },
    link: { type: String, default: '' },
    sort_num: { type: Number, default: 100 },
    created_at: { type: Number, default: d.getTime() },  // 创建时间
    updated_at: { type: Number, default: d.getTime() }  // 修改时间
  });

  return mongoose.model("Article", ArticleSchema);
};