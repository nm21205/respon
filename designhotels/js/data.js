let container = document.querySelector(".gallery-wrap");
let loadMoreBtn = document.querySelector('.loadMoreBt');
let allData = [];
let addItemCount = 3;
let added=0;
let filter=document.querySelector('#gallery-filter');
let filterData = [];

//json데이터 로드
fetch('./data/data.json').then(
  response => response.json()
)
.then(data => {
  allData = data;
  filterData = allData;
  addItem();
  loadMoreBtn.addEventListener('click',addItem);
  filter.addEventListener('change',(e)=>{
    if(e.target.type === 'radio'){
      filterItems(e.target.value)
    }
  })
  // console.log(allData)
})
.catch(error => {
  console.error('error loading json:',error)

})

//항목 추가 함수

function addItem(){
let element = [];

let slicedData =  filterData.slice(added, added += addItemCount);
//이거 3, 6, 9 이렇게 추가되는데 왜 이렇게 되는거지?


slicedData.forEach(item => {
  const fileExtension = item.video.split('.').pop().toLowerCase();
  const isMp4 = fileExtension === 'mp4';
  const sw=isMp4 ? (` <video src="${item.video}" autoplay muted></video>`):(` <img src="${item.video}"/>`);
 let itemHTML = `
 <li class="gallery-item">
                     <div>
                        <a href="javascript:" class="galleryBt">
                           <span class="g-video">
                              ${sw}
                           </span>
                           <span class="g-bg"></span>
                           <span class="g-title">
                              <span><strong>${item.title}</strong></span>
                              <span><b>${item.description}</b></span>
                              <span><i class="exploreBt">ExploreBt</i></span>
                               <span><i class="category">${item.category}</i></span>
                           </span>
                        </a>
                     </div>
                  </li>`;

                  //DOM HTML  추가
                  let liElement = document.createElement('li');
                  liElement.classList.add('gallery-item');
                  liElement.innerHTML = itemHTML;
                  element.push(liElement);
                  
});
element.forEach(item => {
  container.appendChild(item);
})
updateLoadMoreButton();
}

function updateLoadMoreButton(){
  if(added < filterData.length){
loadMoreBtn.textContent = 'Load More';
  }else{
loadMoreBtn.textContent = 'End';
  }
}

function filterItems(key){
filterData = [];
added = 0;
container.innerHTML = ""; //기존 아이템 삭제
if(key === 'all'){
  filterData=allData;
}else{
  filterData=allData.filter(item => item.category === key);
}
addItem(true);
}
