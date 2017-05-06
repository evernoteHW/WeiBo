
import WeiBoUserModel from './WeiBoUserModel'

export default function ProjectModel(item){

	this.annotations             = item.annotations
	this.attitudes_count         = item.attitudes_count
	this.biz_feature             = item.biz_feature
	this.comments_count          = item.comments_count
	this.created_at              = item.created_at
	this.favorited               = item.favorited
	
	this.hasActionTypeCard       = item.hasActionTypeCard
	this.id                      = item.id
	this.idstr                   = item.idstr
	this.in_reply_to_screen_name = item.in_reply_to_screen_name
	this.in_reply_to_status_id   = item.in_reply_to_status_id
	this.isLongText              = item.isLongText
	this.is_show_bulletin        = item.is_show_bulletin
	this.mid                     = item.mid
	this.mlevel                  = item.mlevel
	this.positive_recom_flag     = item.positive_recom_flag
	this.reposts_count           = item.reposts_count
	this.source                  = item.source
	this.source_allowclick       = item.source_allowclick
	this.source_type             = item.source_type
	this.text                    = item.text
	this.textLength              = item.textLength
	this.truncated               = item.truncated
	let user                     = new WeiBoUserModel(item.user)
	this.user                    = user
	this.key                     = item.id
	this.gif_ids                 = item.gif_ids
	this.thumbnail_pic           = item.thumbnail_pic	//可有可无
	//获取图片

	if (this.gif_ids && this.gif_ids !== '' && this.thumbnail_pic && this.thumbnail_pic !== '') {
		var gif_ids_array 		 = this.gif_ids.split('|')
		var gif_ids_array_url	 = []
		//去掉 后缀名 重新拼接字符串
		let path_extension_not = this.thumbnail_pic.lastIndexOf('/') + 1
		let base_url = this.thumbnail_pic.substr(0,path_extension_not)
		for (var i = 0; i < gif_ids_array.length; i++) {
			gif_ids_array_url.push({key: `${base_url}${gif_ids_array[i]}.jpg`})
		}
		this.gif_ids_array_url = gif_ids_array_url
	}
	
	
}

