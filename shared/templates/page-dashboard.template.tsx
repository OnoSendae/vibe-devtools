import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export default function { { PAGE_NAME } } Page() {
    return (
        <div className="dashboard-layout">
            <Header />
            <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-content">
                    <h1>{{ PAGE_TITLE }}</h1>
                    {{ PAGE_CONTENT }}
                </main>
            </div>
        </div>
    );
}

