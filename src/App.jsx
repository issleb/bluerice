import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import StripViewer from './components/StripViewer';
import Archive from './components/Archive';
import TagList from './components/TagList';
import TagDetail from './components/TagDetail';
import About from './components/About';
import { getLast } from './utils/strips';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to={`/strip/${getLast()}`} replace />} />
          <Route path="/strip/:number" element={<StripViewer />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/new" element={<Archive />} />
          <Route path="/tags" element={<TagList />} />
          <Route path="/tag/:name" element={<TagDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>&copy; Shachar Meron. All rights reserved.</p>
      </footer>
    </div>
  );
}
