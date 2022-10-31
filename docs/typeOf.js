/**
 * @description typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function 等类型的数据，
 * 但是对于其他的都会认为是 object，比如 Null、Date 等，
 * 所以通过 typeof 来判断数据类型会不准确。但是可以使用 Object.prototype.toString 实现。
 */
function typeOf(obj) {
  let type = Object.prototype.toString.call(obj);
  console.log("type", type);
  return type.slice(8, -1).toLowerCase();
}

typeOf(1);
typeOf(null);
typeOf(undefined);
typeOf("1");
typeOf(() => {});
typeOf(new Date());
typeOf(Symbol(1));
typeOf(true);
typeOf({});
typeOf([]);
