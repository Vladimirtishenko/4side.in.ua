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
	}
}


db.menus.find({}).forEach(function(item){

	if(pages[item.link.slice(1)]){
		var el = pages[item.link.slice(1)];
		item.title_ru = el.title_ru;
		item.title_en = el.title_en;
		item.description_ru = el.description_ru;
		item.description_en = el.description_en;
		
		db.menus.save(item);

	}

	

});
