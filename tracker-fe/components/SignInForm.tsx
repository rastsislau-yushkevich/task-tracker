'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react";

const signInSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
  password: z.string().nonempty('Password is required')
})

const SignInForm = () => {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    await signIn('credentials', { ...values, callbackUrl: '/' });
  }

  return (
    <div className="max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Form>
    </div>
  )
}

export default SignInForm