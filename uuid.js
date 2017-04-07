
export default {
   num:0,
   NewID:function(){
   	   this.num++;
   	   return new Date().getTime()+"_"+this.num;
   }

}