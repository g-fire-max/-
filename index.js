
//导航栏下滑出现的监听事件
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop")

//监听滚动条事件
window.addEventListener("scroll",() => {

    let height = headerEl.getBoundingClientRect().height;
    //  console.log(window.pageYOffset);
     //判断导航栏什么时候出现
    if(window.pageYOffset - height > 800) {
        if(!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }   
    } else {
        headerEl.classList.remove("sticky")
    }
    
     //判断回到顶部按钮何时出现
     if(window.pageYOffset > 2000) {
         scrollToTop.style.display = "block";
     } else {
         scrollToTop.style.display = "none"
     }

})




// glide.js
const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");

//监听事件
glide.on(["mount.after", "run.after"],() => {
    //先获取当前的轮播
    const caption = captionsEl[glide.index];
    //获取实例之后设置动画
    anime({
        //传递一些配置选项
        //1.要让谁动
        targets:caption.children,
        //2.透明度变化   当opaci为1时下次不会变  [0,1]就会变
        opacity: [0,1],
        //3.动画执行时间
        duration:400,
        //4.动画执行函数 
        easing:"linear",
        //5.stagger函数会对caption的每一个children，都会轮流加上数字
        //例 第一个参数 当h1出现后400毫秒再出现h3  第二个参数 {start}  h1出现之前先等300毫秒
         delay:anime.stagger(400,{start:300}),
        //向上移  40 h1  、25 h3 、 10 button
        traslateY:[anime.stagger([40,10]),0]
    });
});


//在轮播跑起之前opacity为0
glide.on("run.before",() => {
    document.querySelectorAll(".slide-caption > *").forEach(el => {
        el.style.opacity = 0;
    })
})

glide.mount();

// 成功案例的筛选
const isotope = new Isotope(".cases",{
    // 根据行模式布局，每一行占满自动换下一行
    layoutMode:"fitRows",
    itemSelector:".case-item"
})

// 获取筛选按钮的实例
const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
   let { target } = e;
   
   const filterOption = target.getAttribute("data-filter");
   if(filterOption) {
       document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
       target.classList.add("active");

       isotope.arrange({filter: filterOption});
   }
})


//scrollReveal.js  
const staggeringOption = {
    delay:300,
    distance:"50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};

//关于我们和服务流程的动画
ScrollReveal().reveal(".feature",{ ...staggeringOption,interval:350});
ScrollReveal().reveal(".service-item",{ ...staggeringOption,interval:350});

//数据展示区域 数字增长动画
const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: el => {
                return [0, el.innerHTML]
            },
            duration: 2000,
            round: 1,//着自按加一增长
            easing: "easeInExpo"
        });
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`;
    }
});

//滚动鼠标图片位置改变
window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;
  
    if(bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`;
    }
})

//点击导航栏流畅调到相应的位置
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]',{
    header:"header",
    offset:80
});


document.addEventListener("scrollStart", () => {
    if(headerEl.classList.contains("open")) {
        headerEl.classList.remove("open");
    }
})

//探索按钮 跳转到关于页面
const exploreBtnEl = document.querySelectorAll(".explore-btn");

exploreBtnEl.forEach(exploreBtnEl => {
    exploreBtnEl.addEventListener("click",() => {
        scroll.animateScroll(document.querySelector("#about-us"));
    })
})

//导航栏折叠按钮
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open");
})