import{a as y,S as L,i}from"./assets/vendor-Do60_h77.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const m=15;async function p(r,o=1){const t={params:{key:"55507124-55cf7e8db58c14a0702f34115",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:m}};return(await y.get("https://pixabay.com/api",t)).data}const w=new L(".gallery-item a",{captionsData:"alt",captionPosition:"bottom"});function f(r){const o=document.querySelector(".gallery"),t=r.map(a=>`
    <li class="gallery-item">
      <a href="${a.largeImageURL}">
          <img 
          class="gallery-image" 
          src="${a.webformatURL}" 
          alt="${a.tags}" 
          />
      </a>
      <ul class="item-indicators">
        <li>
            <h2>Likes</h2>
            <p>${a.likes}</p>
        </li>
        <li>
            <h2>Views</h2>
            <p>${a.views}</p>
        </li>
        <li>
            <h2>Comments</h2>
            <p>${a.comments}</p>
        </li>
        <li>
            <h2>Downloads</h2>
            <p>${a.downloads}</p>
        </li>
      </ul>
    </li>
  `).join("");o.insertAdjacentHTML("beforeend",t),w.refresh()}function b(){const r=document.querySelector(".gallery");r.innerHTML=""}function h(){document.querySelector(".loader-wrapper").classList.add("loader-wrapper-show")}function g(){document.querySelector(".loader-wrapper").classList.remove("loader-wrapper-show")}function S(){document.querySelector(".load-more-button").classList.add("load-more-button-show")}function c(){document.querySelector(".load-more-button").classList.remove("load-more-button-show")}const q=document.querySelector(".form");document.querySelector(".gallery");const M=document.querySelector(".load-more-button");let n=1,u="",d;q.addEventListener("submit",v);M.addEventListener("click",B);function v(r){r.preventDefault();const o=r.target.elements["search-text"].value.toLowerCase().trim();o!==""?(o!==u&&(n=1,u=o),c(),h(),b(),p(o,n).then(t=>{if(t.hits.length!==0){f(t.hits),d=t.totalHits;const a=Math.ceil(d/m);n<a&&(n++,S())}else i.show({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"pink",position:"topLeft",timeout:8e3})}).catch(t=>{i.error({message:t.message,position:"topLeft",timeout:8e3})}).finally(()=>{g()})):i.warning({message:"The form field must be filled in.",position:"topLeft",timeout:8e3})}function B(r){const o=Math.ceil(d/m);if(n>o)return c(),i.warning({position:"topLeft",message:"We're sorry, but you've reached the end of search results.",timeout:8e3});if(h(),p(u,n).then(t=>{if(t.hits.length!==0){f(t.hits);const e=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e.height*2,left:0,behavior:"smooth"})}}).catch(t=>{i.error({message:t.message,position:"topLeft",timeout:8e3})}).finally(()=>{g()}),n++,n>o)return c(),i.warning({position:"topLeft",message:"We're sorry, but you've reached the end of search results.",timeout:8e3})}
//# sourceMappingURL=index.js.map
