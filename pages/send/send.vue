<template>
	<view>
		<view class="content">
			<view class="list-content">
				<scroll-view scroll-y style="height:100%" scroll-with-animation="true" :scroll-top='scrollTop'>
					<ul>
						<li v-for="(item, index) in list" :key="index">
							<view class="say">{{item.content}}</view>
							<open-data class="img" type="userAvatarUrl"></open-data>
						</li>
					</ul>
				</scroll-view>
				
			</view>
			<view class="send-content">
				<input v-model="msg" placeholder="请输入30字以内的内容" maxlength="30" type="text">
				<view class="send-btn" @tap="sendMsg">发送</view>
			</view>
		</view>
		<!-- 登录模态框 -->
		<view class="modal" v-if="showModal">
		  <view class="h1">您还未登录</view>
		  <view class="h2">请登录后进行留言</view>
		  <view class="flex-space btn-box">
		    <view class="btn" @tap="showOrHideModal">暂不登录</view>
		    <button class='btn' open-type="getUserInfo" @getuserinfo="getUserInfo">点击登录</button>
		  </view>
		</view>
	</view>
</template>

<script>
	const number = '789865';
	export default {
		data() {
			return {
				msg:'',
				hasLogin:false,
				showModal:false,
				openid:'',
				list:[],
				scrollTop: 0
			}
		},
		methods: {
			// send
			sendMsg(){
				if(!this.hasLogin) return this.showOrHideModal();
				if(!this.msg) return this.$common.showTips('发送内容不可为空！');
				this.$sendApi.sendMsg({
					openid: this.openid,
					message: this.msg,
					number
				}).then(res=>{
					if(res.code == 200) {
						this.msg = '';
						this.getSendList();
					}
				})
			},
			getSendList(){
				this.$sendApi.getSendList({
					openid: this.openid,
					number
				}).then(res=>{
					if(res.code == 200) {
						this.list = res.data;
						this.scrollTop += 20000000;
					}
				})
			},
			
			// login
			showOrHideModal(){
				this.showModal = !this.showModal;
			},
			getUserInfo(e){
				const info = {
					openid: this.openid,
					avatar: e.target.userInfo.avatarUrl,
					nickname: e.target.userInfo.nickName
				}
				this.$sendApi.saveInfo(info).then(res=>{
					if(res.code == 200)
						this.$common.showTips('登录成功','success',this.showOrHideModal);
						this.hasLogin = true;
				})
			}
		},
		onLoad() {
			uni.login({
			  success:  res => {
					this.$sendApi.hasLogin({
						code: res.code,
						number
					}).then(res=>{
						if(res.code == 200){
							this.hasLogin = res.data.status == 3;
							this.openid = res.data.openid||'';
							this.$store.commit('setOpenId', this.openid);
							this.$store.commit('setAvatar',res.data.avatar||'');
							if(this.hasLogin) this.getSendList();
						}
					})
			  }
			});
		},
		onShareAppMessage() {
			
		}
	}
</script>

<style scoped>
	.content{
		padding: 20upx;
		padding-bottom: 140upx;
		height: 100vh;
		box-sizing: border-box;
	}
	/* 消息历史列表 */
	.content .list-content{
		width: 100%;
		height:100%;
	}
	.content .list-content li{
		display: flex;
		justify-content: flex-end;
		align-content: center;
		margin: 30upx 0;
	}

	.content .list-content li .say{
		position: relative;
		max-width: 520upx;
		background-color: rgb(158,234,106);
		border-radius: 20upx;
		line-height: 40upx;
		padding: 20upx;
		font-size: 30upx;
		word-break: break-word;
	}

	.content .list-content li .say:after{
		content:'';
		width: 0;
		height: 0;
		border: 20upx solid transparent;
		border-left-color: rgb(158,234,106);
		position: absolute;
		right:0;
		top: 46upx;
		transform: translate(34upx, -50%);
	}

	.content .list-content li .img{
		width: 80upx;
		height:80upx;
		margin-left:40upx;
	}

	/* 发送 */
	.send-content{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-content: center;
		padding: 20upx;
		padding-bottom: 40upx;
		box-sizing: border-box;
		border-top: 1px solid #ddd;
	}

	.send-content input{
		padding: 10upx 20upx;
		width: 76%;
		heigh: 40upx;
		border: 1px solid #ccc;
		font-size: 30upx;
	}

	.send-content .send-btn{
		font-size: 34upx;
		border-radius: 10upx;
		background-color: #4CB964;
		padding: 10upx;
		width: 13%;
		text-align: center;
		color: #fff;
		line-height: 50upx;
	}

	/* 模态框 */
	.modal{
		width:500upx;
		height: 400upx;
		background-color: #fff;
		border-radius: 10upx;
		position: absolute;
		left: 50%;
		top: 45%;
		transform:translate(-50%,-50%);
		padding:30upx 0;
		box-sizing: border-box;
	}

	.h1{
		margin-top: 28upx;
		text-align: center;
		font-size: 32upx;
		font-weight: 700;
	}

	.h2{
		margin-top: 60upx;
		text-align: center;
		font-size: 24upx;
		color:#ccc;
	}

	.btn-box{
		margin-top: 100upx;
	}

	.btn{
		width:150upx;
		height:50upx;
		text-align: center;
		line-height: 50upx;
		font-size: 24upx;
		color:#39b0f2;
		border:1px solid #39b0f2;
		margin:0 10upx;
		border-radius: 50upx;
		padding:0;
	}

	.btn:nth-child(2){
		color:#fff;
		background-color: #39b0f2;
	}

	.flex-space{
		display: flex;
		justify-content: space-around;
		align-content: center;
	}
</style>
