import { Toaster as Sonner } from "sonner";

export function Toaster({
  position = "top-right",
  duration = 3500,
  closeButton = true,
  ...props
}) {
  const dir =
    typeof document !== "undefined" ? document.documentElement.dir : "rtl";
  return (
    <Sonner
      dir={dir}
      position={position}
      duration={duration}
      closeButton={closeButton}
      richColors={false} // بنلوّن بنفسنا
      toastOptions={{
        classNames: {
          toast:
            "group w-full rounded-lg border shadow-md bg-background text-foreground",
          title: "font-medium",
          description: "text-sm text-muted-foreground",
          icon: "opacity-95",
          actionButton:
            "rounded-md border px-2 py-1 text-xs font-medium hover:bg-accent hover:text-accent-foreground",
          cancelButton:
            "rounded-md px-2 py-1 text-xs font-medium bg-muted hover:bg-muted/80",
          content: "gap-1.5",
        },
      }}
      {...props}
    />
  );
}
