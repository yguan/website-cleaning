var eventDate = [];
$('.event-attended').each(function (index, el) {
	eventDate.push($(el).text().trim());
});

var eventTitle = [];
$('.event-title').each(function (index, el) {
	var title = $(el).text().split('@');
	eventTitle.push(title.length > 1 ? title[1].trim() : '');
});

var members = [];
$('.event-rating').each(function (index, el) {
	var text = $(el).text();
	var count = text.substr(0, text.indexOf('Members')).trim();
	members.push(count);
});

function fetchEvents(onComplete) {
	var timer = {};
	var showMoreEvents = function() {
		if ($('.event-list-more a').length === 0) {
			clearInterval(timer.intervalId);
			if (onComplete) {
				onComplete();
			}			
		} else {
			$('.event-list-more a').click();
			console.log('fetching events');
		}
	};
	timer.intervalId = setInterval(showMoreEvents, 1000);
}
