

const SectionSeparator = (props) => {

    const { title } = props;

    return (
        <div className="d-flex flex-column rounded-4 text-white bg-dark p-3">
             <h3>{ title } </h3>
        </div>
    )

}

export default SectionSeparator;