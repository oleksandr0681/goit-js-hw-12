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
let totalImages = 0;

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMoreClick);

async function handleSubmit(event) {
  event.preventDefault();
  const searchText = event.target.elements['search-text'].value
    .toLowerCase()
    .trim();
  page = 1;
  currentSearchText = searchText;
  totalImages = 0;
  if (searchText !== '') {
    hideLoadMoreButton();
    showLoader();
    clearGallery();
    try {
      const images = await getImagesByQuery(searchText, page);
      if (images.hits.length !== 0) {
        createGallery(images.hits);
        totalImages = images.totalHits;
        const totalPages = Math.ceil(totalImages / limit);
        if (page < totalPages) {
          page++;
          showLoadMoreButton();
        } else if (totalPages === 1) {
          return iziToast.warning({
            position: 'topLeft',
            message:
              "We're sorry, but you've reached the end of search results.",
            timeout: 8000,
          });
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
    } catch (error) {
      iziToast.error({
        message: error.message,
        position: 'topLeft',
        timeout: 8000,
      });
    } finally {
      hideLoader();
    }
  } else {
    iziToast.warning({
      message: 'The form field must be filled in.',
      position: 'topLeft',
      timeout: 8000,
    });
  }
}

async function handleLoadMoreClick(event) {
  const totalPages = Math.ceil(totalImages / limit);
  hideLoadMoreButton();
  if (page > totalPages) {
    return iziToast.warning({
      position: 'topLeft',
      message: "We're sorry, but you've reached the end of search results.",
      timeout: 8000,
    });
  }
  showLoader();
  try {
    const images = await getImagesByQuery(currentSearchText, page);
    if (images.hits.length !== 0) {
      createGallery(images.hits);
      const galleryItem = document.querySelector('.gallery-item');
      const rectangle = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: rectangle.height * 2,
        left: 0,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topLeft',
      timeout: 8000,
    });
  } finally {
    hideLoader();
  }

  page++;
  if (page > totalPages) {
    return iziToast.warning({
      position: 'topLeft',
      message: "We're sorry, but you've reached the end of search results.",
      timeout: 8000,
    });
  } else {
    showLoadMoreButton();
  }
}
