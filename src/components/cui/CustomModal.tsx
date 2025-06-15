import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


interface CustomModalProps {
  trigger: React.ReactNode;
  title?: string;
  cancelText?: string;
  submitText?: string;
  children: React.ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
}

function CustomModal({
  trigger,
  title = "Filter Options",
  cancelText = "Cancel",
  submitText = "Submit",
  children,
  onCancel,
  onSubmit,
}: CustomModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel}>
              {cancelText}
            </Button>
          </DialogClose>
          <Button type="submit" onClick={onSubmit}>
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CustomModal;