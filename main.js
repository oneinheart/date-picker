(function(){

	var datepicker = window.datepicker;
	var monthData;
	var $wrapper;

	datepicker.buildUi = function(year, month){

		monthData = datepicker.getMonthData(year, month);
		
		var html = '<div class="ui-datepicker-header">' +
			'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
			'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
			'<span class="ui-datepicker-curr-moth">'+ monthData.year + '-' + datepicker.formMonth(monthData.month) + '</span>' +
		'</div>' +
		'<div class="ui-datepicker-body">' +
			'<table>' +
				'<thead>' +
					'<tr>' +
						'<th>一</th>' +
						'<th>二</th>' +
						'<th>三</th>' +
						'<th>四</th>' +
						'<th>五</th>' +
						'<th>六</th>' +
						'<th>日</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody>';

		for(var i=0; i<monthData.days.length; i++){
			var date = monthData.days[i];
			if(i%7 === 0){
				html += '<tr>';
			}
			html += '<td data-date="' + date.date + '" data-month="' + date.month + '">' + date.showDate + '</td>';

			if(i%7 === 6){
				html += '</tr>';
			}
		}
			
		html +='</tbody>' +
			'</table>' +
		'</div>';

		return html;
	};

	datepicker.formMonth = function(month){
		if(month < 10){
			month = 0 + '' + month;
		}

		return month;
	}

	datepicker.render = function(direction){

		var year;
		var month;
		
		if(monthData){
			year = monthData.year;
			month = monthData.month;
		}
		
		if(direction == 'prev'){
			month--;
			console.log(month)

			if(month === 0){
				month = 12;
				year--;
			}

		}else if(direction == 'next'){
			month++;
		}

		var html =datepicker.buildUi(year, month);

		
		$wrapper.innerHTML = html;
	}

	datepicker.init = function(input){
		$wrapper = document.createElement('div');
		$wrapper.className = 'ui-datepicker-wrapper';
		datepicker.render();

		var $input = document.querySelector(input);
		var isOpen = false;

		$input.addEventListener('click', function(){
			if (isOpen) {
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}else{
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				var left = $input.offsetLeft;
				var top =  $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.left = left + 'px';
				$wrapper.style.top = top + height + 2 + 'px';

				isOpen = true;
			}
		});

		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			var direction;
			if($target.classList.contains('ui-datepicker-prev-btn')){
				direction = 'prev';
				datepicker.render(direction);
			}else if($target.classList.contains('ui-datepicker-next-btn')){
				direction = 'next';
				datepicker.render(direction);
			}else if($target.dataset){
				var dataset = $target.dataset;
				var localMonth;
				if(dataset.month <= 0){
					localMonth = 0;
				}else{
					localMonth = dataset.month - 1;
				} 
				var day = new Date(monthData.year, localMonth, dataset.date);
				$input.value = day.getFullYear() + '-' + datepicker.formMonth(day.getMonth()+1) + '-' + datepicker.formMonth(day.getDate());
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}

		})
		

		document.body.appendChild($wrapper);
	}

})();