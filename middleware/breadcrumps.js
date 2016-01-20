function Breadcrumps(list){
	var self = this;

	self.general = [
		{
			inRus: "Главная",
			link: "/"
		}
	]

	list.forEach(eachList);

	function eachList (item, i) {
		self.general.push({inRus: item.inRus, link: item.link ? item.link : null});
	}

	return self.general;

}

Breadcrumps.prototype.name = "Breadcrumps";

module.exports.Breadcrumps = Breadcrumps;