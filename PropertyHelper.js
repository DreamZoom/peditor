export default {
	Metadata: {
		backgroundColor:{
			displayName:"背景色",
			type:"color"
		},
		color:{
			displayName:"前景色",
			type:"color"
		},
		fontSize:{
			displayName:"字体大小",
			type:"number"
		}
	},
	GetPropertys: function(obj) {
		
		
		var propertys = [];
		if(obj==null) return propertys;
		
		

		for(var field in obj.propertys) {
			var meta = this.Metadata[field];
			if(meta==null) continue;
			propertys.push({
				name: field,
				displayName:meta.displayName,
				type:meta.type
			})
		}
		return propertys;

	}

}