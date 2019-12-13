import request from './sendRequest'
export default {
	// send
	hasLogin : data => request('getOpenid.php','post', data),
	saveInfo : data => request('avatar.php', 'post', data),
	sendMsg : data => request('message.php','post',data),
	getSendList :data => request('getDataAll.php', 'post', data)
}