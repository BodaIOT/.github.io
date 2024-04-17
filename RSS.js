

links = [`https://rss.stopgame.ru/rss_news.xml`, `https://www.playground.ru/rss/news.xml`];

const smallTextSize = 19;
const normalTextSize = 22;
const bigTextSize = 25;

const smallDescSize = 17;
const bigDescSize = 20;

j = 1;

links.forEach(link => {
	$.ajax({
		url: "https://api.rss2json.com/v1/api.json?rss_url=" + link,
		dataType: "json",
		success: function (result) {
			RSS = document.getElementById("RSS" + j);
			j++;
			result = result.items;
			console.log(result);
			result.forEach(element => {date = element.pubDate;
				// добавление даты
				hours = date[11] + date[12];
				hours = parseInt(hours) + 3;
				if (hours < 10)
					hours = " " + hours;
				else
					hours = hours + "";

				date = date.replaceAt(11, hours[0]);
				date = date.replaceAt(12, hours[1]);

				date = date.replaceAt(4, ".");
				date = date.replaceAt(7, ".");
				date = date.slice(0, 16);
				date = date.slice(0, 10) + " — " + date.slice(10, 16);
				//

				desc = element.description.replace("[…]", "") + "<br>" + date;

				cs = smallTextSize;
				if (element.title.length <= 75){
					cs = bigTextSize;
				}
				else if (element.title.length > 75 && element.title.length <= 87){
					cs = normalTextSize;
				}
	
				cds = smallDescSize;
				if (element.description.length <= 225){
					cds = bigDescSize;
				}
	
				title = titleHighlighted(element.title);

				RSS.innerHTML += `
				<a target="_blank" href="` + element.link + `" style="none">
				<div class="wrap wrap--1">
					<div class="container container--1" style="background: linear-gradient(0deg, rgb(0 0 0 / 92%) 48%, rgb(0 0 0 / 48%) 100%), url(` + element.enclosure.link + `); background-size: cover;">
					<div class="desc" style="font-size:` + cds + `px;">` + desc + `</div>
					<div class="title" style="font-size:` + cs + `px;">` + title + `</div>
					</div>
				</div>
				</a>
				`
				
			});
	
			
		},
		error: function (error) {
			  console.log("НЕ УДАЛОСЬ ПРОЧЕСТЬ RSS!!!");
		}
	});
	
});

String.prototype.replaceAt = function(index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function titleHighlighted(s) {
	console.log(s);
	answer = "";
	flag = false;

	for (let i = 0; i < s.length; i++) {
		if (isCharacterALetter(s[i]) && flag == false){
			flag = true;
			answer += '<span class="titleHighlighted">' + s[i];
		}
		else if (isCharacterALetter(s[i]) && flag == true){
			answer += s[i];
		}
		else if (s[i] == " " && flag == true){
			flag = false;
			answer += '</span>' + s[i];
		}
		else if (isCharacterALetter(s[i]) == false){
			answer += s[i];
		}
	}
	
	answer2 = "";
	flag = false;
	for (let i = 0; i < answer.length; i++) {
		if (isCharacterNumber(answer[i]) && flag == false){
			flag = true;
			answer2 += '<span class="titleNumbers">' + answer[i];
		}
		else if (isCharacterNumber(answer[i]) && flag == true){
			answer2 += answer[i];
		}
		else if (answer[i] == " " && flag == true){
			flag = false;
			answer2 += '</span>' + answer[i];
		}
		else if (isCharacterNumber(answer[i]) == false){
			answer2 += answer[i];
		}
	}

	console.log(answer2);
	return answer2;
}

function isCharacterALetter(char) {
	return (/[a-zA-Z]/).test(char)
}

function isCharacterNumber(char) {
	return (/[0-9]/).test(char)
}