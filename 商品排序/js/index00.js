let list=document.getElementById("list");
let header=document.getElementById("header");
let btnList=header.getElementsByTagName("a");

let data=null;
let xhr=new XMLHttpRequest;
xhr.open("get","data/product.json",false);
xhr.onreadystatechange=function () {
    if (xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)) {
        data=JSON.parse(xhr.responseText)
    }
}
xhr.send(null);

function bindHtml(data) {
    let str='';
    data.forEach((item)=>{
        str += `
             <li>
            <a href="javascript:;">
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <p class="hot">热度:${item.hot}</p>
                <del>$9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </a>
        </li>
        `
    })
    list.innerHTML=str;
}
bindHtml(data);

for (var i=0;i<btnList.length;i++) {
    btnList[i].index=-1;
    btnList[i].onclick=function () {
        this.index*=-1;
        let attrName=this.getAttribute("attrName");
        sortAll.call(this,attrName);
        arrowChange.call(this);
        clearArrow.call(this);
    }
}

function sortAll(attr) {
    data.sort((a,b)=>{
        return (attr=='time'?new Date(a[attr])-new Date(b[attr]):(a[attr]-b[attr]))*this.index;
    });
    bindHtml(data);
}

function arrowChange() {
    let up = this.children[0];
    let down = this.children[1];
    if (this.index>0) {
        up.classList.add('bg');
        down.classList.remove('bg');
    }else{
        up.classList.remove('bg');
        down.classList.add('bg');
    }
}

function clearArrow() {
    for (var i=0;i<btnList.length;i++) {
        if (this != btnList[i]) {
            btnList[i].children[0].classList.remove('bg');
            btnList[i].children[1].classList.remove('bg');
            btnList[i].index=-1;
        }
    }
}
