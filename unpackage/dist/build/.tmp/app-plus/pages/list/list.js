(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/list"],{3439:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},3495:function(t,e,n){"use strict";n.r(e);var i=n("3439"),a=n("9319");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);var s=n("2877"),c=Object(s["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},9319:function(t,e,n){"use strict";n.r(e);var i=n("a16c"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},a16c:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("pages/components/tmpOne").then(n.bind(null,"a84c"))},a={data:function(){return{title:"",z_id:"",template:1,page:1,list:[],sendAjax:!0,loadText:"努力加载中..."}},onLoad:function(t){this.z_id=t.z_id,this.title=t.title,this.$common.showLoading(),this.$common.setNavTitle(this.title),this.getInteractive(this.z_id,"",this.page)},methods:{getInteractive:function(t,e,n,i){var a=this;this.$api.getInteractive({z_id:t,i_id:e,page:n}).then(function(t){1e3==t.status?(t.data.forEach(function(e,i){e.hall_cover=a.$store.state.ajaxUrl+e.hall_cover,e.page=n,e.count=t.count}),a.list=a.list.concat(t.data),a.list.length>=t.count&&(a.sendAjax=!1,a.loadText="没有更多了")):1006==t.status&&(a.sendAjax=!1,a.loadText=1==n?"暂无数据":"没有更多了")}).catch(function(t){console.log("展项列表获取失败",t," at pages\\list\\list.vue:54")})},goDetail:function(e){t.navigateTo({url:"../detail/detail?z_id="+e.z_id+"&title="+this.title})}},components:{tmpOne:i},onReachBottom:function(){if(this.sendAjax){this.page++;var t=this.list.slice(-1).z_id;this.getInteractive(this.z_id,t,this.page)}}};e.default=a}).call(this,n("6e42")["default"])}},[["c1f2","common/runtime","common/vendor"]]]);