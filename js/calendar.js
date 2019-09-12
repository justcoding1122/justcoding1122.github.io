function getDate() {
			var myDate = new Date;
			var year = myDate.getFullYear(); //获取当前年
			var mon = myDate.getMonth() + 1; //获取当前月
			if (mon < 10) {
				mon = '0' + mon
			}
			var date = myDate.getDate(); //获取当前日
			var week = myDate.getDay();
			// var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			// console.log(year, mon, date, weeks[week])
			$("#Today").html(year + "年" + mon + "月" + date + "日");
		}
		/*判断某年是否是闰年*/
		function isLeap(year) {
		    if((year%4==0 && year%100!=0) || year%400==0){
		        return true;
		    }
		    else{
		        return false; 
		    }
		}
		var monthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		/*判断某年某月某日是星期几，默认日为1号*/
		function whatDay(year, month, day = 1) {
			var sum = 0;
			sum += (year - 1) * 365 + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) +
				day;
			for (var i = 0; i < month - 1; i++) {
				sum += monthDay[i];
			}
			if (month > 2) {
				if (isLeap(year)) {
					sum += 29;
				} else {
					sum += 28;
				}
			}
			return sum % 7; //余数为0代表那天是周日，为1代表是周一，以此类推
		}
		/*显示日历*/
		function showCld(year, month, firstDay) {
			var i;
			var tagClass = "";
			var nowDate = new Date();

			var days; //从数组里取出该月的天数
			if (month == 2) {
				if (isLeap(year)) {
					days = 29;
				} else {
					days = 28;
				}
			} else {
				days = monthDay[month - 1];
			}

			/*当前显示月份添加至顶部*/
			// var topdateHtml = year + "年" + month + "月";
			// var topDate = document.getElementById('topDate');
			// topDate.innerHTML = topdateHtml;

			/*添加日期部分*/
			var tbodyHtml = '<tr>';
			for (i = 0; i < firstDay; i++) { //对1号前空白格的填充
				tbodyHtml += "<td></td>";
			}
			var changLine = firstDay;
			for (i = 1; i <= days; i++) { //每一个日期的填充
				if (year == nowDate.getFullYear() && month == nowDate.getMonth() + 1 && i == nowDate.getDate()) {
					tagClass = "curDate"; //当前日期对应格子
				}else if(year == nowDate.getFullYear() && month == nowDate.getMonth() + 1 && i < nowDate.getDate()){
					tagClass = "pastDate"; //当前日期对应格子
				} else {
					tagClass = "isDate"; //普通日期对应格子，设置class便于与空白格子区分开来
				}
				tbodyHtml += "<td class=" + tagClass + ">" + i + "</td>";
				changLine = (changLine + 1) % 7;
				if (changLine == 0 && i != days) { //是否换行填充的判断
					tbodyHtml += "</tr><tr>";
				}
			}
			if (changLine != 0) { //添加结束，对该行剩余位置的空白填充
				for (i = changLine; i < 7; i++) {
					tbodyHtml += "<td></td>";
				}
			} //实际上不需要填充后方，但强迫症必须整整齐齐！   
			tbodyHtml += "</tr>";
			var tbody = document.getElementById('tbody');
			tbody.innerHTML = tbodyHtml;
		}