require(["./js/config.js"],function(){
	require(["mui"],function(mui){
		var type=0;
		var spans=[...document.querySelectorAll(".typeBox span")];
		//点击选择类型
		spans.forEach(function(item,index){
			item.onclick=function(){
				type=this.dataset.type;
				spans.forEach(function(v){
					v.classList.remove("active");
				})
				this.classList.add("active");
			}
		})
		//点击创建创建商品
		newthing.onclick=function(){
			
			mui.ajax("/add",{
				dataType:"json",
				type:"post",
				data:{
					name:names.value,
					content:beizhu.value,
					height:heights.value,
					price:txt.value,
					type:type
				},
				success:function(data){
					if(data.code==0){
						alert(data.msg)
						window.location.href="./index.html";
					}
				}
			})
		}
		var chooses=[...document.querySelectorAll(".choose")];
		chooses.forEach(function(item,index){
			item.onclick=function(){
				document.querySelector(".titleBox").classList.toggle("none");
			}
		})
		mui(".titleBox").on("tap","p",function(){
			document.querySelector(".titleBox").classList.toggle("none");
		})
	})
})