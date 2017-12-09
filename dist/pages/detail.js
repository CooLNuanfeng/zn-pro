"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_swiper=require("./../components/swiper.js"),_swiper2=_interopRequireDefault(_swiper),_footer=require("./../components/footer.js"),_footer2=_interopRequireDefault(_footer),_toast=require("./../components/toast.js"),_toast2=_interopRequireDefault(_toast),_avWeappMin=require("./../utils/av-weapp-min.js"),_avWeappMin2=_interopRequireDefault(_avWeappMin),Detail=function(e){function t(){var e,r,n,o;_classCallCheck(this,t);for(var i=arguments.length,a=Array(i),s=0;s<i;s++)a[s]=arguments[s];return r=n=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),n.data={uid:"",pageId:"",title:"",subtitle:"",nickname:"",publisher:"",pubTimer:"",phone:"",categoryType:"",imgUrls:[],content:null},n.$repeat={},n.$props={swiper:{"xmlns:v-bind":"","v-bind:imgUrls.sync":"imgUrls"}},n.$events={},n.components={swiper:_swiper2.default,footer:_footer2.default,toast:_toast2.default},n.methods={doAttention:function(){console.log(this.pageId,this.uid)},doPhone:function(){wx.makePhoneCall({phoneNumber:this.phone})}},o=r,_possibleConstructorReturn(n,o)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(e){var t=this,r=new _avWeappMin2.default.Query("NewsList");t.pageId=e.id,r.get(e.id).then(function(e){t.uid=e.attributes.uid,t.title=e.attributes.title,t.subtitle=e.attributes.subtitle,t.nickname=e.attributes.nickname,t.publisher=e.attributes.publishername,t.pubTimer=t.$parent.timeFormate(e.updatedAt),t.categoryType=e.attributes.type,t.content=e.attributes.formdata,t.phone=e.attributes.phone,t.imgUrls=e.attributes.formdata.images,t.$apply()}).catch(function(e){t.$invoke("toast","show",{message:"服务异常，请稍后重试"})})}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Detail,"pages/detail"));