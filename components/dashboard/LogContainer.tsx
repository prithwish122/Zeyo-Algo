import { motion } from "motion/react"

const LogContainer = ({
  logs,
  title,
}: {
  logs: Array<{ type: "info" | "success" | "error"; message: string; timestamp: string }>
  title: string
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-medium text-white">{title}</h4>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-400">Live</span>
        </div>
      </div>
      <div className="flex-1 bg-black/20 rounded-lg p-6 border border-white/5">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-400 text-lg">Logs will appear here...</p>
          ) : (
            logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start space-x-3 p-3 rounded text-base ${
                  log.type === "success" ? "text-green-400" : log.type === "error" ? "text-red-400" : "text-blue-400"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    log.type === "success" ? "bg-green-400" : log.type === "error" ? "bg-red-400" : "bg-blue-400"
                  }`}
                />
                <div className="flex-1">
                  <p>{log.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default LogContainer
