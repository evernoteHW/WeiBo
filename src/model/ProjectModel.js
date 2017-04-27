/**
 * FavoriteDao
 * @flow
 */
'use strict';

export default function ProjectModel(id,name,full_name,avatar_url,description,created_at){
  this.key         = id
  this.id          = id;
  this.name        = name;
  this.full_name   = full_name;
  this.avatar_url  = avatar_url;
  this.description = description;
  this.created_at  = created_at;
  
}