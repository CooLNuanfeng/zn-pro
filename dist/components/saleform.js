"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_imgupload=require("./imgupload.js"),_imgupload2=_interopRequireDefault(_imgupload),SaleForm=function(e){function t(){var e,a,n,r;_classCallCheck(this,t);for(var i=arguments.length,o=Array(i),s=0;s<i;s++)o[s]=arguments[s];return a=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),n.data={startdate:"",enddate:"",starttime:"08:00",endtime:"18:00",address:"",activityArr:[""],saleIndex:0,saleJson:[{id:"001",name:"超市"},{id:"002",name:"服饰"},{id:"003",name:"餐饮"},{id:"004",name:"其他"}],uploadImgs:null},n.porps={},n.$repeat={},n.$props={uploadform:{"xmlns:v-on":""}},n.$events={uploadform:{"v-on:uploadEnd":"uploadChange","v-on:uploadDel":"uploadChange"}},n.components={uploadform:_imgupload2.default},n.methods={saleChange:function(e){this.saleIndex=e.detail.value},starttimeChange:function(e){this.starttime=e.detail.value},endtimeChange:function(e){this.endtime=e.detail.value},startdateChange:function(e){this.startdate=e.detail.value},enddateChange:function(e){this.enddate=e.detail.value},addressChange:function(e){this.address=e.detail.value},addItem:function(){this.activityArr.push("")},itemInput:function(e,t){this.activityArr[e]=t.detail.value},deleteItem:function(e){this.activityArr.splice(e,1)},uploadChange:function(e){this.uploadImgs=e}},n.events={saleFetch:function(){var e={};e.startdate=this.startdate,e.enddate=this.enddate,e.starttime=this.starttime,e.endtime=this.endtime,e.address=this.address,e.saleJson=this.saleJson[this.saleIndex],e.activityArr=this.activityArr,e.images=this.uploadImgs,this.$emit("getSaleForm",e)}},r=a,_possibleConstructorReturn(n,r)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(){var e=new Date;this.startdate=this.dateFormate(e),this.enddate=this.dateFormate(e)}},{key:"dateFormate",value:function(e){var t=e.getFullYear(),a=e.getMonth()+1,n=e.getDate();return t+"-"+this.$parent.$parent.toDouble(a)+"-"+this.$parent.$parent.toDouble(n)}}]),t}(_wepy2.default.component);exports.default=SaleForm;