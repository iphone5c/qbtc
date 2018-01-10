<template>
	<div>
		<div class="notice-wrapper" >
			<ul>
				<li v-for="data in noticeList" @click="newsCode">
				<router-link :to="{name: 'article', params: { id: data.code }}">
					<h5>{{data.title}}</h5>
					<p v-html="(data.content)">
					</p>
					<div class="explain">
						<div class="author">
							<i></i>
							<span>{{data.creatAdmin}}</span>
						</div>
						<div class="time">
							<i></i>
							<span>{{data.creatTime}}</span>
						</div>
					</div>
				</router-link>
				</li>
				
			</ul>
			<div class="pagingStrip" v-if="isPage">
				<el-pagination
					layout="prev, pager, next"
					:total="total"
					@current-change="nextPage"
					:current-page="pageIndex">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import {getArticleList} from '@/utils/api'
import {mapState, mapMutations} from 'vuex'
export default {
	name: 'hello',
	data() {
		return {
			noticeList: [],
			total: 1,
			pageIndex: 1,
			isPage: false,
		}
	},
	components: {
	},
	mounted: function () {
		this.getList();
	},
	methods: {
		...mapMutations([
            'NEWS_CODE'
        ]),
		async getList(){
			let res = await getArticleList(1,this.pageIndex,5);
			if(!res){
				return
			}
			this.noticeList = res.result.list;
			this.total =parseInt(res.result.pageCount) * 10;
			this.isPage = true;
		},
		async nextPage(val){
			this.pageIndex = val;
			this.getList();
		},
		// 新闻code
	    newsCode(){
	    	this.NEWS_CODE(0);	
	    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
	@import '../../../style/mixin';
	.notice-wrapper{
		.pagingStrip{
			padding: 30px 0;
			text-align: center;
		}
		ul{
			width: 1200px;
			margin: 0 auto;
			li {
				width: 100%;
				background: #fff;
				border-radius: 10px;
				border: 1px solid #E4E4E4;
				padding: 20px;
				text-align: left;
				margin: 20px 0;
				a{
					color: #000;
					text-decoration: none;
				}
				h5{
					white-space: nowrap;
				    overflow: hidden;
				    text-overflow: ellipsis;
					padding-bottom: 20px;
					font-weight: 300;
					font-size: 18px;
				}
				p{
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					color: #5a5a5a;
					text-align: left;
					line-height: 26px;
				}
				.explain{
					padding-top: 20px;
					overflow: hidden;
					.time{
						float: right;
						margin-right: 50px;
						i{
							display: inline-block;
							vertical-align: middle;
							@include wh(18px,18px);
							@include bis("../../../assets/article/time-icon.png");
						}
					}
					.author{
						float: right;
						margin-right: 20px;
						i{
							display: inline-block;
							vertical-align: middle;
							@include wh(18px,18px);
							@include bis("../../../assets/article/author-icon.png");
						}
					}
				}
			}
			li:hover {
				border: 1px solid #5c96e9;
				cursor: pointer;
			}
		}
	}
</style>
