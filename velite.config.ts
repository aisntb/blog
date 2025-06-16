import rehypeShiki from '@shikijs/rehype';
import { defineConfig, s, defineCollection } from 'velite'
import { Post } from './.velite';

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.


function shuffle(array:Array<Post>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default defineConfig({
  root: 'content',
  markdown: {
    rehypePlugins: [
      [
        rehypeShiki as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        { theme: 'one-dark-pro' }
      ]
    ]
  },
  collections: {
    posts: {
      name: 'Post', // collection type name
      pattern: 'posts/**/*.md', // content files glob pattern
      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          slug: s.slug('posts'), // validate format, unique in posts collection
          subtitle:s.string().optional(),
          category: s.string(),
          tags: s.array(s.string()).default([]),
          date: s.isodate(), // input Date-like string, output ISO Date string.
          cover: s.image().optional(), // input image relative path, output image object with blurImage.
          video: s.file().optional(), // input file relative path, output file public path.
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          excerpt: s.excerpt({length:100}), // excerpt of markdown content
          content: s.markdown(), // transform markdown to html
          relatedPosts: s.array(
            s.object({
              title: s.string(),
              permalink: s.string(),
              date: s.isodate(),
              cover: s.any().optional(),
              category: s.string()
            })
          ).optional().default([])
        })
        // more additional fields (computed fields)
        .transform(data => ({ ...data, permalink: `/post/${data.slug}` }))
        
    },
    categories:{
      name: 'Category',
      pattern: 'categories/*.json',  // 빈 파일이라도 상관없음, 또는 아무 파일 없으면 빌드 시 생성됨
      single: false,
      schema: s.object({
        name: s.string(),
      }),
    },
    tags:{
      name: 'Tag',
      pattern: 'tags/*.json',  // 빈 파일이라도 상관없음, 또는 아무 파일 없으면 빌드 시 생성됨
      single: false,
      schema: s.object({
        name: s.string(),
        count:s.number()
      }),
    }
  },
  prepare(data, context) {
    const allCategories = new Set<string>();
    const allTags = new Map<string, number>();

    for (const post of data.posts) {
      if (post.category) {
        allCategories.add(post.category);
      }

      if (Array.isArray(post.tags)) {
        for (const tag of post.tags) {
          allTags.set(tag, (allTags.get(tag) || 0) + 1);
        }
      }
    }

    console.log("모든 카테고리를 저장했습니다.");
    data.categories = Array.from(allCategories).map(name => ({ name }));

    console.log("모든 태그를 저장했습니다.");
    data.tags = Array.from(allTags.entries()).map(([name, count]) => ({
      name,
      count,
    }));
    
    for (const post of data.posts) {
      const related = data.posts
        .filter(p => p.slug !== post.slug)
        .filter(p => p.tags.some(t => post.tags.includes(t)));

      // 랜덤 섞고 최대 4개 선택해서 필요한 정보만 추림
      post.relatedPosts = shuffle(related)
        .slice(0, 4)
        .map(p => ({
          title: p.title,
          permalink: p.permalink,
          date: p.date,
          cover: p.cover ?? null,
          category:p.category
        }));
    }
  }
})