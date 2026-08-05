export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'uk',
  fallbackLocale: 'uk',
  messages: {
    uk: {
      seo: {
        title: 'SEOKONT — сайти, CRM та AI-автоматизація',
        description: 'Створюємо сайти, CRM-системи та AI-автоматизацію для бізнесу, який хоче працювати швидше і впевненіше.'
      },
      nav: {
        home: 'SEOKONT — на головну',
        services: 'Послуги',
        projects: 'Проєкти',
        approach: 'Підхід',
        faq: 'FAQ',
        contact: 'Контакт',
        discuss: 'Обговорити проєкт'
      },
      hero: {
        eyebrow: 'Digital studio / Kyiv → worldwide',
        line1: 'Створюємо сайти, CRM та AI-системи, які',
        accent: 'залучають клієнтів',
        line2: 'і автоматизують бізнес',
        description: 'Об’єднуємо сайт, заявки, менеджерів, аналітику та штучний інтелект в одну керовану цифрову систему.',
        servicesLabel: 'Переглянути послуги',
        cursor: 'РУХАЙТЕ КУРСОР'
      },
      services: {
        kicker: '01 / Що ми робимо',
        title1: 'За межами',
        title2: 'простого дизайну',
        note: 'Створюємо рішення, де сайт, CRM та AI працюють як єдина система.',
        items: {
          first: { name: 'Сайти', description: 'Стратегія, дизайн і розробка презентаційних сайтів, які приносять ліди.' },
          second: { name: 'CRM-системи', description: 'Єдина панель для лідів, угод, завдань і звітів без Excel-хаосу.' },
          third: { name: 'AI-автоматизація', description: 'Сценарії, чат-боти і аналітика, які зменшують ручну роботу.' }
        }
      },
      process: {
        kicker: '03 / Наш підхід',
        title1: 'Чіткий шлях',
        title2: 'від ідеї до запуску',
        accent: 'з результатом',
        items: {
          first: { title: 'Відкриття', description: 'Визначаємо точки впливу та ключові бізнес-процеси.' },
          second: { title: 'Дизайн', description: 'Створюємо структуру, прототипи та потік користувача.' },
          third: { title: 'Розробка', description: 'Робимо сайт, CRM та автоматизації, які працюють разом.' },
          fourth: { title: 'Запуск', description: 'Тестуємо результат і розгортаємо проект з контролем якості.' }
        }
      },
      businessProblems: {
        title: 'Допомагаємо вирішити проблеми, які заважають бізнесу зростати',
        items: [
          { problem: 'Заявки губляться в месенджерах', solution: 'Автоматично передаємо кожну заявку в CRM, призначаємо відповідального та створюємо задачу.' },
          { problem: 'Менеджери довго відповідають клієнтам', solution: 'Налаштовуємо швидке розподілення та нагадування, щоб відповідь приходила одразу.' },
          { problem: 'Дані зберігаються в Excel та різних сервісах', solution: 'Об’єднуємо дані в одній системі з єдиною базою клієнтів.' },
          { problem: 'Немає єдиної клієнтської бази', solution: 'Збираємо контакти, угоди та історію в CRM, щоб кожен менеджер бачив клієнта повністю.' },
          { problem: 'Керівник не бачить реальної аналітики', solution: 'Показуємо ключові метрики в дашборді та автоматичних звітах.' },
          { problem: 'Співробітники вручну виконують повторювані дії', solution: 'Автоматизуємо рутинні процеси і створюємо правила для AI.' },
          { problem: 'Існуюча CRM не відповідає процесам компанії', solution: 'Проєктуємо CRM під ваші процеси, а не під шаблон.' },
          { problem: 'Сайт не пов’язаний з відділом продажів', solution: 'Поєднуємо сайт та CRM, щоб кожен лід потрапляв до продажів.' },
          { problem: 'Немає автоматичного контролю заявок', solution: 'Створюємо процеси з трекінгом, статусами та відповідальними.' },
          { problem: 'Бізнес-процеси складно масштабувати', solution: 'Розробляємо систему з модульною архітектурою та можливістю розширення.' }
        ]
      },
      portfolio: {
        kicker: '02 / Обрані роботи',
        title1: 'Проєкти, які',
        title2: 'вирішують бізнес-завдання',
        note: 'Кожен кейс будується навколо бізнес-проблеми та системної роботи.',
        items: {
          'orion-estate': 'CRM-система для управління клієнтами, продажами, завданнями та бізнес-аналітикою.',
          'pulse-clinic': 'AI-чат на сайті та кабінет компанії для швидкої обробки звернень пацієнтів.',
          'mono-market': 'Платформа з особистим кабінетом, адміністративною панеллю та аналітикою для торгівлі.'
        }
      },
      aiWorkflow: {
        title: 'Як AI-автоматизація працює у бізнесі',
        intro: 'Показуємо, як заявка переходить у CRM, AI-аналітику й далі до продажу.',
        sectors: ['послуги', 'логістика', 'виробництво', 'нерухомість', 'інтернет-магазин'],
        examples: {
          services: 'Заявка з сайту автоматично створює клієнта, маршрутизує менеджера і запускає сценарій відповіді.',
          logistics: 'AI аналізує тип замовлення, пріоритезує доставку і створює завдання для диспетчера.',
          production: 'Заявка формує технічне завдання, додає контакт в CRM і готує виробничий графік.',
          realEstate: 'Лід потрапляє до угоди, отримує статус і повідомлення продавцю через CRM.',
          ecommerce: 'Замовлення рухається в єдину панель, де AI проводить класифікацію і прискорює обробку.'
        },
        steps: ['Клієнт залишає заявку', 'AI аналізує повідомлення', 'Визначає тему та пріоритет', 'Створює клієнта в CRM', 'Призначає менеджера', 'Готує відповідь', 'Створює задачу', 'Керівник бачить результат']
      },
      advantages: {
        title: 'Чому бізнес обирає індивідуальну розробку',
        items: ['Система створюється під процеси компанії', 'Немає зайвих функцій', 'Можна додавати нові модулі', 'Дані під контролем клієнта', 'Можлива інтеграція з зовнішніми сервісами', 'Система масштабується', 'Зрозуміла архітектура', 'Адаптивний інтерфейс', 'Підтримка після запуску', 'Можливість підключення AI']
      },
      timeline: {
        title: 'Покроковий шлях від ідеї до продукту',
        items: [
          { title: 'Знайомство', description: 'Обговорення бізнесу, задачі та очікуваного результату.' },
          { title: 'Аналіз', description: 'Вивчення процесів, користувачів та потрібних інтеграцій.' },
          { title: 'Архітектура', description: 'Проєктування сторінок, бази даних, CRM-модулів та автоматизацій.' },
          { title: 'Дизайн', description: 'Створення прототипів та UI/UX інтерфейсу.' },
          { title: 'Розробка', description: 'Frontend, backend, адміністративна панель та інтеграції.' },
          { title: 'Тестування', description: 'Перевірка логіки, адаптивності, безпеки та продуктивності.' },
          { title: 'Запуск', description: 'Розгортання проєкту та підключення домену.' },
          { title: 'Підтримка', description: 'Виправлення, розвиток та додавання нових функцій.' }
        ]
      },
      technologies: {
        title: 'Обираємо технології відповідно до завдань проєкту, навантаження та планів розвитку бізнесу',
        items: ['Nuxt', 'Vue', 'Next.js', 'React', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'MySQL', 'Prisma', 'Redis', 'Docker', 'REST API', 'WebSocket', 'AI API']
      },
      faq: {
        title: 'FAQ',
        items: [
          { question: 'Скільки коштує розробка сайту?', answer: 'Вартість залежить від складності, інтеграцій і обсягу контенту. Ми оцінюємо кожен проєкт після аналізу бізнес-цілей.' },
          { question: 'Скільки часу займає створення CRM?', answer: 'Індивідуальна CRM зазвичай створюється за 6–10 тижнів, залежно від функціональних вимог та інтеграцій.' },
          { question: 'Чи можна інтегрувати систему з існуючими сервісами?', answer: 'Так, ми підключаємо Telegram, WhatsApp, Google Sheets, платіжні системи та інші сервіси через API.' },
          { question: 'Чи можна доопрацювати вже існуючий сайт?', answer: 'Так, ми аналізуємо наявний сайт і пропонуємо план доопрацювань без втрати поточного трафіку.' },
          { question: 'Які процеси можна автоматизувати за допомогою AI?', answer: 'Обробку звернень, класифікацію лідів, автоматичні відповіді, роботу з документами та підготовку аналітики.' },
          { question: 'Чи можна почати з MVP?', answer: 'Звісно. MVP дозволяє швидко вийти на ринок і поступово додавати CRM та AI-функції.' },
          { question: 'Чи надається підтримка після запуску?', answer: 'Так, ми залишаємося поруч після запуску та допомагаємо розвивати систему далі.' },
          { question: 'Кому належить вихідний код?', answer: 'Після оплати проєкту вихідний код належить вам. Ми передаємо репозиторій та документацію.' },
          { question: 'Чи можна підключити Telegram та WhatsApp?', answer: 'Так, ми налаштовуємо повідомлення та лідогенерацію через Telegram та WhatsApp.' },
          { question: 'Чи можна розробити адміністративну панель?', answer: 'Так, адміністративна панель входить до проєкту для управління CRM, лідами та аналітикою.' }
        ]
      },
      contact: {
        question: 'Розкажіть, який процес у вашому бізнесі потрібно покращити',
        availability: 'Проаналізуємо задачу та запропонуємо, як об’єднати сайт, CRM і AI-автоматизацію в одну систему.',
        title: 'Почнемо ваш наступний проект',
        description: 'Напишіть, яку частину бізнесу потрібно змінити, і ми запропонуємо перший план рішення.',
        form: {
          name: 'Ім’я',
          phone: 'Телефон',
          email: 'Email',
          messenger: 'Telegram або WhatsApp',
          type: 'Тип проєкту',
          description: 'Опис задачі',
          language: 'Бажана мова',
          submit: 'Отримати попередню консультацію',
          sending: 'Надсилаємо…',
          success: 'Дякуємо! Заявку отримано — скоро зв’яжемося з вами.',
          modalTitle: 'Заявку успішно надіслано',
          modalClose: 'Закрити',
          error: 'Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам на email.',
          projectTypes: ['сайт', 'CRM', 'AI-автоматизація', 'AI-агент', 'інтеграція', 'інше']
        }
      },
      portfolioCases: {
        'orion-estate': {
          title: 'ORION ESTATE',
          category: 'WEB / CRM',
          description: 'CRM-система для управління клієнтами, продажами, завданнями та бізнес-аналітикою.',
          task: 'Побудувати платформу, яка зв’язує сайт, брокерів та історію звернень.',
          solution: 'Об’єднали сайт, CRM, воронку та аналітику в одному цифровому середовищі.',
          functions: ['Клієнтська база', 'Воронка', 'Карта клієнта', 'Kanban', 'Завдання', 'Аналітика'],
          technologies: ['Nuxt', 'Node.js', 'PostgreSQL', 'Redis'],
          note: 'Концептуальний проєкт, створений для демонстрації можливостей студії.'
        },
        'pulse-clinic': {
          title: 'PULSE CLINIC',
          category: 'PRODUCT / AI',
          description: 'AI-чат на сайті та кабінет компанії для швидкої обробки звернень пацієнтів.',
          task: 'Автоматизувати приймання пацієнтських звернень і нагадування про візити.',
          solution: 'Поєднали AI-чат, базу знань, історію діалогів і автосповіщення для команди.',
          functions: ['AI-чат', 'База знань', 'Історія діалогів', 'Збір контактів', 'Telegram-сповіщення'],
          technologies: ['Nuxt', 'NestJS', 'MySQL', 'Docker'],
          note: 'Концептуальний проєкт, створений для демонстрації можливостей студії.'
        },
        'mono-market': {
          title: 'MONO MARKET',
          category: 'E-COM / AUTOMATION',
          description: 'Платформа з особистим кабінетом, адміністративною панеллю та аналітикою для торгівлі.',
          task: 'Побудувати магазин з єдиною системою замовлень, складом та автоматичними сценаріями продажів.',
          solution: 'Запровадили адаптивний кабінет, транзакції, ролі і real-time інструменти для управління.',
          functions: ['Особистий кабінет', 'Адмінпанель', 'Ролі користувачів', 'Аналітика', 'Транзакції', 'Real-time'],
          technologies: ['Vue', 'Node.js', 'Prisma', 'Redis'],
          note: 'Концептуальний проєкт, створений для демонстрації можливостей студії.'
        }
      },
      footer: {
        rights: 'SEOKONT STUDIO',
        services: 'WEB / CRM / AI AUTOMATION'
      },
      servicePages: {
        'web-development': {
          seo: {
            title: 'Розробка сайтів — SEOKONT',
            description: 'Підготуємо сайт з інтеграцією CRM, AI-логікою та готовністю працювати як джерело лідів.'
          },
          title: 'Розробка сайтів',
          subtitle: 'Landing Page, корпоративні сайти та ecommerce-платформи, які підключені до бізнес-системи.',
          problemTitle: 'Проблеми клієнтів',
          solutionTitle: 'Наше рішення',
          featuresTitle: 'Основні функції',
          audienceTitle: 'Для кого підходить',
          stageTitle: 'Етапи роботи',
          caseTitle: 'Проєкт для прикладу',
          caseNote: 'Концептуальний кейс, створений для демонстрації можливостей студії.',
          problems: ['Сайт не приносить ліди', 'Контакти не потрапляють у продажі', 'Технічне SEO не налаштоване', 'Мобільний досвід слабкий'],
          solution: 'Будуємо сайт як частину системи: форма, CRM, лідогенерація та аналітика працюють разом.',
          features: ['Landing Page', 'Корпоративний сайт', 'Інтернет-магазин', 'Каталог', 'Клієнтський кабінет', 'Швидка адаптивність', 'SEO-оптимізація'],
          audience: ['Компанії, що потребують сильної презентації', 'Ті, хто хоче стабільні заявки', 'Магазини з високою конверсією', 'Платформи з персоналізацією'],
          stages: ['Аналіз вимог', 'UX/UI прототип', 'Розробка інтерфейсу', 'Інтеграція CRM', 'Тестування та запуск']
        },
        'crm-development': {
          seo: {
            title: 'Розробка CRM — SEOKONT',
            description: 'Створюємо CRM під процеси компанії з лідами, воронкою продажів, автоматичними нагадуваннями та звітами.'
          },
          title: 'Індивідуальні CRM',
          subtitle: 'Клієнти, контакти, угоди, завдання, звіти та інтеграції в одній системі.',
          problemTitle: 'Проблеми клієнтів',
          solutionTitle: 'Наше рішення',
          featuresTitle: 'Основні функції',
          audienceTitle: 'Для кого підходить',
          stageTitle: 'Етапи роботи',
          caseTitle: 'Проєкт для прикладу',
          caseNote: 'Концептуальний кейс, створений для демонстрації можливостей студії.',
          problems: ['Ліди губляться між відділами', 'Немає єдиної бази клієнтів', 'Менеджери не знають наступні кроки', 'Рутина забирає час'],
          solution: 'Створюємо CRM як єдину панель, де дані, статуси і комунікація працюють разом.',
          features: ['Клієнти', 'Контакти', 'Угоди', 'Воронка', 'Завдання', 'Ролі та права', 'Сповіщення', 'Інтеграції'],
          audience: ['Торгові команди', 'Сервісні компанії', 'B2B та B2C відділи продажів', 'Підприємства з ростом процесів'],
          stages: ['Опис процесів', 'Архітектура CRM', 'Розробка модулів', 'Автоматизація сценаріїв', 'Тестування']
        },
        'ai-automation': {
          seo: {
            title: 'AI-автоматизація — SEOKONT',
            description: 'Автоматизуємо повторювані задачі, обробку звернень та підготовку аналітики за допомогою AI.'
          },
          title: 'AI-автоматизація',
          subtitle: 'AI-консультанти, аналіз звернень, класифікація лідів та автоматичні сценарії.',
          problemTitle: 'Проблеми клієнтів',
          solutionTitle: 'Наше рішення',
          featuresTitle: 'Основні функції',
          audienceTitle: 'Для кого підходить',
          stageTitle: 'Етапи роботи',
          caseTitle: 'Проєкт для прикладу',
          caseNote: 'Концептуальний кейс, створений для демонстрації можливостей студії.',
          problems: ['Ручна обробка звернень', 'Повільна реакція на ліди', 'Відсутність стандартних відповідей', 'Складно масштабувати процеси'],
          solution: 'Налаштовуємо AI на обробку звернень, класифікацію та підготовку наступних кроків для менеджерів.',
          features: ['AI-консультанти', 'AI-агенти', 'Аналіз звернень', 'Класифікація лідів', 'Автоматичні відповіді', 'Обробка документів'],
          audience: ['Служби підтримки', 'call-центри', 'інтернет-магазини', 'компанії з великим потоком звернень'],
          stages: ['Визначення сценаріїв', 'Підбір AI моделей', 'Навчання на прикладах', 'Інтеграція та тестування', 'Запуск']
        }
      }
    },
    en: {
      seo: {
        title: 'SEOKONT — websites, CRM and AI automation',
        description: 'We design websites, CRM systems and AI automations that help businesses grow faster.'
      },
      nav: {
        home: 'SEOKONT — home',
        services: 'Services',
        projects: 'Work',
        approach: 'Approach',
        faq: 'FAQ',
        contact: 'Contact',
        discuss: 'Discuss a project'
      },
      hero: {
        eyebrow: 'Digital studio / Kyiv → worldwide',
        line1: 'We build websites, CRM and AI systems that',
        accent: 'attract customers',
        line2: 'and automate business',
        description: 'We connect websites, leads, teams, analytics and artificial intelligence into one manageable digital system.',
        servicesLabel: 'Explore our services',
        cursor: 'MOVE YOUR CURSOR'
      },
      services: {
        kicker: '01 / What we do',
        title1: 'Beyond simple',
        title2: 'digital design',
        note: 'We create systems where website, CRM and AI work as one.',
        items: {
          first: { name: 'Websites', description: 'Strategy, design and development of sites that generate leads.' },
          second: { name: 'CRM systems', description: 'A single dashboard for leads, deals, tasks and reports without spreadsheet chaos.' },
          third: { name: 'AI automation', description: 'Flows, chatbots and analytics that reduce manual labor.' }
        }
      },
      process: {
        kicker: '03 / Our approach',
        title1: 'A clear path',
        title2: 'from idea to launch',
        accent: 'with results',
        items: {
          first: { title: 'Discovery', description: 'We identify impact points and core business processes.' },
          second: { title: 'Design', description: 'We create the structure, prototypes and user flow.' },
          third: { title: 'Build', description: 'We deliver the website, CRM and automations that work together.' },
          fourth: { title: 'Launch', description: 'We test the outcome and deploy the product with quality control.' }
        }
      },
      businessProblems: {
        title: 'We help solve the problems that hold business growth back',
        items: [
          { problem: 'Leads get lost in messengers', solution: 'We automatically send every lead to the CRM, assign an owner, and create a task.' },
          { problem: 'Managers take too long to reply', solution: 'We set up fast routing and reminders so the response arrives quickly.' },
          { problem: 'Data is stored in Excel and different tools', solution: 'We unify data in one system with a single client database.' },
          { problem: 'There is no central customer database', solution: 'We collect contacts, deals and history in CRM so every manager sees the full customer.' },
          { problem: 'Leaders lack real analytics', solution: 'We show key metrics in a dashboard and automated reports.' },
          { problem: 'Employees perform repetitive actions manually', solution: 'We automate routine processes and create AI rules.' },
          { problem: 'Existing CRM does not match company processes', solution: 'We design CRM for your processes, not a generic template.' },
          { problem: 'The website is not linked to sales', solution: 'We connect the website to CRM so every lead enters sales.' },
          { problem: 'There is no automatic lead control', solution: 'We build workflows with tracking, statuses, and responsibility.' },
          { problem: 'Business processes are hard to scale', solution: 'We build a modular system that can grow with the company.' }
        ]
      },
      portfolio: {
        kicker: '02 / Selected work',
        title1: 'Projects that',
        title2: 'solve business challenges',
        note: 'Every case is built around a business problem and a system solution.',
        items: {
          'orion-estate': 'A CRM system for managing clients, sales, tasks and business analytics.',
          'pulse-clinic': 'An AI chat widget and company portal for fast patient inquiries.',
          'mono-market': 'A platform with customer portal, admin panel and commerce analytics.'
        }
      },
      aiWorkflow: {
        title: 'How AI automation works in business',
        intro: 'We show how an inquiry becomes action through logic and AI.',
        sectors: ['services', 'logistics', 'manufacturing', 'real estate', 'e-commerce'],
        examples: {
          services: 'A website request creates a customer, routes a manager and starts a response flow.',
          logistics: 'AI analyzes the order type, prioritizes delivery and creates a task for the dispatcher.',
          production: 'The request forms a technical task, adds the contact to CRM and prepares the production schedule.',
          realEstate: 'The lead moves into a deal, receives a status and notifies the seller through CRM.',
          ecommerce: 'The order goes to a unified panel where AI classifies it and speeds up processing.'
        },
        steps: ['Client submits a request', 'AI analyzes the message', 'Determines topic and priority', 'Creates a client in CRM', 'Assigns a manager', 'Prepares a reply', 'Creates a task', 'Leader sees the result']
      },
      advantages: {
        title: 'Why businesses choose custom development',
        items: ['The system is built for company processes', 'No unnecessary features', 'New modules can be added', 'Client controls the data', 'Integration with external services is possible', 'The system scales', 'Clear architecture', 'Responsive interface', 'Support after launch', 'AI can be connected']
      },
      timeline: {
        title: 'Work stages',
        items: [
          { title: 'Discovery', description: 'Discuss business, tasks and expected outcomes.' },
          { title: 'Analysis', description: 'Study processes, users and required integrations.' },
          { title: 'Architecture', description: 'Design pages, database, CRM modules and automations.' },
          { title: 'Design', description: 'Create prototypes and the UI/UX interface.' },
          { title: 'Development', description: 'Frontend, backend, admin panel and integrations.' },
          { title: 'Testing', description: 'Check logic, responsiveness, security and performance.' },
          { title: 'Launch', description: 'Deploy the project and connect the domain.' },
          { title: 'Support', description: 'Fixes, growth and adding new functionality.' }
        ]
      },
      technologies: {
        title: 'We choose technologies based on project goals, load and growth plans',
        items: ['Nuxt', 'Vue', 'Next.js', 'React', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'MySQL', 'Prisma', 'Redis', 'Docker', 'REST API', 'WebSocket', 'AI API']
      },
      faq: {
        title: 'FAQ',
        items: [
          { question: 'How much does website development cost?', answer: 'Cost depends on complexity, integrations and content volume. We estimate each project after reviewing business goals.' },
          { question: 'How long does creating a CRM take?', answer: 'A custom CRM typically takes 6–10 weeks depending on functional requirements and integrations.' },
          { question: 'Can the system integrate with existing services?', answer: 'Yes, we connect Telegram, WhatsApp, Google Sheets, payment systems and other APIs.' },
          { question: 'Can you improve an existing website?', answer: 'Yes, we audit the site and offer an enhancement plan without losing current traffic.' },
          { question: 'Which processes can AI automate?', answer: 'Inquiry handling, lead classification, automatic replies, document processing and analytics preparation.' },
          { question: 'Can we start with an MVP?', answer: 'Yes. An MVP lets you launch quickly and gradually add CRM and AI features.' },
          { question: 'Do you provide support after launch?', answer: 'Yes, we stay close after launch and help grow the system further.' },
          { question: 'Who owns the source code?', answer: 'After payment, the source code belongs to you. We hand over the repository and documentation.' },
          { question: 'Can you connect Telegram and WhatsApp?', answer: 'Yes, we set up notifications and lead collection through Telegram and WhatsApp.' },
          { question: 'Can you develop an admin panel?', answer: 'Yes, an administrative panel is part of the project for managing CRM, leads and analytics.' }
        ]
      },
      contact: {
        question: 'Have an idea?',
        availability: 'Available for 2 projects / August',
        title: 'Let’s build something powerful.',
        description: 'Tell us what you want to change in your business. We’ll come back with questions and an initial vision.',
        form: {
          name: 'Name',
          phone: 'Phone',
          email: 'Email',
          messenger: 'Telegram or WhatsApp',
          type: 'Project type',
          description: 'Task description',
          language: 'Preferred language',
          submit: 'Get a preliminary consultation',
          sending: 'Sending…',
          success: 'Thank you! We received your request and will get back to you shortly.',
          modalTitle: 'Your request has been sent',
          modalClose: 'Close',
          error: 'We could not send the request. Please try again or email us directly.',
          projectTypes: ['website', 'CRM', 'AI automation', 'AI agent', 'integration', 'other']
        }
      },
      portfolioCases: {
        'orion-estate': {
          title: 'ORION ESTATE',
          category: 'WEB / CRM',
          description: 'CRM system for managing clients, sales, tasks and business analytics.',
          task: 'Build a platform that connects the website and brokers while preserving inquiry history.',
          solution: 'Combined website, CRM, pipeline and analytics in a single digital environment.',
          functions: ['Client database', 'Pipeline', 'Customer card', 'Kanban board', 'Tasks', 'Analytics'],
          technologies: ['Nuxt', 'Node.js', 'PostgreSQL', 'Redis'],
          note: 'Conceptual project created to showcase studio capabilities.'
        },
        'pulse-clinic': {
          title: 'PULSE CLINIC',
          category: 'PRODUCT / AI',
          description: 'AI chat on the website and a company portal for fast patient inquiries.',
          task: 'Automate patient request intake and appointment reminders.',
          solution: 'Combined AI chat, knowledge base, dialogue history and auto notifications for the team.',
          functions: ['AI chat', 'Knowledge base', 'Dialogue history', 'Contact capture', 'Telegram notifications'],
          technologies: ['Nuxt', 'NestJS', 'MySQL', 'Docker'],
          note: 'Conceptual project created to showcase studio capabilities.'
        },
        'mono-market': {
          title: 'MONO MARKET',
          category: 'E-COM / AUTOMATION',
          description: 'A platform with customer portal, admin panel and commerce analytics.',
          task: 'Build a store with a unified order system, inventory and automated sales flows.',
          solution: 'Implemented responsive portal, transactions, roles and real-time management tools.',
          functions: ['Customer portal', 'Admin panel', 'User roles', 'Analytics', 'Transactions', 'Real-time features'],
          technologies: ['Vue', 'Node.js', 'Prisma', 'Redis'],
          note: 'Conceptual project created to showcase studio capabilities.'
        }
      },
      footer: {
        rights: 'SEOKONT STUDIO',
        services: 'WEB / CRM / AI AUTOMATION'
      },
      servicePages: {
        'web-development': {
          seo: {
            title: 'Web development — SEOKONT',
            description: 'We build websites with CRM integration, AI logic and lead generation ready for business growth.'
          },
          title: 'Web development for business',
          subtitle: 'Landing pages, corporate sites and commerce platforms connected to your business system.',
          problemTitle: 'Customer challenges',
          solutionTitle: 'Our solution',
          featuresTitle: 'Included features',
          audienceTitle: 'Fits for',
          stageTitle: 'Process stages',
          caseTitle: 'Example project',
          caseNote: 'Conceptual case created to showcase studio capabilities.',
          problems: ['The website does not bring leads', 'Contacts do not flow into sales', 'Technical SEO is not in place', 'Mobile experience is weak'],
          solution: 'We build the website as part of a business system: form, CRM, lead flow and analytics work together.',
          features: ['Landing page', 'Corporate website', 'Online store', 'Catalog', 'Client portal', 'Fast responsive interface', 'SEO optimization'],
          audience: ['Companies that need a strong presentation', 'Those who want stable inquiries', 'Stores with conversion goals', 'Platforms with personalization'],
          stages: ['Requirements analysis', 'UX/UI prototype', 'Interface development', 'CRM integration', 'Testing and launch']
        },
        'crm-development': {
          seo: {
            title: 'Custom CRM — SEOKONT',
            description: 'We build custom CRM systems for your processes with leads, pipeline, automation and reporting.'
          },
          title: 'Custom CRM systems',
          subtitle: 'Clients, contacts, deals, tasks, reports and integrations in one place.',
          problemTitle: 'Customer challenges',
          solutionTitle: 'Our solution',
          featuresTitle: 'Included features',
          audienceTitle: 'Fits for',
          stageTitle: 'Process stages',
          caseTitle: 'Example project',
          caseNote: 'Conceptual case created to showcase studio capabilities.',
          problems: ['Leads are lost between teams', 'There is no single customer database', 'Managers do not know next steps', 'Routine work steals time'],
          solution: 'We create CRM as a single panel where data, statuses and communication work together.',
          features: ['Clients', 'Contacts', 'Deals', 'Pipeline', 'Tasks', 'Roles and permissions', 'Notifications', 'Integrations'],
          audience: ['Sales teams', 'Service companies', 'B2B and B2C departments', 'Growing businesses'],
          stages: ['Process mapping', 'CRM architecture', 'Module development', 'Workflow automation', 'Testing']
        },
        'ai-automation': {
          seo: {
            title: 'AI automation — SEOKONT',
            description: 'We automate repetitive tasks, inbound inquiries and analytics preparation using AI.'
          },
          title: 'AI automation',
          subtitle: 'AI consultants, inquiry analysis, lead classification and automatic workflows.',
          problemTitle: 'Customer challenges',
          solutionTitle: 'Our solution',
          featuresTitle: 'Included features',
          audienceTitle: 'Fits for',
          stageTitle: 'Process stages',
          caseTitle: 'Example project',
          caseNote: 'Conceptual case created to showcase studio capabilities.',
          problems: ['Manual inquiry processing', 'Slow lead response', 'No standardized replies', 'Difficult to scale workflows'],
          solution: 'We configure AI to handle inquiries, classify leads and prepare next actions for managers.',
          features: ['AI assistants', 'AI agents', 'Inquiry analysis', 'Lead classification', 'Auto replies', 'Document processing'],
          audience: ['Support services', 'Call centers', 'Online stores', 'High-traffic companies'],
          stages: ['Scenario definition', 'Model selection', 'Training on examples', 'Integration and testing', 'Launch']
        }
      }
    },
    he: {
      seo: {
        title: 'SEOKONT — אתרים, CRM ואוטומציה עם AI',
        description: 'אנחנו מתכננים אתרים, מערכות CRM ואוטומציות AI שעוזרות לעסקים לצמוח מהר יותר.'
      },
      nav: {
        home: 'SEOKONT — דף הבית',
        services: 'שירותים',
        projects: 'פרויקטים',
        approach: 'התהליך',
        faq: 'FAQ',
        contact: 'צור קשר',
        discuss: 'לדבר על פרויקט'
      },
      hero: {
        eyebrow: 'Digital studio / Kyiv → worldwide',
        line1: 'אנחנו בונים אתרים, CRM ומערכות AI שמ',
        accent: 'מושכות לקוחות',
        line2: 'ומאוטמות עסקים',
        description: 'מחברים אתר, לידים, צוות, אנליטיקה ובינה מלאכותית למערכת דיגיטלית אחת שניתן לנהל.',
        servicesLabel: 'לשירותים שלנו',
        cursor: 'הזיזו את הסמן'
      },
      services: {
        kicker: '01 / מה אנחנו עושים',
        title1: 'מעבר לעיצוב',
        title2: 'פשוט',
        note: 'אנחנו יוצרים מערכות שבהן אתר, CRM ו-AI עובדים כיחידה אחת.',
        items: {
          first: { name: 'אתרים', description: 'אסטרטגיה, עיצוב ופיתוח אתרים שמייצרים לידים.' },
          second: { name: 'מערכות CRM', description: 'לוח בקרה יחיד ללידים, עסקאות, משימות ודוחות ללא כאוס גיליונות.' },
          third: { name: 'אוטומציה AI', description: 'זרימות, צ׳אטים ואנליטיקה שמפחיתים עבודה ידנית.' }
        }
      },
      process: {
        kicker: '03 / הגישה שלנו',
        title1: 'דרך ברורה',
        title2: 'מהרעיון להשקה',
        accent: 'עם תוצאות',
        items: {
          first: { title: 'גילוי', description: 'מזהים נקודות השפעה ותהליכים עסקיים מרכזיים.' },
          second: { title: 'עיצוב', description: 'מייצרים מבנה, פרוטוטיפים וזרימת משתמש.' },
          third: { title: 'פיתוח', description: 'מספקים אתר, CRM ואוטומציות שעובדים יחד.' },
          fourth: { title: 'השקה', description: 'בוחנים את התוצאה ומפרסמים את המוצר עם בקרת איכות.' }
        }
      },
      businessProblems: {
        title: 'עוזרים לפתור בעיות שמעכבות צמיחה עסקית',
        items: [
          { problem: 'לידים הולכים לאיבוד במיילים ובווטסאפ', solution: 'שולחים כל ליד ל-CRM, מנווטים אחראי ויוצרים משימה באופן אוטומטי.' },
          { problem: 'מנהלים עונים ללקוחות לאט', solution: 'מגדירים ניתוב מהיר ותזכורות כדי שהתשובה תגיע מיד.' },
          { problem: 'נתונים מפוזרים באקסל ושירותים שונים', solution: 'מאחדים את הנתונים במערכת אחת עם מאגר לקוחות משותף.' },
          { problem: 'אין מאגר לקוחות מרכזי', solution: 'אוספים קשרים, עסקאות והיסטוריה ב-CRM כדי שכל מנהל יראה את הלקוח במלואו.' },
          { problem: 'המנהלים לא רואים אנליטיקה אמיתית', solution: 'מציגים מדדים מרכזיים בלוח מחוונים ודוחות אוטומטיים.' },
          { problem: 'עובדים מבצעים פעולות חוזרות על עצמן ביד', solution: 'מאוטמים תהליכים שגרתיים ויוצרים חוקים עבור AI.' },
          { problem: 'CRM קיים לא מתאים לתהליכים של החברה', solution: 'מתכננים CRM לפי התהליכים שלכם, לא לפי תבנית מוכנה.' },
          { problem: 'האתר לא מחובר למחלקת מכירות', solution: 'מחברים את האתר ל-CRM כך שכל ליד נכנס לתהליך מכירה.' },
          { problem: 'אין בקרה אוטומטית על פניות', solution: 'יוצרים זרימות עם מעקב, סטטוסים ואחראי לכל פנייה.' },
          { problem: 'תהליכים עסקיים קשים להרחבה', solution: 'בונים מערכת מודולרית שניתן להרחיב עם הצמיחה.' }
        ]
      },
      portfolio: {
        kicker: '02 / עבודות נבחרות',
        title1: 'פרויקטים ש',
        title2: 'פותרים בעיה עסקית',
        note: 'כל מקרה בנוי סביב אתגר עסקי ופתרון מערכתי.',
        items: {
          'orion-estate': 'מערכת CRM לניהול לקוחות, מכירות, משימות ואנליטיקה עסקית.',
          'pulse-clinic': 'צ׳אט AI באתר ופורטאל חברה לעיבוד מהיר של פניות מטופלים.',
          'mono-market': 'פלטפורמה עם פורטל משתמש, לוח ניהול ואנליטיקה למסחר.'
        }
      },
      aiWorkflow: {
        title: 'איך אוטומציה ב-AI עובדת בעסק',
        intro: 'מראים איך פנייה הופכת לפעולה דרך לוגיקה ו-AI.',
        sectors: ['שירותים', 'לוגיסטיקה', 'ייצור', 'נדל״ן', 'e-commerce'],
        examples: {
          services: 'בקשת אתר יוצרת לקוח, ממנהלת מנהל ומתחילה תהליך תגובה.',
          logistics: 'AI מנתח סוג הזמנה, מדרג את המשלוח ויוצר משימה לדיספאצ׳ר.',
          production: 'הבקשה יוצרת משימה טכנית, מוסיפה את הקשר ל-CRM ומכינה לוח ייצור.',
          realEstate: 'הליד נכנס לעסקה, מקבל סטטוס ומודיע למוכר דרך CRM.',
          ecommerce: 'ההזמנה עוברת לפאנל אחד שבו AI ממיין ומאיץ עיבוד.'
        },
        steps: ['לקוח משאיר פנייה', 'AI מנתח את ההודעה', 'מגדיר נושא ו-priority', 'יוצר לקוח ב-CRM', 'ממנה מנהל', 'מכין תשובה', 'יוצר משימה', 'המנהל רואה תוצאה']
      },
      advantages: {
        title: 'למה עסקים בוחרים פיתוח מותאם אישית',
        items: ['המערכת נבנית לפי תהליכי החברה', 'אין פונקציות מיותרות', 'ניתן להוסיף מודולים חדשים', 'הנתונים בשליטת הלקוח', 'ניתן לשלב שירותים חיצוניים', 'המערכת מדרגת', 'אדריכלות ברורה', 'ממשק רספונסיבי', 'תמיכה אחרי השקה', 'אפשרות לחיבור AI']
      },
      timeline: {
        title: 'שלבי עבודה',
        items: [
          { title: 'היכרות', description: 'דיון בעסק, משימה ותוצאה צפויה.' },
          { title: 'ניתוח', description: 'לימוד תהליכים, משתמשים ואינטגרציות נדרשות.' },
          { title: 'ארכיטקטורה', description: 'תכנון דפים, בסיס נתונים, מודולי CRM ואוטומציות.' },
          { title: 'עיצוב', description: 'יצירת אב טיפוס וממשק UX/UI.' },
          { title: 'פיתוח', description: 'Frontend, backend, לוח ניהול ואינטגרציות.' },
          { title: 'בדיקות', description: 'בדיקת לוגיקה, רספונסיביות, אבטחה וביצועים.' },
          { title: 'השקה', description: 'העלאת הפרויקט וקישור הדומיין.' },
          { title: 'תמיכה', description: 'תיקונים, צמיחה והוספת פונקציות חדשות.' }
        ]
      },
      technologies: {
        title: 'בחרנו טכנולוגיות לפי צרכי הפרויקט, העומס ותוכניות הצמיחה',
        items: ['Nuxt', 'Vue', 'Next.js', 'React', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'MySQL', 'Prisma', 'Redis', 'Docker', 'REST API', 'WebSocket', 'AI API']
      },
      faq: {
        title: 'FAQ',
        items: [
          { question: 'כמה עולה פיתוח אתר?', answer: 'העלות תלויה במורכבות, אינטגרציות ונפח תוכן. אנו מעריכים כל פרויקט לאחר סקירת מטרות העסק.' },
          { question: 'כמה זמן לוקח ליצור CRM?', answer: 'CRM מותאם אישית בדרך כלל לוקח 6–10 שבועות בהתאם לדרישות ולחיבורים.' },
          { question: 'האם ניתן לשלב את המערכת עם שירותים קיימים?', answer: 'כן, אנחנו מחברים Telegram, WhatsApp, Google Sheets, מערכות תשלום ושירותים אחרים דרך API.' },
          { question: 'האם אפשר לשפר אתר קיים?', answer: 'כן, אנו מבצעים בדיקה ומציעים תוכנית שיפורים בלי לאבד את התנועה הנוכחית.' },
          { question: 'אילו תהליכים ניתן לאוטומט עם AI?', answer: 'ניהול פניות, מיון לידים, תשובות אוטומטיות, עיבוד מסמכים והכנת אנליטיקה.' },
          { question: 'האם ניתן להתחיל עם MVP?', answer: 'כן. MVP מאפשר הגעה מהירה לשוק והוספה הדרגתית של CRM ו-AI.' },
          { question: 'האם יש תמיכה לאחר ההשקה?', answer: 'כן, אנו נשארים קרובים לאחר ההשקה ומסייעים בהמשך הפיתוח.' },
          { question: 'למי שייך קוד המקור?', answer: 'לאחר התשלום קוד המקור שייך לכם. אנו מוסרים את הריפוזיטורי והתיעוד.' },
          { question: 'האם אפשר לחבר Telegram ו-WhatsApp?', answer: 'כן, אנו מגדירים הודעות ואיסוף לידים דרך Telegram ו-WhatsApp.' },
          { question: 'האם ניתן לפתח לוח ניהול?', answer: 'כן, לוח ניהול נכלל בפרויקט לניהול CRM, לידים ואנליטיקה.' }
        ]
      },
      contact: {
        question: 'יש לכם רעיון?',
        availability: 'פנויים ל-2 פרויקטים / אוגוסט',
        title: 'בואו ניצור משהו חזק.',
        description: 'ספרו לנו מה תרצו לשנות בעסק. נחזור עם שאלות ועם כיוון ראשוני לפתרון.',
        form: {
          name: 'שם',
          phone: 'טלפון',
          email: 'Email',
          messenger: 'Telegram או WhatsApp',
          type: 'סוג פרויקט',
          description: 'תיאור משימה',
          language: 'שפה מועדפת',
          submit: 'לקבלת ייעוץ ראשוני',
          sending: 'שולחים…',
          success: 'תודה! קיבלנו את הפנייה ונחזור אליכם בהקדם.',
          modalTitle: 'הפנייה נשלחה בהצלחה',
          modalClose: 'סגירה',
          error: 'לא הצלחנו לשלוח את הפנייה. נסו שוב או כתבו לנו באימייל.',
          projectTypes: ['אתר', 'CRM', 'אוטומציה ב-AI', 'סוכן AI', 'אינטגרציה', 'אחר']
        }
      },
      portfolioCases: {
        'orion-estate': {
          title: 'ORION ESTATE',
          category: 'WEB / CRM',
          description: 'מערכת CRM לניהול לקוחות, מכירות, משימות ואנליטיקה עסקית.',
          task: 'לבנות פלטפורמה שמחברת את האתר והסוכנים תוך שמירה על היסטוריית פניות.',
          solution: 'שילבנו אתר, CRM, משפע ואנליטיקה בסביבה דיגיטלית אחת.',
          functions: ['מאגר לקוחות', 'משפך', 'כרטיס לקוח', 'לוח Kanban', 'משימות', 'אנליטיקה'],
          technologies: ['Nuxt', 'Node.js', 'PostgreSQL', 'Redis'],
          note: 'מקרה קונספטואלי שנוצר כדי להציג את יכולות הסטודיו.'
        },
        'pulse-clinic': {
          title: 'PULSE CLINIC',
          category: 'PRODUCT / AI',
          description: 'צ׳אט AI באתר ופורטאל חברה לעיבוד מהיר של פניות מטופלים.',
          task: 'לאוטומט קבלת פניות מטופלים ותזכורות לפגישות.',
          solution: 'שילבנו צ׳אט AI, מאגר ידע, היסטוריית שיחה והתראות אוטומטיות לצוות.',
          functions: ['צ׳אט AI', 'מאגר ידע', 'היסטוריית שיחות', 'איסוף אנשי קשר', 'התראות Telegram'],
          technologies: ['Nuxt', 'NestJS', 'MySQL', 'Docker'],
          note: 'מקרה קונספטואלי שנוצר כדי להציג את יכולות הסטודיו.'
        },
        'mono-market': {
          title: 'MONO MARKET',
          category: 'E-COM / AUTOMATION',
          description: 'פלטפורמה עם פורטל משתמש, לוח ניהול ואנליטיקה למסחר.',
          task: 'לבנות חנות עם מערכת הזמנות מאוחדת, מלאי וזרימות מכירה אוטומטיות.',
          solution: 'הטמענו פורטל מותאם, עסקאות, תפקידים וכלים בזמן אמת לניהול.',
          functions: ['פורטאל משתמש', 'לוח ניהול', 'תפקידי משתמשים', 'אנליטיקה', 'עסקאות', 'יכולות בזמן אמת'],
          technologies: ['Vue', 'Node.js', 'Prisma', 'Redis'],
          note: 'מקרה קונספטואלי שנוצר כדי להציג את יכולות הסטודיו.'
        }
      },
      footer: {
        rights: 'SEOKONT STUDIO',
        services: 'WEB / CRM / AI AUTOMATION'
      },
      servicePages: {
        'web-development': {
          seo: {
            title: 'פיתוח אתרים — SEOKONT',
            description: 'אנחנו בונים אתרים עם חיבור ל-CRM, לוגיקת AI ותשתית ליצירת לידים וצמיחה עסקית.'
          },
          title: 'פיתוח אתרים לעסקים',
          subtitle: 'דפי נחיתה, אתרי חברה ופלטפורמות מסחר שמחוברות למערכת העסקית שלכם.',
          problemTitle: 'האתגרים של הלקוחות',
          solutionTitle: 'הפתרון שלנו',
          featuresTitle: 'מה כלול',
          audienceTitle: 'למי זה מתאים',
          stageTitle: 'שלבי העבודה',
          caseTitle: 'פרויקט לדוגמה',
          caseNote: 'פרויקט קונספטואלי שנוצר כדי להציג את יכולות הסטודיו.',
          problems: ['האתר לא מייצר לידים', 'הפניות לא מגיעות לצוות המכירות', 'אין תשתית SEO טכנית', 'חוויית המובייל חלשה'],
          solution: 'אנחנו בונים את האתר כחלק ממערכת עסקית שבה הטופס, ה-CRM, זרימת הלידים והאנליטיקה עובדים יחד.',
          features: ['דף נחיתה', 'אתר חברה', 'חנות אונליין', 'קטלוג', 'אזור אישי', 'ממשק מהיר ורספונסיבי', 'אופטימיזציית SEO'],
          audience: ['חברות שזקוקות לנוכחות חזקה', 'עסקים שרוצים זרם פניות יציב', 'חנויות עם יעדי המרה', 'פלטפורמות עם התאמה אישית'],
          stages: ['ניתוח דרישות', 'אב-טיפוס UX/UI', 'פיתוח הממשק', 'חיבור ל-CRM', 'בדיקות והשקה']
        },
        'crm-development': {
          seo: {
            title: 'מערכות CRM מותאמות — SEOKONT',
            description: 'אנחנו מפתחים מערכות CRM מותאמות לתהליכים שלכם, עם לידים, משפך מכירות, אוטומציה ודוחות.'
          },
          title: 'מערכות CRM מותאמות אישית',
          subtitle: 'לקוחות, אנשי קשר, עסקאות, משימות, דוחות ואינטגרציות במקום אחד.',
          problemTitle: 'האתגרים של הלקוחות',
          solutionTitle: 'הפתרון שלנו',
          featuresTitle: 'מה כלול',
          audienceTitle: 'למי זה מתאים',
          stageTitle: 'שלבי העבודה',
          caseTitle: 'פרויקט לדוגמה',
          caseNote: 'פרויקט קונספטואלי שנוצר כדי להציג את יכולות הסטודיו.',
          problems: ['לידים הולכים לאיבוד בין צוותים', 'אין מאגר לקוחות מרכזי', 'מנהלים לא יודעים מה הצעד הבא', 'עבודה ידנית גוזלת זמן'],
          solution: 'אנחנו יוצרים CRM כלוח עבודה אחד שבו הנתונים, הסטטוסים והתקשורת עובדים יחד.',
          features: ['לקוחות', 'אנשי קשר', 'עסקאות', 'משפך מכירות', 'משימות', 'תפקידים והרשאות', 'התראות', 'אינטגרציות'],
          audience: ['צוותי מכירות', 'חברות שירותים', 'מחלקות B2B ו-B2C', 'עסקים בצמיחה'],
          stages: ['מיפוי תהליכים', 'ארכיטקטורת CRM', 'פיתוח מודולים', 'אוטומציית תהליכים', 'בדיקות']
        },
        'ai-automation': {
          seo: {
            title: 'אוטומציית AI — SEOKONT',
            description: 'אנחנו מבצעים אוטומציה למשימות חוזרות, פניות נכנסות והכנת אנליטיקה באמצעות AI.'
          },
          title: 'אוטומציית AI',
          subtitle: 'יועצי AI, ניתוח פניות, מיון לידים ותהליכי עבודה אוטומטיים.',
          problemTitle: 'האתגרים של הלקוחות',
          solutionTitle: 'הפתרון שלנו',
          featuresTitle: 'מה כלול',
          audienceTitle: 'למי זה מתאים',
          stageTitle: 'שלבי העבודה',
          caseTitle: 'פרויקט לדוגמה',
          caseNote: 'פרויקט קונספטואלי שנוצר כדי להציג את יכולות הסטודיו.',
          problems: ['עיבוד ידני של פניות', 'תגובה איטית ללידים', 'אין תשובות אחידות', 'קשה להרחיב את תהליכי העבודה'],
          solution: 'אנחנו מגדירים AI שמטפל בפניות, מסווג לידים ומכין את הצעדים הבאים עבור המנהלים.',
          features: ['עוזרי AI', 'סוכני AI', 'ניתוח פניות', 'מיון לידים', 'תשובות אוטומטיות', 'עיבוד מסמכים'],
          audience: ['שירותי תמיכה', 'מוקדים טלפוניים', 'חנויות אונליין', 'חברות עם נפח פניות גבוה'],
          stages: ['הגדרת תרחישים', 'בחירת מודל', 'אימון על דוגמאות', 'אינטגרציה ובדיקות', 'השקה']
        }
      }
    }
  }
}))
