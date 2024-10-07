import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }) {
  return (
  <>
    <TooltipProvider>
      <Component {...pageProps} />
      <Toaster />
    </TooltipProvider>
  </>);
}
