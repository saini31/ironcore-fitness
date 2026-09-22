(function(){
  var CFG = window.SITE_CONFIG;

  // Fallback handler for broken images
  window.handleImgError = function(img){
    img.style.display = 'none';
    var fb = img.parentElement.querySelector('.img-fallback');
    if(fb){ fb.style.display = 'flex'; }
  };

  // Populate configured images
  document.querySelectorAll('[data-src-key]').forEach(function(el){
    var key = el.getAttribute('data-src-key');
    if(CFG.images[key]){ el.src = CFG.images[key]; }
  });

  // Navbar scroll state
  var nav = document.getElementById('navbar');
  function onScroll(){
    if(window.scrollY > 40){ nav.classList.add('scrolled'); }
    else{ nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile menu
  var menuBtn = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', function(){
    mobileMenu.classList.toggle('hidden');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ mobileMenu.classList.add('hidden'); });
  });

  // Wire all WhatsApp buttons
  function wireWA(selector, defaultMsg){
    document.querySelectorAll(selector).forEach(function(btn){
      var msg = btn.getAttribute('data-msg') || defaultMsg;
      btn.setAttribute('href', waLink(msg));
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    });
  }
  var GENERIC_MSG = "Hi, I found your gym website and I'm interested in joining. Please share the membership details.";
  wireWA('#nav-wa-btn', GENERIC_MSG);
  wireWA('.mobile-wa-btn', GENERIC_MSG);
  wireWA('.hero-wa-btn', GENERIC_MSG);
  wireWA('#wa-float', GENERIC_MSG);
  wireWA('.svc-wa-btn', GENERIC_MSG);
  wireWA('.trainer-wa-btn', GENERIC_MSG);
  wireWA('.diet-wa-btn', GENERIC_MSG);
  wireWA('.plan-wa-btn', GENERIC_MSG);
  wireWA('.contact-wa-btn', GENERIC_MSG);

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(function(el){ io.observe(el); });

  // Animated counters
  var counters = document.querySelectorAll('.counter');
  var counterIO = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var start = 0;
        var duration = 1400;
        var startTime = null;
        function step(ts){
          if(!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString('en-IN') + (progress === 1 ? '+' : '');
          if(progress < 1){ requestAnimationFrame(step); }
        }
        requestAnimationFrame(step);
        counterIO.unobserve(el);
      }
    });
  }, {threshold:0.4});
  counters.forEach(function(el){ counterIO.observe(el); });

  // Testimonials data + render
  var testimonials = [
    {name:"Aman Verma", goal:"Strength Training", rating:5, img:CFG.images.testimonial1, text:"Great trainers, amazing environment and excellent equipment. The trainers actually pay attention to your form and progress."},
    {name:"Priya Sharma", goal:"Weight Loss", rating:5, img:CFG.images.testimonial2, text:"I joined for weight loss and within a few months I could clearly see the difference. The personal attention and diet guidance helped a lot."},
    {name:"Karan Mehta", goal:"Muscle Building", rating:5, img:CFG.images.testimonial3, text:"The best gym I've trained at in Kota. Clean equipment, knowledgeable trainers and a genuinely motivating atmosphere every single day."},
    {name:"Sneha Joshi", goal:"General Fitness", rating:5, img:CFG.images.testimonial4, text:"IronCore changed how I think about fitness. The diet plan combined with structured training gave me results I never expected."},
    {name:"Rohan Gupta", goal:"Strength Training", rating:4, img:CFG.images.testimonial5, text:"Solid equipment and even better coaching. My trainer adjusted my program every few weeks based on how I was progressing."},
    {name:"Divya Nair", goal:"Weight Loss", rating:5, img:CFG.images.testimonial6, text:"Supportive community, professional trainers and a diet plan that actually fit my lifestyle. Couldn't have asked for more."}
  ];
  var track = document.getElementById('testimonial-track');
  testimonials.forEach(function(t){
    var stars = '★★★★★'.slice(0,5).split('').map(function(s,i){ return '<span class="star">'+(i < t.rating ? '★' : '☆')+'</span>'; }).join('');
    var card = document.createElement('div');
    card.className = 'card p-7 min-w-[300px] sm:min-w-[360px] snap-start flex-shrink-0';
    card.innerHTML =
      '<div class="mb-3">'+stars+'</div>' +
      '<p class="text-sm text-[var(--text)]/90 leading-relaxed mb-6">"'+t.text+'"</p>' +
      '<div class="flex items-center gap-3">' +
        '<div class="w-11 h-11 rounded-full overflow-hidden bg-[var(--surface-2)] flex-shrink-0 relative">' +
          '<img src="'+t.img+'" alt="'+t.name+'" class="w-full h-full object-cover" onerror="handleImgError(this)">' +
          '<div class="img-fallback absolute inset-0"><span class="text-lg">🙂</span></div>' +
        '</div>' +
        '<div><p class="font-semibold text-sm">'+t.name+'</p><p class="text-xs text-[var(--muted)]">'+t.goal+'</p></div>' +
      '</div>';
    track.appendChild(card);
  });
  document.getElementById('t-next').addEventListener('click', function(){
    track.scrollBy({left: 380, behavior:'smooth'});
  });
  document.getElementById('t-prev').addEventListener('click', function(){
    track.scrollBy({left: -380, behavior:'smooth'});
  });

  // Gallery render + lightbox
  var galleryGrid = document.getElementById('gallery-grid');
  CFG.images.gallery.forEach(function(src, idx){
    var div = document.createElement('div');
    div.className = 'img-hover relative aspect-square cursor-pointer overflow-hidden ' + (idx === 0 ? 'col-span-2 row-span-2' : '');
    div.innerHTML =
      '<img src="'+src+'" alt="IronCore Fitness gallery photo '+(idx+1)+'" class="w-full h-full object-cover" onerror="handleImgError(this)">' +
      '<div class="img-fallback"><span class="text-4xl">📷</span></div>';
    div.addEventListener('click', function(){
      document.getElementById('lightbox-img').src = src;
      document.getElementById('lightbox').classList.add('open');
    });
    galleryGrid.appendChild(div);
  });
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', function(e){
    if(e.target.id === 'lightbox'){ closeLightbox(); }
  });
  function closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); }

  // FAQ
  var faqs = [
    {q:"What are the gym timings?", a:"IronCore Fitness is open Monday to Saturday, from 5:30 AM to 10:00 PM. We're closed on Sundays."},
    {q:"Do you provide personal training?", a:"Yes, we offer one-on-one personal training with certified trainers, available across our Pro and Elite membership plans."},
    {q:"Do you provide diet plans?", a:"Yes, our Elite plan includes a fully personalized diet plan, and standalone diet consultations are also available on request."},
    {q:"Is there a trial session?", a:"Yes, we offer a free trial session so you can experience our equipment, trainers and environment before joining."},
    {q:"What membership plans are available?", a:"We offer Basic, Pro and Elite monthly plans. Pricing and inclusions can be customized based on your goals."},
    {q:"Is the gym suitable for beginners?", a:"Absolutely. Our trainers design beginner-friendly programs and guide you through correct form from day one."},
    {q:"Do you provide weight loss programs?", a:"Yes, we have a dedicated Weight Loss Program combining structured training with calorie-controlled nutrition guidance."},
    {q:"Can I contact the trainer directly?", a:"Yes, once enrolled you can coordinate directly with your assigned trainer for scheduling and progress check-ins."}
  ];
  var faqList = document.getElementById('faq-list');
  faqs.forEach(function(f, i){
    var item = document.createElement('div');
    item.className = 'py-2';
    item.innerHTML =
      '<button class="accordion-btn w-full flex items-center justify-between py-5 text-left" aria-expanded="false">' +
        '<span class="font-semibold pr-6">'+f.q+'</span>' +
        '<span class="chev text-[var(--accent)] transition-transform duration-300 flex-shrink-0">⌄</span>' +
      '</button>' +
      '<div class="accordion-panel"><p class="text-[var(--muted)] text-sm pb-5 pr-8">'+f.a+'</p></div>';
    faqList.appendChild(item);
    var btn = item.querySelector('.accordion-btn');
    var panel = item.querySelector('.accordion-panel');
    btn.addEventListener('click', function(){
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      // close all
      faqList.querySelectorAll('.accordion-btn').forEach(function(b){
        b.setAttribute('aria-expanded','false');
        b.parentElement.querySelector('.accordion-panel').style.maxHeight = null;
      });
      if(!isOpen){
        btn.setAttribute('aria-expanded','true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Enquiry form (demo — no backend)
  var form = document.getElementById('enquiry-form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('form-success').classList.remove('hidden');
    form.reset();
  });

})();
