import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShortenUrl } from "./components/shorten-url";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex h-screen flex-col">
          <nav className="p-3">
            <ModeToggle />
          </nav>
          <main className="flex grow flex-row items-center justify-center">
            <ShortenUrl />
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
