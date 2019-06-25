export  class DisscussItem {
	constructor(uid,id,headphoto,headname,score,readstate,content,createtime,commentNums,praiseid,praiseNums,replyList,tagList) {
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
		this.praiseNums = praiseNums;
		this.replyList = replyList;
		this.tagList = tagList;
    }
}
export  class searchListItem {
	constructor(id,authorphoto,authorname,photo,createtime,title,ispay,ispublic,price) {
		this.id = id;
		this.authorphoto = authorphoto;
		this.authorname = authorname;
		this.photo = photo;
		this.createtime = createtime;
		this.title = title;
		this.ispay = ispay;
		this.ispublic = ispublic;
		this.price = price;
    }
}