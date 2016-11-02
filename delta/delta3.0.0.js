use side;

var pages = {
	about: {
		name_ru: "О нас",
		name_en: "About",
		title_ru: "4SIDE создаёт готовые площадки для бизнеса. Мы убеждаем людей в необходимости существования вашей компании!",
		title_en: "4SIDE creates a ready platform for business. We convince people of the need for the existence of your company!",
		description_ru: "4SIDE - экстравагантное агентство, наше призвание – дарить счастье людям! Вы хотите реализовать себя через бизнес? Мы знаем, как это сделать! Приходите к нам – и мы разработаем ценности вашей компании!",
		description_en: "4SIDE - extravagant agency, our mission - to give people happiness! You want to realize themselves through the business? We know how to do it! Come to us - and we will work out the value of your company!",
		link: "/about",
		context: "About"
	},
	team: {
		name_ru: "Команда",
		name_en: "Team",
		title_ru: "Наша команда профессионалов – это мозговой центр, генерирующий только потрясающие идеи!",
		title_en: "Our team of professionals - a think tank that generates only a great idea!",
		description_ru: "Профессионализм купить невозможно. Его нужно отыскать и прочувствовать. Обращайтесь к компании, где дух сотрудничества разрешает реализацию самых смелых проектов!",
		description_en: "Professionalism can not buy. It needs to look and feel. Refer to the company, where the spirit of cooperation allows the realization of the most ambitious projects!",
		link: "/team",
		context: "Team"
	},
	contact: {
		name_ru: "Контакты",
		name_en: "Contact",
		title_ru: "4SIDE всегда на связи, днем и ночью, мы следим за функционированием вашего бизнеса",
		title_en: "4SIDE always available, day and night, we monitor the operation of your business",
		description_ru: "Звоните в любое удобное для вас время, и наша служба поддержки вам поможет решить любые проблемы на сайте и не только.",
		description_en: "Call any time convenient for you, and our support team will help you solve any problems on the site and beyond.",
		link: "/contact",
		context: "Contact"
	},
	portfolio: {
		name_ru: "Веб Портфолио",
		name_en: "Web Portfolio",
		title_ru: "Наше портфолио – ваш способ окунуться в мир профессионального искусства!",
		title_en: "Our portfolio - your way to plunge into the world of professional art!",
		description_ru: "Вы хотите примерно понимать, как может выглядеть ваша страница? Вы желаете увидеть примеры наших работ? Что ж, нет ничего проще! Выберите стиль, и озвучьте ваши пожелания!",
		description_en: "You want to understand about how your page might look like? You want to see examples of our work? Well, nothing could be simpler! Choose a style and ozvuchte your wishes!",
		link: "/portfolio",
		context: "Portfolio"
	},
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
}


db.menus.find().forEach(function(item){

	if(pages[item.link.slice(1)]){
		var el = pages[item.link.slice(1)];
		item.title_ru = el.title_ru;
		item.title_en = el.title_en;
		item.description_ru = el.description_ru;
		item.description_en = el.description_en;
		delete el;

		db.menus.save(item);
	}

});

if (Object.keys(pages).length > 0){

	for(var key in pages){
		db.menus.insert(pages[key]);
	}

}

