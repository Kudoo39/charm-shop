export default function CategoryTab({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2 rounded-full text-sm font-medium transition
        ${
          active
            ? "bg-rose text-white shadow"
            : "bg-rose/10 text-rose hover:bg-rose/20"
        }
      `}
    >
      {children}
    </button>
  );
}
