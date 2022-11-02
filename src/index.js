import { Notify } from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
loadMore.style.display = 'none';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30941641-57462658bbfdcd322117c0444';

let params = {
  key: API_KEY,
  q: input.value,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

console.log('working!!!');

form.addEventListener('submit', event => {
  event.preventDefault();
  if (input.value === '') {
    Notify.warning('Enter something to request..');
  } else {
    gallery.innerHTML = '';
    params.q = input.value;
    params.page = 1;
    queryFunction();
  }
});

async function fetchImages() {
  try {
    const searchParams = new URLSearchParams(params);
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
}

async function queryFunction() {
  try {
    const response = await fetchImages();
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    const data = await response.data;
    if (data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }
    if ((data.hits.length < 40) & (data.hits.length !== 0)) {
      loadMore.style.display = 'none';
      Notify.warning(
        "We're sorry, but you've reached the end of search results.!"
      );
    } else if (data.hits.length === 40) {
      loadMore.style.display = 'flex';
    }
    const renderData = data.hits
      .map(item => {
        gallery.insertAdjacentHTML(
          'beforeend',
          `<div class="photo-card">
            <div class="img">
              <a href="${item.largeImageURL}">
              <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
            </a>
            </div>
           <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${item.likes}
            </p>
            <p class="info-item">
            
            <b>Views</b>
              ${item.views}
            </p>
            <p class="info-item">
              
            <b>Comments</b>
              ${item.comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>
              ${item.downloads}
            </p>
          </div>
        </div>
     `
        );
      })
      .join('');
    if (data.total !== 0) {
      gallery.insertAdjacentHTML('beforeend', renderData);
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
    lightbox.refresh();
  } catch (err) {
    console.error(err);
  }
  form.reset();
}

loadMore.addEventListener('click', () => {
  params.page += 1;
  queryFunction();
});