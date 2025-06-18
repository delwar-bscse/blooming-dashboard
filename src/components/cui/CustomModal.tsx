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
  submitText?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
}

function CustomModal({
  trigger,
  title = "Filter Options",
  submitText = "Submit",
  children,
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
            <Button type="submit" onClick={onSubmit} className="bd-gray-700">
              {submitText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CustomModal;