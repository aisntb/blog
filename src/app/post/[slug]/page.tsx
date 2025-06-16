"use client"
import { useEffect, useRef } from 'react'
import { posts, categories } from '../../../../.velite'
import "./post.css"
import { useParams } from 'next/navigation'
import { parseDate } from '@/app/utils'
import Header from '@/app/components/Header'
import MailIcon from "../../../assets/email.svg";
import GitIcon from "../../../assets/github.svg";



export default function Post(){
  const { slug } = useParams<{ slug: string; }>()
 
  const post = posts.find(e => e.slug == slug)
  let lastScrollTop = 0;
  const progressRef = useRef<HTMLDivElement | null>(null)
        
  const updateProgressBar = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (progressRef.current) {
      progressRef.current.style.width = `${scrollPercent}%`;
    }
      lastScrollTop = scrollTop;
  }


    useEffect(()=>{
      window.addEventListener('scroll', updateProgressBar);
    },[])
    return (
        <>
        <Header/>
          <div className="progress-bar" ref={progressRef}></div>
    <div className="container">
        <article className="article-header">
            <div className="article-category">{post?.category}</div>
            <h1 className="article-title text-[#1d1d1f] dark:text-white">{post?.title}</h1>
            <p className="article-excerpt">{post?.subtitle? post.subtitle: null}</p>
            
            <div className="article-meta">
                <div className="author-info">
                    <div className="author-avatar"></div>
                    <span>서하연</span>
                </div>
                <span>{parseDate(post?.date || "")}</span>
                <span>{post?.metadata.readingTime}분 읽기</span>
            </div>
        </article>
        {
          post?.cover?
            <div className="article-image"><img src={post?.cover?.src}/></div>
          :null
        } 
        

        <div className="article-content bg-white dark:bg-[#121212] dark:text-white" dangerouslySetInnerHTML={{ __html: post?.content || '' }}>
            
        </div>

        <div className="article-tags">
          {
            post?.tags.map((e,i)=>
              <span className="tag bg-[#f5f5f7] text-[#86868b] dark:bg-[#1e293b] dark:text-white" key={i}>{e}</span>
            )
          }
        </div>

        <div className="article-footer bg-white dark:bg-[#121212] text-[#1d1d1f] dark:text-white">
            <h3 className="footer-title">서하연</h3>
            <p className="footer-description">빙글빙글 돌아가는 내 컴퓨터</p>
            <div className="social-links">
                <a href="mailto:seohayeon.kr@gmail.com" className="social-link">
                  <MailIcon style={{ fill: 'white' }}/>
                </a>
                <a href="#" className="social-link">
                  <GitIcon style={{ fill: 'white' }}/>
                </a>
            </div>
        </div>

        <div className="related-posts">
            <h2 className="related-title text-[#1d1d1f] dark:text-white">관련 글</h2>
            <div className="related-grid">
              {
                post?.relatedPosts.map((e,i)=>
                  <article className="related-card bg-white dark:bg-[#020817]" key={i} onClick={()=>location.href=e.permalink}>
                    <div className="related-image" style={{"background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}>
                      {
                        e.cover?
                        <img src={e.cover.src}/>
                        :null
                      }
                    </div>
                    <div className="related-content">
                        <div className="related-category">{e.category}</div>
                        <h3 className="related-card-title text-[#1d1d1f] dark:text-white">{e.title}</h3>
                        <div className="related-date">{parseDate(e.date)}</div>
                    </div>
                  </article>
                )
              }
            </div>
        </div>
    </div>

        </>
    )
}