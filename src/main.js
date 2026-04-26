'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery, { limit } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-button');

let page = 1;
let currentSearchText = '';
let totalImages;

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMoreClick);

function handleSubmit(event) {
  event.preventDefault();
  const searchText = event.target.elements['search-text'].value
    .toLowerCase()
    .trim();
  if (searchText !== '') {
    if (searchText !== currentSearchText) {
      page = 1;
      currentSearchText = searchText;
    }
    hideLoadMoreButton();
    showLoader();
    clearGallery();
    getImagesByQuery(searchText, page)
      .then(response => {
        if (response.hits.length !== 0) {
          createGallery(response.hits);
          totalImages = response.totalHits;
          const totalPages = Math.ceil(totalImages / limit);
          if (page < totalPages) {
            page++;
            showLoadMoreButton();
          }
        } else {
          iziToast.show({
            title: 'Warning',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            backgroundColor: 'pink',
            position: 'topLeft',
            timeout: 8000,
          });
        }
      })
      .catch(error => {
        iziToast.error({
          message: error.message,
          position: 'topLeft',
          timeout: 8000,
        });
      })
      .finally(() => {
        hideLoader();
      });
  } else {
    iziToast.warning({
      message: 'The form field must be filled in.',
      position: 'topLeft',
      timeout: 8000,
    });
  }
}

function handleLoadMoreClick(event) {
  const totalPages = Math.ceil(totalImages / limit);
  if (page > totalPages) {
    hideLoadMoreButton();
    return iziToast.warning({
      position: 'topLeft',
      message: "We're sorry, but you've reached the end of search results.",
      timeout: 8000,
    });
  }
  showLoader();
  getImagesByQuery(currentSearchText, page)
    .then(response => {
      if (response.hits.length !== 0) {
        createGallery(response.hits);
      }
    })
    .catch(error => {
      iziToast.error({
        message: error.message,
        position: 'topLeft',
        timeout: 8000,
      });
    })
    .finally(() => {
      hideLoader();
    });
  const galleryItem = document.querySelector('.gallery-item');
  const rectangle = galleryItem.getBoundingClientRect();
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      window.scrollBy({
        top: rectangle.height * 2,
        left: 0,
        behavior: 'smooth',
      });
    }
  });
  resizeObserver.observe(gallery);

  page++;
  if (page > totalPages) {
    hideLoadMoreButton();
    return iziToast.warning({
      position: 'topLeft',
      message: "We're sorry, but you've reached the end of search results.",
      timeout: 8000,
    });
  }
}
