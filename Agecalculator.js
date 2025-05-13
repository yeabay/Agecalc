const picker = document.querySelector('.picker');
const dateInput = document.getElementById("input-field")
const monthInput = picker.querySelector(".month-input")
const yearInput = picker.querySelector('.year-input')
const cancelBtn = picker.querySelector('.cancel')
const applyBtn = picker.querySelector('.apply')
const nextBtn = picker.querySelector('.next')
const prevBtn = picker.querySelector('.prev')
const dates = picker.querySelector(".dates")
const calcBtn = document.querySelector('.calcbutton');
const verdict = document.querySelector('.verdict');


let selectedDate = new Date();
let year =selectedDate.getFullYear();
let month=selectedDate.getMonth();

//show datepicker
dateInput.addEventListener('click',()=>{
    picker.hidden =false;
});
//hide datepicker
cancelBtn.addEventListener("click",()=>{
    picker.hidden =true;
});
applyBtn.addEventListener("click", () => {
  const selectedButton = dates.querySelector('.selected');

  // ✅ Only update selectedDate if a day is selected
  if (selectedButton) {
    const selectedDay = parseInt(selectedButton.textContent);
    selectedDate = new Date(year, month, selectedDay);

    // Update input box
    dateInput.value = selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  }

  picker.hidden = true;
   
});




// preva dn next btn
nextBtn.addEventListener('click',()=> {
    if(month ===11) year++;
    month= (month+1)%12;
    displayDates();


})

prevBtn.addEventListener('click',()=> {
    if(month ===0) year--;
    month= (month-1+12)%12;
    displayDates();


})

//input fields update the rest
monthInput.addEventListener('change',()=>{
    month= month.selectedIndex
    displayDates();
})
yearInput.addEventListener('change',()=>{
    year= yearInput.value
    displayDates();
})
//the input fields
const updateYearMonth=()=> {
    monthInput.selectedIndex =month;
    yearInput.value =year;

}
//this is for clicking dates
const handleDateClick =(e) =>{
    const button =e.target;


//remove the selected class from other buttons
const selected = dates.querySelector('.selected');
selected && selected.classList.remove('selected');


//add the seected classonto this button
button.classList.add('selected')

// set the selected date
selectedDate =new Date(year,month,parseInt(button.textContent))
}

// redoing the picker
const displayDates=(params)=>{
    updateYearMonth();
   dates.innerHTML="";

   //display last day of previous month the day
   const lastofprevMonth =new Date (year,month,0)
  

   for (let i=0; i<=lastofprevMonth.getDay(); i++){
       const text = lastofprevMonth.getDate()-lastofprevMonth.getDay()+i;
        const button = createButton(text,true,false);
        dates.appendChild(button);
   }
   //display last date of the month the number
   const lastofMonth = new Date(year,month+1,0);

   for (let i=1; i<=lastofMonth.getDate(); i++){

    //which day should be today
    
    const button = createButton(i,false);
    button.addEventListener('click',handleDateClick)
    dates.appendChild(button);
   }
   //display first week of of next month the number
     const firstOfNextMonth = new Date(year, month + 1, 1);

    for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
    // if the first day starts on Sunday don't show the trailing dates
    if (firstOfNextMonth.getDay() === 0) break;

    const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;
    const button = createButton(text, true,false);
    dates.appendChild(button);
  }
   //console.log(lastofMonth.toDateString());
}



const createButton=(text, isDisabled=false) => {
    const currentDate = new Date();
    //check if the current button is the day today
    const isToday =
        currentDate.getDate()===text &&
        currentDate.getFullYear()===year &&
        currentDate.getMonth() ===month;

//check if the current button is selected
    const selected =
        selectedDate.getDate()===text &&
        selectedDate.getFullYear()===year &&
        selectedDate.getMonth()===month;

    const button = document.createElement('button');
    button.textContent =text;
    button.disabled=isDisabled;
    button.classList.toggle('today', isToday);
    button.classList.toggle('selected', selected);
    return button;

}
displayDates();

//calculate birthday
function calculateAge() {
  const today = new Date();

  let age = today.getFullYear() - selectedDate.getFullYear();
  let monthold = today.getMonth() - selectedDate.getMonth();
  let dayold = today.getDate() - selectedDate.getDate();

  if (dayold < 0) {
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    dayold += prevMonth.getDate();
    monthold--;
  }

  if (monthold < 0) {
    monthold += 12;
    age--;
  }

  verdict.textContent = `You are ${age} year${age !== 1 ? 's' : ''}, ${monthold} month${monthold !== 1 ? 's' : ''}, and ${dayold} day${dayold !== 1 ? 's' : ''} old.`;
}
calcBtn.addEventListener('click', calculateAge);
