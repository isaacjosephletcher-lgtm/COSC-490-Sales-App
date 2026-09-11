import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos, error } = await supabase.from('todos').select()

  return (
    <div>
      {error && <pre>Error: {JSON.stringify(error, null, 2)}</pre>}
      {!error && (!todos || todos.length === 0) && <p>No todos found (query succeeded, but returned 0 rows)</p>}
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  )
}

//test