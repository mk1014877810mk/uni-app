(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/home"],{"0070":function(t,e,a){"use strict";a.r(e);var i=a("c283"),n=a("395f");for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);a("41a7");var s=a("2877"),l=Object(s["a"])(n["default"],i["a"],i["b"],!1,null,"0cd7802b",null);e["default"]=l.exports},"22d9":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return a.e("pages/components/swiper").then(a.bind(null,"f2ab"))},n=function(){return a.e("pages/components/tmpOne").then(a.bind(null,"a84c"))},o=function(){return a.e("pages/components/tmpTwo").then(a.bind(null,"1377"))},s=function(){return a.e("pages/components/tmpThree").then(a.bind(null,"4b2e"))},l=function(){return a.e("pages/components/nav").then(a.bind(null,"e590"))},c={data:function(){return{windowWidth:1,windowHeight:1,loadingHeight:60,scale:1,template:1,e_id:1,title:"",logoSrc:"",swiper:{imgUrls:[]},tab:{height:"1500px",currentTab:0,z_idList:[],tabTitle:[],contents:[],swiperText:[],sendAjaxList:[],hallList:[]}}},onLoad:function(e){var a=this;this.e_id=e.e_id||8,this.$common.showLoading(),t.getSystemInfo({success:function(t){a.windowWidth=t.windowWidth,a.windowHeight=t.windowHeight,a.scale=t.windowWidth/750}})},onReady:function(){var t=this;this.getHallInfo(function(){t.getSwiper(),t.getExhibition(function(e){t.template<4&&e.forEach(function(a,i){t.$set(t.tab.contents,i,[]),t.getInteractive(e[i],"",1,function(e){if(1e3==e.status?(t.$set(t.tab.contents,i,e.data||[]),t.$set(t.tab.sendAjaxList,i,!0),t.$set(t.tab.swiperText,i,"努力加载中...")):1006==e.status&&(t.$set(t.tab.swiperText,i,"没有更多了"),t.$set(t.tab.sendAjaxList,i,!1)),0==i){var a={length:t.tab.contents[i].length};t.setHeight(a)}})})})})},methods:{getHallInfo:function(t){var e=this;this.$api.getHallInfo({e_id:this.e_id}).then(function(a){1e3==a.status&&(e.template=1*a.data.template||1,e.title=a.data.hall_name,e.logoSrc=e.$store.state.ajaxUrl+a.data.hall_logo,e.$common.setNavTitle(e.title),t&&t())}).catch(function(t){console.log("展馆信息获取失败",t," at pages\\home\\home.vue:159")})},getSwiper:function(){var t=this;this.template<4?this.$api.getSwiper123({e_id:this.e_id}).then(function(e){1e3==e.status&&(e.data.forEach(function(e){e.hall_cover=t.$store.state.ajaxUrl+e.hall_cover,e.showTitle=!0}),t.swiper.imgUrls=e.data)}).catch(function(t){console.log("123模板swiper获取失败",t," at pages\\home\\home.vue:177")}):this.$api.getSwiper456({e_id:this.e_id}).then(function(e){1e3==e.status&&(e.data.forEach(function(e){e.hall_cover=t.$store.state.ajaxUrl+e.hall_cover,e.showTitle=!0}),t.swiper.imgUrls=e.data)}).catch(function(t){console.log("456模板swiper获取失败",t," at pages\\home\\home.vue:192")})},getExhibition:function(t){var e=this;this.$api.getExhibition({e_id:this.e_id}).then(function(a){if(1e3==a.status){var i=[],n=[];a.data.length>4&&e.template<4?e.template=Number(e.template)+3:a.data.length<=4&&e.template>=4&&(e.template=Number(e.template)-3),a.data.forEach(function(t){var a={};a.img=e.$store.state.ajaxUrl+t.hall_cover,a.des=t.hall_summary,a.z_id=t.z_id,a.title=t.hall_name,a.hall_cover=a.img,a.hall_name=a.title,a.hall_summary=a.des,n.push(t.z_id),i.push(a)}),e.template<4?(e.tab.tabTitle=i,e.tab.z_idList=n,t&&t(n)):e.tab.hallList=i,e.$store.commit("setLastHallZid",a.data[0].z_id)}}).catch(function(t){console.log("展厅列表获取失败",t," at pages\\home\\home.vue:235")})},getInteractive:function(t,e,a,i){var n=this;this.$api.getInteractive({z_id:t,i_id:e,page:a}).then(function(t){1e3==t.status?(t.data.forEach(function(e,i){e.hall_cover=n.$store.state.ajaxUrl+e.hall_cover,e.page=a,e.count=t.count}),i&&i(t)):1006==t.status&&i&&i(t)}).catch(function(t){console.log("展项列表获取失败",t," at pages\\home\\home.vue:257")})},changeBigTab:function(t,e){this.tab.currentTab=t,this.$store.commit("setLastHallZid",e)},bindChange:function(t){var e=this.tab.currentTab=t.detail.current;this.$store.commit("setLastHallZid",this.tab.tabTitle[e].z_id);var a={length:this.tab.contents[e].length};this.setHeight(a)},goList:function(e){t.navigateTo({url:"../list/list?z_id="+e.z_id+"&title="+this.title})},goDetail:function(e){e.e_id?t.navigateTo({url:"../detail/detail?e_id="+e.e_id+"&title="+this.title}):t.navigateTo({url:"../detail/detail?z_id="+e.z_id+"&title="+this.title})},setHeight:function(e){var a=this;this.$nextTick(function(){var i=0,n=a.windowHeight/a.scale-652,o=t.createSelectorQuery();switch(a.template){case 1:i=177,o.select(".template1").boundingClientRect(),o.exec(function(o){var s=o&&o[0]&&o[0].height?o[0].height/a.scale:i;console.log("setHeight1:",o,"detailH:",s," at pages\\home\\home.vue:307");var l=Math.max(n,e.length<10?s*e.length+a.loadingHeight-50:s*e.length+a.loadingHeight);a.tab.height=t.upx2px(l)+"px"});break;case 2:i=419,o.select(".template2").boundingClientRect(),o.exec(function(o){var s=o&&o[0]&&o[0].height?o[0].height/a.scale+20:i;console.log("setHeight2:",o,"detailH:",s," at pages\\home\\home.vue:319");var l=Math.max(n,e.length<10?s*Math.ceil(e.length/2)+a.loadingHeight-30:s*Math.ceil(e.length/2)+a.loadingHeight-10);a.tab.height=t.upx2px(l)+"px"});break;case 3:i=577,o.select(".template3").boundingClientRect(),o.exec(function(o){var s=o&&o[0]&&o[0].height?o[0].height/a.scale+20:i;console.log("setHeight3:",o,"detailH:",s," at pages\\home\\home.vue:331");var l=Math.max(n,e.length<10?s*e.length+a.loadingHeight-50:s*e.length+a.loadingHeight-20);a.tab.height=t.upx2px(l)+"px"});break}})}},components:{mySwiper:i,myNav:l,tmpOne:n,tmpTwo:o,tmpThree:s},onReachBottom:function(){var t=this,e=this.tab.currentTab;if(!(this.template>3)&&this.tab.sendAjaxList[e]){var a=this.tab.z_idList[e],i=this.tab.contents[e].slice(-1)[0].z_id,n=1+Number(this.tab.contents[e].slice(-1)[0].page);this.getInteractive(a,i,n,function(a){if(1e3==a.status){var i=t.tab.contents[e],n=a.count;i=i.concat(a.data),t.$set(t.tab.contents,e,i),i.length>=n&&(t.$set(t.tab.sendAjaxList,e,!1),t.$set(t.tab.swiperText,e,"没有更多了"));var o={length:t.tab.contents[e].length};t.setHeight(o)}else 1006==a.status&&(t.$set(t.tab.sendAjaxList,e,!1),t.$set(t.tab.swiperText,e,"没有更多了"))})}}};e.default=c}).call(this,a("6e42")["default"])},"395f":function(t,e,a){"use strict";a.r(e);var i=a("22d9"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);e["default"]=n.a},"41a7":function(t,e,a){"use strict";var i=a("ccc9"),n=a.n(i);n.a},c283:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},ccc9:function(t,e,a){}},[["1fb5","common/runtime","common/vendor"]]]);