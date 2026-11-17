export function SectionHeading({ children, aside, id }) {
  return (
    <div className="section-heading" id={id}>
      <h2>
        <span className="title-slash" />
        {children}
      </h2>
      {aside}
    </div>
  );
}
