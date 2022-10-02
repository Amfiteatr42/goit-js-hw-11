// import { fetchPictures } from './js/fetchPictures.js';
import axios from 'axios';
import { Notify } from 'notiflix';

const refs = {
  submitBtn: document.querySelector('.submit-btn'),
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.submitBtn.addEventListener('click', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();
  const API_KEY = '30320349-f886ff3d38376fcc5572a2958';
  const searchQuery = refs.form.elements.searchQuery.value.trim();

  clearHTML('gallery');

  axios
    .get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    })
    .then(res => {
      console.log(res.data.hits);
      if (res.data.hits.length === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      refs.gallery.innerHTML = createGalleryMarkup(res.data.hits);
    })
    // .then(data => console.log(data.total))
    .catch(error => console.log(error));
}

function createGalleryMarkup(dataArr) {
  return dataArr
    .map(
      ({
        webformatURL,
        comments,
        downloads,
        largeImageURL,
        tags,
        likes,
        views,
      } = {}) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}

function clearHTML(refKey1 = '', refKey2 = '') {
  refs[refKey1].innerHTML = '';
  if (refKey2 === '') return;
  refs[refKey2].innerHTML = '';
}
