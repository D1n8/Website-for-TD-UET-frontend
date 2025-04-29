interface IEmplomentTypeProps {
    type: string
}

function EmploymentType({ type }: IEmplomentTypeProps) {
    return (
        <div className="employment-type__item">
            <span className="employment-type__text">{type}</span>
        </div>
    )
}

export default EmploymentType