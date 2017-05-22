function play68_init() {
	updateShare(0);
}
function play68_submitScore(score) {
	updateShareScore(score);
	Play68.shareFriend();
	// setTimeout( function() { Play68.shareFriend(); }, 500 )
}
function updateShare(score) {
	var descContent = "投篮高手";
   if(score > 0) {
		shareTitle = "哈哈！我投了"+score+"分，投篮高手舍我其谁！";
	}
	else{
		shareTitle = "NBA投篮大赛开赛！来秀秀你的球技吧！";
	}
	appid = '';
	Play68.setShareInfo(shareTitle,descContent);
	document.title = shareTitle;
}
function updateShareScore(score) {
	updateShare(score);
}
