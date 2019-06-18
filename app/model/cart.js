module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CartSchema = new Schema({
    shop_id: { type: Schema.Types.ObjectId },      // 商品ID
    member_id: { type: Schema.Types.ObjectId },     // 会员ID
    buy_count: { type: Number },  // 购买数量
  });

  return mongoose.model("Cart", CartSchema);
};