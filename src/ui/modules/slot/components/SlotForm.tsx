import TextInput from "@/ui/components/form/TextInput";
import TimeInput from "@/ui/components/form/TimeInput";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  slot?: Slot;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SlotForm: React.FC<Props> = (props) => {
  const { children, slot, handleFormSubmit, handleChange } = props;

  return (
    <form className="px-8 py-6 flex flex-col gap-1" onSubmit={handleFormSubmit}>
      <TextInput
        label="Name"
        name="slotName"
        onChange={handleChange}
        rounded="rounded-md"
        required={true}
        type="Normal"
        placeholder="Slot Name"
        value={slot?.slotName}
        key={1}
      />
      <TimeInput
        label="Start Time"
        name="startTime"
        onChange={handleChange}
        rounded="rounded-md"
        required={true}
        key={3}
        value={slot?.startTime ?? ""}
      />
      <TimeInput
        label="End Time"
        name="endTime"
        onChange={handleChange}
        rounded="rounded-md"
        required={true}
        key={4}
        value={slot?.endTime ?? ""}
      />
      <TextInput
        label="Location"
        name="location"
        onChange={handleChange}
        rounded="rounded-md"
        required={true}
        type="Normal"
        placeholder="Slot Location"
        value={slot?.location}
        key={2}
      />
      {children}
    </form>
  );
};

export default SlotForm;
