import DashboardStats from '../components/DashboardStats'
import ProductList from '../components/ProductList'
import UserCard from '../components/UserCard'
import StatsCard from '../components/StatsCard'

function Dashboard() {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', flexWrap: 'wrap' }}>
      <StatsCard 
        title="Total Users"
        value="245"
        icon="👥"
        color="#3498db"
        subtitle="+12 this week"
        trend="↑"
      />
      
      <StatsCard 
        title="Revenue"
        value="$45,230"
        icon="💰"
        color="#2ecc71"
        subtitle="+8% from last month"
        trend="↑"
      />
      
      <StatsCard 
        title="Active Orders"
        value="89"
        icon="📦"
        color="#e74c3c"
        subtitle="15 pending"
        trend="↓"
      />
      
      <StatsCard 
        title="Products"
        value="567"
        icon="📱"
        color="#f39c12"
        subtitle="In stock"
        trend="↑"
      />
    </div>
  )
}

export default Dashboard;