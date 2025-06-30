
import {
  Dialog,
  DialogContent,
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

function CustomModalFilter({
  trigger,
  title = "Filter Options",
  children,
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
        <div className="py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomModalFilter;