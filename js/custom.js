document.addEventListener("DOMContentLoaded", function () {
//Fixes for IE browser
  if (typeof NodeList !== "undefined" && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
//Phone mask
  if (document.querySelectorAll('input[type="tel"]').length > 0) {
    document.querySelectorAll('input[type="tel"]').forEach(function (tel) {
      var maskOptions = {
        mask: '+{7} 000 000-00-00'
      };
      var mask = IMask(tel, maskOptions);
    });
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
      if (diff < 0) {
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
  var timeSMS = 5 * 60,
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
      a.innerHTML = '<img src="' + selElmnt.options[selElmnt.selectedIndex].getAttribute('data-icon') + '" alt=""><span>' + selElmnt.options[selElmnt.selectedIndex].innerHTML + '</span>';
    } else {
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    }
    if (selElmnt.disabled) {
      x[i].classList.add('select--disabled');
    }
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      c = document.createElement("DIV");
      if (selElmnt.options[j].getAttribute('data-icon') !== null) {
        c.innerHTML = '<img src="' + selElmnt.options[j].getAttribute('data-icon') + '" alt=""><span>' + selElmnt.options[j].innerHTML + '</span>';
      } else {
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
    if (selElmnt.disabled) {
      console.log('disabled');
    } else {
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

//  Drop down add document
  if (document.querySelectorAll('.cabinet-menu__ddb').length > 0) {
    document.querySelectorAll('.js-add-doc')[0].addEventListener('click', function (e) {
      e.stopPropagation();
      this.parentNode.classList.toggle('cabinet-menu__ddb_active');
    });
    document.addEventListener("click", function (e) {
      var targetElement = e.target;
      do {
        if (targetElement == document.querySelectorAll('.cabinet-menu__ddb')[0]) {
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);
      document.querySelectorAll('.js-add-doc')[0].parentNode.classList.remove('cabinet-menu__ddb_active');
    });
  }
//  Chips
  if (document.querySelectorAll('.chips').length > 0) {
    document.querySelectorAll('.chips').forEach(function (chips) {
      chips.addEventListener('click', function (event) {
        if (event.target === this) {
          this.getElementsByTagName('input')[0].focus();
        }
      });
    });
    document.addEventListener('click', function (e) {
      if (e.target && e.target.classList.contains('chip__close')) {
        e.target.parentNode.remove();
      }
    });
    document.querySelectorAll('.inp-chip').forEach(function (inpChip) {
      inpChip.addEventListener('blur', function (e) {
        if (e.target.value !== '') {
          this.insertAdjacentHTML('beforebegin', '<div class="chip">' + e.target.value + '<span' +
            ' class="chip__close"></span></div>');
          e.target.value = '';
        }
      });
      inpChip.addEventListener('keydown', function (e) {
        if (e.target.value !== '' && e.keyCode === 13) {
          this.closest('form').onkeypress = function (e) {
            var key = e.charCode || e.keyCode || 0;
            if (key == 13) {
              e.preventDefault();
            }
          };
          this.insertAdjacentHTML('beforebegin', '<div class="chip">' + e.target.value + '<span class="chip__close"></span></div>');
          e.target.value = '';
        }
      });
    });
  }
//  Icon button + Dropdown menu
  if (document.querySelectorAll('.icon-btn').length > 0 && document.querySelectorAll('.dd-box').length > 0) {
    document.querySelectorAll('.icon-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.nextElementSibling.style.display = this.nextElementSibling.style.display !== 'block' ? 'block' : 'none';
      });
      document.addEventListener("click", function (e) {
        var targetElement = e.target;
        do {
          if (targetElement == btn || targetElement == btn.nextElementSibling) {
            return;
          }
          targetElement = targetElement.parentNode;
        } while (targetElement);
        btn.nextElementSibling.style.display = 'none';
      });
    });
  }
//  Mobile menu
  if (document.querySelectorAll('.cabinet__mobile-menu').length > 0) {
    document.querySelectorAll('.cabinet__mobile-menu-box')[0].addEventListener('click', function () {
      this.classList.toggle('opened');
      document.querySelectorAll('.cabinet__sidebar')[0].style.left = document.querySelectorAll('.cabinet__sidebar')[0].style.left !== '0px' ? '0px' : '-256px';
    });
  }
//  All modals
  if(document.querySelectorAll('.modal').length > 0){
    document.querySelectorAll('.modal').forEach(function (modal) {
      modal.addEventListener('click',function (e) {
        if(e.target === this){
          document.body.classList.remove('ovh');
          this.classList.remove('modal_opened');
        }
      })
    });
    document.querySelectorAll('.js-modal-close').forEach(function (close) {
      close.addEventListener('click',function (e) {
        e.preventDefault();
        document.body.classList.remove('ovh');
        this.closest('div.modal').classList.remove('modal_opened');
      })
    });
  }
//  Cabinet Modals
  if(document.querySelectorAll('.js-email-cabinet').length > 0 || document.querySelectorAll('.js-modal-cabinet').length > 0){
    document.querySelectorAll('.js-email-cabinet').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var inp = this.parentElement.querySelectorAll('input[type="email"]')[0];
        var val = inp.value;
        inp.removeAttribute("disabled");
        inp.value = '';
        inp.value = val;
        inp.focus();
      });
    });
    document.querySelectorAll('.js-modal-cabinet').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var modal = this.getAttribute('href');
        document.body.classList.add('ovh');
        document.querySelectorAll('.modal'+modal)[0].classList.add('modal_opened');
      });
    });
  }

});