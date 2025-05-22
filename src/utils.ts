import { employmentType, experienceType, formatType } from "./modules";

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

export function parseEmploymentType(value: employmentType){
  switch (value) {
    case 'full_time':
      return 'Полная';
    case 'part_time':
      return 'Частичная';
    case 'intern':
      return 'Стажировка';
  }
}

export function parseExperienceType(value: experienceType){
  switch (value) {
    case 'none':
      return 'Не имеет значения';
    case 'zero':
      return 'Нет опыта';
    case 'one_to_three_years':
      return 'От 1 до 3 лет';
    case 'three_to_six_years':
      return 'От 3 до 6 лет';
    case 'more_six_years':
      return 'Более 6 лет'
  }
}