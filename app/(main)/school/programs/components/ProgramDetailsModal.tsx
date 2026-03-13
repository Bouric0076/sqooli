"use client";

import ProgramWizard from "./ProgramWizard";
import LargeModal from "@/app/components/general/modals/LargeModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProgramDetailsModal({ open, onClose }: Props) {
  return (
    <LargeModal open={open} onClose={onClose} title="Program Details">
      <ProgramWizard />
    </LargeModal>
  );
}