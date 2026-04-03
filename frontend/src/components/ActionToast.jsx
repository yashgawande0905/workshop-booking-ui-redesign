import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ActionToast = ({ message, onClose, tone = "success" }) => {
  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      onClose?.();
    }, 2800);

    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  const tones = {
    success: {
      background: "linear-gradient(135deg, #059669, #10b981)",
      shadow: "0 18px 40px rgba(16,185,129,0.28)",
    },
    info: {
      background: "linear-gradient(135deg, #2563eb, #60a5fa)",
      shadow: "0 18px 40px rgba(59,130,246,0.28)",
    },
    danger: {
      background: "linear-gradient(135deg, #dc2626, #ef4444)",
      shadow: "0 18px 40px rgba(239,68,68,0.28)",
    },
  };

  const currentTone = tones[tone] || tones.success;

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            maxWidth: 360,
            padding: "14px 16px",
            borderRadius: 18,
            color: "#fff",
            background: currentTone.background,
            boxShadow: currentTone.shadow,
            zIndex: 80,
            fontWeight: 700,
            lineHeight: 1.55,
          }}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ActionToast;
