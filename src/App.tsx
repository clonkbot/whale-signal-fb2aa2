import { useState, useEffect, useCallback } from 'react'

interface Trader {
  id: number
  name: string
  avatar: string
  pnl: number
  pnlPercent: number
  winRate: number
  portfolioValue: number
  isFollowing: boolean
  recentTrades: string[]
  rank: number
}

interface Alert {
  id: number
  coin: string
  coinSymbol: string
  traders: string[]
  timestamp: Date
  priceAtAlert: number
  currentPrice: number
}

interface TrendingCoin {
  symbol: string
  name: string
  traderCount: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  priceChange: number
  volume: string
}

const generateTraders = (): Trader[] => {
  const names = [
    'CryptoWhale', 'MoonHunter', 'DiamondHands', 'AlphaSeeker', 'ChainMaster',
    'TokenKing', 'DeFiWizard', 'BlockBaron', 'SatoshiPupil', 'EtherEagle',
    'BitBull', 'AltSurfer', 'YieldFarmer', 'GasOptimizer', 'MEVHunter',
    'NFTCollector', 'DAOVoter', 'LiquidityKing', 'ArbitrageBot', 'SwapMaster',
    'BridgeRunner', 'L2Explorer', 'ZKProver', 'OracleWatcher', 'FlashLoaner',
    'PoolShark', 'VaultKeeper', 'StakeHolder', 'ValidatorNode', 'ConsensusKing'
  ]
  
  const coins = ['BTC', 'ETH', 'SOL', 'AVAX', 'MATIC', 'ARB', 'OP', 'LINK', 'UNI', 'AAVE']
  
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]}${i >= names.length ? Math.floor(i / names.length) + 1 : ''}`,
    avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${i}`,
    pnl: Math.round((Math.random() * 2000000 - 200000) * 100) / 100,
    pnlPercent: Math.round((Math.random() * 400 - 50) * 100) / 100,
    winRate: Math.round((50 + Math.random() * 45) * 10) / 10,
    portfolioValue: Math.round((100000 + Math.random() * 9900000) * 100) / 100,
    isFollowing: Math.random() > 0.7,
    recentTrades: Array.from({ length: 3 }, () => coins[Math.floor(Math.random() * coins.length)]),
    rank: i + 1
  })).sort((a, b) => b.portfolioValue - a.portfolioValue)
}

const generateAlerts = (): Alert[] => {
  const coins = [
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'ARB', name: 'Arbitrum' },
    { symbol: 'PEPE', name: 'Pepe' },
    { symbol: 'WIF', name: 'dogwifhat' },
  ]
  const traderNames = ['CryptoWhale', 'MoonHunter', 'DiamondHands', 'AlphaSeeker', 'ChainMaster', 'TokenKing', 'DeFiWizard', 'BlockBaron']
  
  return coins.map((coin, i) => ({
    id: i + 1,
    coin: coin.name,
    coinSymbol: coin.symbol,
    traders: Array.from({ length: 5 + Math.floor(Math.random() * 4) }, () => 
      traderNames[Math.floor(Math.random() * traderNames.length)]
    ).filter((v, i, a) => a.indexOf(v) === i),
    timestamp: new Date(Date.now() - Math.random() * 3600000 * 24),
    priceAtAlert: Math.random() * 1000,
    currentPrice: Math.random() * 1000,
  }))
}

const generateTrendingCoins = (): TrendingCoin[] => [
  { symbol: 'SOL', name: 'Solana', traderCount: 23, sentiment: 'bullish', priceChange: 12.5, volume: '$2.3B' },
  { symbol: 'ETH', name: 'Ethereum', traderCount: 45, sentiment: 'bullish', priceChange: 4.2, volume: '$15.7B' },
  { symbol: 'ARB', name: 'Arbitrum', traderCount: 18, sentiment: 'neutral', priceChange: -1.3, volume: '$890M' },
  { symbol: 'PEPE', name: 'Pepe', traderCount: 31, sentiment: 'bullish', priceChange: 45.2, volume: '$1.2B' },
  { symbol: 'WIF', name: 'dogwifhat', traderCount: 27, sentiment: 'bullish', priceChange: 28.7, volume: '$567M' },
  { symbol: 'MATIC', name: 'Polygon', traderCount: 15, sentiment: 'bearish', priceChange: -5.4, volume: '$432M' },
]

function App() {
  const [traders, setTraders] = useState<Trader[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([])
  const [activeTab, setActiveTab] = useState<'dashboard' | 'traders' | 'alerts'>('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [newAlert, setNewAlert] = useState<Alert | null>(null)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    setTraders(generateTraders())
    setAlerts(generateAlerts())
    setTrendingCoins(generateTrendingCoins())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const coins = ['BTC', 'ETH', 'SOL', 'DOGE', 'SHIB', 'BONK', 'JUP', 'ONDO']
      const traderNames = ['CryptoWhale', 'MoonHunter', 'DiamondHands', 'AlphaSeeker', 'ChainMaster']
      const randomCoin = coins[Math.floor(Math.random() * coins.length)]
      
      if (Math.random() > 0.7) {
        const alert: Alert = {
          id: Date.now(),
          coin: randomCoin,
          coinSymbol: randomCoin,
          traders: Array.from({ length: 5 + Math.floor(Math.random() * 3) }, () => 
            traderNames[Math.floor(Math.random() * traderNames.length)]
          ).filter((v, i, a) => a.indexOf(v) === i),
          timestamp: new Date(),
          priceAtAlert: Math.random() * 100,
          currentPrice: Math.random() * 100,
        }
        setNewAlert(alert)
        setShowNotification(true)
        setAlerts(prev => [alert, ...prev.slice(0, 19)])
        setTimeout(() => setShowNotification(false), 5000)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const toggleFollow = useCallback((traderId: number) => {
    setTraders(prev => prev.map(t => 
      t.id === traderId ? { ...t, isFollowing: !t.isFollowing } : t
    ))
  }, [])

  const filteredTraders = traders.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value.toFixed(2)}`
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="mesh-gradient" />
      <div className="noise-overlay" />
      <div className="hexagon-pattern fixed inset-0 pointer-events-none z-0" />
      
      {/* Live Notification Toast */}
      {showNotification && newAlert && (
        <div className="fixed top-4 right-4 z-50 slide-in">
          <div className="glass-card convergence-alert rounded-xl p-4 max-w-sm glow-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#39ff14]/20 flex items-center justify-center">
                <span className="text-xl">🐋</span>
              </div>
              <div>
                <p className="text-[#39ff14] font-semibold mono text-sm">CONVERGENCE ALERT</p>
                <p className="text-white/90 text-sm">
                  {newAlert.traders.length} whales just bought <span className="text-[#00f5ff] font-bold">${newAlert.coinSymbol}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f5ff] to-[#ff00aa] p-[2px]">
                  <div className="w-full h-full rounded-xl bg-[#0a0a0f] flex items-center justify-center">
                    <span className="text-2xl">🐋</span>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#39ff14] rounded-full status-live" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">WhaleSignal</h1>
                <p className="text-white/40 text-xs mono">TOP 100 TRADER CONVERGENCE TRACKER</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 glass-card rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-[#39ff14] status-live" />
                <span className="text-white/60 text-sm mono">LIVE</span>
                <span className="text-[#39ff14] font-semibold mono text-sm">{traders.length}</span>
                <span className="text-white/40 text-sm">traders tracked</span>
              </div>
              
              <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-[#ff00aa]">🔔</span>
                <span className="text-white/80 text-sm font-medium">{alerts.length}</span>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-1 mt-4">
            {(['dashboard', 'traders', 'alerts'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-300 mono text-sm uppercase tracking-wider ${
                  activeTab === tab
                    ? 'bg-white/5 text-[#00f5ff] border-t border-x border-[#00f5ff]/30'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Convergence Alerts Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div className="scanner-line" />
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <span className="gradient-text">Live Convergence Alerts</span>
                  </h2>
                  <span className="mono text-xs text-white/40">5+ WHALES REQUIRED</span>
                </div>
                
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {alerts.slice(0, 8).map((alert, i) => (
                    <div
                      key={alert.id}
                      className="convergence-alert rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f5ff]/20 to-[#ff00aa]/20 flex items-center justify-center font-bold mono">
                            {alert.coinSymbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{alert.coin}</p>
                            <p className="text-xs text-white/40 mono">${alert.coinSymbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-[#39ff14] font-bold text-lg">{alert.traders.length}</span>
                            <span className="text-white/40 text-sm">whales</span>
                          </div>
                          <p className="text-xs text-white/30 mono">{formatTimeAgo(alert.timestamp)}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {alert.traders.slice(0, 5).map((trader, j) => (
                          <span
                            key={j}
                            className="px-2 py-1 rounded-full bg-white/5 text-xs text-white/70 mono"
                          >
                            @{trader}
                          </span>
                        ))}
                        {alert.traders.length > 5 && (
                          <span className="px-2 py-1 rounded-full bg-[#00f5ff]/10 text-xs text-[#00f5ff] mono">
                            +{alert.traders.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Top Performers Quick View */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-2xl">👑</span>
                  <span>Top Performers Today</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {traders.slice(0, 3).map((trader, i) => (
                    <div
                      key={trader.id}
                      className="relative p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#00f5ff]/30 transition-all duration-300"
                    >
                      <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        i === 0 ? 'bg-gradient-to-br from-[#ffd700] to-[#ff8c00] text-black' :
                        i === 1 ? 'bg-gradient-to-br from-[#c0c0c0] to-[#808080] text-black' :
                        'bg-gradient-to-br from-[#cd7f32] to-[#8b4513] text-white'
                      }`}>
                        #{i + 1}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3 mt-2">
                        <img
                          src={trader.avatar}
                          alt={trader.name}
                          className="w-10 h-10 rounded-full bg-white/10"
                        />
                        <div>
                          <p className="font-semibold text-white truncate">{trader.name}</p>
                          <p className="text-xs text-white/40 mono">{trader.winRate}% win rate</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-white/40">Portfolio</p>
                          <p className="font-bold text-[#00f5ff] mono">{formatCurrency(trader.portfolioValue)}</p>
                        </div>
                        <div className={`text-sm font-semibold mono ${trader.pnlPercent >= 0 ? 'text-[#39ff14]' : 'text-[#ff4444]'}`}>
                          {trader.pnlPercent >= 0 ? '+' : ''}{trader.pnlPercent}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Coins */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <span>Whale Activity</span>
                </h2>
                
                <div className="space-y-3">
                  {trendingCoins.map((coin) => (
                    <div
                      key={coin.symbol}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f5ff]/20 to-[#ff00aa]/20 flex items-center justify-center text-xs font-bold mono">
                          {coin.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-white group-hover:text-[#00f5ff] transition-colors">{coin.symbol}</p>
                          <p className="text-xs text-white/40">{coin.name}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-[#00f5ff] font-semibold">{coin.traderCount}</span>
                          <span className="text-white/40 text-xs">🐋</span>
                        </div>
                        <p className={`text-xs font-medium mono ${coin.priceChange >= 0 ? 'text-[#39ff14]' : 'text-[#ff4444]'}`}>
                          {coin.priceChange >= 0 ? '+' : ''}{coin.priceChange}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stats Card */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  <span>Network Stats</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Total Tracked</span>
                    <span className="font-bold mono text-[#00f5ff]">{traders.length} whales</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Following</span>
                    <span className="font-bold mono text-[#ff00aa]">{traders.filter(t => t.isFollowing).length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Alerts Today</span>
                    <span className="font-bold mono text-[#39ff14]">{alerts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Avg Win Rate</span>
                    <span className="font-bold mono text-white">
                      {(traders.reduce((a, b) => a + b.winRate, 0) / traders.length || 0).toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/40 mb-2">Convergence Threshold</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="progress-bar h-full rounded-full" style={{ width: '50%' }} />
                      </div>
                      <span className="mono text-sm text-[#00f5ff]">5+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'traders' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="glass-card rounded-xl p-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
                <input
                  type="text"
                  placeholder="Search traders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-12 text-white placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/50 transition-colors mono"
                />
              </div>
            </div>
            
            {/* Traders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTraders.slice(0, 20).map((trader) => (
                <div
                  key={trader.id}
                  className="glass-card rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={trader.avatar}
                          alt={trader.name}
                          className="w-12 h-12 rounded-full bg-white/10"
                        />
                        <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          trader.rank <= 3 ? 'trader-rank-badge' :
                          trader.rank <= 10 ? 'bg-[#00f5ff]/20 text-[#00f5ff]' :
                          'bg-white/10 text-white/60'
                        }`}>
                          {trader.rank}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-[#00f5ff] transition-colors truncate max-w-[120px]">
                          {trader.name}
                        </p>
                        <p className="text-xs text-white/40 mono">{formatCurrency(trader.portfolioValue)}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFollow(trader.id)
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        trader.isFollowing
                          ? 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/30'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {trader.isFollowing ? '✓ Following' : 'Follow'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/40">PnL</p>
                      <p className={`font-semibold mono text-sm ${trader.pnl >= 0 ? 'text-[#39ff14]' : 'text-[#ff4444]'}`}>
                        {trader.pnl >= 0 ? '+' : ''}{formatCurrency(trader.pnl)}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <p className="text-xs text-white/40">Win Rate</p>
                      <p className="font-semibold mono text-sm text-white">{trader.winRate}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-white/40 mb-2">Recent Trades</p>
                    <div className="flex gap-1">
                      {trader.recentTrades.map((coin, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded bg-white/5 text-xs mono text-white/70"
                        >
                          {coin}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTraders.length > 20 && (
              <div className="text-center py-4">
                <p className="text-white/40 text-sm">Showing 20 of {filteredTraders.length} traders</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <span className="text-2xl">📜</span>
                  <span>Alert History</span>
                </h2>
                <span className="text-white/40 text-sm mono">{alerts.length} total alerts</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-white/40 text-sm border-b border-white/10">
                      <th className="pb-4 font-medium">Asset</th>
                      <th className="pb-4 font-medium">Whales</th>
                      <th className="pb-4 font-medium">Traders</th>
                      <th className="pb-4 font-medium">Time</th>
                      <th className="pb-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map((alert) => (
                      <tr
                        key={alert.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f5ff]/20 to-[#ff00aa]/20 flex items-center justify-center text-xs font-bold mono">
                              {alert.coinSymbol.slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium text-white">{alert.coinSymbol}</p>
                              <p className="text-xs text-white/40">{alert.coin}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-[#39ff14] font-bold">{alert.traders.length}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {alert.traders.slice(0, 3).map((t, i) => (
                              <span key={i} className="text-xs text-white/60">@{t}</span>
                            ))}
                            {alert.traders.length > 3 && (
                              <span className="text-xs text-[#00f5ff]">+{alert.traders.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-white/60 mono text-sm">{formatTimeAgo(alert.timestamp)}</span>
                        </td>
                        <td className="py-4">
                          <span className="px-3 py-1 rounded-full bg-[#39ff14]/10 text-[#39ff14] text-xs font-medium">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-white/30 text-xs">
            Requested by <a href="https://twitter.com/goatedbaklava" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00f5ff] transition-colors">@goatedbaklava</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00f5ff] transition-colors">@clonkbot</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App