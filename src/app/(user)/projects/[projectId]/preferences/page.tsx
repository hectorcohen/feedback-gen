import Breadcrumbs from "@/components/breadcrumbs";
import FeedbackForm from "@/components/feedback-form";
import ThemeForm from "@/components/theme-form";
import TitleComponent from "@/components/title-component";
import { Button } from "@/components/ui/button";
import { MessageCircleMore, Settings2, SwatchBook } from "lucide-react";
import dynamic from "next/dynamic";

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
      <TitleComponent
        title="Preferences"
        description="On this page you can change some attributes of your form"
        icon={
          <Settings2 className="w-5 h-5 text-indigo-400" />
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
        <div className="flex flex-col gap-3 ">
          <FeedbackForm formId="feedback-form" />
          <div className="flex justify-end items-center md:w-full md:flex-start">
            <Button className="md:w-full" form="feedback-form">
              Save <MessageCircleMore className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 h-full">
          <ThemeForm formId="theme-form" />
          <div className="flex justify-end items-center md:w-full md:flex-start">
            <Button className="md:w-full" form="theme-form">
              Save <SwatchBook className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
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
