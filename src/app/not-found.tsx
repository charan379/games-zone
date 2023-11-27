import Button from "@/ui/components/common/Button";
import ModalLayout from "@/ui/components/modal/ModalLayout";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-5 flex items-center justify-center">
      <ModalLayout label="">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Not Found</h2>
          <p className="text-xl font-bold mb-4">
            Could not find requested resource
          </p>
          <Link href="/" className="min-w-[120px] mt-0 text-sm bg-slate-500 text-white p-3 rounded-md">
            Return Home
          </Link>
        </div>
      </ModalLayout>
    </div>
  );
}
