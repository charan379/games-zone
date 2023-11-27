import ModalLayout from "@/ui/components/modal/ModalLayout";
import Button from "@/ui/components/common/Button";
import React from "react";
import Spinner from "./Spinner";
interface Props {
  messages: string;
  isLoading?: boolean;
  loadingText?: string;
  close: () => void;
}

const InfoCard: React.FC<Props> = (props) => {
  const { close, messages, isLoading, loadingText } = props;

  return (
    <ModalLayout label="">
      <form className="px-8 py-6 text-center">
        <div className="mt-4 text-sm"></div>
        <div className="flex flex-col gap-3 mt-4 justify-between items-center">
          {true && <Spinner height="h-20" width="w-20" />}
          <div className="p-2 mt-2">
            {isLoading ? loadingText ?? "Loading...." : messages}
          </div>
          <Button
            rounded="rounded-md"
            danger
            key={`ad-2`}
            type="button"
            onClick={close}
            disabled={isLoading}
          >
            Close
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default InfoCard;
