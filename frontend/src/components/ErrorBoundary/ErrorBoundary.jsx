import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-6 text-left font-gaming">
          <div className="glass-panel border border-red-500/30 p-8 rounded-2xl max-w-xl w-full bg-[#0d071a]/95 shadow-2xl">
            <h2 className="text-sm font-black text-red-500 uppercase tracking-wider mb-2">StageCore Rendering Shield</h2>
            <p className="text-[11px] text-gray-400 leading-normal mb-4">A rendering error occurred in this dashboard view. Don't worry, we caught it.</p>
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl font-mono text-[10px] text-red-400 overflow-x-auto leading-relaxed max-h-60 overflow-y-auto">
              {this.state.error?.toString()}
              {this.state.error?.stack && (
                <pre className="mt-2 text-[9px] text-gray-500 leading-normal">
                  {this.state.error.stack}
                </pre>
              )}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-5 py-2.5 bg-gaming-purple hover:bg-gaming-purple/90 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Reload Platform
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
