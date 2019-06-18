module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const MemberAddressSchema = new Schema({
    member_id: { type: Schema.Types.ObjectId },     // 会员ID
    shr_name: { type: String },  // 收货人姓名
    shr_tel: { type: String },      // 收货人电话
    shr_province: { type: String },     // 省
    shr_city: { type: String },  // 市
    shr_county: { type: String },      // 县
    shr_address: { type: String },     // 详细地址
    is_default: { type: Number, default: 0 },  // 是否默认
  });

  return mongoose.model("MemberAddress", MemberAddressSchema);
};