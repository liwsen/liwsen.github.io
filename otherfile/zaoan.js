// javascript:(function(a,b,c,d){a[c]?a[c].show():(d=b.createElement('script'),d.id='huina_zaoan',d.setAttribute('charset','utf-8'),d.src='//liwsen.oschina.io/otherfile/zaoan.js?'+Math.floor(+new Date/1e7),b.body.appendChild(d))})(window,document,'HN_ZAOAN');

// 🍀今天是2016年11月8日
// 🍁农历十月初九
// 🍂距离2017年元旦还有54天；
// 🌴距离2017年春节还有81天；
// 🌷2016年我们还可以工作46天；
// 继续努力吧，道阻且长！

// 早安☀！

!function(){
	var ZA = {};
	var Html = '';
	Html += '\
🍀 今天是{{date}} {{week}}\n\
🍁 农历 {{lunar}}\n\
🍂 距离{{yuandanYear}}年元旦还有{{yuandanDays}}天；\n\
🌴 距离{{chunjieYear}}年春节还有{{chunjieDays}}天；\n\
🌷 2016年我们还可以工作{{workDays}}天；\n\
\n\
{{saying}}\n\
\n\
早安☀！';

	ZA.show = function (options) {
		var DEFAULTS = {
			yuandan: '2018-1-1',
			chunjie: '2017-1-28',
		};
		this.options = this.extendObj({}, DEFAULTS, options);

		var yy = this.timestampToDate(this.getDate(), 'YY');
		var mm = this.timestampToDate(this.getDate(), 'MM');
		var dd = this.timestampToDate(this.getDate(), 'DD');
		var ydYear = this.timestampToDate(this.dateToTimestamp(this.options.yuandan), 'YY');
		var cjYear = this.timestampToDate(this.dateToTimestamp(this.options.chunjie), 'YY');
		var ydDays = Math.ceil((this.dateToTimestamp(this.options.yuandan) - this.getTimestamp())/(24*3600));
		var cjDays = Math.ceil((this.dateToTimestamp(this.options.chunjie) - this.getTimestamp())/(24*3600));

		Html =  Html.replace('{{date}}', yy+'年'+mm+'月'+dd+'日')
					.replace('{{week}}', this.getWeekOn())
					.replace('{{lunar}}', this.GetLunarDay(yy,mm,dd))
					.replace('{{yuandanYear}}', ydYear)
					.replace('{{chunjieYear}}', cjYear)
					.replace('{{yuandanDays}}', ydDays)
					.replace('{{chunjieDays}}', cjDays)
					.replace('{{workDays}}', ydDays - this.holiday())
					.replace('{{saying}}', this.getOneSaying());

		var div = document.createElement('div');
		div.id = 'zaBox';
		div.style.position = 'fixed';
		div.style.left = '0';
		div.style.right = '0';
		div.style.top = '0';
		div.style.bottom = '0';
		div.style.margin = 'auto';
		div.style.padding = '20px';
		div.style.zIndex = '999999';
		div.style.backgroundColor = 'rgba(255,255,255,.95)';
		div.style.fontSize = '16px';
		div.innerHTML = '<div style="white-space: pre;">'+ Html +'</div>';
		document.body.appendChild(div);
		
		console.log(Html);
	};

    //获取当前时间戳
    ZA.getTimestamp = function(){
        return parseInt(new Date().getTime()/1000);
    };
    //获取当前日期
    ZA.getDate = function(){
        var now = new Date();
        var yy = now.getFullYear();      //年
        var mm = now.getMonth() + 1;     //月
        var dd = now.getDate();          //日
        var hh = now.getHours();         //时
        var ii = now.getMinutes();       //分
        var ss = now.getSeconds();       //秒
        var clock = yy + "-";
        if(mm < 10) clock += "0";
        clock += mm + "-";
        if(dd < 10) clock += "0";
        clock += dd + " ";
        if(hh < 10) clock += "0";
        clock += hh + ":";
        if (ii < 10) clock += '0'; 
        clock += ii + ":";
        if (ss < 10) clock += '0'; 
        clock += ss;
        return clock;
    };
    //日期字符串转时间戳，date => '2015-03-05 17:59:00' or '2015/03/05 17:59:00'
    ZA.dateToTimestamp = function(date){
        if(!date) return date;
        date = date.substring(0,19);    
        date = date.replace(/-/g,'/'); 
        return  new Date(date).getTime()/1000;
    };
    //时间戳转日期字符串 'YY-MM-DD hh:ii:ss'
    ZA.timestampToDate = function(timestamp, format){
        if(!timestamp) return timestamp;
        timestamp = String(timestamp);
        if(timestamp.length === 10){
            timestamp = timestamp * 1000;
        }
        var d = new Date(timestamp);//根据时间戳生成的时间对象
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        month = month < 10 ? '0'+ month : month;
        if(!!format){
            var DATE = format.replace('YYYY', year).replace('yyyy', year).replace('YY', year).replace('yy', year)
                             .replace('MM', month).replace('mm', month)
                             .replace('DD', date).replace('dd', date)
                             .replace('hh', hours).replace('ii', minutes).replace('ss', seconds);
        }else{
            var DATE = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        }
        return DATE;
    };
    //时间计算
    ZA.timesCount = function(seconds, date, format){
        if(!seconds){
            seconds = 0;
        }
        if(!date){
            date = this.getTimestamp();
        }
        if(!/^\d+$/.test(date)){
            date = this.dateToTimestamp(date);
        }
        return this.timestampToDate(parseInt(date, 10) + parseInt(seconds, 10), format);
    };
    
    //复制对象方法
    ZA.cloneObj = function(oldObj){
		if (typeof(oldObj) != 'object') return oldObj;
		if (oldObj == null) return oldObj;
		var newObj = new Object();
		for (var i in oldObj)
			newObj[i] = cloneObj(oldObj[i]);
		return newObj;
    };
    //扩展对象
    ZA.extendObj = function(){
		var args = arguments;
		if (args.length < 2) return;
		var temp = this.cloneObj(args[0]); //调用复制对象方法
		for (var n = 1; n < args.length; n++) {
			for (var i in args[n]) {
				temp[i] = args[n][i];
			}
		}
		return temp;
    };

    //获取一条格言
    ZA.getOneSaying = function(){
        return this.saying()[Math.floor(Math.random()*this.saying().length)];
    };
    //格言
    ZA.saying = function(){
        return [
        	'每天保持微笑。',
        	'天再高又怎样，踮起脚尖就更接近阳光。',
			'微笑拥抱每一天，做像向日葵般温暖的女子。',
			'别小看任何人，越不起眼的人。往往会做些让人想不到的事。',
			'没有伞的孩子必须努力奔跑！',
			'我们什么都没有，唯一的本钱就是青春。梦想让我与众不同，奋斗让我改变命运！',
			'你不勇敢，没人替你坚强！',
			'自信的生命最美丽！',
			'学会宽容，要有一颗宽容的爱心！',
			'心有多大，舞台就有多大。',
			'相信梦想是价值的源泉，相信眼光决定未来的一切，相信成功的信念比成功本身更重要，相信人生有挫折没有失败，相信生命的质量来自决不妥协的信念。',
			'如果心胸不似海，又怎能有海一样的事业。',
			'命运如同手中的掌纹，无论多曲折，终掌握在自己手中。',
			'真正的强者，不是流泪的人，而是含泪奔跑的人。',
			'只做第一个我，不做第二个谁。',
			'只有经历过地狱般的折磨，才有征服天堂的力量。只有流过血的手指才能弹出世间的绝唱。',
			'穷则思变，差则思勤！没有比人更高的山没有比脚更长的路。',
			'人生没有彩排，每天都是现场直播。',
			'带着感恩的心启程，学会爱，爱父母，爱自己，爱朋友，爱他人。',
			'用爱生活，你会使自己幸福！用爱工作，你会使很多人幸福！',
			'流过泪的眼睛更明亮，滴过血的心灵更坚强！',
			'当世界给草籽重压时，它总会用自己的方法破土而出。',
			'既然人生的幕布已经拉开，就一定要积极的演出；既然脚步已经跨出，风雨坎坷也不能退步；既然我已把希望播在这里，就一定要坚持到胜利的谢幕……',
			'我们可以失望，但不能盲目。',
			'自己选择的路、跪着也要把它走完。',
			'业精于勤，荒于嬉；行成于思，毁于随。',
			'原以为“得不到”和“已失去”是最珍贵的，可…原来把握眼前才是最重要的。',
			'我不去想是否能够成功，既然选择了远方，便只顾风雨兼程！',
			'我走得很慢，但我从不后退！',
			'这个社会是存在不公平的，不要抱怨，因为没有用！人总是在反省中进步的！',
			'不要轻易用过去来衡量生活的幸与不幸！每个人的生命都是可以绽放美丽的——只要你珍惜。',
			'没有创造的生活不能算生活，只能算活着。',
			'志在山顶的人，不会贪念山腰的风景',
			'没有一种不通过蔑视、忍受和奋斗就可以征服的命运。',
			'生活不是等待风暴过去，而是学会在雨中翩翩起舞。',
			'你可以很有个性，但某些时候请收敛。',
			'快乐不是因为得到的多而是因为计较的少！',
			'待人对事不要太计较，如果太计较就会有悔恨！',
			'把艰辛的劳作看作是生命的必然，即使没有收获的希望也心平气和的继续。',
			'前有阻碍，奋力把它冲开，运用炙热的激情，转动心中的期待，血在澎湃，吃苦流汗算什么。',
			'失败是什么？没有什么，只是更走近成功一步；成功是什么？就是走过了所有通向失败的路，只剩下一条路，那就是成功的路。',
			'善待他人，体谅他人，热爱生命，努力生活。',
			'岂能尽人如意，但求无愧于心！',
			'朋友是路，家是树。别迷路，靠靠树。',
			'世上没有绝望的处境，只有对处境绝望的人。',
			'性格决定命运，选择改变人生。',
			'永远要寻找比自己更积极的人，比自己更积极的环境。',
			'一份耕耘一份收获，未必；九份耕耘一份收获，一定。',
			'人既不是天使，又不是禽兽；但不幸就在于想表现为天使的人却表现为禽兽。',
			'只有一条路不能选择—那就是放弃的路；只有一条路不能拒绝—那就是成长的路。',
			'如果要后退，上帝就会在我们的后脑长双眼睛了',
			'生存是人类第一要务，而快乐却是生存的唯一原则。快乐是一个人心灵和精神所表现出来的满足，是最最纯洁和高尚的享受。',
			'靠山山会倒，靠水水会流，靠自己永远不倒。',
			'想要逃避总有借口，想要成功总有方法！',
			'对的，坚持；错的，放弃！',
			'实力加自信就是一把坚韧不摧的利剑也是通往成功的船票实力决定成败。',
			'老虎不发威他就一只病猫！发威了他就是王者！所以人人都可以是王者但同时也可能是病猫，关键在于你自己的选折！',
			'站得更高才能看得更远。',
			'人生最大的失败，就是放弃。',
			'嘴里说的人生，就是自己以后的人生。',
			'拿的起，放得下。凡事别勉强！',
			'一个真正的将军是拼出来的。',
			'有目标的人生才有方向有规划的人生才更精彩。',
			'这一秒不放弃，下一秒就有希望！坚持下去才可能成功！',
			'幸福和幸运是需要代价的，天下没有免费的午餐！',
			'付出不一定有收获，努力了就值得了。',
			'好多人做不好自己，是因为总想着做别人！',
			'从不奢求生活能给予我最好的，只是执着于寻求最适合我的！',
			'博学、正直、诚信！',
			'宁愿跑起来被拌倒无数次，也不愿规规矩矩走一辈子。就算跌倒也要豪迈的笑。',
			'不要生气要争气，不要看破要突破，不要嫉妒要欣赏，不要托延要积极，不要心动要行动。',
			'没有不老的誓言，没有不变的承诺，踏上旅途，义无反顾！',
			'选山攀崖！量力而为！',
			'态度决定一切，实力扞卫尊严！人要经得起诱惑耐得住寂寞！',
			'生命对某些人来说是美丽的，这些人的一生都为某个奋斗。',
			'牢记所得到的，忘记所付出的。',
			'笑口常开，好彩自然来！',
			'爱是恒久忍耐，又有恩慈。爱是不嫉妒。爱是不自夸，不张狂，不作害羞的事。不求自己的益处。不轻易发怒。不计算人的恶。不喜欢不义。只喜欢真理。凡事包容。凡事相信。凡事盼望。凡事忍耐。爱是永不止息。',
			'行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。',
			'没有天生的信心，只有不断培养的信心。',
			'只有一条路不能选择——那就是放弃的路；只有一条路不能拒绝——那就是成长的路。',
			'如果寒暄只是打个招呼就了事的话，那与猴子的呼叫声有什么不同呢？事实上，正确的寒暄必须在短短一句话中明显地表露出你对他的关怀。',
			'高峰只对攀登它而不是仰望它的人来说才有真正意义。',
			'做对的事情比把事情做对重要。',
			'失败是什么？没有什么，只是更走近成功一步；成功是什么？就是走过了所有通向失败的路，只剩下一条路，那就是成功的路。',
			'伟人之所以伟大，是因为他与别人共处逆境时，别人失去了信心，他却下决心实现自己的目标。',
			'世上没有绝望的处境，只有对处境绝望的人。',
			'让我们将事前的忧虑，换为事前的思考和计划吧！',
			'再长的路，一步步也能走完，再短的路，不迈开双脚也无法到达。',
			'不要等待机会，而要创造机会。',
			'每一发奋努力的背后，必有加倍的赏赐。',
			'人生伟业的建立，不在能知，乃在能行。',
			'任何的限制，都是从自己的内心开始的。',
			'含泪播种的人一定能含笑收获。',
			'当你感到悲哀痛苦时，最好是去学些什么东西。学习会使你永远立于不败之地。',
			'世界上那些最容易的事情中，拖延时间最不费力。',
			'人之所以能，是相信能。',
			'一个有信念者所开发出的力量，大于99个只有兴趣者。',
			'成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。'
        ];
    };
    //农历
    ZA.GetLunarDay = function(solarYear, solarMonth, solarDay){
	    var CalendarData = new Array(100);
	    var madd = new Array(12);
	    var tgString = "甲乙丙丁戊己庚辛壬癸";
	    var dzString = "子丑寅卯辰巳午未申酉戌亥";
	    var numString = "一二三四五六七八九十";
	    var monString = "正二三四五六七八九十冬腊";
	    var weekString = "日一二三四五六";
	    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
	    var cYear, cMonth, cDay, TheDate;
	    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
	    madd[0] = 0;
	    madd[1] = 31;
	    madd[2] = 59;
	    madd[3] = 90;
	    madd[4] = 120;
	    madd[5] = 151;
	    madd[6] = 181;
	    madd[7] = 212;
	    madd[8] = 243;
	    madd[9] = 273;
	    madd[10] = 304;
	    madd[11] = 334;
	    function GetBit(m, n) {
	        return (m >> n) & 1;
	    }
	    function e2c() {
	        TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0],
	                arguments[1], arguments[2]);
	        var total, m, n, k;
	        var isEnd = false;
	        var tmp = TheDate.getFullYear();
	        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4)
	                + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
	        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
	            total++;
	        }
	        for (m = 0;; m++) {
	            k = (CalendarData[m] < 0xfff) ? 11 : 12;
	            for (n = k; n >= 0; n--) {
	                if (total <= 29 + GetBit(CalendarData[m], n)) {
	                    isEnd = true;
	                    break;
	                }
	                total = total - 29 - GetBit(CalendarData[m], n);
	            }
	            if (isEnd)
	                break;
	        }
	        cYear = 1921 + m;
	        cMonth = k - n + 1;
	        cDay = total;
	        if (k == 12) {
	            if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
	                cMonth = 1 - cMonth;
	            }
	            if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
	                cMonth--;
	            }
	        }
	    }
	    function GetcDateString() {
	        var tmp = "";
	        tmp += tgString.charAt((cYear - 4) % 10);
	        tmp += dzString.charAt((cYear - 4) % 12);
	        tmp += "年 ";
	        if (cMonth < 1) {
	            tmp += "(闰)";
	            tmp += monString.charAt(-cMonth - 1);
	        } else {
	            tmp += monString.charAt(cMonth - 1);
	        }
	        tmp += "月";
	        tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿"
	                : "三十"));
	        if (cDay % 10 != 0 || cDay == 10) {
	            tmp += numString.charAt((cDay - 1) % 10);
	        }
	        return tmp;
	    }
	    function GetLunarDay(solarYear, solarMonth, solarDay) {
	        if (solarYear<1921 || solarYear>2020) {
	            return "";
	        } else {
	            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
	            e2c(solarYear, solarMonth, solarDay);
	            return GetcDateString();
	        }
	    }
	    return GetLunarDay(solarYear, solarMonth, solarDay);
    };
    //获取星期几
    ZA.getWeekOn = function(){
    	var D = new Date();
	    var week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        return week[D.getDay()];
    };
    //假期天数
    ZA.holiday = function(){
	    var holiday = [
	    	'2016-12-4',
	    	'2016-12-11',
	    	'2016-12-18',
	    	'2016-12-25',
	    	'2017-1-1',
	    	'2017-1-2',
	    	'2017-1-8',
	    	'2017-1-15',
	    	'2017-1-22',
	    	'2017-1-29',
	    	'2017-2-5',
	    	'2017-2-12',
	    	'2017-2-19',
	    	'2017-2-26',
	    	'2017-3-5',
	    	'2017-3-12',
	    	'2017-3-19',
	    	'2017-3-26',
	    	'2017-4-2',
	    	'2017-4-9',
	    	'2017-4-16',
	    	'2017-4-23',
	    	'2017-4-30',
	    	'2017-5-7',
	    	'2017-5-14',
	    	'2017-5-21',
	    	'2017-5-28',
	    ];
	    var t = 0;
        for (var i = 0; i < holiday.length; i++) {
        	if(this.dateToTimestamp(holiday[i]) >= this.getTimestamp() && this.dateToTimestamp(holiday[i]) < this.dateToTimestamp(this.options.yuandan)){
        		t++;
        	}
        }
        return t;
    };

	ZA.show();
	window.HN_ZAOAN = ZA;
}();