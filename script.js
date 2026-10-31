(function () {
  'use strict';

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    var sign = item.querySelector('.faq-sign');
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      items.forEach(function (other) {
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').hidden = true;
        other.querySelector('.faq-sign').textContent = '+';
      });
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        sign.textContent = '−';
      }
    });
  });

  var form = document.getElementById('lead-form');
  var success = document.getElementById('form-success');
  var error = document.getElementById('form-error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.elements.name;
    var contact = form.elements.contact;
    var ok = name.value.trim() !== '' && contact.value.trim() !== '';

    name.classList.toggle('invalid', name.value.trim() === '');
    contact.classList.toggle('invalid', contact.value.trim() === '');
    error.hidden = ok;
    if (!ok) return;

    var data = {
      name: name.value.trim(),
      contact: contact.value.trim(),
      goal: form.elements.goal.value
    };

    console.log('Нова заявка (демо):', data);

    form.hidden = true;
    success.hidden = false;
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();