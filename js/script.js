$(document).ready(function () {
	$('#search_form').submit(function (e) {
		e.preventDefault();
	});

	// get search from the input
	var q = $('#query').val();

	$('#search_form').submit(function () {
		// alert('Submitted');
		// clear result
		$('#results').html('');
		$('#buttons').html('');

		// get search from the input
		var q = $('#query').val();
		// console.log(q);

		// run GET request on API
		$.get(
			'https://www.googleapis.com/youtube/v3/search',
			{
				part : 'snippet, id',
				q    : q,
				type : 'video',
				key  : 'AIzaSyAthUCcyeyr3kcwarKWkjtnLvEEHRDqmWE',
			},
			function (data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);

				$.each(data.items, function (i, item) {
					var output = getOutput(item);

					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				// display buttons
				$('#buttons').append(buttons);
			},
		);
	});

	function getOutput (item) {
		var videoId = item.id.videoId;
		var title = item.snippet.title;
		var description = item.snippet.description;
		var thumbnail = item.snippet.thumbnails.high.url;
		var channelTitle = item.snippet.channelTitle;
		var videoDate = item.snippet.publishedAt;

		var output =
			'<div class="outItems flex">' +
			'<div class="leftcontainer">' +
			'<img src="' +
			thumbnail +
			'">' +
			'</div>' +
			'<div class="rightcontainer">' +
			'<h3>' +
			title +
			'</h3>' +
			'<small>By <span>' +
			channelTitle +
			'</span> on ' +
			videoDate +
			'</small>' +
			'<h5>' +
			description +
			'</h5>' +
			'</div>' +
			'</div>' +
			'';
		return output;
	}

	function getButtons (prevPageToken, nextPageToken) {
		if (!prevPageToken) {
			var btnoutput =
				'<div class="button-container">' +
				'<button id="next-button" class="paging-button" data-token="' +
				nextPageToken +
				'" data-query="' +
				q +
				'">Next Page</button>';
			'</div>' + '';
		} else {
			var btnoutput =
				'<div class="button-container">' +
				'<button id="next-button" class="paging-button" data-token="' +
				prevPageToken +
				'" data-query="' +
				q +
				'">Prev Page</button>';
			'</div>' +
				'' +
				'<div class="button-container">' +
				'<button id="next-button" class="paging-button" data-token="' +
				nextPageToken +
				'" data-query="' +
				q +
				'">Next Page</button>';
			'</div>' + '';
		}
		return btnoutput;
	}

	// prev page function
	$('#prev-button').click(function () {
		var token = $('#prev-button').data('token');
		var q = $('#prev-button').data('query');

		// get search from the input
		var q = $('#query').val();
		console.log(q);

		// run GET request on API
		$.get(
			'https://www.googleapis.com/youtube/v3/search',
			{
				part      : 'snippet, id',
				PageToken : token,
				q         : q,
				type      : 'video',
				key       : 'AIzaSyAthUCcyeyr3kcwarKWkjtnLvEEHRDqmWE',
			},
			function (data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);

				$.each(data.items, function (i, item) {
					var output = getOutput(item);

					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				// display buttons
				$('#buttons').append(buttons);
			},
		);
	});

	// next page function
	$('#next-button').click(function () {
		var token = $('#next-button').data('token');
		var q = $('#next-button').data('query');

		// get search from the input
		var q = $('#query').val();
		console.log(q);

		// run GET request on API
		$.get(
			'https://www.googleapis.com/youtube/v3/search',
			{
				part      : 'snippet, id',
				PageToken : token,
				q         : q,
				type      : 'video',
				key       : 'AIzaSyAthUCcyeyr3kcwarKWkjtnLvEEHRDqmWE',
			},
			function (data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);

				$.each(data.items, function (i, item) {
					var output = getOutput(item);

					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				// display buttons
				$('#buttons').append(buttons);
			},
		);
	});
});
