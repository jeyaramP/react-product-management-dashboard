 import { toast } from "react-toastify";

// Success (Add / Create)
export const successToast = (msg) => {
  toast.success(msg, {
    className:
      "bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg px-4 py-3 border-l-4 border-green-700",
    bodyClassName: "text-sm",
    progressClassName: "bg-green-300",
  });
};

// Info (Update / Edit)
export const infoToast = (msg) => {
  toast.info(msg, {
    className:
      "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg px-4 py-3 border-l-4 border-blue-700",
    bodyClassName: "text-sm",
    progressClassName: "bg-blue-300",
  });
};

// Delete
export const deleteToast = (msg) => {
  toast.warn(msg, {
    className:
      "bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-lg shadow-lg px-4 py-3 border-l-4 border-red-700",
    bodyClassName: "text-sm",
    progressClassName: "bg-red-300",
    icon: "🗑️",
  });
};

// Error
export const errorToast = (msg) => {
  toast.error(msg, {
    className:
      "bg-gradient-to-r from-rose-600 to-red-700 text-white font-semibold rounded-lg shadow-lg px-4 py-3 border-l-4 border-red-900",
    bodyClassName: "text-sm",
    progressClassName: "bg-red-400",
    icon: "❌",
  });
};
