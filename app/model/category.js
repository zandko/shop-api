module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CategorySchema = new Schema({
    name: { type: String },     // 分类名称
  });

  return mongoose.model("Category", CategorySchema);
};