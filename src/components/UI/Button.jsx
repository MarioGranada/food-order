const Button = ({ children, isTextOnly, className, ...props }) => {
  const cssClasses = isTextOnly ? 'text-button' : 'button';
  const classes = `${cssClasses} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
