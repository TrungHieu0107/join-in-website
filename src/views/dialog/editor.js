// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

function Editor({ onChange, editorLoaded, name, value }) {
  
  const editorRef = useRef()

  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect( async () => {
    const editor = dynamic(() => import('@ckeditor/ckeditor5-react'), { ssr: false });
    const classic = await import('@ckeditor/ckeditor5-build-classic')
    editorRef.current = {
      CKEditor: editor.CKEditor, // v3+
      ClassicEditor: classic
    }
  }, [])

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=''
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData()

            // console.log({ event, editor, data })
            onChange(data)
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  )
}

export default Editor
