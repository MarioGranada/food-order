const Error = ({ title, message }) => {
  console.log('in here oe message', { title, message });
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
