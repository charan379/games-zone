import SelectInput from "@/ui/components/form/SelectInput";
import TextInput from "@/ui/components/form/TextInput";
import React from "react";

interface Props {
  gameQuery: GameQuery;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const GameSearchFrom: React.FC<Props> = (props) => {
  const { changeHandler, gameQuery } = props;

  return (
    <form className="my-2 flex sm:flex-row flex-col">
      <TextInput
        type="Search"
        name="query"
        onChange={changeHandler}
        rounded="rounded md:rounded-l md:rounded-r-none"
        placeholder="Game Name"
        value={gameQuery.query}
      />
      <SelectInput
        name="sort"
        onChange={changeHandler}
        options={sortOptions}
        rounded="rounded md:rounded-r md:rounded-l-none"
        value={gameQuery.sort}
      />
    </form>
  );
};

export default GameSearchFrom;

const sortOptions: { lable: string; value: any }[] = [
  {
    lable: "Name - ASC",
    value: "gameName.asc",
  },
  {
    lable: "Name - DESC",
    value: "gameName.desc",
  },
];
