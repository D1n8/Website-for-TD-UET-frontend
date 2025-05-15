function Activity({ type }: {type : string}) {
    return (
        <div className="activity__item">
            <span className="activity__text">{type}</span>
        </div>
    );
}

export default Activity;