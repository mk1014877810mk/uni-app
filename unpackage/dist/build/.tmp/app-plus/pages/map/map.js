(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/map/map"],{"16a0":function(t,i,o){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=function(){return o.e("pages/components/nav").then(o.bind(null,"e590"))},e=function(){return o.e("pages/components/scrollY").then(o.bind(null,"d263"))},s=23,a=23,r=20,h=20,c={data:function(){return{e_id:1,title:"",windowWidth:0,windowHeight:0,scale:1,logoSrc:"",z_id:"",showPointer:!0,showList:!1,currentIndex:0,currentTitle:"",map:{initScale:1,scale:1,height:0},img:{width:0,height:0,src:"",scale:1,x:0,y:0},pointer:{width:s,height:a,position:[]},originPointer:{}}},onLoad:function(i){var o=this;this.e_id=i.e_id,this.title=i.title,this.$common.setNavTitle(this.title),this.z_id=this.$store.state.lastHallZid||87,this.getHallInfo(),this.getMap(this.z_id),t.getSystemInfo({success:function(t){o.scale=t.windowWidth/750,o.map.height=t.windowHeight-100*o.scale,o.windowHeight=t.windowHeight-100*o.scale,o.windowWidth=t.windowWidth}})},methods:{getHallInfo:function(){var t=this;this.$api.getHallInfo({e_id:this.e_id}).then(function(i){1e3==i.status&&(t.$common.setNavTitle(i.data.hall_name),t.logoSrc=t.$store.state.ajaxUrl+i.data.hall_logo)}).catch(function(t){console.log("展厅信息获取失败"," at pages\\map\\map.vue:122")})},getMap:function(t){var i=this;this.$api.getMap({z_id:t}).then(function(t){if(1e3==t.status){if(""==t.data.hall_map||!t.data.hall_map)return void setTimeout(function(){i.$common.showTips("无对应地图,请选择其它地图")},300);t.data.items_position.forEach(function(t,i){t.showPic=!1}),i.img.src=i.$store.state.ajaxUrl+t.data.hall_map,i.pointer.position=t.data.items_position||[],i.currentTitle=t.data.hall_name}}).catch(function(t){console.log("地图信息获取失败",t," at pages\\map\\map.vue:145")})},imgLoad:function(i){var o=this,n=i.detail.width,e=i.detail.height,c=this.windowWidth/n,l=this.windowHeight/e;this.img.scale=c<=l?l:c,this.img.width=n*this.img.scale,this.img.height=e*this.img.scale,this.img.x=-1*(this.img.width-this.windowWidth)/2,this.img.y=-1*(this.img.height-this.map.height)/2;var f=this.pointer.position;f.forEach(function(i,n){i.x=t.upx2px((1*i.hall_position.split(",")[0]+r/2)/o.scale*o.img.scale-s/2.4),i.y=t.upx2px((1*i.hall_position.split(",")[1]+h/2)/o.scale*o.img.scale-a/1.4),i.top=i.y>t.upx2px(140),i.index=n,i.hall_cover=o.$store.state.ajaxUrl+i.hall_cover}),this.showPointer=!0,this.pointer.position=f;var p={};for(var u in this.pointer)"object"==typeof this.pointer[u]&&Array.isArray(this.pointer[u])?function(){var t=[];o.pointer[u].forEach(function(i,o){if("object"==typeof i){var n={};for(var e in i)n[e]=i[e]}t.push(n)}),p[u]=t}():p[u]=this.pointer[u];this.originPointer=p},showPic:function(t){var i=this;this.imgTab();var o=this.pointer.position,n=this.originPointer.position;o.forEach(function(i,e){i.showPic=n[e].showPic=t==e&&!o[t].showPic}),this.$nextTick(function(){if(i.$refs.pic&&i.$refs.pic[0]&&i.$refs.pic[0].$attrs&&!i.$refs.pic[0].$attrs.flag){var n=i.$refs.pic[0].$el.style.bottom;i.$refs.pic[0].$el.style.bottom=0,i.$refs.pic[0].$el.style.top=n}else{i.pointer.position;o[t].top=!0,i.pointer.position=o}}),this.currentIndex=t,this.pointer.position=o,this.originPointer.position=n},bindscale:function(t){var i=this,o=t.detail.scale,n={};for(var e in this.originPointer)"object"==typeof this.originPointer[e]&&Array.isArray(this.originPointer[e])?function(){var t=[];i.originPointer[e].forEach(function(i,n){if("object"==typeof i){var e={};for(var r in i)e[r]="x"==r?i[r]+(o-1)*s/8:"y"==r?i[r]+(o-1)*a/6:i[r];t.push(e)}}),n[e]=t}():n[e]=this.originPointer[e];n.width=s/o,n.height=a/o,this.map.scale=o,this.pointer=n},imgTab:function(){this.showList&&(this.showList=!1)},showOrHideList:function(){this.showList=!this.showList},goListDetail:function(i){t.navigateTo({url:"../detail/detail?z_id="+i+"&title="+this.title})}},components:{myNav:n,scrollY:e}};i.default=c}).call(this,o("6e42")["default"])},"2f36":function(t,i,o){"use strict";var n=o("fbbc"),e=o.n(n);e.a},3737:function(t,i,o){"use strict";o.r(i);var n=o("16a0"),e=o.n(n);for(var s in n)"default"!==s&&function(t){o.d(i,t,function(){return n[t]})}(s);i["default"]=e.a},"5da1":function(t,i,o){"use strict";o.r(i);var n=o("c443"),e=o("3737");for(var s in e)"default"!==s&&function(t){o.d(i,t,function(){return e[t]})}(s);o("2f36");var a=o("2877"),r=Object(a["a"])(e["default"],n["a"],n["b"],!1,null,"28c41542",null);i["default"]=r.exports},c443:function(t,i,o){"use strict";var n=function(){var t=this,i=t.$createElement;t._self._c},e=[];o.d(i,"a",function(){return n}),o.d(i,"b",function(){return e})},fbbc:function(t,i,o){}},[["4e9b","common/runtime","common/vendor"]]]);