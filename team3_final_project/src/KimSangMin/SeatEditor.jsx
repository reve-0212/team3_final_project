import React, { useRef } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

function SeatEditor() {
    const editorRef = useRef(null);

    const Hsave = async () => {
        const html = editorRef.current.getContents();
        // SunEditor에서 HTML 가져오기
        await fetch('/api/layout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ layoutHtml: html }), // HTML 데이터를 서버로 전송
        });
        alert('배치도가 저장되었습니다!');
    };

    return (
        <div>
            <SunEditor
                ref={editorRef}
                setOptions={{
                    height: 400,
                    buttonList: [['bold', 'italic'], ['table', 'codeView']],
                }}
            />
            <button onClick={Hsave}>저장하기</button>
        </div>
    );
}

export default SeatEditor;
