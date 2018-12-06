new Vue({
	el:'#headTitle',
	data:{
		titles:[
			{text:'信息'},
			{text:'商品金额'},
			{text:'商品数量'},
			{text:'总金额'},
			{text:'编辑'}
		]
	}
})

new Vue({
	el:'#starlist',
	data:{
		productlist:[],
		allCounts:0,
		checkall:false
	},
	mounted:function(){
		 this.$nextTick(function() {
     		 this.cartView();
   		 })
	},
	filters:{
		formatMoney:function(value){
			return "$"+value;
		}
	},
	methods:{
		cartView:function(){
			let _t=this;
			this.$http.get("car.json").then(res=>{
				if(res.body.callback){
					_t.productlist=res.body.carlist;
				}
			});
		},
		checkClick:function(item){
			if(typeof item.checks =='undefined'){
				Vue.set(item,"checks",true);   		 //全局注册不存在变量
				//this.$set(item,"checks",true);	 //局部注册不存在变量
			}else{
				item.checks = !item.checks;
			}
			this.totalMoney();

		},
		cutCounts:function(item){
			if(item.counts>0){
				item.counts-- ;
			}
			this.totalMoney();
		},
		addCounts:function(item){
				item.counts++;
				this.totalMoney();
		},
		chooseAll:function(){
				let _t = this;
				this.checkall = !this.checkall;
				if(this.checkall){
					this.productlist.forEach(function(value,index){
						if(typeof value.checks == 'undefined'){
							_t.$set(value,"checks",true);
						}else{
								value.checks = true;
						}
					});
				}else{
					this.productlist.forEach(function(value,index){
						if(typeof value.checks == 'undefined'){
							_t.$set(value,"checks",false);
						}else{
								value.checks = false;
						}
					});
				}
				_t.totalMoney();
		},
		totalMoney:function(){
				let _t = this;
				_t.allCounts = 0;
				_t.productlist.forEach((value,index)=>{
					if(value.checks){
						_t.allCounts += value.money*value.counts;
					}
				});
		},
		deleteItem:function(item){
			if(confirm("你确定删除吗？")){
				let index = this.productlist.indexOf(item);
				this.productlist.splice(index,1);
			}
		}
	}
})
