"use client";

import { useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

import { ArrowUpDown } from "lucide-react";

function App() {
  // TODO: Make class a union type of user defined strings
  type Todo = {
    class: string;
    assignment: string;
    dueDate: string;
    completed: boolean;
  };

  const [data, setData] = useState<Array<Todo>>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<Todo>();

  const defaultColumns = [
    columnHelper.accessor("class", {
      header: () => "Class",
    }),
    columnHelper.accessor("assignment", {
      header: () => "Assignment",
    }),
    columnHelper.accessor("dueDate", {
      sortingFn: 'datetime',
      header: ({ column }) => {
        return (
          <button
            onClick={() => {
              console.log(column.getIsSorted());
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            Due Date
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </button>
        );
      },
    }),
    columnHelper.display({
      id: "Completed",
      cell: (props) => {
        return <input type='checkbox'></input>;
      },
      header: () => "Hello",
    }),
    columnHelper.display({
      id: "Remove",
      cell: ({ row }) => {
        const remove = () => {
          setData(data.filter((todo) => todo !== row.original));
        };
        return <button onClick={remove}>Remove</button>;
      },
    }),
  ];

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      class: { value: string };
      assignment: { value: string };
      dueDate: { value: string };
    };
    const todo: Todo = {
      class: target.class.value,
      assignment: target.assignment.value,
      dueDate: target.dueDate.value,
      completed: false,
    };
    setData([...data, todo]);
  };

  const table = useReactTable({
    columns: defaultColumns,
    data: data,
    getCoreRowModel: getCoreRowModel<Todo>(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel<Todo>(),
    state: {
      sorting: sorting,
    },
  });

  // console.log(table.getAllColumns())

  return (
    <main className='min-h-full min-w-full grid place-items-center'>
      <h1>To do list</h1>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <form onSubmit={onSubmit}>
        <input name='class' placeholder='Class' />
        <input name='assignment' placeholder='Assignment' />
        <input type='date' name='dueDate' placeholder='Due Date' />
        <button type='submit'>Add todo</button>
      </form>
    </main>
  );
}

export default App;