document.addEventListener("DOMContentLoaded", function () {
  console.log('Your document is ready!');

//Phone mask
  var telField = document.querySelector('input[type="tel"]');
  if (document.body.contains(telField)) {
    var maskOptions = {
      mask: '+{7} 000 000-00-00'
    };
    var mask = IMask(telField, maskOptions);
  }

//Login timer
  var coutnowd = function startTimer(duration, display) {
    var start = Date.now(),
      diff,
      minutes,
      seconds;
    function timer() {
      diff = duration - (((Date.now() - start) / 1000) | 0);
      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = minutes + ":" + seconds;
      if(diff < 0){
        display.textContent = "00:00";
      }
    }
    timer();
    setInterval(timer, 1000);
  };
  var time = 60 * 60,
    display = document.querySelector('#loginTimer');
  if (document.body.contains(display)) {
    coutnowd(time, display);
  }
  var timeSMS = 1 * 5,
    displaySMS = document.querySelector('.approving__timer');
  if (document.body.contains(displaySMS)) {
    coutnowd(timeSMS, displaySMS);
  }

//Select
  var x, i, j, selElmnt, a, b, c, img;
  x = document.getElementsByClassName("select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    if (selElmnt.options[selElmnt.selectedIndex].getAttribute('data-icon') !== null) {
      a.innerHTML = '<img src="' + selElmnt.options[selElmnt.selectedIndex].getAttribute('data-icon') + '" alt=""><span>' + selElmnt.options[selElmnt.selectedIndex].innerHTML+'</span>';
    }else{
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    }
    if(selElmnt.disabled){
      x[i].classList.add('select--disabled');
    }
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      c = document.createElement("DIV");
      if (selElmnt.options[j].getAttribute('data-icon') !== null) {
        c.innerHTML = '<img src="' + selElmnt.options[j].getAttribute('data-icon') + '" alt=""><span>' + selElmnt.options[j].innerHTML+'</span>';
      }else{
        c.innerHTML = selElmnt.options[j].innerHTML;
      }
      c.addEventListener("click", function (e) {
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.textContent) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    if(selElmnt.disabled){
      console.log('HUY');
    }else{
      a.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
  }
  function closeAllSelect(elmnt) {
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  document.addEventListener("click", closeAllSelect);

});