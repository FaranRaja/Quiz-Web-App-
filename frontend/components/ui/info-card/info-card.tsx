// frontend/components/ui/info-card/info-card.tsx
import { motion } from "framer-motion";
import { PenSquare } from "lucide-react"; // Consider using Bootstrap Icons instead

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onEdit?: () => void;
}

export function InfoCard({
  title,
  children,
  className,
  onEdit,
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ marginBottom: "1rem", ...(className && { className }) }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem 1.25rem",
          borderBottom: "1px solid #dee2e6",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h5 style={{ marginBottom: 0 }}>{title}</h5>
        {onEdit && (
          <button
            onClick={onEdit}
            style={{
              fontSize: "0.875rem",
              border: "1px solid #007bff",
              color: "#007bff",
              backgroundColor: "transparent",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.2rem",
            }}
          >
            <PenSquare size={20} />
          </button>
        )}
      </div>
      <div style={{ padding: "1.25rem" }}>{children}</div>
    </motion.div>
  );
}
