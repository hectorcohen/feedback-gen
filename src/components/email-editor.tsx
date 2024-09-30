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
      const { design } = data;
      console.log("Design", design);
    });
  };

  const onLoad = () => {
    if (emailEditorRef) emailEditorRef.current?.editor?.loadDesign(sample);
  };

  return (
    <div>
      <ScrollArea className="w-full h-full rounded-md border p-4">
        <div className="border">
        <React.StrictMode>
          <EmailEditor
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
