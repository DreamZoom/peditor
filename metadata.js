export default {
	backgroundMusic: {
		displayName: "背景音乐",
		type: "music"
	},
	backgroundImage: {
		displayName: "背景图片",
		type: "image"
	},
	backgroundColor: {
		displayName: "背景色",
		type: "color"
	},
	color: {
		displayName: "前景色",
		type: "color"
	},
	fontSize: {
		displayName: "字体大小",
		type: "number"
	},
	effect:{
		displayName: "翻页效果",
		type: "select",
		list:["slide","fade","cube","flip","coverflow"]
	},
	direction:{
		displayName: "翻页方向",
		type: "select",
		list:["horizontal","vertical"]
	},
	loop:{
		displayName: "循环",
		type: "boolean",
	}
}