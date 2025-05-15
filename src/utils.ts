import { formatType } from "./modules";

export function parseDate(value: string) {
    const date = new Date(value);
    return date.toLocaleDateString('ru-RU');
}

export function parseFormatType(value: formatType){
  switch (value) {
    case 'office':
      return 'Офис';
    case 'hybrid':
      return 'Гибрид';
    case 'online':
      return 'Онлайн';
  }
}