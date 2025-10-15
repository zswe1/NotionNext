import LazyImage from '@/components/LazyImage'
import NotionIcon from './NotionIcon'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview

  const POST_TWO_COLS = siteConfig('HEO_HOME_POST_TWO_COLS', true, CONFIG)
  const COVER_HOVER_ENLARGE = siteConfig(
    'HEO_POST_LIST_COVER_HOVER_ENLARGE',
    true,
    CONFIG
  )

  return (
    <article className={`${COVER_HOVER_ENLARGE ? 'hover:transition-all duration-150' : ''}`}>
      <SmartLink href={post?.href} passHref legacyBehavior>
        <div
          data-wow-delay='.2s'
          className='relative wow fadeInUp border bg-white dark:bg-[#1e1e1e] mb-4 group w-full dark:border-gray-600 hover:border-indigo-600 dark:hover:border-yellow-600 duration-300 transition-colors overflow-hidden rounded-xl cursor-pointer h-80'>
          
          {/* 背景图片层 */}
          {showPageCover && (
            <div className='absolute inset-0 w-full h-full'>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='h-full w-full object-cover group-hover:scale-110 transition-all duration-700 ease-out'
              />
              {/* 渐变遮罩层 - 从底部深色渐变到顶部透明 */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent'></div>
            </div>
          )}

          {/* 文字内容层 */}
          <div className='relative z-10 h-full flex flex-col justify-end p-6'>
            {/* 分类标签 */}
            {post?.category && (
              <div className='mb-3'>
                <span className='inline-block px-3 py-1 text-xs font-semibold text-white bg-indigo-600 dark:bg-yellow-500 rounded-full shadow-lg'>
                  {post.category}
                </span>
              </div>
            )}

            {/* 标题 */}
            <h2 className='text-white text-2xl font-extrabold leading-tight mb-3 line-clamp-2 group-hover:text-indigo-300 dark:group-hover:text-yellow-300 transition-colors drop-shadow-lg'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className="inline-block w-6 h-6 mr-2 align-middle"
                />
              )}
              {post.title}
            </h2>

            {/* 摘要 */}
            {(!showPreview || showSummary) && post.summary && (
              <p className='text-gray-100 text-sm font-light leading-relaxed mb-3 line-clamp-2 drop-shadow'>
                {post.summary}
              </p>
            )}

            {/* 标签组 */}
            {post.tagItems && post.tagItems.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-2'>
                {post.tagItems.slice(0, 4).map(tag => (
                  <span 
                    key={tag.name} 
                    className='text-xs text-gray-200 bg-white/20 backdrop-blur-sm px-2 py-1 rounded hover:bg-white/30 transition-colors'>
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </SmartLink>
    </article>
  )
}

export default BlogPostCard
