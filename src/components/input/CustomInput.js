

const CustomInput = (props) => {

    const { type, label, icon, textColor, placeholder, placeholderColor, borderColor, focusBorderColor, className} = props;

    return (
        <input className={"custom-input-field" + className} type={type} ></input>
    )
}

export default CustomInput;