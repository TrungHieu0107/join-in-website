import * as React from 'react'
import { Task } from 'src/models'

import TableStickyHeader from 'src/views/tables/MyTableStickyHeader'

import { Column } from 'src/views/tables/MyTableStickyHeader'

const col: Column[] = [
  {
    id: 'Name',
    label: 'Name',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'StartDateDeadline',
    label: 'StartDateDeadline',
    minWidth: 100,
    align: 'right',
    format: (value: any) => new Date(value).toDateString()
  },
  {
    id: 'EndDateDeadline',
    label: 'EndDateDeadline',
    minWidth: 170,
    align: 'right',
    format: (value: any) => new Date(value).toDateString()
  },
  {
    id: 'Description',
    label: 'Description',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'Status',
    label: 'Status',
    minWidth: 170,
    align: 'right'
  }
]

function createData(): Task {
  const task = {
    Name: 'Task',
    StartDateDeadline: new Date('2023-02-01'),
    EndDateDeadline: new Date('2023-02-01'),
    Description: 'Description',
    Status: 'WORKING'
  } as Task
  return task
}

const r = [
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData()
]

export default function ToDoPage() {
  return <TableStickyHeader columns={col} rows={r}></TableStickyHeader>
}
