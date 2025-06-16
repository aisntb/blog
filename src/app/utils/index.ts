import { Post } from "../../../.velite"

export const parseDate = (data:String) => {
    const date = new Date(data.valueOf())
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const dateStr = date.getDate()
    return `${year}년 ${month}월 ${dateStr}일`
}

export const parseMMDD = (data:String) => {
    const date = new Date(data.valueOf())
    const month = date.getMonth() + 1
    const dateStr = date.getDate()
    return `${month}월 ${dateStr}일`
}

export const groupPostsByMonth = (posts:Array<Post>) => {
  const groups:{[key: string]:Array<Post>} = {};

  posts.forEach(post => {
    const date = new Date(post.date);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!groups[yearMonth]) {
      groups[yearMonth] = [];
    }

    groups[yearMonth].push(post);
  });

  return groups;
};