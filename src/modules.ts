export interface IVacancy {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    responsibilities: string;
    employment_type: string;
    salary_min: number;
    salary_max: number;
    published_at: string;
}

export interface IVacancyCard{
    id: number,
    title: string,
    employment_type: string,
    salary_min: number,
    salary_max: number,
    published_at: string,
    location: string,
    description: string
}