import DashboardView from './Dashboard/View'
import { Provider } from './Dashboard/DashboardContext'
import Header from './Dashboard/Header'

export default function Home() {
  return (
    <Provider>
      <Header />
      <DashboardView />
    </Provider>
  )
}
