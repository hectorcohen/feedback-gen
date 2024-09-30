import React from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { Settings2, TableCellsSplit, Palette } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Editor = dynamic(() => import("@/components/email-editor"), {
  ssr: false,
});

const PreferencesPage = () => {
  return (
    <div>
      <Breadcrumbs
        data={[
          { title: "Dashboard", navigation: "/dashboard", separator: true },
          { title: "Preferences", navigation: "/preferences", disabled: true },
        ]}
      />
      <div className="flex justify-start items-center">
        <h1 className="text-4xl">Preferences</h1>
        <Settings2 className="h-5 w-5 ml-2 text-indigo-400" />
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <h1 className=" text-2xl">Email Template</h1>
        <p className="text-slate-600">
          In this section you can modify the email template that you can send to
          your users when they generate feedback.
        </p>
        <Editor />
      </div>
    </div>
  );
};

export default PreferencesPage;
