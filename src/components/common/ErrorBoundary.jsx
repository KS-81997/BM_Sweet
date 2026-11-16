import { Component } from "react";

// Shows the error on screen (instead of a blank white page) and lets the visitor reset saved browser data.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info?.componentStack);
  }

  reset = () => {
    try {
      ["bjh-cart-v1", "bjh-lang", "bjh-theme"].forEach((k) => localStorage.removeItem(k));
    } catch { /* ignore */ }
    window.location.href = "/";
  };

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ maxWidth: 560, margin: "10vh auto", padding: 24, fontFamily: "system-ui, sans-serif", color: "#3d2312" }}>
        <h1 style={{ fontSize: 24, marginBottom: 8 }}>Something went wrong</h1>
        <p style={{ marginBottom: 16 }}>The page could not be displayed. You can reload, or reset saved data (cart, language, theme) and start fresh.</p>
        <pre style={{ whiteSpace: "pre-wrap", background: "#fdf6e7", border: "1px solid #e3b23c", borderRadius: 8, padding: 12, fontSize: 12, marginBottom: 16 }}>
          {String(this.state.error?.stack || this.state.error).slice(0, 800)}
        </pre>
        <button onClick={() => window.location.reload()} style={{ padding: "10px 18px", marginRight: 8, borderRadius: 999, border: "1px solid #3d2312", background: "transparent", cursor: "pointer" }}>Reload</button>
        <button onClick={this.reset} style={{ padding: "10px 18px", borderRadius: 999, border: 0, background: "#e8920c", color: "#fff", cursor: "pointer" }}>Reset saved data</button>
      </div>
    );
  }
}
