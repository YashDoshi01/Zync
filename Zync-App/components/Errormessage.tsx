const ErrorMessage = ({ message }: { message: string }) => {
    return (
      <p className="text-sm text-red-500 mt-1">
        {message}
      </p>
    );
  };
export default ErrorMessage;  