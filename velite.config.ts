import { defineConfig, s, defineCollection } from 'velite'

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.



export default defineConfig({
  root: 'content',
  collections: {
    posts: {
      name: 'Post', // collection type name
      pattern: 'posts/**/*.md', // content files glob pattern
      schema: s
        .object({
          title: s.string().max(99), // Zod primitive type
          slug: s.slug('posts'), // validate format, unique in posts collection
          // slug: s.path(), // auto generate slug from file path
          category: s.string(),
          tags: s.array(s.string()).default([]),
          date: s.isodate(), // input Date-like string, output ISO Date string.
          cover: s.image().optional(), // input image relative path, output image object with blurImage.
          video: s.file().optional(), // input file relative path, output file public path.
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          excerpt: s.excerpt(), // excerpt of markdown content
          content: s.markdown() // transform markdown to html
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
    }
  },
  prepare(data, context) {
    const allCategories = new Set<string>()
    for (const post of data.posts) {
      if (post.category) {
        allCategories.add(post.category)
      }
    }
    console.log("모든 카테고리를 저장했습니다.")
    data.categories = Array.from(allCategories).map(name => ({ name }))

  }
})