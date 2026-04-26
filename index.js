import{a as y,S as L,i}from"./assets/vendor-Do60_h77.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();const m=15;async function p(s,o=1){const a={params:{key:"55507124-55cf7e8db58c14a0702f34115",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:m}};return(await y.get("https://pixabay.com/api",a)).data}const b=new L(".gallery-item a",{captionsData:"alt",captionPosition:"bottom"});function f(s){const o=document.querySelector(".gallery"),a=s.map(r=>`
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
  `).join("");o.insertAdjacentHTML("beforeend",a),b.refresh()}function w(){const s=document.querySelector(".gallery");s.innerHTML=""}function h(){document.querySelector(".loader-wrapper").classList.add("loader-wrapper-show")}function g(){document.querySelector(".loader-wrapper").classList.remove("loader-wrapper-show")}function v(){document.querySelector(".load-more-button").classList.add("load-more-button-show")}function c(){document.querySelector(".load-more-button").classList.remove("load-more-button-show")}const S=document.querySelector(".form"),q=document.querySelector(".gallery"),M=document.querySelector(".load-more-button");let n=1,u="",d;S.addEventListener("submit",B);M.addEventListener("click",O);function B(s){s.preventDefault();const o=s.target.elements["search-text"].value.toLowerCase().trim();o!==""?(o!==u&&(n=1,u=o),c(),h(),w(),p(o,n).then(a=>{if(a.hits.length!==0){f(a.hits),d=a.totalHits;const r=Math.ceil(d/m);n<r&&(n++,v())}else i.show({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topLeft",timeout:8e3})}).catch(a=>{i.error({message:a.message,position:"topLeft",timeout:8e3})}).finally(()=>{g()})):i.warning({message:"The form field must be filled in.",position:"topLeft",timeout:8e3})}function O(s){const o=Math.ceil(d/m);if(n>o)return c(),i.warning({position:"topLeft",message:"We're sorry, but you've reached the end of search results.",timeout:8e3});h(),p(u,n).then(e=>{e.hits.length!==0&&f(e.hits)}).catch(e=>{i.error({message:e.message,position:"topLeft",timeout:8e3})}).finally(()=>{g()});const r=document.querySelector(".gallery-item").getBoundingClientRect();if(new ResizeObserver(e=>{for(const l of e)window.scrollBy({top:r.height*2,left:0,behavior:"smooth"})}).observe(q),n++,n>o)return c(),i.warning({position:"topLeft",message:"We're sorry, but you've reached the end of search results.",timeout:8e3})}
//# sourceMappingURL=index.js.map
