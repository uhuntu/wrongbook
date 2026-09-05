import './style.css';
export const metadata = { title: '错题本', description: '错题管理系统 MVP' };
export default function RootLayout({ children }) {
  return <html lang="zh-CN"><body><main className="shell">{children}</main></body></html>;
}
