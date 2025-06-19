"use client"
import { posts, categories } from '../../.velite'
import Article from './components/Article';
import { useState, useEffect } from 'react';
import { parseDate } from './utils';
import Header from './components/Header';

export default function Home() {
  const sortedPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recentPosts = sortedPosts.slice(0, 11);
  const [filter, setFilter] = useState('전체');
  const [visiblePosts, setVisiblePosts] = useState(sortedPosts.slice(1, 11));

  const updateVisibleCards = (filter: string) => {
    if (filter === "전체") {
      setVisiblePosts(sortedPosts.slice(1, 11));
    } else {
      const filtered = posts
        .filter((e) => e.category === filter)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 11);
      setVisiblePosts(filtered);
    }
  };

  useEffect(() => {
    updateVisibleCards(filter);
  }, [filter]);

  const [searchQ, setSearchQ] = useState('')
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      location.href = "/search?q=" + encodeURIComponent(searchQ)
    }
  }
  
  return (
    <div>
    <Header/>
    <div className="container">
        <div className="header-content">
            <h1 className="title">Error DB</h1>
        </div>
        <div className="search-section">
            <input type="text" className="search-bar bg-white dark:bg-black" placeholder="검색어를 입력하세요" onKeyDown={handleSearch} value={searchQ} onChange={(e)=>setSearchQ(e.target.value)}/>
        </div>

        <div className="filter-section">
            <div className="filter-tabs">
                <button className={`filter-tab ${filter=='전체'&&'active'} text-[#424245] dark:text-white`} onClick={()=>setFilter('전체')}>전체</button>
                {
                  categories.map(e=>
                    <button key={e.name} className={`filter-tab ${filter==e.name&&'active'}`} onClick={()=>setFilter(e.name)}>{e.name}</button>
                  )
                }
            </div>
        </div>

        <div className="blog-grid">
          {
            filter=="전체"&&recentPosts[0]?
              <article className="blog-card featured-post bg-white dark:bg-[#020817]" onClick={()=>location.href=recentPosts[0].permalink}>
                <div className="featured-image">{recentPosts[0].cover?<img src={recentPosts[0].cover.src}/>:null}</div>
                <div className="featured-content">
                    <div className="featured-badge">Featured</div>
                    <h2 className="featured-title text-[#1d1d1f] dark:text-white">{recentPosts[0].title}</h2>
                    <p className="featured-excerpt text-[#86868b] dark:text-[#94a3b8]">{recentPosts[0].subtitle? recentPosts[0].subtitle: recentPosts[0].excerpt + '...'}</p>
                    <div className="featured-meta">{parseDate(recentPosts[0].date)} · {recentPosts[0].category}</div>
                </div>
            </article>
            :null
          }

            {
              visiblePosts.map(e=>
                <Article key={e.slug} post={e}/>
              )
            }

        </div>

        <div className="load-more-section">
            <button className="load-more-btn" onClick={()=>location.href='/archives'}>더 많은 글 보기</button>
        </div>

        <div className="no-results" style={{display: "none"}}>
            <h3 className="no-results-title">검색 결과가 없습니다</h3>
            <p>다른 키워드로 검색해보세요.</p>
        </div>
    </div>
    </div>
  );
}
