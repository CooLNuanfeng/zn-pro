"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_imgupload=require("./imgupload.js"),_imgupload2=_interopRequireDefault(_imgupload),FindForm=function(e){function t(){var e,o,r,n;_classCallCheck(this,t);for(var i=arguments.length,a=Array(i),s=0;s<i;s++)a[s]=arguments[s];return o=r=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.data={price:"",address:"",features:"",foodInfoArr:[""],uploadImgs:null},r.$repeat={},r.$props={uploadform:{"xmlns:v-on":""}},r.$events={uploadform:{"v-on:uploadEnd":"uploadChange","v-on:uploadDel":"uploadChange"}},r.components={uploadform:_imgupload2.default},r.methods={priceChange:function(e){this.price=e.detail.value},feaChange:function(e){this.features=e.detail.value},addressChange:function(e){this.address=e.detail.value},addItem:function(){this.foodInfoArr.push("")},itemInput:function(e,t){this.foodInfoArr[e]=t.detail.value},deleteItem:function(e){this.foodInfoArr.splice(e,1)},uploadChange:function(e){this.uploadImgs=e}},r.events={foodFetch:function(){var e={};e.price=this.price,e.address=this.address,e.features=this.features,e.foodInfoArr=this.foodInfoArr,e.images=this.uploadImgs,this.$emit("getFoodForm",e)}},n=o,_possibleConstructorReturn(r,n)}return _inherits(t,e),t}(_wepy2.default.component);exports.default=FindForm;