"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { shorten } from "@/data/shorten";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const FormSchema = z.object({
  url: z.string().url("This is not a valid url."),
});

export function ShortenUrlForm({
  setCode,
}: {
  setCode: (code: string | undefined) => void;
}) {
  const { mutate, data, isPending } = useMutation({
    mutationFn: shorten,
    onSuccess: () => form.reset(),
  });

  useEffect(() => {
    setCode(data?.code);
  }, [data, setCode]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(formInput: z.infer<typeof FormSchema>) {
    mutate(formInput);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://google.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the URL you wish to shorten
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}
