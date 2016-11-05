use side;

var pages = {
	interior: {
		name_ru: "Интерьеры и экстерьеры",
		name_en: "Interiors and exteriors",
		title_ru: "Преимущество 4SIDE – работы по 3D моделированию. Закажите их, чтобы лицезреть изменения реальности!",
		title_en: "The advantage 4SIDE - work on 3D modeling. Order them to contemplate changes reality!",
		description_ru: "3D моделирование – это ваш способ сделать реально существующим то, что ещё вчера казалось невероятным! Разрешите себе мечтать, превращая мечты в далеко идущие планы!",
		description_en: "3D modeling - this is your way to do something really existing, which yesterday still seemed incredible! Allow yourself to dream, turning dreams into ambitious plans!",
		link: "/interiors",
		context: false
	},
	art: {
		name_ru: "Арт и Графика",
		name_en: "Art & Graphic",
		title_ru: "Арт и графика. История и современность. Образы, которые оживают для того, чтобы повысить ваши продажи!",
		title_en: "Art and Graphics. History and modernity. The images that come to life in order to increase your sales!",
		description_ru: "4SIDE предлагает создание любой полиграфической продукции, разработку бренд бука и логотипа. Мы не только создадим концепцию вашей компании, но и явим миру её ценности! На что вы точно можете рассчитывать – так это на индивидуальный подход!",
		description_en: "4SIDE propose the creation of any printed products, the development of brand book and logo. Not only do we create the concept of your company, but also the world seek will its value! On that you can accurately count - so it is an individual approach!",
		link: "/art",
		context: false
	}
};

if (Object.keys(pages).length > 0){

	for(var key in pages){

		print(pages[key].link);

		db.menus.update({ link: pages[key].link }, pages[key], { upsert: true })

	}

}