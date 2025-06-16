import { Post } from "../../../.velite";
import { parseDate } from "../utils";

export default function Article({post}:{post:Post}){

    

    return(
        <article className="blog-card bg-white dark:bg-[#020817]" data-category={post.category} onClick={()=>location.href=post.permalink}>
            {
                post.cover?
                <div className="card-image">
                    <img src={post.cover.src}/>
                </div>
                :null
            }
                <div className="card-content">
                    <div className="card-category">{post.category}</div>
                    <h3 className="card-title text-[#1d1d1f] dark:text-white">{post.title}</h3>
                    <p className="card-excerpt text-[#86868b] dark:text-[#94a3b8]">{post?.subtitle? post.subtitle: post.excerpt + '...'}</p>
                    <div className="card-meta">
                        <div className="card-date">{parseDate(post.date)}</div>
                        <div className="card-tags">
                            {
                                post.tags.map((e,i)=>
                                    <span className="tag bg-[#f5f5f7] text-[#86868b] dark:bg-[#1e293b] dark:text-white" key={i}>{e}</span>
                                )
                            }
                    </div>
                </div>
            </div>
        </article>
    )
}