"use client";
import { create_project } from "@/actions/create-project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MAX_FREE_PROJECTS } from "@/lib/payments";
import { project_schema, project_schema_type } from "@/schemas/project/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";


export default function CreateProductForm({
  subscribed, numberOfProjects,
}: {
  subscribed?: boolean | null;
  numberOfProjects: number
}) {
  const router = useRouter();
  const [dialogState, setDialogState] = React.useState<boolean>(false);
  const { toast } = useToast();
  const { mutate: create, isPending } = useMutation({
    mutationFn: create_project,
  });

  const methods = useForm<project_schema_type>({
    resolver: zodResolver(project_schema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
    },
  });

  const onSubmit = methods.handleSubmit(async (values) => {
    await create(values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Project was created successfully",
        });

        router.refresh();
        onCloseDialog();
      },
    });
  });

  const onOpenDialog = () => setDialogState(true);

  const onCloseDialog = () => {
    setDialogState((prev) => !prev);
  };

  return (
    <div>
      <Button disabled={!subscribed && numberOfProjects >= MAX_FREE_PROJECTS} onClick={onOpenDialog}>
        Create new project <Plus className="h-5 w-5 ml-2" />
      </Button>
      <Dialog open={dialogState} onOpenChange={onCloseDialog}>
        <DialogContent className="sm:max-w-[425px] rounded-md">
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started.
          </DialogDescription>
          <Form {...methods}>
            <form
              id="create_project"
              onSubmit={onSubmit}
              className="flex flex-col gap-2"
            >
              <FormField
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name Project</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Project Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="www.example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button
              disabled={methods.formState.isSubmitting || isPending}
              form="create_project"
              type="submit"
            >
              {isPending ? "Submitting..." : "Submit"}{" "}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
