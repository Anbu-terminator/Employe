import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { LoginForm } from "@/components/login-form";
import { GSAPWrapper } from "@/components/gsap-wrapper";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function AuthenticatedRouter() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <GSAPWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="w-16 h-16 bg-primary rounded-full animate-pulse" />
        </div>
      </GSAPWrapper>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {isAuthenticated ? (
          <AuthenticatedRouter />
        ) : (
          <GSAPWrapper>
            <LoginForm onLogin={login} />
          </GSAPWrapper>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
