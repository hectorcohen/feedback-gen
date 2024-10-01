"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import EmailEditor, { EditorRef } from "react-email-editor";
import sample from "@/lib/email.json";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const EmailComponent = () => {
  const emailEditorRef = React.useRef<EditorRef>(null);

  const exportTemplate = () => {
    // @ts-ignore
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("Design", design);
      console.log('Html', html)
    });
  };

  const onLoad = () => {
    if (emailEditorRef) {
      emailEditorRef.current?.editor?.loadDesign(sample);
    }
  };

  const toolsConfig = {
    text: {
      properties: {
        text: {
          value: '<p id="text-block" style="line-height: 140%; color: #FF5733;">This is a new Text block. Change the text.</p>', // Set initial text color
        },
        color: {
          value: '#FF5733', // Initial color in the text editor color picker
        },
      },
    },
  };

  return (
    <div>
      <ScrollArea className="w-full h-full rounded-md border p-4">
        <div className="border">
          <React.StrictMode>
            <EmailEditor
              tools={toolsConfig}
              ref={emailEditorRef}
              onLoad={onLoad}
              options={{
                version: "latest",
              }}
            />
          </React.StrictMode>
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>

      <Button variant="outline" onClick={exportTemplate} className="mt-2">
        Save this template <Mail className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
};

export default EmailComponent;
