type Project = {
  id: number;
  title: string;
  parentChain?: Project[];
};

interface DialogueEditProjectProps {
  onClose: (event: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
}
