// data.js - قاعدة بيانات المقررات والدروس التعليمية

const COURSES_DATA = [
  {
    id: "1_prep",
    class: "btn-card1",
    title: "الصف الأول الإعدادي",
    bgImage: "./src/Imgs/pr1.svg",
    bannerImage: "./src/Imgs/pr1poster.svg",
    units: [
      {
        id: "prep1-unit-1",
        title: "الوحدة الأولى: الأعداد النسبية",
        subtitle: "الجبر والإحصاء",
        lessons: [
          {
            id: "p1-u1-l1",
            title: "الدرس الأول: مجموعة الأعداد النسبية",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p1-u1-l1.pdf",
            quizUrl: "https://example.com/quiz/p1-u1-l1",
          },
          {
            id: "p1-u1-l2",
            title: "الدرس الثاني: مقارنة وترتيب الأعداد النسبية",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p1-u1-l2.pdf",
            quizUrl: "", // لا يوجد اختبار
          },
          {
            id: "p1-u1-l3",
            title: "الدرس الثالث: جمع وطرح الأعداد النسبية",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "", // لا يوجد مذكرة
            quizUrl: "https://example.com/quiz/p1-u1-l3",
          },
          {
            id: "p1-u1-l4",
            title: "الدرس الرابع: ضرب وقسمة الأعداد النسبية",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p1-u1-l4.pdf",
            quizUrl: "https://example.com/quiz/p1-u1-l4",
          },
        ],
      },
      {
        id: "prep1-unit-2",
        title: "الوحدة الثانية: الحدود والمقادير الجبرية",
        subtitle: "الجبر والإحصاء",
        lessons: [
          {
            id: "p1-u2-l1",
            title: "الدرس الأول: الحدود الجبرية والمقادير الجبرية",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p1-u2-l1.pdf",
            quizUrl: "https://example.com/quiz/p1-u2-l1",
          },
          {
            id: "p1-u2-l2",
            title: "الدرس الثاني: جمع وطرح المقادير الجبرية",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "",
            quizUrl: "",
          },
          {
            id: "p1-u2-l3",
            title: "الدرس الثالث: ضرب وقسمة الحدود الجبرية",
            videoId: "", // قريباً - بدون فيديو حالياً
            pdfUrl: "https://example.com/pdf/p1-u2-l3.pdf",
            quizUrl: "https://example.com/quiz/p1-u2-l3",
          },
        ],
      },
      {
        id: "prep1-unit-3",
        title: "الوحدة الثالثة: المفاهيم الهندسيّة والعلاقات بين الزوايا",
        subtitle: "الهندسة والقياس",
        lessons: [
          {
            id: "p1-u3-l1",
            title: "الدرس الأول: المفاهيم الهندسية الأساسية",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p1-u3-l1.pdf",
            quizUrl: "https://example.com/quiz/p1-u3-l1",
          },
          {
            id: "p1-u3-l2",
            title: "الدرس الثاني: التطابق والشكلين المتطابقين",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p1-u3-l2.pdf",
            quizUrl: "",
          },
        ],
      },
    ],
  },
  {
    id: "2_prep",
    class: "btn-card2",
    title: "الصف الثاني الإعدادي",
    bgImage: "./src/Imgs/pr2.svg",
    bannerImage: "./src/Imgs/pr2poster.svg",
    units: [
      {
        id: "prep2-unit-1",
        title: "الوحدة الأولى: الأعداد الحقيقية والتكعيب",
        subtitle: "الجبر والعلاقات",
        lessons: [
          {
            id: "p2-u1-l1",
            title: "الدرس الأول: الجذر التكعيبي للعدد النسبي",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p2-u1-l1.pdf",
            quizUrl: "https://example.com/quiz/p2-u1-l1",
          },
          {
            id: "p2-u1-l2",
            title: "الدرس الثاني: مجموعة الأعداد غير النسبية",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p2-u1-l2.pdf",
            quizUrl: "https://example.com/quiz/p2-u1-l2",
          },
          {
            id: "p2-u1-l3",
            title: "الدرس الثالث: إيجاد قيمة تقريبية للجذر غير النسبي",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "",
            quizUrl: "",
          },
          {
            id: "p2-u1-l4",
            title: "الدرس الرابع: الفترات وتطبيقاتها",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p2-u1-l4.pdf",
            quizUrl: "https://example.com/quiz/p2-u1-l4",
          },
        ],
      },
      {
        id: "prep2-unit-2",
        title: "الوحدة الثانية: المثلث متساوي الساقين",
        subtitle: "الهندسة والبرهان",
        lessons: [
          {
            id: "p2-u2-l1",
            title: "الدرس الأول: متوسطات المثلث",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p2-u2-l1.pdf",
            quizUrl: "https://example.com/quiz/p2-u2-l1",
          },
          {
            id: "p2-u2-l2",
            title: "الدرس الثاني: خواص المثلث متساوي الساقين",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p2-u2-l2.pdf",
            quizUrl: "",
          },
          {
            id: "p2-u2-l3",
            title: "الدرس الثالث: نظريات التباين في المثلث",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p2-u2-l3.pdf",
            quizUrl: "https://example.com/quiz/p2-u2-l3",
          },
        ],
      },
    ],
  },
  {
    id: "3_prep",
    class: "btn-card3",
    title: "الصف الثالث الإعدادي",
    bgImage: "./src/Imgs/pr3.svg",
    bannerImage: "./src/Imgs/pr3poster.svg",
    units: [
      {
        id: "prep3-unit-1",
        title: "الوحدة الأولى: العلاقات والدوال",
        subtitle: "الجبر والدوال",
        lessons: [
          {
            id: "p3-u1-l1",
            title: "الدرس الأول: حاصل الضرب الديكارتي",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p3-u1-l1.pdf",
            quizUrl: "https://example.com/quiz/p3-u1-l1",
          },
          {
            id: "p3-u1-l2",
            title: "الدرس الثاني: العلاقات والتطبيقات",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p3-u1-l2.pdf",
            quizUrl: "https://example.com/quiz/p3-u1-l2",
          },
          {
            id: "p3-u1-l3",
            title: "الدرس الثالث: الدالة وحساب المدى",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "",
            quizUrl: "https://example.com/quiz/p3-u1-l3",
          },
          {
            id: "p3-u1-l4",
            title: "الدرس الرابع: دوال كثيرات الحدود والتمثيل البياني",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/p3-u1-l4.pdf",
            quizUrl: "https://example.com/quiz/p3-u1-l4",
          },
        ],
      },
      {
        id: "prep3-unit-2",
        title: "الوحدة الثانية: حساب المثلثات والهندسة التحليلية",
        subtitle: "الهندسة المتقدمة",
        lessons: [
          {
            id: "p3-u2-l1",
            title: "الدرس الأول: النسب المثلثية الأساسية للزاوية الحادة",
            videos: [
              {
                id: "vid_1",
                title: "الجزء الأول: المفاهيم الأساسية",
                videoId: "YOUTUBE_ID_1",
              },
              {
                id: "vid_2",
                title: "الجزء الثاني: حل تمارين متقدمة",
                videoId: "YOUTUBE_ID_2",
              },
            ],
            pdfUrl: "https://example.com/pdf/p3-u2-l1.pdf",
            quizUrl: "https://example.com/quiz/p3-u2-l1",
          },
          {
            id: "p3-u2-l2",
            title: "الدرس الثاني: البعد بين نقطتين في المستوى",
            videos: [
              {
                id: "vid_1",
                title: "الجزء الأول: المفاهيم الأساسية",
                videoId: "YOUTUBE_ID_1",
              },
              {
                id: "vid_2",
                title: "الجزء الثاني: حل تمارين متقدمة",
                videoId: "YOUTUBE_ID_2",
              },
            ],
            pdfUrl: "https://example.com/pdf/p3-u2-l2.pdf",
            quizUrl: "",
          },
          {
            id: "p3-u2-l3",
            title: "الدرس الثالث: احداثيا منتصف قطعة مستقيمة",
            videos: [
              {
                id: "vid_1",
                title: "الجزء الأول: المفاهيم الأساسية",
                videoId: "YOUTUBE_ID_1",
              },
              {
                id: "vid_2",
                title: "الجزء الثاني: حل تمارين متقدمة",
                videoId: "YOUTUBE_ID_2",
              },
            ],
            pdfUrl: "https://example.com/pdf/p3-u2-l3.pdf",
            quizUrl: "https://example.com/quiz/p3-u2-l3",
          },
          {
            id: "p3-u2-l4",
            title: "الدرس الرابع: ميل الخط المستقيم ومعادلته",
            videos: [
              {
                id: "vid_1",
                title: "الجزء الأول: المفاهيم الأساسية",
                videoId: "YOUTUBE_ID_1",
              },
              {
                id: "vid_2",
                title: "الجزء الثاني: حل تمارين متقدمة",
                videoId: "YOUTUBE_ID_2",
              },
            ],
            pdfUrl: "https://example.com/pdf/p3-u2-l4.pdf",
            quizUrl: "https://example.com/quiz/p3-u2-l4",
          },
        ],
      },
    ],
  },
  {
    id: "1_sec",
    class: "btn-card4",
    title: "الصف الأول الثانوي",
    bgImage: "./src/Imgs/th1.svg",
    bannerImage: "./src/Imgs/th1poster.svg",
    units: [
      {
        id: "sec1-unit-1",
        title: "الوحدة الأولى: الأعداد المركبة والمعادلات",
        subtitle: "الجبر المتقدم",
        lessons: [
          {
            id: "s1-u1-l1",
            title: "الدرس الأول: مقدمة عن الأعداد المركبة",
            videos: [
              {
                id: "vid_1",
                title: "الجزء الأول: المفاهيم الأساسية",
                videoId: "YOUTUBE_ID_1",
              },
              {
                id: "vid_2",
                title: "الجزء الثاني: حل تمارين متقدمة",
                videoId: "YOUTUBE_ID_2",
              },
            ],
            pdfUrl: "https://example.com/pdf/s1-u1-l1.pdf",
            quizUrl: "https://example.com/quiz/s1-u1-l1",
          },
          {
            id: "s1-u1-l2",
            title: "الدرس الثاني: تحديد نوع جذري المعادلة التربيعية",
            videos: [
              {
                id: "vid_1",
                title: "الجزء الأول: المفاهيم الأساسية",
                videoId: "YOUTUBE_ID_1",
              },
              {
                id: "vid_2",
                title: "الجزء الثاني: حل تمارين متقدمة",
                videoId: "YOUTUBE_ID_2",
              },
            ],
            pdfUrl: "https://example.com/pdf/s1-u1-l2.pdf",
            quizUrl: "https://example.com/quiz/s1-u1-l2",
          },
          {
            id: "s1-u1-l3",
            title: "الدرس الثالث: العلاقة بين جذري معادلة الدرجة الثانية",
            videos: [
              {
                id: "vid_1",
                title: "الجزء الأول: المفاهيم الأساسية",
                videoId: "YOUTUBE_ID_1",
              },
              {
                id: "vid_2",
                title: "الجزء الثاني: حل تمارين متقدمة",
                videoId: "YOUTUBE_ID_2",
              },
            ],
            pdfUrl: "",
            quizUrl: "",
          },
        ],
      },
      {
        id: "sec1-unit-2",
        title: "الوحدة الثانية: التشابه والمساحات",
        subtitle: "الهندسة المستوية",
        lessons: [
          {
            id: "s1-u2-l1",
            title: "الدرس الأول: تشابه المضلعات",
            videos: [
              {
                id: "vid_1",
                title: "الجزء الأول: المفاهيم الأساسية",
                videoId: "YOUTUBE_ID_1",
              },
              {
                id: "vid_2",
                title: "الجزء الثاني: حل تمارين متقدمة",
                videoId: "YOUTUBE_ID_2",
              },
            ],
            pdfUrl: "https://example.com/pdf/s1-u2-l1.pdf",
            quizUrl: "https://example.com/quiz/s1-u2-l1",
          },
          {
            id: "s1-u2-l2",
            title: "الدرس الثاني: تشابه المثلثات وتطبيقاته",
            videos: [
              {
                id: "vid_1",
                title: "الجزء الأول: المفاهيم الأساسية",
                videoId: "YOUTUBE_ID_1",
              },
              {
                id: "vid_2",
                title: "الجزء الثاني: حل تمارين متقدمة",
                videoId: "YOUTUBE_ID_2",
              },
            ],
            pdfUrl: "https://example.com/pdf/s1-u2-l2.pdf",
            quizUrl: "https://example.com/quiz/s1-u2-l2",
          },
          {
            id: "s1-u2-l3",
            title: "الدرس الثالث: النسب بين مساحتي متشابهين",
            videoId: "M7lc1UVf-VE",
            pdfUrl: "https://example.com/pdf/s1-u2-l3.pdf",
            quizUrl: "",
          },
        ],
      },
    ],
  },
];

// --- دوال مساعدة لحساب البيانات ديناميكياً ---

// 1. دالة حساب إجمالي الدروس للصف الدراسي
function getTotalLessonsCount(course) {
  if (!course.units || !Array.isArray(course.units)) return 0;
  return course.units.reduce((sum, unit) => {
    return sum + (unit.lessons ? unit.lessons.length : 0);
  }, 0);
}

// 2. دالة حساب إجمالي الاختبارات المتوفرة للصف الدراسي
function getTotalQuizzesCount(course) {
  if (!course.units || !Array.isArray(course.units)) return 0;
  return course.units.reduce((sum, unit) => {
    if (!unit.lessons) return sum;
    const quizCount = unit.lessons.filter(
      (l) => l.quizUrl && l.quizUrl.trim() !== "" && l.quizUrl !== "#",
    ).length;
    return sum + quizCount;
  }, 0);
}
