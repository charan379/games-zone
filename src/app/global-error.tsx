"use client";
import Button from "@/ui/components/common/Button";
import ModalLayout from "@/ui/components/modal/ModalLayout";
import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-5 flex items-center justify-center">
      <ModalLayout label="">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <Button onClick={() => reset()} rounded={"rounded-md"}>
            Try again
          </Button>
        </div>
      </ModalLayout>
    </div>
  );
}
