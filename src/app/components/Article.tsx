export default function Article({post}){

    const parseDate = (data:String) => {
        const date = new Date(data)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const dateStr = date.getDate()
        return `${year}년 ${month}일 ${dateStr}일`
    }

    return(
        <article className="blog-card" data-category="JavaScript" onClick={()=>location.href=post.permalink}>
            <div className="card-image"></div>
                <div className="card-content">
                    <div className="card-category">{post.category}</div>
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-excerpt">{post.excerpt}</p>
                    <div className="card-meta">
                        <div className="card-date">{parseDate(post.date)}</div>
                        <div className="card-tags">
                            <span className="tag">ES6+</span>
                            <span className="tag">비동기</span>
                    </div>
                </div>
            </div>
        </article>
    )
}