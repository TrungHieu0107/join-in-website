// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useEffect, useRef, useState } from 'react'

// import dynamic from 'next/dynamic'

function Editor({ onChange, name, value }) {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }

    // setEditorLoaded(true)

    // const editor = dynamic(() => import('@ckeditor/ckeditor5-react'), { ssr: false })
    // const classic = await import('@ckeditor/ckeditor5-build-classic')
    // editorRef.current = {
    //   CKEditor: editor.CKEditor, // v3+
    //   ClassicEditor: classic
    // }

    setEditorLoaded(true)
  }, [editorLoaded])

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
