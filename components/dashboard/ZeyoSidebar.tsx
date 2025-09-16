import { motion } from "motion/react"
import { ChevronRight, BarChart3, FileText, Search } from "lucide-react"

const ZeyoSidebar = ({
  onGenerateProof,
  onVerifyCredentials,
  onDashboard,
  currentView,
}: {
  onGenerateProof: () => void
  onVerifyCredentials: () => void
  onDashboard: () => void
  currentView: string
}) => {
  const menuItems = [
    { title: "Dashboard", icon: BarChart3, active: currentView === "dashboard", onClick: onDashboard },
    { title: "Generate Proof", icon: FileText, active: currentView === "generate-proof", onClick: onGenerateProof },
    {
      title: "Verify Badge ",
      icon: Search,
      active: currentView === "verify-credentials",
      onClick: onVerifyCredentials,
    },
  ]

  return (
    <div className="fixed left-0 top-0 w-72 h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-20">
      <nav className="flex-1 px-6 py-8">
        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                item.active
                  ? "bg-white/10 backdrop-blur-sm text-white border border-[#f96e34]/30 shadow-lg shadow-[#f96e34]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              onClick={item.onClick}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${item.active ? "text-[#f96e34]" : ""}`} />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              {item.active && <ChevronRight className="w-4 h-4 text-[#f96e34]" />}
            </motion.div>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default ZeyoSidebar
