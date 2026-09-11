import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: sales, error } = await supabase.from('sales').select()

  return (
    <div>
      {error && <pre>Error: {JSON.stringify(error, null, 2)}</pre>}
      {!error && (!sales || sales.length === 0) && <p>No sales found</p>}
      <ul>
        {sales?.map((sale) => (
          <li key={sale.id}>{JSON.stringify(sale)}</li>
        ))}
      </ul>
    </div>
  )
}