import LoadingSpinner from '../../../components/general/LoadingSpinner';

const Image = (props) => {
    const { attributes, children, element } = props;
  
    return (
        <div {...attributes} contentEditable={false}>
            {
                !element.isUploading 
                ? (<img src={element.url} alt={element.caption} className="editor-image-attachment" />)
                : (<LoadingSpinner />)
            }
            {children}
        </div>
    );
}

export default Image;
