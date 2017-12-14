"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var s=0;s<e.length;s++){var n=e[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,s,n){return s&&t(e.prototype,s),n&&t(e,n),e}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_navbar=require("./../components/navbar.js"),_navbar2=_interopRequireDefault(_navbar),_loading=require("./../components/loading.js"),_loading2=_interopRequireDefault(_loading),_footer=require("./../components/footer.js"),_footer2=_interopRequireDefault(_footer),_toast=require("./../components/toast.js"),_toast2=_interopRequireDefault(_toast),_avWeappMin=require("./../utils/av-weapp-min.js"),_avWeappMin2=_interopRequireDefault(_avWeappMin),_userinfo=require("./../models/userinfo.js"),_userinfo2=_interopRequireDefault(_userinfo),Attention=function(t){function e(){var t,s,n,i;_classCallCheck(this,e);for(var a=arguments.length,o=Array(a),l=0;l<a;l++)o[l]=arguments[l];return s=n=_possibleConstructorReturn(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),n.config={onReachBottomDistance:200},n.$repeat={},n.$props={"nav-bar":{"xmlns:v-bind":"","v-bind:navlist.sync":"navlists"},"v-loading":{"v-bind:loading.sync":"loading","v-bind:loadend.sync":"loadend"}},n.$events={},n.components={"nav-bar":_navbar2.default,"v-loading":_loading2.default,footer:_footer2.default,toast:_toast2.default},n.data={uid:"",curUserAttention:null,navlists:[],lists:[],themeimg:"",showBar:!1,selectStatus:!1,selectAll:!1,startX:0,startY:0,delArrIds:null,loading:!1,loadend:!1,page:1,pageSize:30},n.methods={touchstart:function(t){this.startX=t.changedTouches[0].clientX,this.startY=t.changedTouches[0].clientY},touchmove:function(t,e,s){if(1!=t.status){var n=this,i=n.startX,a=n.startY,o=s.changedTouches[0].clientX,l=s.changedTouches[0].clientY,r=n.angle({X:i,Y:a},{X:o,Y:l});Math.abs(r)>10||(o>i?n.lists[e].status=0:(n.initStatus(0),n.lists[e].status=-1))}},goDetail:function(t){0==t.status&&wx.navigateTo({url:"detail?id="+t.id})},selectItem:function(t){this.lists[t].selected=!this.lists[t].selected,this.checkSelectAll(),this.checkHasSelected()},delItem:function(t,e){this.delArrIds=[t.id],this.delFetch([t.id])},doAllSelect:function(t){this.selectAllStatus(!t)},edit:function(){this.initStatus(1),this.showBar=!0},cancel:function(){this.initStatus(0),this.selectAllStatus(!1),this.selectAll=!1,this.showBar=!1},deleteSelect:function(){if(this.selectStatus){var t=[];this.delArrIds=[];for(var e=0;e<this.lists.length;e++)this.lists[e].selected&&(t.push(this.lists[e].id),this.delArrIds.push(this.lists[e].id));this.delFetch(t)}}},n.events={navChange:function(t){console.log(t,"from child")}},i=s,_possibleConstructorReturn(n,i)}return _inherits(e,t),_createClass(e,[{key:"onLoad",value:function(){this.themeimg=this.$parent.globalData.themeimg,this.curUserAttention=this.$parent.globalData.curUserAttention,this.uid=this.$parent.globalData.userInfo.objectId,this.fetch()}},{key:"onShow",value:function(){var t=this;setTimeout(function(){t.$parent.globalData.attrefresh&&(t.lists=[],t.fetch(),t.$parent.globalData.attrefresh=!1)},100),t.showBar=!1,t.selectStatus=!1,t.selectAll=!1}},{key:"onReachBottom",value:function(){this.showBar||console.log("aaa fetch",this.page)}},{key:"fetch",value:function(){var t=this,e=new _avWeappMin2.default.Query("NewsList");t.loading=!0,e.equalTo("uid",this.uid),e.descending("updatedAt"),e.limit(t.pageSize),e.find().then(function(e){console.log(e,"data"),t.loading=!1,e.length<t.pageSize?t.loadend=!0:t.page+=1,t.makeParam(e)}).catch(function(e){console.log(e),t.loading=!1,t.$invoke("toast","show",{message:"服务异常，请稍后重试"})})}},{key:"delFetch",value:function(t){var e=(new _userinfo2.default,this),s=new _avWeappMin2.default.Query("UserInfo"),n=e.$parent.globalData.curUserAttention;e.showLoading(),s.equalTo("uid",e.uid),s.first().then(function(s){var i=s.attributes.attentions,a=e.delFromArr(i,t);return e.$parent.globalData.curUserAttention=e.delFromArr(n,t),s.set("attentions",a),s.save(null,{fetchWhenSave:!0})}).then(function(){for(var t=0;t<e.delArrIds.length;t++)for(var s=0;s<e.lists.length;s++)e.lists[s].id==e.delArrIds[t]&&e.lists.splice(s,1);e.initStatus(0),e.selectAllStatus(!1),e.showBar=!1,e.hideLoading(),e.$apply()}).catch(function(t){console.log(t),e.hideLoading(),e.$invoke("toast","show",{message:"服务异常，请稍后重试"})})}},{key:"initStatus",value:function(t){for(var e=0;e<this.lists.length;e++)this.lists[e].status=t}},{key:"selectAllStatus",value:function(t){for(var e=0;e<this.lists.length;e++)this.lists[e].selected=t;this.selectAll=t,this.selectStatus=t}},{key:"checkHasSelected",value:function(){for(var t=!1,e=0;e<this.lists.length;e++)if(this.lists[e].selected){t=!0;break}this.selectStatus=!!t}},{key:"checkSelectAll",value:function(){for(var t=!0,e=0;e<this.lists.length;e++)if(!this.lists[e].selected){t=!1;break}this.selectAll=!!t}},{key:"makeParam",value:function(t){for(var e=[],s=this.$parent.globalData.curUserAttention,n=0;n<t.length;n++){var i={},a=t[n].attributes;i.type=t[n].attributes.type,i.name=t[n].attributes.typename,a.id=t[n].id,a.status=0,a.selected=!1,a.updatedAt=this.$parent.timeFormate(t[n].updatedAt),e.push(i),-1!=s.indexOf(a.id)&&this.lists.push(a)}this.uniqueNavlist(e),this.$apply()}},{key:"uniqueNavlist",value:function(t){for(var e=0;e<t.length;e++){var s=!1;if(this.navlists.length){for(var n=0;n<this.navlists.length;n++)if(t[e].type==this.navlists[n].type){s=!0;break}s||this.navlists.push(t[e])}else this.navlists.push(t[e])}}},{key:"angle",value:function(t,e){var s=e.X-t.X,n=e.Y-t.Y;return 360*Math.atan(n/s)/(2*Math.PI)}},{key:"showLoading",value:function(){wx.showLoading({title:"请稍等..."})}},{key:"hideLoading",value:function(){setTimeout(function(){wx.hideLoading()},200)}},{key:"delFromArr",value:function(t,e){for(var s=0;s<e.length;s++){var n=t.indexOf(e[s]);t.splice(n,1)}return t}}]),e}(_wepy2.default.page);Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(Attention,"pages/attention"));