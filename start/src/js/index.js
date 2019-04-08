require(["./js/config.js"], function() {
	require(["mui", "better", "flexible"], function(mui, BScroll) {
		var p = [...document.querySelectorAll(".p")];
		var page = 1;
		var pageSize = 10;
		var total = 0;
		var searchs="";
		var BScroll;
		var [a, b] = [
			[],
			[]
		];
		BScroll = new BScroll(".boxAll", {
			probeType: 2,
			click: true
		})
		init();

		function init() {
			mui.ajax("/list", {
				dataType: "json",
				type: "get",
				data: {
					page: page,
					pageSize: pageSize,
					search:searchs
				},
				success: function(data) {
					if (data.code == 0) {
						total = data.total;
						render(data.data);
					}
				}
			})
		}
		//渲染
		function render(data) {
			
			var Data = water(data);
			var html = "";
			console.log(Data);
			Data.forEach(function(item, index) {
				item.forEach(function(val, ind) {
					html +=
						`<div style=height:${val.height*1+20}px class="HBox">
							<img src="img/1.png" alt="">
							<h6>${val.name}</h6>
							<div class="word">
							<span>${val.content}</span>
							<span>${val.type==1?"现货":"供应"}</span>
							</div>
							</div>`;
				
				})
					p[index].innerHTML += html;
				 				
			})

			BScroll.refresh();
		}
		//上拉加载
		scroll();

		function scroll() {
			var height = pullUp.offsetHeight;
			BScroll.on("scroll", function() {
				if (page < total) {
					if (this.y < this.maxScrollY - height) {
						pullUp.innerHTML = "释放加载更多";
						pullUp.classList.add("flip");
					} else {
						pullUp.innerHTML = "上拉加载";
						pullUp.classList.remove("flip");
					}
				} else {
					pullUp.innerHTML = "没有更多数据了";
				}

			})
			BScroll.on("scrollEnd", function() {
				if (pullUp.classList.contains("flip")) {
					pullUp.innerHTML = "上拉加载";
					pullUp.classList.remove("flip");
					pullUpFn();
				}
			})

			function pullUpFn() {
				page++;
				if (page <= total) {
					init();
				}

			}
		}
		//瀑布流
		function water(data) {
			data.forEach(function(item, index) {
				if (a.length == 0) {
					a.push(item);
				} else if(b.length==0) {
					b.push(item);
				}
				if (a.reduce((e, l) => e + l.height, 0) < b.reduce((e, l) => e + l.height, 0)) {
					a.push(item);
				} else {
					b.push(item);
				}
			})
			console.log(a,b)
			return [a, b];
		}
		//查询
		search.onkeydown=function(e){
			var e=e||e.event;
			if(e.keyCode==13){
				searchs=search.value;
				p.forEach(function(item){
					item.innerHTML="";
				})
				init();
			}
		}
		//点击发布商品
		outthing.onclick = function() {
			window.location.href = "./detail.html";
		}
	})
})
