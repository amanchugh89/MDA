var RSSB = RSSB || {};

// Some Global Methods and parameters available with RSSB object.
;(function($, window, document, RSSB, undefined){
	var ua = navigator.userAgent;
	// Extending some Helper Methods to RSSB Object.	
	$.extend(RSSB, {
		eventTarget: $(document),
		showPageScroll: function () {
            var element = $('html');
            element.css({
                'overflow-y': 'auto',
                'overflow-x': 'hidden'
            });
        },
		scrollTop: function(offset){
			var $body = $("html, body");
			
			$body.animate({scrollTop:offset}, '100', 'swing');
		},
        hidePageScroll: function () {
            var element = $('html');
            element.css({
                'overflow-y': 'hidden',
                'overflow-x': 'hidden'
            });
        },
		checkBrowserForIE: function () {
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
                var ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
                if (ieversion >= 9) return 9;
                else if (ieversion >= 8) return 8;
                else if (ieversion >= 7) return 7;
                else if (ieversion >= 6) return 6;
            } else {
                return "non IE";
            }
        },
		isIOS: /iPad|iPhone|iPod/i.test(ua),
		isAndroid: /Android/i.test(ua),
		isBB: /BlackBerry|PlayBook|BB10/i.test(ua),
		isWindows: /IEMobile/i.test(ua),
		isTouch: /Android|webOS|iPhone|iPad|iPod|BlackBerry|PlayBook|BB10|IEMobile|Opera Mini/i.test(ua),
		GUID :function() {
			var S4 = function () {
				return Math.floor(Math.random() * 0x10000 /* 65536 */).toString(16);
			};
			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		},
		populateDateTime : function(options){
			var currentDate = new Date(),
				date = currentDate.getDate(),
				month = currentDate.getMonth() + 1,
				year = currentDate.getFullYear(),
				hour = currentDate.getHours(),
				min = currentDate.getMinutes(),
				fromVal = (options.selectNow) ? 1 : 0;
			$(options.dateId).empty();
			$(options.monthId).empty();
			$(options.yearId).empty();
			$(options.hourId).empty();
			$(options.minId).empty();
			date = (date < 10) ? "0"+date : date;
			month = (month < 10) ? "0"+month : month;
			hour = (hour < 10) ? "0"+hour : hour;
			min = (min < 10) ? "0"+min : min;
			// populating Date Select fields
			if (options.dateId && $.trim(options.dateId).length > 0){
				var dateId = (options.dateId.indexOf('#') == 0) ? options.dateId : '#'+options.dateId;
				for (var d=fromVal; d<=31; d++){
					var dateVal = (d < 10) ? '0'+d : d,
						$option = (d == 0) ? $('<option value="-1">DD</option>') : $('<option value="'+dateVal+'">'+dateVal+'</option>');
					$(dateId).append($option);
				}
				(options.selectNow) && ($(dateId).find('option[value='+date+']')[0].selected = true);
			}
			
			// populating Month Select fields
			if (options.monthId && $.trim(options.monthId).length > 0){
				var monthId = (options.monthId.indexOf('#') == 0) ? options.monthId : '#'+options.monthId;
				for (var m=fromVal; m<=12; m++){
					var monthVal = (m < 10) ? '0'+m : m,
						$option = (m == 0) ? $('<option value="-1">MM</option>') : $('<option value="'+monthVal+'">'+monthVal+'</option>');
					$(monthId).append($option);
				}
				(options.selectNow) && ($(monthId).find('option[value='+month+']')[0].selected = true);
			}
			
			// populating Month Select fields
			if (options.yearId && $.trim(options.yearId).length > 0){
				var yearId = (options.yearId.indexOf('#') == 0) ? options.yearId : '#'+options.yearId,
					fromYear, toYear, 
					firstOption = !options.selectNow;
				if (options.fromYear && options.toYear && parseInt(options.fromYear, 10) < parseInt(options.toYear, 10)){
					fromYear = (options.selectNow) ? parseInt(options.fromYear, 10) : parseInt(options.fromYear, 10)-1;
					toYear = parseInt(options.toYear, 10);
				}else{
					fromYear = (options.selectNow) ? year-10 : year-11;
					toYear = year+10;
				}
				
				for (var y=fromYear; y<=toYear; y++){
					var yearVal = (y < 10) ? '0'+y : y,
						$option = (y == fromYear && firstOption) ? $('<option value="-1">YYYY</option>') : $('<option value="'+y+'">'+y+'</option>');
					$(yearId).append($option);
				}
				
				(options.selectNow) && ($(yearId).find('option[value='+year+']')[0].selected = true);
			}
			
			// populating Hour Select fields
			if (options.hourId && $.trim(options.hourId).length > 0){
				var hourId = (options.hourId.indexOf('#') == 0) ? options.hourId : '#'+options.hourId;
				for (var h=-1; h<=23; h++){
					var hourVal = (h < 10) ? '0'+h : h,
						$option = (h == -1) ? $('<option value="-1">HH</option>') : $('<option value="'+hourVal+'">'+hourVal+'</option>');
					$(hourId).append($option);
				}
				(options.selectNow) && ($(hourId).find('option[value='+hour+']')[0].selected = true);
			}
			
			// populating Minutes Select fields
			if (options.minId && $.trim(options.minId).length > 0){
				var minId = (options.minId.indexOf('#') == 0) ? options.minId : '#'+options.minId;
				for (var m=-1; m<=59; m++){
					var minVal = (m < 10) ? '0'+m : m,
						$option = (m == -1) ? $('<option value="-1">MM</option>') : $('<option value="'+minVal+'">'+minVal+'</option>');
					$(minId).append($option);
				}
				(options.selectNow) && ($(minId).find('option[value='+min+']')[0].selected = true);
			}
		},
		serviceCall : function(type, url, data, callback){
			$.ajax({
				dataType: "json",
				url: url,
				type: type,
				data : data,
				contentType:"application/json",
				success: function (response) {
					callback('success', response);
				},
				error: function (jqHXR, textStatus, errorThrown) {
					callback('error', {
						hxr : jqHXR, 
						status: textStatus, 
						error: errorThrown
					});
				}
			});
		}
	});
})(jQuery, this, this.document, RSSB);
