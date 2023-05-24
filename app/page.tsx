/**
 *  Copyright 2023 Patrick L. Branson
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
