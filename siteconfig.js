export default {
   SITE_DOMAIN:"http://localhost:6531/",
   SITE_RESOURCE_MANAGER_API:"http://localhost:6531/resource",
   URL:function(url){
   	  return this.SITE_DOMAIN + url;
   }
}