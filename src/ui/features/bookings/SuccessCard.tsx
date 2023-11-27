import ModalLayout from '@/ui/components/Modal/ModalLayout'
import Button from '@/ui/components/common/Button'
import React from 'react'
interface Props {
    messages: string,
    close: () => void;
}

const SuccessCard: React.FC<Props> = (props) => {
    const { close, messages } = props;

    return (
        <ModalLayout label="Add New Game">
            <form className="px-8 py-6">
                <div className="mt-4 text-sm"></div>
                {messages}
                <div className="flex mt-4 justify-between items-baseline">
                    {/* prettier-ignore */}
                    <Button rounded="rounded-md" danger key={`ad-2`} type="button" onClick={close}>
                        Close
                    </Button>
                </div>

            </form>
        </ModalLayout>
    )
}

export default SuccessCard