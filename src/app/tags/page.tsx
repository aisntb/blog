import './tag.css'
import { Tag, tags } from '../../../.velite';
import Header from '../components/Header';
export default function Tags(){
    const getTagSize = (count: number) => {
        if (count >= 20) return 'xxl';
        if (count >= 15) return 'xl';
        if (count >= 10) return 'l';
        if (count >= 7) return 'm';
        if (count >= 4) return 's';
        return 'xs';
    }
    const sortTags = (tags:Array<Tag>) => {
        return [...tags].sort((a, b) => b.count - a.count);
    }
    return(
        <>
        <Header/>
        <div className="container">
            <div className="tag-cloud-section">
                <div className="section-header">
                    <h2 className="section-title text-[#1d1d1f] dark:text-white">태그 클라우드</h2>
                    <p className="section-description"></p>
                </div>

                <div className="tag-cloud bg-white dark:bg-black" id="tagCloud">
                    {
                        sortTags(tags).map(e=>
                            <span key={e.name} className={`tag size-${getTagSize(e.count)} bg-[#f5f5f7] text-[#86868b] dark:bg-[#1e293b] dark:text-white`}>{e.name}</span>
                        )
                    }
                </div>
            </div>
        </div>
        </>
        
    )
}