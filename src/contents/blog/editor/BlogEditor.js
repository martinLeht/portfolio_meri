
import { useCallback, useMemo, useState } from 'react';
import { Slate, Editable, withReact} from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';

import useSelection from '../../../hooks/useSelection';

import Element from './Element';
import Leaf from './Leaf';
import Toolbar from './Toolbar';
import MarkButton from './MarkButton';
import BlockButton from './BlockButton';


const BlogEditor = (props) => {

    const { editorContent } = props;

    let initialContentValue;
    if (editorContent !== undefined) {
        initialContentValue = editorContent;
    } else {
        initialContentValue = [{
            type: "paragraph",
            children: [{ text: 'Sisältö...' }]
        }];
    }
    const [content, setContent] = useState(initialContentValue);

    const editor = useMemo(() =>  withReact(withHistory(createEditor())), []);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);

    const [previousSelection, selection, setSelectionOptimized, setSelection] = useSelection(editor);
    const handleContentChange = useCallback((content) => {
        // Save the content to Local Storage.
        localStorage.setItem('content', JSON.stringify(content));

        setContent(content);
        setSelectionOptimized(editor.selection);
    }, [editor.selection, setContent, setSelectionOptimized]);
    

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
                <BlockButton format="link" icon="link" tooltip="Link" />
                <BlockButton format="image" icon="image" tooltip="Attach Image" />
            </Toolbar>
            <Editable 
                className="border border-2 border-dark rounded-3 p-2" 
                renderElement={ renderElement }
                renderLeaf={ renderLeaf }
                spellCheck
                autoFocus
            />
        </Slate>
    );
}

export default BlogEditor;


