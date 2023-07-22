import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import "./styles.css";
import { Button, Box } from "@mui/material";
import { $generateHtmlFromNodes } from '@lexical/html';
import { useRef, useState } from "react";
import { CLEAR_HISTORY_COMMAND } from "lexical";

const desiredUpdate = {
  editorState: {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  },
  lastSaved: 1656765599382,
  source: "Playground",
  version: "0.3.6",
};


function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};

const handleClick = (editor) => {

  editor.update(() => {
    const editorState = editor.getEditorState();
    const jsonString = JSON.stringify(editorState);
    console.log('jsonString', jsonString);

    const htmlString = $generateHtmlFromNodes(editor, null);
    console.log('htmlString', htmlString);
  });
};


export default function Editor(props) {
  const [data, setData] = useState();

  const editorRef = useRef();
  // const [editor] = useLexicalComposerContext();
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={(editorState, editor) => { editorRef.current = editor }} />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <Box sx={{
            width: '100%',
            background: '#27374D',
            display: "flex",
            justifyContent: 'end',
            padding: '0.5vh',
            boxSizing: 'border-box', borderTop: '1px solid #DDE6ED', borderColor: '#DDE6ED'
          }}>
            <Button onClick={() => {
              editorRef.current.update(() => {
                const editorState = editorRef.current.getEditorState();
                const jsonString = JSON.stringify(editorState);
                console.log('jsonString', jsonString);

                const htmlString = $generateHtmlFromNodes(editorRef.current, null);
                console.log('htmlString', htmlString);
                setData(htmlString);
                props.setMessage(htmlString);

                const newEditorState = editorRef.current.parseEditorState(
                  JSON.stringify(desiredUpdate.editorState)
                );
                editorRef.current.setEditorState(newEditorState);
                editorRef.current.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
              });
            }}
              // console.log(JSON.stringify(editorStateRef.current));
              // console.log(JSON.parse(JSON.stringify(editorStateRef.current)));


              variant="contained" sx={{ color: '#DDE6ED', background: '#526D82', ":hover": { background: '#4a6478' } }}>Send</Button>
          </Box>
        </div>



      </div>
    </LexicalComposer >
  );
}
