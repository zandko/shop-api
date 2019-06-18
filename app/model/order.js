module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const OrderSchema = new Schema({
    member_id: { type: Schema.Types.ObjectId },  // 会员ID
    shr_name: { type: String },   // 收货人姓名
    shr_tel: { type: String },  // 收货人电话

    shr_province: { type: String },   // 省
    shr_city: { type: String },   // 市
    shr_county: { type: String },   // 县
    shr_address: { type: String },  // 详细地址

    total_price: { type: String },  // 总价
    post_company: { type: String },   // 快递公司
    post_order_sn: { type: String }, // 快递单号
    post_time: { type: Number }, // 发货时间

    order_status: { type: Number, default: 0 }, // 订单状态（0：未支付、1：已支付、2：已发货、3：已收到货、4、已评论、5：已完成）

    pay_method: { type: Number },  // 支付方式，0：微信 1：支付宝
    pay_order_sn: { type: String }, // 支付订单号,
    pay_time: { type: Number },  // 支付时间

    created_at: { type: Number, default: d.getTime() },  // 创建时间
    updated_at: { type: Number, default: d.getTime() }  // 修改时间
  });

  return mongoose.model("Order", OrderSchema);
};