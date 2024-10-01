"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  formId: string;
};

const FeedbackForm: React.FC<Props> = ({ formId }) => {
  const methods = useForm();

  const onSubmit = methods.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} id={formId}>
        <FormField
          control={methods.control}
          name="feedback_message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Message" {...field} />
              </FormControl>
              <FormDescription>
                When the user generates feedback when saving the information, it
                returns a message that you can modify.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FeedbackForm;
