'use client';

import SelectInput from '@/ui/components/form/SelectInput';
import React, { useEffect, useState } from 'react'
import fetchBookingEnabledDates from '../requests/fetchBookingEnabledDates';

interface Props {
    name: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    rounded: string,
    value: string,
    label: string,
    authToken?: string,
}

const EnabledDates: React.FC<Props> = (props) => {

    const { label, name, onChange, rounded, value, authToken } = props;

    const [dates, setDates] = useState<Option[]>([]);

    const [messages, setMessages] = useState("");

    useEffect(() => {
        setMessages("");
        fetchBookingEnabledDates(authToken)
            .then((res) => {
                if (res?.ok && res?.result) {
                    setDates(res.result)
                } else {
                    setDates([]);
                    setMessages(res?.error?.errorMessage ?? "Somthing went wrong !")
                }
            })
            .catch((err) => {
                setDates([]);
                setMessages("Somthing went wrong !")
            });

        return () => { };

    }, [authToken])

    return (
        <div className='flex  min-w-[210px] flex-col gap-2'>
            <div className='flex flex-col gap-2 font-semibold'>
                <div className="mt-2 text-sm ">For Date :</div>
                <SelectInput options={dates} name={name} onChange={onChange} rounded={rounded} value={value} label={label} />
            </div>
            <div className="mt-2 text-sm">{messages}</div>
        </div>
    )
}

export default EnabledDates