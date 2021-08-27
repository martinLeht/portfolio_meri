const Element = (props) => {
    const { attributes, children, element } = props;
    
    /*
    const resolveAlignment = (alignment) => {
        let className = "";
        if (alignment !== undefined) {
            switch (alignment) {
                case 'center':
                    className = "align-self-center";
                case 'left':
                    className = "align-self-start";
                case 'right':
                    className = "align-self-end";
            }
        }
        return className;
    };
    */

    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes} /*className={ resolveAlignment(element.alignment) } */>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes} /*className={ resolveAlignment(element.alignment) } */>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes} /*className={ resolveAlignment(element.alignment) } */>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes} /*className={ resolveAlignment(element.alignment) } */>{children}</h2>
        case 'list-item':
            return <li {...attributes} /*className={ resolveAlignment(element.alignment) } */>{children}</li>
        case 'numbered-list':
            return <ol {...attributes} /*className={ resolveAlignment(element.alignment) } */>{children}</ol>
        default:
            return <p {...attributes} /*className={ resolveAlignment(element.alignment) } */>{children}</p>
    }
}

export default Element;