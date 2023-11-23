import React from "react";

const LoadingBar: React.FC = () => {
  return (
    <div className="h-4 w-[70%] bg-gray-300 rounded overflow-hidden">
      <div className="animate-pulse h-full bg-slate-500"></div>
    </div>
  );
};

const TableLoadingSkeleton: React.FC<any> = (props) => {
  const { rows = 5, cols = 5 } = props;
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {[...Array(cols)].map((value, index) => {
                return (
                  <th
                    key={`ts-thead-th-${index}`}
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-300 tracking-wider"
                  >
                    <LoadingBar />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* Repeat this block for each row in your table */}
            {[...Array(rows)].map((value, index) => {
              return (
                <tr key={`ts-tbody-tr-${index}`}>
                  {[...Array(cols)].map((value, index) => {
                    return (
                      <td
                        key={`{ts-tbody-tr-td-${index}}`}
                        className="px-5 py-5 border-b border-gray-200 bg-gray-200 text-sm"
                      >
                        <LoadingBar />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="px-5 py-5 bg-gray-300 border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <LoadingBar />
          <div className="inline-flex mt-2 xs:mt-0 gap-2">
            <span
              key={"prev"}
              className="w-8 bg-gray-400 font-semibold py-3 px-10 rounded animate-pulse"
            ></span>
            <span
              key={"next"}
              className="w-8 bg-gray-400 font-semibold py-3 px-10 rounded animate-pulse"
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableLoadingSkeleton;
