(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/scanAR/scanAR"],{"26d9":function(t,n,a){"use strict";a.r(n);var o=a("9144"),e=a("47c4");for(var i in e)"default"!==i&&function(t){a.d(n,t,function(){return e[t]})}(i);a("357d");var s=a("2877"),c=Object(s["a"])(e["default"],o["a"],o["b"],!1,null,"46d1da28",null);n["default"]=c.exports},"357d":function(t,n,a){"use strict";var o=a("39a2"),e=a.n(o);e.a},"39a2":function(t,n,a){},"47c4":function(t,n,a){"use strict";a.r(n);var o=a("9416"),e=a.n(o);for(var i in o)"default"!==i&&function(t){a.d(n,t,function(){return o[t]})}(i);n["default"]=e.a},9144:function(t,n,a){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},e=[];a.d(n,"a",function(){return o}),a.d(n,"b",function(){return e})},9416:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=!1,o=!0,e={data:function(){return{ctx:"",showButton:!0,msg:"请点击识别图片",scaning:!1}},onLoad:function(){o=!0,a=!1},onReady:function(){var t=this;setTimeout(function(){t.initData()},1e3)},methods:{initData:function(){this.ctx=t.createCameraContext()},error:function(){this.$common.showTips("打开摄像头失败")},takePhoto:function(){var t=this,n=this;console.log("taking photo"," at pages\\scanAR\\scanAR.vue:55"),a||this.ctx.takePhoto({quality:"normal",success:function(n){t.showButton=!1,t.scaning=!0,t.msg="识别中...",t.uploadPic(n.tempImagePath)},fail:function(t){setTimeout(function(){n.takePhoto()},500)}})},uploadPic:function(n,o){var e=this;if(!n)return this.takePhoto();var i=this.$store.state.arUploadSrc,s=this;t.uploadFile({url:i,filePath:n,name:"image",success:function(n){if(200==n.statusCode){var o=JSON.parse(n.data);console.log("result.name:",o.result.name," at pages\\scanAR\\scanAR.vue:84"),0==o.statusCode&&(t.navigateTo({url:"../detail/detail?z_id="+o.result.name+"&title=扫码详情"}),e.scaning=!1,a=!0)}},fail:function(t){console.log("upload fail:",t," at pages\\scanAR\\scanAR.vue:96")},complete:function(){console.log("识别完成:",a," at pages\\scanAR\\scanAR.vue:99"),setTimeout(function(){a||(console.log("complete"," at pages\\scanAR\\scanAR.vue:102"),s.takePhoto())},500)}})}},onShow:function(){o||t.navigateBack(),this.msg="请点击识别图片",this.showButton=!0,o=!1},onUnload:function(){o=!0}};n.default=e}).call(this,a("6e42")["default"])}},[["2cb1","common/runtime","common/vendor"]]]);