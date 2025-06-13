"use client"
import { posts, categories } from '../../.velite'
import Article from './components/Article';
import { useState, useEffect } from 'react';

export default function Home() {
  let [featured, ...otherPosts] = posts;
  const [filter, setFilter] = useState('전체')
  const [visiblePosts, setVisiblePosts] = useState(posts);

  const updateVisibleCards = (filter:string) => {
    const filterPosts = otherPosts.filter((e) => e.category == filter);
    
  }

  useEffect(()=>{
    updateVisibleCards(filter)
  },[filter])
  
  return (
    <div>
      <header>
        <div className="header-content">
            <h1 className="header-title">Error DB</h1>
            <p className="header-subtitle">모든 에러를 기록하려고 만든 사이트</p>
        </div>
    </header>

    <div className="container">
        <div className="search-section">
            <input type="text" className="search-bar" placeholder="검색어를 입력하세요"/>
        </div>

        <div className="filter-section">
            <div className="filter-tabs">
                <button className={`filter-tab ${filter=='전체'&&'active'}`} onClick={()=>setFilter('전체')}>전체</button>
                {
                  categories.map(e=>
                    <button key={e.name} className={`filter-tab ${filter==e.name&&'active'}`} onClick={()=>setFilter(e.name)}>{e.name}</button>
                  )
                }
            </div>
        </div>

        <div className="blog-grid">
          {
            filter=="전체"?
              <article className="blog-card featured-post" onClick={()=>location.href=featured.permalink}>
                <div className="featured-image"></div>
                <div className="featured-content">
                    <div className="featured-badge">Featured</div>
                    <h2 className="featured-title">{featured.title}</h2>
                    <p className="featured-excerpt">{featured.excerpt}</p>
                    <div className="featured-meta">2024년 6월 10일 · {featured.category}</div>
                </div>
            </article>
            :null
          }

            {
              otherPosts.map(e=>
                <Article key={e.slug} post={e}/>
              )
            }

        </div>

        <div className="load-more-section">
            <button className="load-more-btn">더 많은 글 보기</button>
        </div>

        <div className="no-results" style={{display: "none"}}>
            <h3 className="no-results-title">검색 결과가 없습니다</h3>
            <p>다른 키워드로 검색해보세요.</p>
        </div>
    </div>
    </div>
  );
}
