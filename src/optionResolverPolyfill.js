export default function OptionResolver(t) {
  this.allowExtra = "undefined" !== typeof t && t, this.defaults = {}, this.types = {}, this.optional = [], this.required = []
}
OptionResolver.prototype.setDefaults = function(t) {
  for (var e in t)
    t.hasOwnProperty(e) && (this.defaults[e] = t[e]);
  return this
}, OptionResolver.prototype.setTypes = function(t) {
  for (var e in t) t.hasOwnProperty(e) && (this.types[e] = t[e]);
  return this
}, OptionResolver.prototype.setOptional = function(t) {
  return this.allowExtra ? void 0 : (this.addToArray(this.optionals, t), this)
}, OptionResolver.prototype.setRequired = function(t) {
  return this.addToArray(this.required, t), this
}, OptionResolver.prototype.resolve = function(t) {
  var e = {};
  for (var o in this.defaults) this.defaults.hasOwnProperty(o) && (e[o] = this.getValue(t, o));
  for (var i = this.required.length - 1; i >= 0; i--)
    if (o = this.required[i], "undefined" == typeof e[o]) throw 'Option "' + o + '" is required.';
  return e
}, OptionResolver.prototype.getValue = function(t, e) {
  var o = null;
  if (!this.optionExists(e)) throw 'Unkown option "' + e + '".';
  return "undefined" != typeof t[e] ? o = t[e] : "undefined" != typeof this.defaults[e] && (o = this.defaults[e]), this.checkType(e, o), o
}, OptionResolver.prototype.checkType = function(t, e) {
  var o = "undefined" != typeof this.types[t] ? this.types[t] : !1,
    i = typeof e;
  if (o && i !== o && ("string" === o && (e = String(e)), "boolean" === o && (e = Boolean(e)), "number" === o && (e = Number(e)), i = typeof e, o !== i)) throw 'Wrong type for option "' + t + '". Expected ' + this.types[t] + " but got " + typeof e
}, OptionResolver.prototype.optionExists = function(t) {
  return this.allowExtra ? !0 : "undefined" != typeof this.defaults[t] || this.optional.indexOf(t) >= 0 || this.required.indexOf(t) >= 0
}, OptionResolver.prototype.addToArray = function(t, e) {
  for (var o, i = e.length - 1; i >= 0; i--) o = e[i], t.indexOf(o) >= 0 && t.push(o)
};
