document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('.header');
	const modal = document.querySelector('.modal-overlay');
	const closeBtn = document.querySelector('.close-modal');
	const modalTitle = modal ? modal.querySelector('#modalTitle') : null;
	const orderButtons = document.querySelectorAll('.order-btn');

	const sectionsToBlur = document.querySelectorAll('header, section, footer');

	//! Прозрачность header
	window.addEventListener('scroll', function () {
		if (window.scrollY > 50) {
			header.classList.add('header-scrolled');
		} else {
			header.classList.remove('header-scrolled');
		}
	});

	//! Логика для всех кнопок "Заказать"
	if (orderButtons.length > 0 && modal) {
		orderButtons.forEach(btn => {
			btn.addEventListener('click', function () {

				// --- УМНЫЙ ЗАГОЛОВОК ---
				if (modalTitle) {
					const serviceCard = btn.closest('.service-card');
					if (serviceCard) {
						const serviceName = serviceCard.querySelector('h3').innerText;
						modalTitle.innerText = 'Заявка: ' + serviceName;
					} else {
						modalTitle.innerText = 'Связаться с мастером';
					}
				}

				modal.classList.add('active');
				document.body.style.overflow = 'hidden';

				sectionsToBlur.forEach(section => {
					section.classList.add('blur-effect');
				});
			});
		});

		const closeModal = () => {
			modal.classList.remove('active');
			document.body.style.overflow = '';

			sectionsToBlur.forEach(section => {
				section.classList.remove('blur-effect');
			});
		};

		if (closeBtn) closeBtn.addEventListener('click', closeModal);

		modal.addEventListener('click', (e) => {
			if (e.target === modal) closeModal();
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modal.classList.contains('active')) {
				closeModal();
			}
		});
	}
});