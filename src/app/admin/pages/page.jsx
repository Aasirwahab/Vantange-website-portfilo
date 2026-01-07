import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PagesManager() {
    // Count content sections for each page
    const homeCount = await prisma.pageContent.count({ where: { page: 'home' } });
    const studioCount = await prisma.pageContent.count({ where: { page: 'studio' } });

    const pages = [
        { name: 'Home Page', slug: 'home', sectionsCount: homeCount, icon: '🏠' },
        { name: 'Studio Page', slug: 'studio', sectionsCount: studioCount, icon: '🏢' }
    ];

    return (
        <>
            <div className="admin-page-header">
                <h1>Page Content Manager</h1>
                <p>Edit your website pages and sections</p>
            </div>

            <div className="admin-card">
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {pages.map((page) => (
                        <Link
                            key={page.slug}
                            href={`/admin/pages/${page.slug}`}
                            className="admin-list-item"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1.5rem',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'all 0.2s',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '2rem' }}>{page.icon}</span>
                                <div>
                                    <h3 style={{ margin: 0, marginBottom: '0.25rem' }}>{page.name}</h3>
                                    <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.7 }}>
                                        {page.sectionsCount} sections configured
                                    </p>
                                </div>
                            </div>
                            <button className="admin-btn admin-btn-primary">Edit Page</button>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="admin-card" style={{ marginTop: '2rem', background: '#1a1a1a', padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>💡 How to Use</h3>
                <ul style={{ lineHeight: '1.8', opacity: 0.9 }}>
                    <li>Click on any page to edit its content sections</li>
                    <li>Changes are saved to the database and appear instantly on your live site</li>
                    <li>Upload images directly through the editors</li>
                    <li>Each section can be edited independently</li>
                </ul>
            </div>
        </>
    );
}
