import "./Button.css"; // Подключите CSS файл для стилей

export default function Button({
  text,
  color,
  disabled,
  icon,
  onClick,
  type = "button",
  children,
}) {
  return (
    <div onClick={onClick}>
      <button
        className={`custom-button ${disabled ? "disabled" : ""}`}
        type={type}
        style={{ backgroundColor: `${color}` }}
        disabled={disabled}
      >
        {icon && <img src={''} width={0} />}
        {text}
        {children}
      </button>
    </div>
  );
}
