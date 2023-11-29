export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-full p-6 bg-white rounded shadow-md">
        <div className="animate-pulse space-y-4">
          {[...Array(10)].map((v, index) => {
            return <div className="h-8 bg-gray-300 rounded" key={index}></div>;
          })}
        </div>
      </div>
    </div>
  );
}
