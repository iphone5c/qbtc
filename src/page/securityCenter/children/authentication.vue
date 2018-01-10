<template>
	<div class="authentication">
		<div class="title">
			<p>{{$t("security_page.41")}}</p>
			<div class="line"></div>
		</div>
		<div class="junior-certification" v-if="type == '1'">
			<div class="realName">
				<img src="../../../assets/safetyCenter/securityName.png" alt="">
				<p class="title">{{$t("security_page.42")}}</p>
				<p class="text">{{$t("security_page.43")}}</p>
			</div>
			<div class="authenticationForm">
				<div class="item">
					<span class="title">{{$t("security_page.44")}}</span>
					<el-input :placeholder="($t('security_page.45'))" v-model="realName"></el-input>
					<p>{{$t("security_page.46")}}</p>
					<p>{{$t("security_page.47")}}</p>
				</div>
				<div class="item">
					<span class="title">{{$t("security_page.48")}}</span>
					<el-select v-model="countryIndex" :placeholder="($t('security_page.49'))">
					    <el-option v-for="item in countryVlaue" :key="item.value" :label="item.label" :value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="item">
					<span class="title">{{$t("security_page.50")}}</span>
					<el-select v-model="certificatesIndex" :placeholder="($t('security_page.50'))" class="certificatesType">
					    <el-option v-for="item in certificatesVlaue" :key="item.value" :label="item.name" :value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="item">
					<span class="title">{{$t("security_page.51")}}</span>
					<el-input :placeholder="($t('security_page.51'))" class="certificatesNum" v-model="certificatesNum"></el-input>
				</div>
				<div class="promise"><el-checkbox v-model="checked">{{$t("security_page.52")}}</el-checkbox></div>
				<el-button type="primary" class="confirm" @click="primaryAuthentication">{{$t("security_page.53")}}</el-button>
			</div>
		</div>
		<div class="advanced-certification" v-else-if="type == '3'">
			<div class="tips">
				{{$t("security_page.54")}}
			</div>
			<div class="userinfo">
				<p><label>{{$t("security_page.55")}}</label><span>{{name}}</span></p>
				<p><label>{{$t("security_page.56")}}</label><span>{{idType}}</span></p>
				<p><label>{{$t("security_page.57")}}</label><span>{{idCard}}</span></p>
			</div>
			<div class="upload-photo">
				<div class="item">
					<div class="item-img">
						<img v-if="imageUrlOne" :src="imageUrlOne" class="avatar">
						<img v-else src="../../../assets/safetyCenter/positive.png" alt="">
					</div>
					<p class="prompt">{{$t("security_page.58")}}</p>
					<el-upload
					  class="avatar-uploader"
					  :action="fileUrls"
					  :show-file-list="false"
					  :on-success="imgOneSuccess"
					  :before-upload="beforeAvatarUpload"
					  list-type="picture">
					  <el-button size="small" type="primary">{{$t("security_page.59")}}</el-button>
					</el-upload>
				</div>
				<div class="item">
					<div class="item-img">
						<img v-if="imageUrlTwo" :src="imageUrlTwo" class="avatar">
						<img v-else src="../../../assets/safetyCenter/back.png" alt="">				
					</div>
					<p class="prompt">{{$t("security_page.60")}}</p>
					<el-upload
					  class="avatar-uploader"
					  :action="fileUrls"
					  :show-file-list="false"
					  :on-success="imgTwoSuccess"
					  :before-upload="beforeAvatarUpload"
					  list-type="picture">
					  <el-button size="small" type="primary">{{$t("security_page.59")}}</el-button>
					</el-upload>
				</div>
				<div class="item">
					<div class="item-img">
						<img v-if="imageUrlThree" :src="imageUrlThree" class="avatar">
						<img v-else src="../../../assets/safetyCenter/hold.png" alt="">				
					</div>
					<p class="prompt">{{$t("security_page.61")}}</p>
					<el-upload
					  class="avatar-uploader"
					  :action="fileUrls"
					  :show-file-list="false"
					  :on-success="imgThreeSuccess"
					  :before-upload="beforeAvatarUpload"
					  list-type="picture">
					  <el-button size="small" type="primary">{{$t("security_page.59")}}</el-button>
					</el-upload>
				</div>
			</div>
			<div class="tips-text">
				<p>{{$t("security_page.62")}}</p>
				<p>{{$t("security_page.63")}}</p>
				<p>{{$t("security_page.64")}}</p>
				<p>{{$t("security_page.65")}}</p>
				<p>{{$t("security_page.66")}}</p>
			</div>
			<el-button type="primary" class="confirm" @click="seniorAuthentication">{{$t("security_page.53")}}</el-button>
		</div>
		<div class="junior-success" v-else-if="type == '2'">
			<div class="junior-tips">
				<img src="../../../assets/safetyCenter/securityName.png" alt="">
				<p class="title" v-if="isExamine == 3">{{$t("security_page.67")}}</p>
				<p class="title" v-if="isExamine == 2">{{$t("security_page.68")}}</p>
				<p class="title" v-if="isExamine == 4">{{$t("security_page.69")}}</p>
				<p class="title" v-if="isExamine == 5">{{$t("security_page.70")}}</p>
				<p class="text" v-if="isExamine != 4 && isExamine != 5">{{$t("security_page.71")}}</p>
			</div>
			<div class="junior-info" v-if="isExamine == 3 || isExamine == 4|| isExamine == 5">
				<p class="title">{{$t("security_page.72")}}</p>
				<p><label>{{$t("security_page.55")}}</label><span>{{name}}</span></p>
				<p><label>{{$t("security_page.56")}}</label><span>{{idType}}</span></p>
				<p><label>{{$t("security_page.57")}}</label><span>{{idCard}}</span></p>
				<p v-if="isExamine!=4 && isExamine!=5"><label>{{$t("security_page.73")}}</label><span class="go-junior" @click="type = 3">{{$t("security_page.74")}}</span></p>
			</div>
		</div>
	</div>

</template>

<script>
import {mapState, mapMutations,mapActions} from 'vuex'
import {getCertType,primaryTrueName,seniorTrueName} from '@/utils/api'
import {fileUrl} from '@/utils/env'
	export default {
		data () {
			return {
				countryVlaue: [],
			    countryIndex: '', // 国家地区
			    checked: false,
			    type: 1,
			    imageUrlOne: '',
			    imageUrlTwo: '',
			    imageUrlThree: '',
			    certificatesIndex: '', // 证件类型
				certificatesNum:'',    // 证件号
	        	certificatesVlaue: [],  // 证件类型数据
	        	realName: '',  // 真实姓名
	        	positivePhoto: '', // 正面照
	        	backPhoto: '', // 背面照
	        	holdPhoto: '',// 持证照
	        	isExamine: 0,
	        	idType: '',
	        	idCard: '',
	        	name: '',
	        	fileUrls: fileUrl+'/access/file/upload',
			}
		},
		components: {
		},
		computed: {
            ...mapState([
                'userinfoList','language'
            ]),
        },
        created: function () {
			this.$i18n.locale = this.language;
	    	this.countryVlaue=[
	    		{
			      value: '1',
			      label: this.$t('security_page.75')
			    }, {
			      value: '2',
			      label: this.$t('security_page.76')
			    }
	    	]
		},
		async mounted() {
			this.isExamine = this.userinfoList.isRealVerify;
			this.idType = this.userinfoList.idType;
			this.idCard = this.userinfoList.idCard;
			this.name = this.userinfoList.realName;
			if(this.isExamine != 1){
				this.type = 2;
			}
			let res = await getCertType();
			this.certificatesVlaue = res.result;
		},
		methods: {
			...mapMutations([
                'REALNAME_GRADE'
            ]),
            ...mapActions([
                'getUser'
            ]),
			bindSuccess() {
		        this.$alert(this.$t('security_page.10'), this.$t('security_page.169'), {
					confirmButtonText: this.$t('security_page.170'),
				    callback: action => {
				  		window.location.reload();
				    }
				});
			},
			// 上传正面照
			imgOneSuccess(res, file) {
			    this.imageUrlOne = URL.createObjectURL(file.raw);
			    if(!res){
			    	return
			    }
			    this.positivePhoto = res.result[0].filePath;
			},
			// 上传背面照
			imgTwoSuccess(res, file) {
			    this.imageUrlTwo = URL.createObjectURL(file.raw);
			    if(!res){
			    	return
			    }
			    this.backPhoto = res.result[0].filePath;
			},
			// 上传手持照
			imgThreeSuccess(res, file) {
			    this.imageUrlThree = URL.createObjectURL(file.raw);
			    if(!res){
			    	return
			    }
			    this.holdPhoto = res.result[0].filePath;
			},
			// 上传照片验证
			beforeAvatarUpload(file) {
			    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
			    const isLt2M = file.size / 1024 / 1024 < 2;
			    if (!isJPG) {
			    	this.$message.error(this.$t('security_page.77'));
			    }
			    if (!isLt2M) {
			    	this.$message.error(this.$t('security_page.78'));
			    }
			    return isJPG && isLt2M;
			},
			// 初级实名认证
			async primaryAuthentication(){
				if(!this.realName){
					this.$message.error(this.$t('security_page.79'));
	          		return
				}
				if(!this.countryIndex){
					this.$message.error(this.$t('security_page.80'));
	          		return
				}
				if(!this.certificatesIndex){
					this.$message.error(this.$t('security_page.81'));
	          		return
				}
				if(!this.certificatesNum){
					this.$message.error(this.$t('security_page.82'));
	          		return
				}
				if(!this.checked){
					this.$message.error(this.$t('security_page.83'));
	          		return
				}
				let res = await primaryTrueName(this.realName,this.countryIndex,this.certificatesIndex,this.certificatesNum);
				if(!res){
					return
				}
				this.bindSuccess();
				this.getUser();
				this.REALNAME_GRADE(this.isExamine);
			},
			// 高级实名认证（上传证件照）
			async seniorAuthentication(){
				if(!this.positivePhoto){
					this.$message.error(this.$t('security_page.84'));
	          		return
				}
				if(!this.backPhoto){
					this.$message.error(this.$t('security_page.85'));
	          		return
				}
				if(!this.holdPhoto){
					this.$message.error(this.$t('security_page.86'));
	          		return
				}
				let res = await seniorTrueName(this.positivePhoto,this.backPhoto,this.holdPhoto);
				if(!res){
					return
				}
				this.bindSuccess();
				this.getUser();
				this.REALNAME_GRADE(this.isExamine);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped="" type="text/css">
 @import '../../../style/mixin';
	.authentication{
		width: 1200px;
		background-color: #fff;
		margin: 0 auto;
		padding: 30px 50px;
		margin-top: 30px;
		min-height: 460px;
		>.title{
			padding: 30px 0;
			overflow: hidden;
			p{
				float: left;
				font-size: 16px;
			}
			.line{
				float: right;
				@include wh(990px,1px);
				height: 1px;
				background-color: #EEEEEE;
				margin-top: 10px;
			}
		}
	}
	.junior-certification{
		.realName{
			width: 100%;
			background-color: #F4F4F4;
			padding: 20px 0;
			overflow: hidden;
			img{
				float: left;
				margin-left: 30px;
			}
			p{
				float: left;
				margin-left: 50px;
				width: 70%;
			}
			.title{
				margin-top: 30px;
				font-weight: 600;
			}
			.text{
				margin-top: 10px;
			}
		}
		.authenticationForm{
			width: 100%;
			margin-top: 30px;
			.item{
				padding: 15px 0;
				.title{
					display: inline-block;
					width: 100px;
				}
				.el-input,.el-select{
					width: 320px;
				}
				p{
					padding-left: 106px;
					margin-top: 10px;
					color: #8e8e8e;
				}
			}
			.promise{
				padding-left: 106px;
			}
			.confirm{
				margin-top: 30px;
				margin-left: 106px;
				background-color: #5C96E9;
				border-color: #5C96E9;
				padding: 12px 30px;
			}
			.confirm:hover{
				background-color: #649BED;
	   			border-color: #649BED;
			}
		}
	}
	.advanced-certification{
		.tips{
			width: 100%;
			padding: 30px 20px;
			background-color: #F6F6F6;
		}
		.userinfo{
			margin-top: 20px;
			p{
				padding: 10px 0;
				label{
					display: inline-block;
					width: 86px;
					text-align: right;
					margin-right: 18px;
				}
			}
		}
		.upload-photo{
			padding-top: 30px;
			overflow: hidden;
			.item{
				float: left;
				width: 300px;
				margin-right: 30px;
				.item-img{
					@include wh(100%,206px);
					text-align: center;
					line-height: 206px;
					overflow: hidden;
					.avatar{
						max-width: 100%;
						max-height: 100%;
					}
				}
				.prompt{
					width: 100%;
					text-align: center;
					padding-top: 20px;
				}
				.avatar-uploader{
					padding-top: 20px;
					text-align: center;
					button{
						padding: 10px 30px;
						background: none;
						color: #20a0ff;
					}
				}
			}
		}
		.tips-text{
			padding-top: 40px;
			p{
				line-height: 30px;
			}
		}
		.confirm{
			margin-top: 30px;
			background-color: #5C96E9;
			border-color: #5C96E9;
			padding: 12px 30px;
		}
		.confirm:hover{
			background-color: #649BED;
   			border-color: #649BED;
		}
	}
	.junior-success{
		.junior-tips{
			width: 100%;
			background-color: #F4F4F4;
			padding: 20px 0;
			overflow: hidden;
			img{
				float: left;
				margin-left: 30px;
			}
			p{
				float: left;
				margin-left: 50px;
				width: 70%;
			}
			.title{
				margin-top: 30px;
				font-weight: 600;
			}
			.text{
				margin-top: 10px;
			}
		}
		.junior-info{
			padding-top: 30px;
			p{
				padding: 10px 0;
				label{
					display: inline-block;
					width: 86px;
					text-align: right;
					margin-right: 18px;
				}
				.go-junior{
					color: #5c96e9;
					cursor: pointer;
				}
			}
			.title{
				font-size: 18px;
				font-weight: 400;
			}
		}
	}
</style>
