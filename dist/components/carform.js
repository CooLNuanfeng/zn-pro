"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_imgupload=require("./imgupload.js"),_imgupload2=_interopRequireDefault(_imgupload),CarForm=function(e){function t(){var e,a,r,n;_classCallCheck(this,t);for(var o=arguments.length,i=Array(o),u=0;u<o;u++)i[u]=arguments[u];return a=r=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.data={carname:"",price:"",mileage:"",endDate:"",startDate:"",carInfoArr:[""],uploadImgs:null},r.$repeat={},r.$props={uploadform:{"xmlns:v-on":""}},r.$events={uploadform:{"v-on:uploadEnd":"uploadChange","v-on:uploadDel":"uploadChange"}},r.components={uploadform:_imgupload2.default},r.methods={carNameChange:function(e){this.carname=e.detail.value},priceChange:function(e){this.price=e.detail.value},mileChange:function(e){this.mileage=e.detail.value},startdateChange:function(e){this.startDate=e.detail.value},enddateChange:function(e){this.endDate=e.detail.value},addItem:function(){this.carInfoArr.push("")},itemInput:function(e,t){this.carInfoArr[e]=t.detail.value},deleteItem:function(e){this.carInfoArr.splice(e,1)},uploadChange:function(e){this.uploadImgs=e}},r.events={carFetch:function(){var e={};e.carname=this.carname,e.price=this.price,e.mileage=this.mileage,e.endDate=this.endDate,e.startDate=this.startDate,e.carInfoArr=this.carInfoArr,e.images=this.uploadImgs,this.$emit("getCarForm",e)}},n=a,_possibleConstructorReturn(r,n)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){this.dateFormate()}},{key:"dateFormate",value:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth()+1;this.startDate=t+"-"+this.$parent.$parent.toDouble(a),this.endDate=t+"-"+this.$parent.$parent.toDouble(a)}}]),t}(_wepy2.default.component);exports.default=CarForm;