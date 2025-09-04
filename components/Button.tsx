type ButtonProps = {
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
};

export default function Button({ onClick, loading, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
