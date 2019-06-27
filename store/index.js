import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		returnData:"1111111111",
		hasLogin: false,
		loginProvider: "",
		openid: null,
		userid: "1329",
		phone: "",
		phoneNumber: "",
		modifyRandomNumbers:"", 
	},
	mutations: {
		getPhoneNumber(state,phone){
			state.phoneNumber = phone
		},
		addInfo(state,editData) {
			state.returnData = editData;
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		updateUserid(state,bool){
			state.userid = bool;
		},
		updateTitle(state,bool){
			state.title = bool;
		},
		modifyPhoneNumber(state, phone) {
			state.phone = phone;
		},
		modifyRandomNumber(state,modifyRandomNumbers){
			state.modifyRandomNumbers = modifyRandomNumbers;
		}
	},
	actions: {
		changePhoneNumber(ctx, phone){
			ctx.commit('getPhoneNumber',phone)
		},
		addInfo(ctx, editData){
			ctx.commit('addInfo',editData)
		},
		changeTitle(context,bool){ 
			context.commit("updateTitle",bool);
		},
		changeUserid(context,bool){
			context.commit("updateUserid",bool);
		},
		modifyPhoneNumber (ctx, phone){
			ctx.commit('modifyPhoneNumber', phone)
		},
		modifyRandomNumber(ctx,modifyRandomNumbers){
			ctx.commit('modifyRandomNumber', modifyRandomNumbers)
		},
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
