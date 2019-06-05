export default class DisscussItem {
	constructor(uid,id,headphoto,headname,score,readstate,content,createtime,commentNums,praiseid,commentLikeNums,replyList,tagList) {
		this.uid = uid;
		this.id = id;
		this.headphoto = headphoto;
		this.headname = headname;
		this.score = score;
		this.readstate = readstate;
		this.content = content;
		this.createtime = createtime;
		this.commentNums = commentNums;
		this.praiseid = praiseid;
		this.commentLikeNums = commentLikeNums;
		this.replyList = replyList;
		this.tagList = tagList;
    }
}