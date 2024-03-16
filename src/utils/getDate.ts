import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Подключаем локализацию для русского языка
import utc from 'dayjs/plugin/utc'; // Подключаем плагин для работы с UTC временем
import timezone from 'dayjs/plugin/timezone'; // Подключаем плагин для работы с часовыми поясами

export function getDate() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Europe/Moscow');

  const currentDate = dayjs().format('HH:mm DD.MM.YYYY');

  return currentDate;
}
