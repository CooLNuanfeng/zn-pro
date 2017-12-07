"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_imgupload=require("./imgupload.js"),_imgupload2=_interopRequireDefault(_imgupload),HomeForm=function(e){function t(){var e,o,n,r;_classCallCheck(this,t);for(var i=arguments.length,a=Array(i),s=0;s<i;s++)a[s]=arguments[s];return o=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),n.data={typeIndex:0,typeArr:["出租","出售"],price:"",address:"",homeIndex:1,homeJson:[{id:"001",name:"一室一厅"},{id:"002",name:"两室一厅"},{id:"003",name:"三室一厅"},{id:"004",name:"三室两厅"},{id:"005",name:"四室一厅"},{id:"006",name:"四室两厅"},{id:"007",name:"平房"},{id:"008",name:"其他"}],homeInfoArr:[""],uploadImgs:null},n.$repeat={},n.$props={uploadform:{"xmlns:v-on":""}},n.$events={uploadform:{"v-on:uploadEnd":"uploadChange","v-on:uploadDel":"uploadChange"}},n.components={uploadform:_imgupload2.default},n.methods={addressChange:function(e){this.address=e.detail.value},priceChange:function(e){this.price=e.detail.value},typeChange:function(e){this.typeIndex=e.detail.value},homeChange:function(e){this.homeIndex=e.detail.value},addItem:function(){this.homeInfoArr.push("")},itemInput:function(e,t){this.homeInfoArr[e]=t.detail.value},deleteItem:function(e){this.homeInfoArr.splice(e,1)},uploadChange:function(e){this.uploadImgs=e}},n.events={homeFetch:function(){var e={};e.typeJson={type:this.typeIndex,name:this.typeArr[this.typeIndex]},e.address=this.address,e.price=this.price,e.homeJson=this.homeJson[this.homeIndex],e.homeInfoArr=this.homeInfoArr,e.images=this.uploadImgs,this.$emit("getHomeForm",e)}},r=o,_possibleConstructorReturn(n,r)}return _inherits(t,e),t}(_wepy2.default.component);exports.default=HomeForm;