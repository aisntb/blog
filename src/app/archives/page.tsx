import './archive.css'
import { categories, posts } from '../../../.velite'
import { groupPostsByMonth, parseMMDD } from '../utils'
import Link from 'next/link'
import Header from '../components/Header'

export default function Archive(){
    const getPosts = () => {
        posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        return posts
    }
    const groupedPosts = groupPostsByMonth(getPosts())
    return(
    <>
    <Header/>
    <div className="container">
        <div className="archive-header">
            <h1 className="archive-title text-[#1d1d1f] dark:text-white">Archive</h1>
            <p className="archive-description">My all posts</p>
        </div>

        <div className="filter-section">
            <div className="year-selector">
                <button className="year-btn active">2024</button>
                <button className="year-btn">2023</button>
                <button className="year-btn">2022</button>
            </div>
            <div className="category-filter">
                <button className="category-btn active">전체</button>
                {
                    categories.map((e,i)=>
                        <button className="category-btn" key={i}>{e.name}</button>
                    )
                }
            </div>
        </div>

        <div className="archive-content">
            {
                Object.entries(groupedPosts).map(([monthKey, posts]) => {
                    const [year, month] = monthKey.split("-");
                    return(
                        <div className="month-section" key={monthKey}>
                            <h2 className="month-header text-[#1d1d1f] dark:text-white">{`${month}월 ${year}`}</h2>
                            <div className="posts-list">
                                {
                                    posts.reverse().map(e=>
                                        <Link href={e.permalink} key={e.slug}>
                                        <article className="post-item bg-white dark:bg-[#020817]" data-category="React" data-date="2024-06-10">
                                            <div className="post-header">
                                                <div className="post-meta">
                                                    <div className="post-date">{parseMMDD(e.date)}</div>
                                                    <div className="post-category bg-white dark:bg-[#1c1c1c]">{e.category}</div>
                                                </div>
                                                <div className="post-content text-[#1d1d1f] dark:text-white">
                                                    <h3 className="post-title">{e.title}</h3>
                                                    <p className="post-excerpt">{e.subtitle? e.subtitle:e.excerpt+'...'}</p>
                                                    <div className="post-tags">
                                                        {
                                                            e.tags.map((e,i)=>
                                                                <span className="tag bg-[#f5f5f7] text-[#86868b] dark:bg-[#1e293b] dark:text-white" key={i}>{e}</span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>

        <div className="no-results" style={{"display": "none"}}>
            <h3 className="no-results-title">검색 결과가 없습니다</h3>
            <p>다른 연도나 카테고리를 선택해보세요.</p>
        </div>
    </div>
    </>
    )
}

