// src/shared/utils/notify.jsx
import { toast } from "sonner";
import {
  Info,
  XCircle,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const ICONS = {
  success: <CheckCircle2 className="size-5" />,
  error: <XCircle className="size-5" />,
  info: <Info className="size-5" />,
  warning: <AlertTriangle className="size-5" />,
  loading: <Loader2 className="size-5 animate-spin" />,
};

// نسختين: solid و soft (اختيار بالـ opts.mode)
const VARIANTS = {
  solid: {
    success: "!bg-emerald-600 !border-emerald-700 !text-white",
    error: "!bg-rose-600 !border-rose-700 !text-white",
    info: "!bg-sky-600 !border-sky-700 !text-white",
    warning: "!bg-amber-500 !border-amber-600 !text-amber-950",
    loading: "!bg-zinc-600 !border-zinc-700 !text-white",
  },
  soft: {
    success: "!bg-emerald-600/90 !border-emerald-700/50 !text-white",
    error: "!bg-rose-600/90 !border-rose-700/50 !text-white",
    info: "!bg-sky-600/90 !border-sky-700/50 !text-white",
    warning: "!bg-amber-500/90 !border-amber-600/50 !text-amber-950",
    loading: "!bg-zinc-600/90 !border-zinc-700/50 !text-white",
  },
};

function show(kind, title, description, opts = {}) {
  const mode = opts.mode === "soft" ? "soft" : "solid";
  const classes = VARIANTS[mode][kind] || "";
  return toast(title, {
    description,
    icon: ICONS[kind],
    className: ["!border", classes, opts.className].filter(Boolean).join(" "),
    ...opts,
  });
}

export const notify = {
  success: (t = "تم بنجاح", d, o) => show("success", t, d, o),
  error: (t = "حدث خطأ", d, o) => show("error", t, d, o),
  info: (t = "معلومة", d, o) => show("info", t, d, o),
  warning: (t = "تنبيه", d, o) => show("warning", t, d, o),
  loading: (t = "جاري المعالجة...", d, o) => show("loading", t, d, o),
  promise: (
    p,
    {
      loading = "جاري التنفيذ...",
      success = "تم بنجاح",
      error = "فشل التنفيذ",
    } = {},
    o,
  ) => toast.promise(p, { loading, success, error, className: o?.className }),
};

/*

  Examples: 

<main className="space-y-4 p-6">
        <button
          className="bg-primary text-primary-foreground rounded-md px-4 py-2"
          onClick={() => notify.success("تم الحفظ", "اتسجل كل حاجة")}
        >
          Success
        </button>

        <button
          className="rounded-md border px-4 py-2"
          onClick={() => notify.error("فشل", "حاول تاني")}
        >
          Error
        </button>

        <button
          className="rounded-md border px-4 py-2"
          onClick={() => notify.info("معلومة", "تم تحديث المعرض")}
        >
          Info
        </button>
        <button
          className="rounded-md border px-4 py-2"
          onClick={() => notify.warning("تنبيه", "الرابط هينتهي بعد 10 دقايق")}
        >
          warning
        </button>

        <button
          className="rounded-md border px-4 py-2"
          onClick={() => {
            const p = new Promise((res) => setTimeout(res, 1500));
            notify.promise(p, {
              loading: "بيرفع...",
              success: "اترفع ✅",
              error: "فشل ❌",
            });
          }}
        >
          Promise
        </button>
      </main>




*/
