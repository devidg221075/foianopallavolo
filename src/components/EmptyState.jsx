import { CalendarBlankIcon } from "@phosphor-icons/react";

export function EmptyState({ icon: Icon = CalendarBlankIcon, title, text }) {
  return (
    <div className="match-empty" role="status">
      <Icon weight="thin" />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
