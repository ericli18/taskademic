"use client";

import { createColumnHelper, sortingFns } from "@tanstack/react-table";
import { deleteTodo } from "./action";
import { FaTrash } from "react-icons/fa";

import dayjs from "dayjs";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Todo = {
  id: number;
  class: string;
  assignment: string;
  dueDate: string;
  completed: boolean;
  personal: boolean;
};

const columnHelper = createColumnHelper<Todo>();

export const defaultColumns = [
  columnHelper.display({
    id: "Completed",
    cell: ({ row }) => {
      const serverId = row.original.id;

      return (
        <div className=''>
          <input type='checkbox'></input>
        </div>
      );
    },
    header: () => "Finished?",
  }),
  columnHelper.accessor("class", {
    header: () => "Class",
  }),
  columnHelper.accessor("assignment", {
    header: () => "Assignment",
  }),
  columnHelper.accessor("dueDate", {
    sortingFn: sortingFns.datetime,
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className='flex items-center'
        >
          Due Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>{dayjs(row.original.dueDate).format("MM/DD/YYYY HH:mm")}</div>
      );
    },
    size: 10,
  }),
  columnHelper.display({
    id: "More",
    cell: ({ row }) => {
      const serverId = row.original.id;
      const personal = row.original.personal;
      return (
        <button
          onClick={() => deleteTodo(serverId, personal)}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FaTrash className='h-4 w-4' />
        </button>
      );
    },
  }),
  // columnHelper.display({
  //   id: "Remove",
  //   cell: ({ row }) => {
  //     const remove = () => {
  //       setData(data.filter((todo) => todo !== row.original));
  //     };
  //     return <button onClick={remove}>Remove</button>;
  //   },
  // }),
];
