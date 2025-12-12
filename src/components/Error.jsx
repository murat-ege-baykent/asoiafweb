const Error = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative my-4 text-center" role="alert">
      <strong className="font-bold block mb-1">Oh no!</strong>
      <span className="block sm:inline">{message || "Something went wrong while fetching data."}</span>
    </div>
  );
};

export default Error;