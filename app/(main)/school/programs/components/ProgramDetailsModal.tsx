"use client";

import { UseFormReturn } from "react-hook-form";

import LargeModal from "@/app/components/general/modals/LargeModal";
import ProgramWizard from "./ProgramWizard";


interface Props {
  form: UseFormReturn<any>;
  open: boolean;
  onClose: () => void;
}

export default function ProgramDetailsModal({ form,open, onClose }: Props) {
  return (
    <LargeModal open={open} onClose={onClose} title="Program Details">
      <ProgramWizard form={form} setModalOpen={onClose} />
      {/* <ProgramWizard/> */}
    </LargeModal>
  );
}