import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ToastProvider } from "./components/ui/toast";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </ToastProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;
