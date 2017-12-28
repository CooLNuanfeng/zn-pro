"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_swiper=require("./../components/swiper.js"),_swiper2=_interopRequireDefault(_swiper),_empty=require("./../components/empty.js"),_empty2=_interopRequireDefault(_empty),_footer=require("./../components/footer.js"),_footer2=_interopRequireDefault(_footer),_toast=require("./../components/toast.js"),_toast2=_interopRequireDefault(_toast),_avWeappMin=require("./../utils/av-weapp-min.js"),_avWeappMin2=_interopRequireDefault(_avWeappMin),_loading=require("./../components/loading.js"),_loading2=_interopRequireDefault(_loading),_userattentions=require("./../models/userattentions.js"),_userattentions2=_interopRequireDefault(_userattentions),Detail=function(e){function t(){var e,n,a,i;_classCallCheck(this,t);for(var o=arguments.length,r=Array(o),s=0;s<o;s++)r[s]=arguments[s];return n=a=_possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(r))),a.data={uid:"",pageId:"",title:"",subtitle:"",nickname:"",publisher:"",pubTimer:"",phone:"",categoryType:"",imgUrls:[],content:null,attentionStatus:0,loading:!1,loadend:!1,pageDate:null,ajaxPedding:!1},a.$repeat={},a.$props={swiper:{"v-bind:imgUrls.sync":"imgUrls"},"v-loading":{"xmlns:v-bind":"","v-bind:loading.sync":"loading","v-bind:loadend.sync":"loadend"},empty:{type:"nopage"}},a.$events={},a.components={swiper:_swiper2.default,"v-loading":_loading2.default,empty:_empty2.default,footer:_footer2.default,toast:_toast2.default},a.methods={doAttention:function(){var e=this,t=e.$parent.globalData.userInfo.objectId,n=new _userattentions2.default;e.attentionStatus||e.ajaxPedding||(e.ajaxPedding=!0,e.showLoading(),n.set("uid",t),n.set("pageid",e.pageId),n.set("pagedata",e.pageDate),n.save().then(function(t){e.hideLoading(),e.ajaxPedding=!1,e.attentionStatus=1,e.$apply(),e.$parent.globalData.curUserAttention.push(e.pageId),e.$parent.globalData.curUserAttentJsonArr.push({pid:e.pageId,oid:t.id}),e.$parent.globalData.attrefresh=!0}).catch(function(t){e.hideLoading(),e.ajaxPedding=!1,e.$invoke("toast","show",{message:"服务异常，请稍后重试"})}))},doPhone:function(){wx.makePhoneCall({phoneNumber:this.phone})}},i=n,_possibleConstructorReturn(a,i)}return _inherits(t,e),_createClass(t,[{key:"onLoad",value:function(e){var t=this,n=new _avWeappMin2.default.Query("NewsList");t.pageId=e.id,t.loading=!0,n.get(e.id).then(function(e){t.uid=e.attributes.uid,t.title=e.attributes.title,t.subtitle=e.attributes.subtitle,t.nickname=e.attributes.nickname,t.publisher=e.attributes.publishername,t.pubTimer=t.$parent.timeFormate(e.updatedAt),t.categoryType=e.attributes.type,t.content=e.attributes.formdata,t.phone=e.attributes.phone,t.imgUrls=e.attributes.formdata.images,t.pageDate=e.attributes,t.pageDate.updatedAt=t.$parent.timeFormate(e.updatedAt),t.loading=!1,t.$apply()}).catch(function(e){t.loading=!1,t.$apply()}),t.checkUserAttentions()}},{key:"checkUserAttentions",value:function(){for(var e=this.pageId,t=!1,n=this.$parent.globalData.curUserAttention,a=0;a<n.length;a++)if(e==n[a]){t=!0;break}t&&(this.attentionStatus=1)}},{key:"showLoading",value:function(){wx.showLoading({title:"请稍等..."})}},{key:"hideLoading",value:function(){setTimeout(function(){wx.hideLoading()},200)}}]),t}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Detail,"pages/detail"));