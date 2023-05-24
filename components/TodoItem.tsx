'use client';

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggle: (id: string, complete: boolean) => void;
};

export default function TodoItem({ id, title, complete, toggle }: TodoItemProps) {
  return (
    <li className="flex gap-1 items-center">
      <input
        id={id}
        type="checkbox"
        className="curser-pointer peer"
        defaultChecked={complete}
        onChange={(event) => toggle(id, event.target.checked)}
      />
      <label htmlFor={id} className="curser-pointer peer-checked:line-through peer-checked:text-slate-500">
        {title}
      </label>
    </li>
  );
}
