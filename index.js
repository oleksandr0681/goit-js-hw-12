import{a as L,S as w,i}from"./assets/vendor-Do60_h77.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=t(e);fetch(e.href,a)}})();const u=15;async function d(s,o=1){const t={params:{key:"55507124-55cf7e8db58c14a0702f34115",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:u}};return(await L.get("https://pixabay.com/api",t)).data}const b=new w(".gallery-item a",{captionsData:"alt",captionPosition:"bottom"});function m(s){const o=document.querySelector(".gallery"),t=s.map(r=>`
    <li class="gallery-item">
      <a href="${r.largeImageURL}">
          <img 
          class="gallery-image" 
          src="${r.webformatURL}" 
          alt="${r.tags}" 
          />
      </a>
      <ul class="item-indicators">
        <li>
            <h2>Likes</h2>
            <p>${r.likes}</p>
        </li>
        <li>
            <h2>Views</h2>
            <p>${r.views}</p>
        </li>
        <li>
            <h2>Comments</h2>
            <p>${r.comments}</p>
        </li>
        <li>
            <h2>Downloads</h2>
            <p>${r.downloads}</p>
        </li>
      </ul>
    </li>
  `).join("");o.insertAdjacentHTML("beforeend",t),b.refresh()}function S(){const s=document.querySelector(".gallery");s.innerHTML=""}function p(){document.querySelector(".loader-wrapper").classList.add("loader-wrapper-show")}function f(){document.querySelector(".loader-wrapper").classList.remove("loader-wrapper-show")}function h(){document.querySelector(".load-more-button").classList.add("load-more-button-show")}function g(){document.querySelector(".load-more-button").classList.remove("load-more-button-show")}const q=document.querySelector(".form");document.querySelector(".gallery");const v=document.querySelector(".load-more-button");let n=1,y="",l=0;q.addEventListener("submit",M);v.addEventListener("click",B);async function M(s){s.preventDefault();const o=s.target.elements["search-text"].value.toLowerCase().trim();if(n=1,y=o,l=0,o!==""){g(),p(),S();try{const t=await d(o,n);if(t.hits.length!==0){m(t.hits),l=t.totalHits;const r=Math.ceil(l/u);n<r?h():r===1&&i.warning({position:"topLeft",message:"We're sorry, but you've reached the end of search results.",timeout:8e3})}else i.show({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topLeft",timeout:8e3})}catch(t){i.error({message:t.message,position:"topLeft",timeout:8e3})}finally{f()}}else i.warning({message:"The form field must be filled in.",position:"topLeft",timeout:8e3})}async function B(s){const o=Math.ceil(l/u);if(g(),n++,n>o)return i.warning({position:"topLeft",message:"We're sorry, but you've reached the end of search results.",timeout:8e3});p();try{const t=await d(y,n);if(t.hits.length!==0){m(t.hits);const e=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e.height*2,left:0,behavior:"smooth"})}}catch(t){i.error({message:t.message,position:"topLeft",timeout:8e3})}finally{f()}if(n===o)return i.warning({position:"topLeft",message:"We're sorry, but you've reached the end of search results.",timeout:8e3});n<o&&h()}
//# sourceMappingURL=index.js.map
