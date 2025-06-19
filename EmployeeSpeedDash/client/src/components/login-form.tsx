import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSplitText, useMagneticButton } from "@/hooks/use-gsap";
import { CheckCircle, Lock, User } from "lucide-react";

const loginSchema = z.object({
  id: z.string().min(1, "ID is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const buttonRef = useMagneticButton();
  const titleRef = useSplitText("CRYS TECH");
  const subtitleRef = useSplitText("Employee Management System");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    
    // Check credentials
    if (data.id === "CTTECH_SOLUTION" && data.password === "2025OCT16_2005") {
      // Store login state
      localStorage.setItem("crysTechLoggedIn", "true");
      toast({
        title: "Login Successful!",
        description: "Welcome to CRYS TECH Dashboard",
      });
      onLogin();
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full animate-float" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-primary/10 rounded-full animate-float" style={{ animationDelay: "-1s" }} />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-primary/10 rounded-full animate-float" style={{ animationDelay: "-2s" }} />
      </div>

      <Card className="w-full max-w-md glass-morphism border-white/20 bg-white/5 relative z-10">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto animate-glow">
            <CheckCircle className="w-12 h-12 text-slate-900" />
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <CardTitle ref={titleRef} className="text-3xl font-bold text-white split-text" />
            <p ref={subtitleRef} className="text-primary text-sm font-medium split-text" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      User ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your ID"
                        className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-gray-300 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="bg-white/10 border-white/20 focus:ring-primary focus:border-transparent backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-slate-900 font-semibold py-3 magnetic-button hover:scale-105 focus:ring-4 focus:ring-primary/50"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}