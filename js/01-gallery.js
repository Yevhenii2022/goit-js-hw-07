import { galleryItems } from './gallery-items.js';

function createGalleryItem(items) {
	return items
		.map(({ preview, original, description }) => {
			return `
    <div class="gallery__item">
	<a class="gallery__link" href="${original}">
		<img
			class="gallery__image"
			src="${preview}"
			data-source="${original}"
			alt="${description}"
		/>
	</a>
</div>
    `;
		})
		.join('');
}

const galleryEl = document.querySelector('.gallery');
galleryEl.innerHTML = createGalleryItem(galleryItems);

galleryEl.addEventListener('click', handleGalleryClick);

function handleGalleryClick(event) {
	event.preventDefault();

	if (!event.target.classList.contains('gallery__image')) {
		return;
	}

	const instance = basicLightbox.create(
		`
		<img src="${event.target.dataset.source}">`,
		{
			onShow: () => document.addEventListener('keydown', handleCloseByKey),
			onClose: () => document.removeEventListener('keydown', handleCloseByKey),
		},
	);

	instance.show();

	function handleCloseByKey(event) {
		if (event.code === 'Escape') {
			instance.close();
		}
	}
}

console.log(galleryItems);
