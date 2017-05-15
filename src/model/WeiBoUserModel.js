export default function WeiBoUserModel(item){
	if (typeof item == "undefined") {return}
		
	this.id                 = item.id;
	this.screen_name        = item.screen_name;
	this.name               = item.name;
	this.province           = item.province;
	this.city               = item.city;
	this.location           = item.location;
	this.description        = item.description;
	this.url                = item.url;
	this.profile_image_url  = item.profile_image_url;
	this.domain             = item.domain;
	this.gender             = item.gender;
	this.followers_count    = item.followers_count;
	this.created_at         = item.created_at;
	this.following          = item.following;
	this.allow_all_act_msg  = item.allow_all_act_msg;
	this.remark             = item.remark;
	this.geo_enabled        = item.geo_enabled;
	this.verified           = item.verified;
	this.allow_all_comment  = item.allow_all_comment;
	this.verified_reason    = item.verified_reason;
	this.follow_me          = item.follow_me;
	this.online_status      = item.online_status;
	this.bi_followers_count = item.bi_followers_count;
	this.avatar_large       = item.avatar_large
	this.avatar_hd          = item.avatar_hd
	this.friends_count      = item.friends_count
	this.statuses_count     = item.statuses_count
	this.favourites_count   = item.favourites_count
}
