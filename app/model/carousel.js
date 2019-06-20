module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const d = new Date();
  const CarouselSchema = new Schema({
    title: { type: String }, // 轮播图名称
    image: { type: String }, // 图片位置
    link: { type: String },  // 跳转链接
    sort: { type: Number }, // 排序
    is_enable: { type: Number }, // 是否启用
    created_at: { type: Number, default: d.getTime() },  // 创建时间
    updated_at: { type: Number, default: d.getTime() }  // 修改时间
  });

  return mongoose.model("Carousel", CarouselSchema);
}