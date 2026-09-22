// --- State ---
let authMode = "login";
let player = null;
let progressInterval = null;
let toastTimeout = null;
let currentlyPlayingContainerId = null; // متابعة المشغل الحالي لإغلاقه عند فتح غيره
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyfqSc691JtMNfxsX3XiE4RSIK7X6ieCaVH-ysZ6gSsBCskf38cGG3tn4XZgoBzPQzu/exec";

// --- UI Feedback Helper (Notification Toast) ---
function showNotification(message, type = "error") {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.style.cssText = `
      display: none;
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 18px;
      border-radius: 8px;
      color: #ffffff;
      font-size: 0.85rem;
      font-weight: 600;
      z-index: 99999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: opacity 0.3s ease, transform 0.3s ease;
      text-align: center;
      max-width: 280px;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  if (toastTimeout) clearTimeout(toastTimeout);

  toast.style.backgroundColor = type === "error" ? "#ef4444" : "#10b981";
  toast.innerText = message;
  toast.style.display = "block";

  void toast.offsetWidth;
  toast.style.opacity = "1";

  toastTimeout = setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.style.display = "none";
    }, 300);
  }, 3500);
}

// --- Theme Control ---
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.className = theme === "dark" ? "icon-sun" : "icon-moon";
  }

  const cardLight = document.getElementById("theme-card-light");
  const cardDark = document.getElementById("theme-card-dark");
  const cardIcon = document.getElementById("theme-card-icon");
  const cardText = document.getElementById("theme-card-text");

  if (cardIcon && cardText) {
    if (theme === "dark") {
      cardIcon.src = "./src/Imgs/sun.svg";
      cardText.innerText = "الوضع الفاتح";
    } else {
      cardIcon.src = "./src/Imgs/dark.svg";
      cardText.innerText = "الوضع الداكن";
    }
  }
  if (cardLight) cardLight.classList.toggle("active", theme === "light");
  if (cardDark) cardDark.classList.toggle("active", theme === "dark");
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const current =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  setTheme(current);
}

// تهيئة الوضع عند تحميل الصفحة
setTheme(localStorage.getItem("theme") || "light");

// --- SPA Navigation ---
function navigateTo(view, param = null, shouldPushState = true) {
  const root = document.getElementById("app-root");
  if (!root) return;

  // إيقاف أي فيديو يعمل حالياً عند التنقل بين الصفحات
  if (currentlyPlayingContainerId) {
    closeVideoContainer(currentlyPlayingContainerId);
  }

  window.scrollTo(0, 0);

  if (shouldPushState) {
    const hash = param ? `#${view}?id=${param}` : `#${view}`;
    history.pushState({ view, param }, "", hash);
  }

  if (view === "course") {
    renderCourseView(root, param);
  } else {
    renderHomeView(root);
  }
}

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.view) {
    navigateTo(event.state.view, event.state.param, false);
  } else {
    parseHashAndNavigate(false);
  }
});

function parseHashAndNavigate(shouldPushState = false) {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const [view, queryString] = hash.split("?");
    const urlParams = new URLSearchParams(queryString);
    const param = urlParams.get("id");
    navigateTo(view, param, shouldPushState);
  } else {
    navigateTo("home", null, shouldPushState);
  }
}

// --- Home View ---
function renderHomeView(container) {
  const cardsHTML =
    typeof COURSES_DATA !== "undefined" && Array.isArray(COURSES_DATA)
      ? COURSES_DATA.map(
          (course) => `
      <div class="grade-card" style="background-image: url('${course.bgImage}');">
        <div class="grade-card-content ${course.class}" onclick="navigateTo('course', '${course.id}')">
          <span>${course.title}</span>
          <button class="btn-card">
            من هنا <span class="arrow-icon"> <svg width="15" height="15" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.41406 11L1.41406 6L6.41406 1M1.41406 6H13.4141" stroke="" stroke-width="2" stroke-linecap="round"/>
</svg>
 </span>
          </button>
        </div>
      </div>
    `,
        ).join("")
      : "";

  container.innerHTML = `
    <section class="hero">
      <span class="math-symbol" style="top: 5%; right: 15%;">∑</span>
      <span class="math-symbol" style="top: 10%; left: 10%;">π</span>
      <span class="math-symbol" style="bottom: 5%; right: 25%;">÷</span>
      <span class="math-symbol" style="bottom: 5%; left: 25%;">%</span>
      <h1 style="font-family: var(--heroFont); color: var(--text-main);">الرياضيات مش عقدة.. مع مستر شريف هلال، الدرجة النهائية في جيبك!</h1>
    </section>

    <section class="grades-section">
      <div class="section-title">
      <small style="color: var(--accent);" >%</small>
        <span>الصفوف الدراسية</span>
        <small style="color: var(--accent);">%</small>
      </div>
      <div class="cards-grid">
        ${cardsHTML}
      </div>
    </section>

    <section class="whatsapp-section">
      <h3>انضم لجروب الواتساب</h3>
      <p>عشان تتابع أول بأول المواعيد والمذكرات المجانية</p>
      <button class="whatsapp-btn" onclick="window.open('#', '_blank')">انضم لجروب الواتساب</button>
    </section>
  `;
}

// --- Course View ---
function renderCourseView(container, courseId) {
  if (typeof COURSES_DATA === "undefined") return;
  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0];
  if (!course) return;

  const unitsHTML =
    course.units && course.units.length > 0
      ? course.units
          .map(
            (unit) => `
    <div class="accordion-item">
      <div class="accordion-header aco" onclick="toggleAccordion('${unit.id}', this)">
        <div>
          <strong>${unit.title}</strong>
          <small style="display: block; color: var(--text-muted);">${unit.subtitle || ""}</small>
        </div>
        <svg class="dropdown-icon" width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.7895 7.41333L9.80446 1.47607C9.02366 0.812389 7.86755 0.846238 7.12692 1.55446L1 7.41333"
            stroke="var(--text-main)" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>
      <div class="accordion-content" id="${unit.id}">
        ${
          unit.lessons
            ? unit.lessons
                .map((lesson) => {
                  // توليد كود الفيديوهات (يدعم فيديو واحد أو مصفوفة فيديوهات)
                  let videoHTML = "";
                  if (lesson.videos && Array.isArray(lesson.videos) && lesson.videos.length > 0) {
                    videoHTML = lesson.videos
                      .map(
                        (vid, idx) => `
                      <div class="content-list-item" onclick="loadNativeVideo('${vid.videoId}', '${lesson.id}-player-container-${idx}')">
                        <p>${vid.title || `فيديو الشرح ${idx + 1}`}</p>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill=""></path><path d="M12.5 12.5L12.5 12.5" stroke="" stroke-width="2" stroke-linecap="round"></path></g></svg>
                      </div>
                      <div id="${lesson.id}-player-container-${idx}" class="video-container-box" style="display: none; margin-top: 12px; width: 100%; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; background: #000;">
                      </div>
                    `,
                      )
                      .join("");
                  } else if (lesson.videoId) {
                    videoHTML = `
                      <div class="content-list-item" onclick="loadNativeVideo('${lesson.videoId}', '${lesson.id}-player-container')">
                        <p>فيديو الشرح</p>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill=""></path><path d="M12.5 12.5L12.5 12.5" stroke="" stroke-width="2" stroke-linecap="round"></path></g></svg>
                      </div>
                      <div id="${lesson.id}-player-container" class="video-container-box" style="display: none; margin-top: 12px; width: 100%; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; background: #000;">
                      </div>
                    `;
                  }

                  const pdfHTML =
                    lesson.pdfUrl || lesson.pdf
                      ? `
            <div class="content-list-item" onclick="window.open('${lesson.pdfUrl || lesson.pdf}', '_blank')">
              <p>ملف الشرح</p>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z" fill=""></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.25 10C12.25 9.58579 12.5858 9.25 13 9.25H18C18.4142 9.25 18.75 9.58579 18.75 10C18.75 10.4142 18.4142 10.75 18 10.75H13C12.5858 10.75 12.25 10.4142 12.25 10Z" fill="white"></path> <path d="M16.9856 3.02094C16.8321 3 16.6492 3 16.2835 3H12L12.3699 3.38312C13.0359 4.07299 13.2919 4.33051 13.5877 4.50096C13.7594 4.5999 13.9415 4.67804 14.1304 4.73383C14.4559 4.82993 14.8128 4.83538 15.7546 4.83538L16.089 4.83538C17.0914 4.83536 17.8995 4.83535 18.5389 4.91862C18.6984 4.93939 18.8521 4.96582 19 5C18.8144 3.96313 18.0043 3.15985 16.9856 3.02094Z" fill=""></path> </g></svg>
            </div>
          `
                      : "";

                  const quizHTML =
                    lesson.quizId || lesson.quizUrl
                      ? `
            <div class="content-list-item" onclick="showNotification('جاري فتح الاختبار...', 'success')">
              <p>اختبار الدرس</p>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" fill=""></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 4.03662C5.24209 4.10719 4.44798 4.30764 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.552 4.30764 18.7579 4.10719 17.5 4.03662V4.5C17.5 6.15685 16.1569 7.5 14.5 7.5H9.5C7.84315 7.5 6.5 6.15685 6.5 4.5V4.03662ZM6.25 10.5C6.25 10.0858 6.58579 9.75 7 9.75H17C17.4142 9.75 17.75 10.0858 17.75 10.5C17.75 10.9142 17.4142 11.25 17 11.25H7C6.58579 11.25 6.25 10.9142 6.25 10.5ZM7.25 14C7.25 13.5858 7.58579 13.25 8 13.25H16C16.4142 13.25 16.75 13.5858 16.75 14C16.75 14.4142 16.4142 14.75 16 14.75H8C7.58579 14.75 7.25 14.4142 7.25 14ZM8.25 17.5C8.25 17.0858 8.58579 16.75 9 16.75H15C15.4142 16.75 15.75 17.0858 15.75 17.5C15.75 17.9142 15.4142 18.25 15 18.25H9C8.58579 18.25 8.25 17.9142 8.25 17.5Z" fill=""></path> </g></svg>
            </div>
            
          `
                      : "";

                  return `
            <div class="accordion-item">
              <div class="accordion-header" onclick="toggleAccordionInner('${lesson.id}', this)">
                <span>${lesson.title}</span>
                <svg class="dropdown-icon" width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.7895 7.41333L9.80446 1.47607C9.02366 0.812389 7.86755 0.846238 7.12692 1.55446L1 7.41333"
                    stroke="var(--text-main)" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
              <div class="accordion-content" id="${lesson.id}">
                ${videoHTML}${pdfHTML}
                ${quizHTML}${!videoHTML && !pdfHTML && !quizHTML ? '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 8px;">لا توجد محتويات المتاحة حالياً لهذا الدرس.</p>' : ""}
              </div>
            </div>
          `;
                })
                .join("")
            : ""
        }
      </div>
    </div>
  `,
          )
          .join("")
      : '<p style="text-align: center; color: var(--text-muted); padding: 20px;">قريباً إن شاء الله...</p>';

  container.innerHTML = `
    <div class="course-container">
      <div style="position: relative;">
        <img src="${course.bannerImage}" alt="Banner" class="course-header-banner">
        <span class="course-header-count">
          عدد الوحدات: ${course.units ? course.units.length : 0}
        </span>
      </div>

      <h2 style="margin-bottom: 20px;">${course.title}</h2>
      ${unitsHTML}
    </div>
  `;
}

// --- Video Control Helpers ---
function closeVideoContainer(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.style.display = "none";
    container.innerHTML = ""; // إفراغ الـ iframe لإيقاف الصوت والفيديو تماماً
  }
}

function loadNativeVideo(videoId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. إذا كان نفس الفيديو مفتوحاً حالياً، يتم إغلاقه عند الضغط عليه مجدداً (Toggle)
  if (currentlyPlayingContainerId === containerId && container.style.display === "block") {
    closeVideoContainer(containerId);
    currentlyPlayingContainerId = null;
    return;
  }

  // 2. إذا كان هناك فيديو آخر يعمل في الصفحة، أغلقه أولاً
  if (currentlyPlayingContainerId && currentlyPlayingContainerId !== containerId) {
    closeVideoContainer(currentlyPlayingContainerId);
  }

  // 3. تشغيل الفيديو الحالي
  container.style.display = "block";
  container.innerHTML = `
    <iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
  `;

  currentlyPlayingContainerId = containerId;
}

// --- Toggle Functions ---
function toggleAccordion(id, headerEl) {
  const content = document.getElementById(id);
  if (content) content.classList.toggle("active");
  if (headerEl) headerEl.classList.toggle("active");
}

function toggleAccordionInner(id, headerEl) {
  const content = document.getElementById(id);
  if (content) content.classList.toggle("active");
  if (headerEl) headerEl.classList.toggle("active");
}

// --- Modal & Form Logic ---

function openModal(mode) {
  const navActions = document.getElementById("auth-buttons-desktop");
  if (navActions) navActions.classList.remove("mobile-active");

  authMode = mode;

  const modalTitle = document.getElementById("modal-title");
  if (modalTitle)
    modalTitle.innerText = mode === "login" ? "تسجيل الدخول" : "مستخدم جديد";

  const groupName = document.getElementById("group-name");
  const groupGrade = document.getElementById("group-grade");
  if (groupName)
    groupName.style.display = mode === "register" ? "flex" : "none";
  if (groupGrade)
    groupGrade.style.display = mode === "register" ? "flex" : "none";

  const switchText = document.getElementById("auth-switch-text");
  const switchBtn = document.getElementById("auth-switch-btn");

  if (switchText && switchBtn) {
    if (mode === "login") {
      switchText.innerText = "ليس لديك حساب؟";
      switchBtn.innerText = "قم بإنشاء حساب";
    } else {
      switchText.innerText = "لديك حساب بالفعل؟";
      switchBtn.innerText = "تسجيل الدخول";
    }
  }

  resetFormFields();
  setSubmitButtonLoading(false);

  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.remove("active");
  resetFormFields();
}

function handleModalOverlayClick(event) {
  if (event.target.id === "auth-modal") {
    closeModal();
  }
}

function resetFormFields() {
  const nameInput = document.getElementById("input-name");
  const phoneInput = document.getElementById("input-phone");
  const gradeInput = document.getElementById("input-grade");

  if (nameInput) nameInput.value = "";
  if (phoneInput) phoneInput.value = "";
  if (gradeInput) gradeInput.value = "";

  clearError("name");
  clearError("phone");
  clearError("grade");
  clearError("pin");

  document
    .querySelectorAll(".grade-opt-btn")
    .forEach((btn) => btn.classList.remove("active", "selected"));

  const pinInputs = document.querySelectorAll(".pin-input");
  pinInputs.forEach((input) => {
    input.value = "";
    input.classList.remove("invalid");
  });
}

function clearError(field) {
  const errElem = document.getElementById(`error-${field}`);
  if (errElem) errElem.innerText = "";

  if (field === "name") {
    const el = document.getElementById("input-name");
    if (el) el.classList.remove("input-invalid");
  }
  if (field === "phone") {
    const el = document.getElementById("input-phone");
    if (el) el.classList.remove("input-invalid");
  }
}

// --- Realtime Validation Functions ---

function validateNameInput(input) {
  const arabicRegex = /^[\u0600-\u06FF\s]*$/;
  const errorElem = document.getElementById("error-name");

  if (!arabicRegex.test(input.value)) {
    if (errorElem) errorElem.innerText = "بالعربي الله يخليك";
    input.classList.add("input-invalid");
  } else {
    if (errorElem) errorElem.innerText = "";
    input.classList.remove("input-invalid");
  }
}

function validatePhoneInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
  clearError("phone");
}

function selectGrade(gradeValue, btnElem) {
  const gradeInput = document.getElementById("input-grade");
  if (gradeInput) gradeInput.value = gradeValue;

  document
    .querySelectorAll(".grade-opt-btn")
    .forEach((b) => b.classList.remove("active", "selected"));
  if (btnElem) btnElem.classList.add("active", "selected");
  clearError("grade");
}

// --- 6-Digit PIN Helpers ---

function convertArabicToEnglishNumbers(str) {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return str.replace(/[٠-٩]/g, (w) => arabicNumbers.indexOf(w));
}

function handlePinInput(input, index) {
  input.value = convertArabicToEnglishNumbers(input.value);
  input.value = input.value.replace(/[^0-9]/g, "");

  const pinInputs = Array.from(document.querySelectorAll(".pin-input"));

  if (input.value.length === 1) {
    input.classList.remove("invalid");
    clearError("pin");

    if (index < pinInputs.length - 1) {
      pinInputs[index + 1].focus();
      pinInputs[index + 1].select();
    }
  }
}

function handlePinKeydown(event, input, index) {
  const pinInputs = Array.from(document.querySelectorAll(".pin-input"));

  if (event.key === "Backspace") {
    if (input.value === "" && index > 0) {
      pinInputs[index - 1].focus();
    }
  } else if (event.key === "ArrowLeft" && index < pinInputs.length - 1) {
    pinInputs[index + 1].focus();
  } else if (event.key === "ArrowRight" && index > 0) {
    pinInputs[index - 1].focus();
  }
}

function getPinValue() {
  const pinInputs = document.querySelectorAll(".pin-input");
  let pin = "";
  pinInputs.forEach((input) => {
    pin += input.value.trim();
  });
  return pin;
}

function setPinInvalid() {
  const pinInputs = document.querySelectorAll(".pin-input");
  pinInputs.forEach((input) => {
    input.classList.add("invalid");
  });
}

// --- Button Loading State ---

function setSubmitButtonLoading(isLoading) {
  const submitBtn = document.querySelector("#auth-modal .btn-primary");
  if (!submitBtn) return;

  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.dataset.originalText = submitBtn.innerText;
    submitBtn.innerText = "جاري التحقق...";
    submitBtn.style.opacity = "0.7";
    submitBtn.style.cursor = "not-allowed";
  } else {
    submitBtn.disabled = false;
    submitBtn.innerText = submitBtn.dataset.originalText || "تأكيد";
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
  }
}

// --- Form Submission & Validation Check ---

async function handleAuthSubmit() {
  const nameInput = document.getElementById("input-name");
  const phoneInput = document.getElementById("input-phone");
  const gradeInput = document.getElementById("input-grade");

  const gradeValue = gradeInput ? gradeInput.value : "";
  const pinValue = getPinValue();

  const nameVal = nameInput ? nameInput.value.trim() : "";
  const phoneVal = phoneInput ? phoneInput.value.trim() : "";

  let hasError = false;

  if (authMode === "register") {
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;
    if (!nameVal) {
      const errName = document.getElementById("error-name");
      if (errName) errName.innerText = "نسيت اسمك يا غالي";
      if (nameInput) nameInput.classList.add("input-invalid");
      hasError = true;
    } else if (!arabicRegex.test(nameVal)) {
      const errName = document.getElementById("error-name");
      if (errName) errName.innerText = "بالعربي الله يخليك";
      if (nameInput) nameInput.classList.add("input-invalid");
      hasError = true;
    }

    if (!gradeValue) {
      const errGrade = document.getElementById("error-grade");
      if (errGrade) errGrade.innerText = "عرفنا انت في سنة كم";
      hasError = true;
    }
  }

  if (!phoneVal || phoneVal.length < 11) {
    const errPhone = document.getElementById("error-phone");
    if (errPhone) errPhone.innerText = "رقمك يا غالي (11 رقم)";
    if (phoneInput) phoneInput.classList.add("input-invalid");
    hasError = true;
  }

  if (!pinValue || pinValue.length < 6) {
    const errPin = document.getElementById("error-pin");
    if (errPin) errPin.innerText = "يرجى إدخال 6 أرقام كلمة السر";
    setPinInvalid();
    hasError = true;
  }

  if (hasError) return;

  setSubmitButtonLoading(true);

  const payload = {
    action: authMode,
    phone: phoneVal,
    code: pinValue,
    name: authMode === "register" ? nameVal : "",
    grade: authMode === "register" ? gradeValue : "",
  };

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await res.json();

    if (responseData.status === "success" && responseData.user) {
      closeModal();
      showUserAvatarLoading();
      onUserSuccess(responseData.user);
      showNotification(
        authMode === "login"
          ? "تم تسجيل الدخول بنجاح!"
          : "تم إنشاء الحساب بنجاح!",
        "success",
      );
    } else {
      setSubmitButtonLoading(false);

      const serverMsg = responseData.message || "";

      if (
        serverMsg.includes("مسجل") ||
        serverMsg.includes("الهاتف") ||
        serverMsg.includes("موجود")
      ) {
        const errPhone = document.getElementById("error-phone");
        if (errPhone) errPhone.innerText = "هذا الهاتف مسجل بالفعل";
        if (phoneInput) phoneInput.classList.add("input-invalid");
      } else {
        const errPin = document.getElementById("error-pin");
        if (errPin) errPin.innerText = serverMsg || "بيانات الدخول غير صحيحة";
        setPinInvalid();
      }
    }
  } catch (err) {
    console.error(err);
    setSubmitButtonLoading(false);
    showNotification("حدث خطأ أثناء الاتصال بالسيرفر");
  }
}

function toggleAuthMode() {
  const newMode = authMode === "login" ? "register" : "login";
  openModal(newMode);
}

// --- User Profile & Persistent State ---

async function refreshUserData(savedUser) {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "get_user_info",
        phone: savedUser.phone,
      }),
    });

    const data = await res.json();
    if (data.status === "success" && data.user) {
      onUserSuccess(data.user);
    } else {
      onUserSuccess(savedUser);
    }
  } catch (err) {
    onUserSuccess(savedUser);
  }
}

function showUserAvatarLoading() {
  const desktopBtns = document.getElementById("auth-buttons-desktop");
  if (desktopBtns) {
    desktopBtns.style.display = "none";
    desktopBtns.classList.remove("mobile-active");
  }

  const menuToggle = document.getElementById("menu-toggle-btn");
  if (menuToggle) menuToggle.style.display = "none";

  const wrapper = document.getElementById("user-avatar-wrapper");
  if (wrapper) wrapper.style.display = "block";

  const avatarLetter = document.getElementById("avatar-letter");
  if (avatarLetter) avatarLetter.innerText = "";

  const spinner = document.getElementById("avatar-spinner");
  if (spinner) spinner.style.display = "block";
}

function onUserSuccess(userData) {
  const spinner = document.getElementById("avatar-spinner");
  if (spinner) spinner.style.display = "none";

  const avatarLetter = document.getElementById("avatar-letter");
  if (avatarLetter)
    avatarLetter.innerText = userData.name ? userData.name.charAt(0) : "م";

  const dropdownName = document.getElementById("dropdown-name");
  if (dropdownName) dropdownName.innerText = userData.name || "--";

  const dropdownPhone = document.getElementById("dropdown-phone");
  if (dropdownPhone) dropdownPhone.innerText = userData.phone || "--";

  const userBalance =
    userData.balance && userData.balance !== "undefined ج.م"
      ? userData.balance
      : "0 ج.م";
  const dropdownBalance = document.getElementById("dropdown-balance");
  if (dropdownBalance) dropdownBalance.innerText = userBalance;

  localStorage.setItem(
    "user",
    JSON.stringify({
      ...userData,
      balance: userBalance,
    }),
  );
}

function hideUserAvatar() {
  const wrapper = document.getElementById("user-avatar-wrapper");
  if (wrapper) wrapper.style.display = "none";

  const desktopBtns = document.getElementById("auth-buttons-desktop");
  if (desktopBtns) desktopBtns.style.display = "";

  const menuToggle = document.getElementById("menu-toggle-btn");
  if (menuToggle) menuToggle.style.display = "";
}

function toggleDropdown() {
  const dropdown = document.getElementById("user-dropdown");
  if (dropdown) dropdown.classList.toggle("active");
  const svgDropdown = document.getElementById("svgDropdown");
  if (svgDropdown) svgDropdown.classList.toggle("active");
}

function logout() {
  localStorage.removeItem("user");
  const dropdown = document.getElementById("user-dropdown");
  if (dropdown) dropdown.classList.remove("active");
  hideUserAvatar();
  showNotification("تم تسجيل الخروج بنجاح", "success");
}

function toggleMobileMenu() {
  const menuBtn = document.getElementById("menu-toggle-btn");
  const navMobile = document.getElementById("auth-buttons-desktop");

  if (menuBtn) menuBtn.classList.toggle("active");
  if (navMobile) navMobile.classList.toggle("mobile-active");
}

// --- App Initialization & Click Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  parseHashAndNavigate(false);

  const savedUserStr = localStorage.getItem("user");
  if (savedUserStr) {
    try {
      const savedUser = JSON.parse(savedUserStr);
      showUserAvatarLoading();
      refreshUserData(savedUser);
    } catch (e) {
      localStorage.removeItem("user");
    }
  }

  document.addEventListener("click", (e) => {
    const avatarWrapper = document.getElementById("user-avatar-wrapper");
    const dropdown = document.getElementById("user-dropdown");
    if (dropdown && dropdown.classList.contains("active")) {
      if (avatarWrapper && !avatarWrapper.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    }
  });
});