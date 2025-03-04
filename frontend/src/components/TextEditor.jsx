import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";

const TextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Link.configure({ openOnClick: false }),
      Image,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      Code,
      CodeBlock,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="block w-full rounded-md border border-gray-300 p-2 text-base text-gray-900">
      {/* Toolbar */}
      <div className="flex space-x-2 mb-2 border-b pb-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="p-1 border rounded">B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="p-1 border rounded">I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className="p-1 border rounded">U</button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className="p-1 border rounded">S</button>
        
        {/* Image Button */}
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="p-1 border rounded"
        >
          🖼
        </button>

        {/* Link Button */}
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) {
              editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            }
          }}
          className="p-1 border rounded"
        >
          🔗
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
