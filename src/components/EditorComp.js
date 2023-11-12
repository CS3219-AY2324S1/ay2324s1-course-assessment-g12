import React, { useState } from 'react';
import "../style/SubmitButton.css";
import "../style/LoadingBox.css"
import * as Y from "yjs";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import { createClient } from '@liveblocks/client';
import LiveblocksProvider from "@liveblocks/yjs";
import axios from 'axios';
import qs from 'qs';

const client = createClient({
    publicApiKey: "pk_dev_-iamGGIAHL-AOLUgx1XFpZ3yyHJXxO5cdT4mZ4ZBvSKb2-JF8vKSmdaj7UVE-M_a",
});

function EditorComp({roomJoined, setOutput, socket, language}) {
    // Yjs
    const ydoc = new Y.Doc();

    // The editor
    const [editor, setEditor] = useState(null);

    // Ytype
    const textType = ydoc.getText("monaco");
    
    function handleOnMount(editor22, monaco22) {
        // Set the editor to the variable
        setEditor(editor22)

        // Enter a multiplayer room
        const { room, leave } = client.enterRoom(roomJoined(), {
            initialPresence: {},
        });
        const yProvider = new LiveblocksProvider(room, ydoc);
        const monacoBinding = new MonacoBinding(textType, editor22.getModel(), new Set([editor22]), yProvider.awareness);
    }

    const handleCompile = () => {
        var data = editor.getValue();
        console.log(roomJoined())
        socket.emit("compile_code", data, roomJoined(), language)
      };

    return (
        <div id='editor'>
            <div style={{ display: 'flex'}}>
                <Editor 
                height="57vh"
                width="58.1vw"
                theme='vs-dark'
                language= {language == 'python3' ? "python" : language} // I really dk if this will work
                onMount={handleOnMount}
                />
            </div>
            <button onClick={handleCompile} style={{ width: '100%', height :'3vh', backgroundColor:'green', color: 'white' }}>Compile</button>
        </div>
    );
}

export default EditorComp;