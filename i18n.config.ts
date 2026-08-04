export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'uk',
  fallbackLocale: 'uk',
  messages: {
    uk: {
      seo: {
        title: 'SEOKONT — сайти, CRM та AI-автоматизація',
        description: 'Проєктуємо сайти, CRM-системи та AI-автоматизації, що допомагають бізнесу зростати швидше.'
      },
      nav: { home: 'SEOKONT — на головну', services: 'Послуги', projects: 'Проєкти', approach: 'Підхід', discuss: 'Обговорити проєкт' },
      hero: {
        eyebrow: 'Digital studio / Kyiv → worldwide', line1: 'Створюємо', accent: 'розумний', line2: 'digital',
        description: 'Сайти, CRM та AI‑автоматизація, що об’єднують дизайн, технології й бізнес‑логіку в одну систему, яка працює.',
        servicesLabel: 'Перейти до послуг', cursor: 'РУХАЙТЕ КУРСОР'
      },
      services: {
        kicker: '01 / Що ми робимо', title1: 'Не просто красиво.', title2: 'Системно.',
        note: 'Беремо на себе весь шлях: від першої ідеї до запуску продукту та його автоматизації.',
        items: {
          first: { name: 'Сайти', description: 'Стратегія, дизайн і розробка цифрових продуктів, що виглядають сміливо та перетворюють увагу на заявки.' },
          second: { name: 'CRM-системи', description: 'Уся воронка продажів в одному місці: ліди, завдання, аналітика та контроль команди без хаосу в таблицях.' },
          third: { name: 'AI-автоматизація', description: 'AI-асистенти та сценарії, що відповідають клієнтам, обробляють дані й звільняють час команди.' }
        }
      },
      portfolio: {
        kicker: '02 / Обрані роботи', title1: 'Створено, щоб', title2: 'працювати.',
        note: 'Кожен проєкт починається із завдання бізнесу й завершується вимірюваним результатом.',
        items: {
          'orion-estate': 'Сайт преміальної нерухомості з автоматичним розподілом лідів між брокерами.',
          'pulse-clinic': 'Цифровий запис та AI-асистент, який відповідає пацієнтам цілодобово.',
          'mono-market': 'Магазин з єдиною системою замовлень, складом та автоматичними сценаріями продажів.'
        }
      },
      process: {
        kicker: '03 / Як працюємо', title1: 'Зрозумілий шлях', title2: 'від ідеї до', accent: 'запуску.',
        items: {
          first: { title: 'Занурюємося', description: 'Розбираємо продукт, аудиторію, процеси та цифри. Знаходимо точку, де технологія дасть найбільше користі.' },
          second: { title: 'Проєктуємо', description: 'Створюємо структуру, прототип і візуальну систему. Ви бачите майбутній продукт до початку розробки.' },
          third: { title: 'Збираємо', description: 'Розробляємо швидкий інтерфейс, інтегруємо CRM і налаштовуємо автоматичні сценарії.' },
          fourth: { title: 'Запускаємо та розвиваємо', description: 'Тестуємо, навчаємо команду й залишаємося поруч, щоб продукт розвивався разом із бізнесом.' }
        }
      },
      contact: {
        question: 'Є ідея?', availability: 'Вільні для 2 проєктів / серпень', title: 'Зробімо разом щось сильне.',
        description: 'Розкажіть, що хочете змінити в бізнесі. Повернемося із запитаннями та першим баченням рішення.'
      },
      footer: { rights: 'SEOKONT STUDIO', services: 'WEB / CRM / AI AUTOMATION' }
    },
    en: {
      seo: {
        title: 'SEOKONT — websites, CRM and AI automation',
        description: 'We design websites, CRM systems and AI automations that help businesses grow faster.'
      },
      nav: { home: 'SEOKONT — home', services: 'Services', projects: 'Work', approach: 'Approach', discuss: 'Start a project' },
      hero: {
        eyebrow: 'Digital studio / Kyiv → worldwide', line1: 'We build', accent: 'smart', line2: 'digital',
        description: 'Websites, CRM and AI automation that bring design, technology and business logic together in one working system.',
        servicesLabel: 'Explore our services', cursor: 'MOVE YOUR CURSOR'
      },
      services: {
        kicker: '01 / What we do', title1: 'Beyond beautiful.', title2: 'Built as a system.',
        note: 'We take care of the entire journey — from the first idea to launch and automation.',
        items: {
          first: { name: 'Websites', description: 'Strategy, design and development of bold digital products that turn attention into qualified leads.' },
          second: { name: 'CRM systems', description: 'Your entire sales funnel in one place: leads, tasks, analytics and team control without spreadsheet chaos.' },
          third: { name: 'AI automation', description: 'AI assistants and workflows that support customers, process data and give your team time back.' }
        }
      },
      portfolio: {
        kicker: '02 / Selected work', title1: 'Designed to', title2: 'perform.',
        note: 'Every project starts with a business challenge and ends with a measurable result.',
        items: {
          'orion-estate': 'A premium real estate website with automatic lead distribution between brokers.',
          'pulse-clinic': 'Digital booking and an AI assistant that supports patients around the clock.',
          'mono-market': 'An online store with unified ordering, inventory and automated sales workflows.'
        }
      },
      process: {
        kicker: '03 / Our process', title1: 'A clear path', title2: 'from idea to', accent: 'launch.',
        items: {
          first: { title: 'Discover', description: 'We study the product, audience, processes and numbers to find where technology can create the most value.' },
          second: { title: 'Design', description: 'We create the structure, prototype and visual system, so you see the product before development begins.' },
          third: { title: 'Build', description: 'We develop a fast interface, integrate CRM and configure automated workflows.' },
          fourth: { title: 'Launch and grow', description: 'We test, train your team and stay close so the product keeps evolving with the business.' }
        }
      },
      contact: {
        question: 'Have an idea?', availability: 'Available for 2 projects / August', title: 'Let’s build something powerful.',
        description: 'Tell us what you want to change in your business. We’ll come back with questions and an initial vision.'
      },
      footer: { rights: 'SEOKONT STUDIO', services: 'WEB / CRM / AI AUTOMATION' }
    },
    he: {
      seo: {
        title: 'SEOKONT — אתרים, CRM ואוטומציה עם AI',
        description: 'אנחנו מתכננים אתרים, מערכות CRM ואוטומציות AI שעוזרות לעסקים לצמוח מהר יותר.'
      },
      nav: { home: 'SEOKONT — דף הבית', services: 'שירותים', projects: 'פרויקטים', approach: 'התהליך', discuss: 'בואו נדבר' },
      hero: {
        eyebrow: 'Digital studio / Kyiv → worldwide', line1: 'יוצרים', accent: 'דיגיטל', line2: 'חכם',
        description: 'אתרים, CRM ואוטומציה עם AI שמחברים עיצוב, טכנולוגיה והיגיון עסקי למערכת אחת שעובדת.',
        servicesLabel: 'לשירותים שלנו', cursor: 'הזיזו את הסמן'
      },
      services: {
        kicker: '01 / מה אנחנו עושים', title1: 'לא רק יפה.', title2: 'מערכת שעובדת.',
        note: 'אנחנו מלווים את כל הדרך — מהרעיון הראשון ועד ההשקה והאוטומציה.',
        items: {
          first: { name: 'אתרים', description: 'אסטרטגיה, עיצוב ופיתוח של מוצרים דיגיטליים נועזים שהופכים תשומת לב לפניות איכותיות.' },
          second: { name: 'מערכות CRM', description: 'כל משפך המכירות במקום אחד: לידים, משימות, אנליטיקה וניהול הצוות בלי כאוס של גיליונות.' },
          third: { name: 'אוטומציה עם AI', description: 'עוזרי AI ותהליכים שעונים ללקוחות, מעבדים מידע ומחזירים לצוות שלכם זמן יקר.' }
        }
      },
      portfolio: {
        kicker: '02 / עבודות נבחרות', title1: 'נוצר כדי', title2: 'לעבוד.',
        note: 'כל פרויקט מתחיל באתגר עסקי ומסתיים בתוצאה שאפשר למדוד.',
        items: {
          'orion-estate': 'אתר נדל״ן יוקרתי עם חלוקה אוטומטית של לידים בין סוכנים.',
          'pulse-clinic': 'מערכת תורים דיגיטלית ועוזר AI שזמין למטופלים מסביב לשעון.',
          'mono-market': 'חנות עם מערכת מאוחדת להזמנות, מלאי ותהליכי מכירה אוטומטיים.'
        }
      },
      process: {
        kicker: '03 / איך אנחנו עובדים', title1: 'דרך ברורה', title2: 'מהרעיון ועד', accent: 'ההשקה.',
        items: {
          first: { title: 'מעמיקים', description: 'לומדים את המוצר, הקהל, התהליכים והמספרים ומאתרים את המקום שבו הטכנולוגיה תייצר את הערך הגדול ביותר.' },
          second: { title: 'מתכננים', description: 'יוצרים מבנה, אב־טיפוס ושפה חזותית, כך שתראו את המוצר עוד לפני תחילת הפיתוח.' },
          third: { title: 'בונים', description: 'מפתחים ממשק מהיר, מחברים CRM ומגדירים תהליכים אוטומטיים.' },
          fourth: { title: 'משיקים וצומחים', description: 'בודקים, מדריכים את הצוות ונשארים לצדכם כדי שהמוצר יתפתח יחד עם העסק.' }
        }
      },
      contact: {
        question: 'יש לכם רעיון?', availability: 'פנויים ל־2 פרויקטים / אוגוסט', title: 'בואו ניצור משהו חזק.',
        description: 'ספרו לנו מה תרצו לשנות בעסק. נחזור עם שאלות ועם כיוון ראשוני לפתרון.'
      },
      footer: { rights: 'SEOKONT STUDIO', services: 'WEB / CRM / AI AUTOMATION' }
    }
  }
}))
