import React from "react";

import { Editor } from '@tinymce/tinymce-react';
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {   // RTE-->Real Time Editor      ,, "control" is works as same as ' forwardRef' .
    return (<div className="w-full">
        {label && <label className="inline-block mb-1 pl-1">{label}</label>}

        <Controller
            name={name || "content"}
            control={control}
            render={({ field: { onChange } }) => (                // render has callback inside it
                <Editor
                    apiKey='x0s4uq1jj8cw03fh4j63072f7skk27bvhko6ryobwezc32wl'
                    initialValue={defaultValue}
                    init={{
                        initialValue: defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "help",
                            "wordcount",
                        ],
                        toolbar:
                            "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        branding: false,
                        setup: (editor) => {
                            editor.on('init', () => {
                                console.log('TinyMCE editor initialized');
                            });
                        }
                    }}
                    onEditorChange={(content, editor) => {
                        console.log('=== RTE CONTENT CHANGE ===');
                        console.log('Content:', content);
                        console.log('Content length:', content ? content.length : 'undefined/null');
                        console.log('=== END RTE DEBUG ===');
                        onChange(content);
                    }}


                />
            )}


        />













    </div>
    )


}
