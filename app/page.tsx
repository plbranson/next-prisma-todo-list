import { prisma } from '@/db';
import Link from 'next/link';

import TodoItem from '@/components/TodoItem';

function generateTodoList() {
  return prisma.todo.findMany();
}

async function toggleTodoList(id: string, complete: boolean) {
  'use server';

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Page() {
  const todoList = await generateTodoList();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todo List</h1>
      </header>
      <Link
        href="/new"
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      >
        New Item
      </Link>
      <ul className="pl-4">
        {todoList.map((list) => (
          <TodoItem key={list.id} {...list} toggle={toggleTodoList} />
        ))}
      </ul>
    </>
  );
}
