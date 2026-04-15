import { assetPath } from "../utils/assetPath";

export const navItems = ["О нас", "Мероприятия", "Рассылка", "Соцсети", "Партнеры"];

export const audienceCards = [
  {
    icon: assetPath("/assets/landing/lightning-icon.svg"),
    text: "Готов получать новые знания от экспертов",
  },
  {
    icon: assetPath("/assets/landing/mortarboard-icon.svg"),
    text: "Отработать навыки на обучающих тренингах",
  },
  {
    icon: assetPath("/assets/landing/star-icon.svg"),
    text: "Хочешь проявить себя и показать свои умения на практике",
  },
];

export const events = [
  {
    image: assetPath("/assets/landing/event-post.png"),
    title: 'Регистрация на хакатон "Точка опоры: цифровая инфраструктура и веб-технологии"',
    description: "Другие товары и услуги для успешной карьеры в IT.",
  },
  {
    image: assetPath("/assets/landing/event-post.png"),
    title: 'Регистрация на хакатон "Точка опоры: цифровая инфраструктура и веб-технологии"',
    description: "Программа для начинающих и продвинутых участников.",
  },
  {
    image: assetPath("/assets/landing/event-post.png"),
    title: 'Регистрация на хакатон "Точка опоры: цифровая инфраструктура и веб-технологии"',
    description: "Прояви себя в задачах от реальных заказчиков.",
  },
];

export const partners = [
  {
    logo: assetPath("/assets/landing/logo-arttech.svg"),
    subtitle: "Школа дизайна Арттех — школа современного образования для молодёжи в Хабаровске",
    text: "Программы обучения: графический дизайн, web-дизайн, коммерческая иллюстрация, дизайн интерьеров, специалист по нейросетям.",
  },
  {
    logo: assetPath("/assets/landing/logo-rasa.png"),
    subtitle: "Диджитал агентство RASA — это команда амбициозных профессионалов на Дальнем Востоке",
    text: "Компания не просто выполняет задачи, а превращает амбиции крупнейших предприятий региона в мощные цифровые продукты.",
  },
  {
    logo: assetPath("/assets/landing/logo-vtb.png"),
    subtitle: "Группа ВТБ — российская финансовая группа, включающая более 20 кредитных и финансовых компаний",
    text: "Системообразующий универсальный российский банк, один из лидеров рынка финансовых услуг, работает со всеми категориями клиентов.",
  },
];

export const socialImage = assetPath("/assets/landing/vk-cover.png");

export const heroWaves = {
  back: assetPath("/assets/landing/wave-back.svg"),
  middle: assetPath("/assets/landing/wave-middle.svg"),
  front: assetPath("/assets/landing/wave-front.svg"),
};
