import ToDoTableCollapsible from 'src/views/tables/TableCollapsibleCutom'
import withAuth from '../withAuth'

const ToDoPage = () => {
  return <ToDoTableCollapsible></ToDoTableCollapsible>
}

export default withAuth(ToDoPage)