import router from "@routes/router";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";
import { Toaster } from "@components/ui/sonner";
import { I18nextProvider } from "react-i18next";
import i18n from "@utils/i18n";
import "@utils/i18n";

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
