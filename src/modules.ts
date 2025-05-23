export type formatType = 'office' | 'hybrid' | 'online' | '';
export type employmentType = 'full_time' | 'part_time' | 'intern' | 'contract';
export type experienceType = 'none' | 'zero' | 'one_to_three_years' | 'three_to_six_years' | 'more_six_years';

export interface IVacancy {
    id: number,
    title: string,
    description: string,
    requirements: string[],
    format_type: formatType,
    activities: string[],
    location: string,
    responsibilities: string[],
    employment_type: employmentType,
    experience_type: experienceType,
    salary_min: number,
    salary_max: number,
    published_at: string
}

export interface IVacancyCard{
    id: number,
    title: string,
    description: string,
    employment_type: employmentType,
    experience_type: experienceType,
    activities: string[],
    salary_min: number,
    salary_max: number,
    format_type: formatType,
    location: string,
    published_at: string
}

export interface INews {
    id: number,
    title: string,
    content: string,
    image: string,
    published_at: string
}