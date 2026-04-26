'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const simplelightbox = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
});

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(image => {
      return `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
          <img 
          class="gallery-image" 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
          />
      </a>
      <ul class="item-indicators">
        <li>
            <h2>Likes</h2>
            <p>${image.likes}</p>
        </li>
        <li>
            <h2>Views</h2>
            <p>${image.views}</p>
        </li>
        <li>
            <h2>Comments</h2>
            <p>${image.comments}</p>
        </li>
        <li>
            <h2>Downloads</h2>
            <p>${image.downloads}</p>
        </li>
      </ul>
    </li>
  `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  simplelightbox.refresh();
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function showLoader() {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  loaderWrapper.classList.add('loader-wrapper-show');
}

export function hideLoader() {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  loaderWrapper.classList.remove('loader-wrapper-show');
}

export function showLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more-button');
  loadMoreButton.classList.add('load-more-button-show');
}

export function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector('.load-more-button');
  loadMoreButton.classList.remove('load-more-button-show');
}
