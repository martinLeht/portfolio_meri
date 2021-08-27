import { useCallback, useMemo, useState, useEffect } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';

import Element from './Element';
import Leaf from './Leaf';
import Toolbar from './Toolbar';
import MarkButton from './MarkButton';
import BlockButton from './BlockButton';


const BlogEditor = (props) => {

    const { editorContent } = props;

    let initialContentValue;
    if (editorContent !== undefined && editorContent !== null) {
        initialContentValue = editorContent;
    } else {
        initialContentValue = [{
            type: "paragraph",
            children: [{ text: 'Sisältö...' }]
        }];
    }
    const [content, setContent] = useState(initialContentValue);

    const editor = useMemo(() =>  withReact(createEditor()), []);
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])


    const handleContentChange = (value) => {
        console.log(value);
        setContent(value);
        // Save the value to Local Storage.
        const content = JSON.stringify(value);
        localStorage.setItem('content', content);
    }
    

    return (
        <Slate editor={ editor } value={ content } onChange={ handleContentChange } >
            <Toolbar>
                <MarkButton format="bold" icon="bold" tooltip="Bold text" />
                <MarkButton format="italic" icon="italic" tooltip="Italic text" />
                <MarkButton format="underline" icon="underline" tooltip="Underline text" />
                <BlockButton format="heading-two" icon="heading" tooltip="Medium heading" />
                <BlockButton format="heading-one" icon="heading" size="2x" tooltip="Large heaging" />
                <BlockButton format="block-quote" icon="quote-right" tooltip="Quote block" />
                <BlockButton format="numbered-list" icon="list-ol" tooltip="Numbered list" />
                <BlockButton format="bulleted-list" icon="list-ul" tooltip="Bulleted list" />
            </Toolbar>
            <Editable 
                className="bg-white rounded-3 p-2" 
                renderElement={ renderElement }
                renderLeaf={ renderLeaf }
                spellCheck
                autoFocus
            />
        </Slate>
    );
}

export default BlogEditor;


