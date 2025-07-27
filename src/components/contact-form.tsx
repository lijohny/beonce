"use client";

import { useEffect, useState, useTransition } from "react";
import emailjs from "emailjs-com";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAiPending, setIsAiPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // ✅ Initialize EmailJS client-side
  useEffect(() => {
    emailjs.init("MaoxCuXNwidoKbWxe"); // Your Public Key
  }, []);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const templateParams = {
          full_name: values.name,
          email: values.email,
          phone: values.phone || "N/A",
          subject: values.subject,
          message: values.message,
        };

        await emailjs.send(
          "service_dfqk98v",     // ✅ Your Service ID
          "template_s8ceint",    // ✅ Your Template ID
          templateParams
        );

        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We will get back to you shortly.",
        });
        form.reset();
      } catch (error) {
        console.error("EmailJS error:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request. Please try again.",
        });
      }
    });
  };

  const handleAiPrefill = () => {
    setIsAiPending(true);
    setTimeout(() => {
      const currentName = form.getValues("name");
      const userName = currentName ? `, ${currentName}` : "";
      form.setValue("subject", "Inquiry about BeOnce Home Packages");
      form.setValue(
        "message",
        `Hello BeOnce team,\n\nI'm interested in learning more about your contemporary home construction services. Specifically, I'd like more details on the 22 Lakhs package and the custom home options.\n\nCould you please provide more information on pricing, features, and the financing process?\n\nLooking forward to hearing from you.\n\nBest regards${userName}`
      );
      setIsAiPending(false);
      toast({
        title: "AI Suggestion Added!",
        description: "We've created a sample message for you. Feel free to edit it.",
      });
    }, 1500);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Send us a Message</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 123 456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Inquiry about 22 Lakhs Package"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us how we can help..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row-reverse gap-4">
              <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                {isPending ? "Sending..." : "Send Message"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleAiPrefill}
                disabled={isAiPending}
                className="w-full sm:w-auto"
              >
                <Sparkles
                  className={`mr-2 h-4 w-4 ${isAiPending ? "animate-spin" : ""}`}
                />
                {isAiPending ? "Generating..." : "Generate with AI"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
