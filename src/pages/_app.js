import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
  <>
    <TooltipProvider>
      <Component {...pageProps} />
    </TooltipProvider>
  </>);
}
