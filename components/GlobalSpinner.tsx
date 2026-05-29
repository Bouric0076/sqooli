"use client";

import { useSpinnerStore } from "@/app/store/useSpinnerStore";
import Loader from "./ui/Loader";

export default function GlobalSpinner() {
  const { loading } = useSpinnerStore();

  if (!loading) return null;

  return <Loader />
}