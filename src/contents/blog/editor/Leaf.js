const Leaf = (props) => {
    let { attributes, children, leaf } = props;

    if (leaf.bold) {
        children = <strong>{children}</strong>
    }
  
    if (leaf.italic) {
        children = <em>{children}</em>
    }
  
    if (leaf.underline) {
        children = <u>{children}</u>
    }
  
    return <span {...attributes}>{children}</span>
}

export default Leaf;