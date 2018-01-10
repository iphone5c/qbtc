import {
	getUserinfo
} from '@/utils/api'
import {
	SAVE_USERINFO
} from '@/store/mutation-types.js'

export default {
	async getUser({
		commit,
		state
	}) {
		let res = await getUserinfo();
		if(!res){
			return
		}
		commit(SAVE_USERINFO,res.result);
	}
}