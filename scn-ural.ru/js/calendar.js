function calendar() {
    
    const calendar = document.querySelector('div.datePublicNews');
    const d = new Date();
    const month = d.getUTCMonth();
    const year = d.getFullYear(); 
    const first_day = new Date(year,month,1);
    const nextMonth = new Date(year, month + 1, 1);
    const oneHour = 1000 * 60 * 60;
    const oneDay = oneHour * 24; 
    const today = String(d.getDate());
    const last_date = Math.ceil((nextMonth.getTime() - first_day.getTime() - oneHour)/oneDay);
    const n = new Array ("Январь","Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", 
    "Октябрь", "Ноябрь", "Декабрь");
    
    elem = document.createElement('div'); 
    elem.className = 'titleMonth';
    elem.innerHTML = `<div id="prevMonth"><<</div><div class="wrapSelectYear"><div id="monthCalendar">${n[month]}</div><select id="yearCalendar"></select></div><div id="nextMonth">>></div>`;
    calendar.appendChild(elem);

    selectYearCalendar = document.querySelector('select#yearCalendar');

    for (let i = year; i > 2022; i--) {
        elem = document.createElement('option');
        elem.innerHTML = `<option value="${i}">${i}<option>`;
        selectYearCalendar.appendChild(elem);
    }

    wrapDayCalendar = document.createElement('div');
    wrapDayCalendar.className = 'dayCalendars';
    calendar.append(wrapDayCalendar);

    for (let day = 1; day<=last_date; day++ ) {
        elem = document.createElement('div');
        elem.className = 'day'+day;
        elem.style.textAlign = 'center';
        elem.style.padding = 11+'px';
        elem.style.width = 35+'px';
        elem.innerHTML = day;
        document.querySelector('div.dayCalendars').append(elem);  
    }

    let activeToday = (monthClr, month) => {

        for (let elem of document.querySelector('div.dayCalendars').children) {
            todayBold = elem.innerHTML;   
            if (month == monthClr  && today == todayBold) {
                 elem.style.background = '#524e4ecc';
                 elem.innerHTML = `<b>${elem.innerText}</b>`;
             
         }
       } 
    }

    activeToday();
    const prevMonth = document.querySelector('div#prevMonth');
    const mCalendar = document.querySelector('div#monthCalendar');

    let nextPrvMonth = month;

    prevMonth.onclick = () => {
        if (nextPrvMonth != 0){ 
           
            nextPrvMonth = nextPrvMonth - 1;
            pMonth = n[nextPrvMonth];
                mCalendar.innerHTML = pMonth;
              
            const currentMonth = new Date(year, (nextPrvMonth + 1), 1);
            const prevM = new Date(year,nextPrvMonth,1);

              p = Math.ceil((currentMonth.getTime()  - prevM.getTime() - oneHour)/oneDay);
         
                    document.querySelector('div.dayCalendars').remove();

                        elemDayCalendar = document.createElement('div');
                        elemDayCalendar.className = 'dayCalendars';
                        document.querySelector('div.datePublicNews').appendChild(elemDayCalendar);

                     for (let day = 1; day<p+1; day++ ) {
                        elem = document.createElement('div');
                        elem.className = 'day'+day;
                        elem.style.textAlign = 'center';
                        elem.style.padding = 11+'px';
                        elem.style.width = 35+'px';
                        elem.innerHTML = day;
                        document.querySelector('div.dayCalendars').append(elem);  
                    }
         }
     activeToday(nextPrvMonth, month);
     }

    const anotherMonth = document.querySelector('div#nextMonth');

    anotherMonth.onclick = () => {
   
        if (nextPrvMonth != n.length-1){ 
            nextPrvMonth = nextPrvMonth + 1;
            pMonth = n[nextPrvMonth];
                mCalendar.innerHTML = pMonth;
              
        const currentMonth = new Date(year, (nextPrvMonth + 1), 1);
        const prevM = new Date(year,nextPrvMonth,1);

           p = Math.ceil((currentMonth.getTime()  - prevM.getTime() - oneHour)/oneDay);
         
                     document.querySelector('div.dayCalendars').remove();

                        elemDayCalendar = document.createElement('div');
                        elemDayCalendar.className = 'dayCalendars';
                        document.querySelector('div.datePublicNews').appendChild(elemDayCalendar);

                    for (let day = 1; day<p+1; day++ ) {
                        elem = document.createElement('div');
                        elem.className = 'day'+day;
                        elem.style.textAlign = 'center';
                        elem.style.padding = 11+'px';
                        elem.style.width = 35+'px';
                        elem.innerHTML = day;
                        document.querySelector('div.dayCalendars').append(elem);  
                    }
         }
         activeToday(nextPrvMonth, month);
     }
     
      
}


calendar();
