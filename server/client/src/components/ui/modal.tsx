import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  showCancel?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  showCancel = false,
  onConfirm,
  confirmText = "Tamam",
  cancelText = "İptal"
}: ModalProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case "error":
        return <X className="w-6 h-6 text-red-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getHeaderColor = () => {
    switch (type) {
      case "success":
        return "text-green-700 dark:text-green-300";
      case "warning":
        return "text-yellow-700 dark:text-yellow-300";
      case "error":
        return "text-red-700 dark:text-red-300";
      default:
        return "text-blue-700 dark:text-blue-300";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center gap-3">
          {getIcon()}
          <div>
            <DialogTitle className={`text-lg font-semibold ${getHeaderColor()}`}>
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription className="text-base text-foreground mt-4">
          {message}
        </DialogDescription>
        <DialogFooter className="mt-6">
          {showCancel && (
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          <Button 
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className={
              type === "error" ? "bg-red-600 hover:bg-red-700" :
              type === "success" ? "bg-green-600 hover:bg-green-700" :
              type === "warning" ? "bg-yellow-600 hover:bg-yellow-700" :
              "bg-blue-600 hover:bg-blue-700"
            }
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Hook for easy modal usage
export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<Partial<ModalProps>>({});

  const showModal = (props: Omit<ModalProps, 'isOpen' | 'onClose'>) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const ModalComponent = () => (
    <Modal
      isOpen={isOpen}
      onClose={hideModal}
      title={modalProps.title || ""}
      message={modalProps.message || ""}
      type={modalProps.type}
      showCancel={modalProps.showCancel}
      onConfirm={modalProps.onConfirm}
      confirmText={modalProps.confirmText}
      cancelText={modalProps.cancelText}
    />
  );

  return {
    showModal,
    hideModal,
    ModalComponent
  };
}