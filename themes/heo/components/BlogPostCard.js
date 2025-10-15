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

  const COVER_HOVER_ENLARGE = siteConfig(
    'HEO_POST_LIST_COVER_HOVER_ENLARGE',
    true,
    CONFIG
  )

  return (
    <article className={`${COVER_HOVER_ENLARGE ? 'hover:transition-all duration-150' : ''}`}>
      <div
        data-wow-delay='.2s'
        className='wow fadeInUp border bg-white dark:bg-[#1e1e1e] flex mb-4 group w-full dark:border-gray-600 hover:border-indigo-600 dark:hover:border-yellow-600 duration-300 transition-colors justify-between overflow-hidden rounded-xl
        flex-row h-32 lg:flex-col lg:h-52 xl:flex-col xl:h-96'>
        
        {/* 图片封面 */}
        {showPageCover && (
          <SmartLink href={post?.href} passHref legacyBehavior>
            <div className='w-32 lg:w-full lg:h-1/2 xl:w-full xl:h-1/2 overflow-hidden cursor-pointer select-none flex-shrink-0'>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='h-full w-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-500 ease-in-out'
              />
            </div>
          </SmartLink>
        )}

        {/* 文字区块 */}
        <div className='flex p-4 lg:p-6 flex-col justify-between flex-1 lg:h-1/2 xl:h-1/2'>
          <header>
            {/* 分类 */}
            {post?.category && (
              <div className='flex mb-1 items-center justify-start flex-wrap text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-yellow-500'>
                <SmartLink
                  passHref
                  href={`/category/${post.category}`}
                  className='cursor-pointer text-xs font-normal menu-link'>
                  {post.category}
                </SmartLink>
              </div>
            )}

            {/* 标题和图标 */}
            <SmartLink
              href={post?.href}
              passHref
              className='group-hover:text-indigo-700 dark:hover:text-yellow-700 dark:group-hover:text-yellow-600 text-black dark:text-gray-100 line-clamp-2 cursor-pointer font-extrabold leading-tight
              text-base lg:text-xl xl:text-lg'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className="inline-block w-4 h-4 lg:w-6 lg:h-6 xl:w-5 xl:h-5 mr-1 align-middle transform translate-y-[-8%]"
                />
              )}
              <span className='menu-link'>{post.title}</span>
            </SmartLink>
          </header>

          {/* 摘要 */}
          {(!showPreview || showSummary) && (
            <main className='line-clamp-2 lg:line-clamp-2 xl:line-clamp-3 text-gray-700 dark:text-gray-300 font-light leading-tight
            text-sm lg:text-sm xl:text-sm hidden lg:block'>
              {post.summary}
            </main>
          )}

          <div className='flex-wrap justify-start inline-block hidden lg:flex'>
            <div>
              {post.tagItems?.slice(0, 3).map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogPostCard
