import { Transforms } from 'slate'

/**
 * TODO: better way for fix, for now this works
 * Prevent new row to copy the 'id' property from previous row
 */ 
const withEntryNormalization = editor => {
    editor.normalizeNode = entry => {
        
        if (editor.selection !== null && editor.selection.anchor !== null) {
            const previousRow = editor.children[editor.selection.anchor.path[0] - 1];
            let selectedRow = editor.children[editor.selection.anchor.path[0]];
            if (previousRow !== undefined && previousRow.id !== undefined && selectedRow.id === previousRow.id) {
                Transforms.removeNodes(editor, { at: editor.selection });
                Transforms.insertNodes(
                    editor,
                    {
                        type: "paragraph",
                        children: [
                            {
                              text: '',
                            }
                        ]
                    }
                );
            }
        }
        return;
    }

    return editor;
}

export default withEntryNormalization;