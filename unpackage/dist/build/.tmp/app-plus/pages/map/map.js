(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/map/map"],{"04a9":function(t,i,o){"use strict";var e=o("ae43"),n=o.n(e);n.a},"16a0":function(t,i,o){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=function(){return o.e("pages/components/nav").then(o.bind(null,"e590"))},n=function(){return o.e("pages/components/scrollY").then(o.bind(null,"d263"))},s=23,a=23,h=20,r=20,l={data:function(){return{x:0,e_id:1,title:"",windowWidth:0,windowHeight:0,scale:1,logoSrc:"",z_id:"",showPointer:!0,showList:!1,currentIndex:0,currentTitle:"",map:{initScale:1,scale:1,height:0},img:{width:0,height:0,src:"",scale:1,x:0,y:0},pointer:{width:s,height:a,position:[]},originPointer:{},hallList:[]}},onLoad:function(i){var o=this;this.e_id=i.e_id,this.title=i.title,this.$common.setNavTitle(this.title),this.z_id=this.$store.state.lastHallZid||87,this.getHallInfo(),this.getMap(this.z_id),t.getSystemInfo({success:function(t){o.scale=t.windowWidth/750,o.map.height=t.windowHeight-100*o.scale,o.windowHeight=t.windowHeight-100*o.scale,o.windowWidth=t.windowWidth}})},methods:{getHallInfo:function(){var t=this;this.$api.getHallInfo({e_id:this.e_id}).then(function(i){1e3==i.status&&(t.$common.setNavTitle(i.data.hall_name),t.logoSrc=t.$store.state.ajaxUrl+i.data.hall_logo)}).catch(function(t){console.log("展厅信息获取失败"," at pages\\map\\map.vue:124")})},getMap:function(t){var i=this;this.$api.getMap({z_id:t}).then(function(t){if(1e3==t.status){if(""==t.data.hall_map||!t.data.hall_map)return void setTimeout(function(){i.$common.showTips("无对应地图,请选择其它地图")},300);t.data.items_position.forEach(function(t,i){t.showPic=!1}),i.img.src=i.$store.state.ajaxUrl+t.data.hall_map,i.pointer.position=t.data.items_position||[],i.currentTitle=t.data.hall_name}}).catch(function(t){console.log("地图信息获取失败",t," at pages\\map\\map.vue:147")})},imgLoad:function(i){var o=this,e=i.detail.width,n=i.detail.height,l=this.windowWidth/e,c=this.windowHeight/n;this.img.scale=l<=c?c:l,this.img.width=e*this.img.scale,this.img.height=n*this.img.scale,this.img.x=-1*(this.img.width-this.windowWidth)/2,this.img.y=-1*(this.img.height-this.map.height)/2;var p=this.pointer.position;p.forEach(function(i,e){i.x=t.upx2px((1*i.hall_position.split(",")[0]+h/2)/o.scale*o.img.scale-s/2.4),i.y=t.upx2px((1*i.hall_position.split(",")[1]+r/2)/o.scale*o.img.scale-a/1.4),i.top=i.y>t.upx2px(140),i.index=e,i.hall_cover=o.$store.state.ajaxUrl+i.hall_cover}),this.showPointer=!0,this.pointer.position=p;var u={};for(var d in this.pointer)"object"==typeof this.pointer[d]&&Array.isArray(this.pointer[d])?function(){var t=[];o.pointer[d].forEach(function(i,o){if("object"==typeof i){var e={};for(var n in i)e[n]=i[n]}t.push(e)}),u[d]=t}():u[d]=this.pointer[d];this.originPointer=u},showPic:function(t){var i=this;this.imgTab();var o=this.pointer.position,e=this.originPointer.position;o.forEach(function(i,n){i.showPic=e[n].showPic=t==n&&!o[t].showPic}),this.$nextTick(function(){if(i.$refs.pic&&i.$refs.pic[0]&&i.$refs.pic[0].$attrs&&!i.$refs.pic[0].$attrs.flag){var e=i.$refs.pic[0].$el.style.bottom;i.$refs.pic[0].$el.style.bottom=0,i.$refs.pic[0].$el.style.top=e}else{i.pointer.position;o[t].top=!0,i.pointer.position=o}}),this.currentIndex=t,this.pointer.position=o,this.originPointer.position=e},imgTab:function(){this.showList&&(this.showList=!1)},showOrHideList:function(){this.showList=!this.showList},goListDetail:function(i){t.navigateTo({url:"../detail/detail?z_id="+i+"&title="+this.title})}},components:{myNav:e,scrollY:n}};i.default=l}).call(this,o("6e42")["default"])},"2b38":function(t,i,o){"use strict";var e=function(){var t=this,i=t.$createElement;t._self._c},n=[];o.d(i,"a",function(){return e}),o.d(i,"b",function(){return n})},3737:function(t,i,o){"use strict";o.r(i);var e=o("16a0"),n=o.n(e);for(var s in e)"default"!==s&&function(t){o.d(i,t,function(){return e[t]})}(s);i["default"]=n.a},"5da1":function(t,i,o){"use strict";o.r(i);var e=o("2b38"),n=o("3737");for(var s in n)"default"!==s&&function(t){o.d(i,t,function(){return n[t]})}(s);o("04a9");var a=o("2877"),h=Object(a["a"])(n["default"],e["a"],e["b"],!1,null,"1bdf594e",null);i["default"]=h.exports},ae43:function(t,i,o){}},[["4e9b","common/runtime","common/vendor"]]]);