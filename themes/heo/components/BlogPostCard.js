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
      
      {/* 单列布局：Overlay文字浮空效果 - 只在小屏幕显示 */}
      <div className='lg:hidden'>
        <SmartLink href={post?.href} passHref legacyBehavior>
          <div
            data-wow-delay='.2s'
            className='relative wow fadeInUp border dark:border-gray-600 hover:border-indigo-600 dark:hover:border-yellow-600 duration-300 transition-colors overflow-hidden rounded-xl cursor-pointer mb-4 group h-64'>
            {/* 👆 这里的 h-64 可以改成 h-56 (224px) 或 h-72 (288px) 来调整卡片高度 */}
            
            {/* 背景图片层 */}
            {showPageCover && (
              <div className='absolute inset-0 w-full h-full'>
                <LazyImage
                  priority={index === 0}
                  src={post?.pageCoverThumbnail}
                  alt={post?.title}
                  className='h-full w-full object-cover group-hover:scale-110 transition-all duration-700 ease-out'
                />
                {/* 渐变遮罩层 */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent'></div>
              </div>
            )}

            {/* 文字内容层 */}
            <div className='relative z-10 h-full flex flex-col justify-end p-5'>
              {/* 分类标签 */}
              {post?.category && (
                <div className='mb-2'>
                  <span className='inline-block px-2 py-1 text-xs font-semibold text-white bg-indigo-600 dark:bg-yellow-500 rounded-full shadow-lg'>
                    {post.category}
                  </span>
                </div>
              )}

              {/* 标题 */}
              <h2 className='text-white text-xl font-extrabold leading-tight mb-2 line-clamp-2 group-hover:text-indigo-300 dark:group-hover:text-yellow-300 transition-colors drop-shadow-lg'>
                {siteConfig('POST_TITLE_ICON') && (
                  <NotionIcon
                    icon={post.pageIcon}
                    className="inline-block w-5 h-5 mr-1 align-middle"
                  />
                )}
                {post.title}
              </h2>

              {/* 摘要 */}
              {(!showPreview || showSummary) && post.summary && (
                <p className='text-gray-100 text-sm font-light leading-relaxed mb-2 line-clamp-1 drop-shadow'>
                  {post.summary}
                </p>
              )}

              {/* 标签组 */}
              {post.tagItems && post.tagItems.length > 0 && (
                <div className='flex flex-wrap gap-1.5'>
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
      </div>

      {/* 二列布局：传统上图下文分离布局 - 在中等屏幕显示 */}
      <div className='hidden lg:block xl:hidden'>
        <div
          data-wow-delay='.2s'
          className='wow fadeInUp border bg-white dark:bg-[#1e1e1e] mb-4 flex flex-col group w-full dark:border-gray-600 hover:border-indigo-600 dark:hover:border-yellow-600 duration-300 transition-colors overflow-hidden rounded-xl h-80'>
          {/* 👆 这里的 h-80 (320px) 可以改成 h-72 (288px) 或 h-96 (384px) 来调整卡片总高度 */}
          
          {/* 图片封面 - 占卡片高度的50% */}
          {showPageCover && (
            <SmartLink href={post?.href} passHref legacyBehavior>
              <div className='w-full h-40 overflow-hidden cursor-pointer select-none flex-shrink-0'>
                {/* 👆 这里的 h-40 (160px) 控制图片高度，可以改成 h-36 (144px) 或 h-44 (176px) 或 h-48 (192px) */}
                <LazyImage
                  priority={index === 0}
                  src={post?.pageCoverThumbnail}
                  alt={post?.title}
                  className='h-full w-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-500 ease-in-out'
                />
              </div>
            </SmartLink>
          )}

          {/* 文字区块 - 自动填充剩余空间 */}
          <div className='flex p-5 flex-col justify-between flex-1'>
            <header>
              {/* 分类 */}
              {post?.category && (
                <div className='flex mb-1 items-center justify-start flex-wrap dark:text-gray-300 text-gray-600 hover:text-indigo-700 dark:hover:text-yellow-500'>
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
                className='group-hover:text-indigo-700 dark:hover:text-yellow-700 dark:group-hover:text-yellow-600 text-black dark:text-gray-100 line-clamp-2 replace cursor-pointer text-lg font-extrabold leading-tight'>
                {siteConfig('POST_TITLE_ICON') && (
                  <NotionIcon
                    icon={post.pageIcon}
                    className="heo-icon w-5 h-5 mr-1 align-middle transform translate-y-[-8%]"
                  />
                )}
                <span className='menu-link'>{post.title}</span>
              </SmartLink>
            </header>

            {/* 摘要 */}
            {(!showPreview || showSummary) && (
              <main className='line-clamp-2 replace text-gray-700 dark:text-gray-300 text-sm font-light leading-tight'>
                {post.summary}
              </main>
            )}

            {/* 标签 */}
            <div className='flex-wrap justify-start inline-block mt-auto'>
              <div>
                {post.tagItems?.map(tag => (
                  <TagItemMini key={tag.name} tag={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 三列布局：传统上图下文分离布局 - 在超大屏幕显示 */}
      <div className='hidden xl:block'>
        <div
          data-wow-delay='.2s'
          className='wow fadeInUp border bg-white dark:bg-[#1e1e1e] mb-4 flex flex-col group w-full dark:border-gray-600 hover:border-indigo-600 dark:hover:border-yellow-600 duration-300 transition-colors overflow-hidden rounded-xl h-[26rem]'>
          {/* 👆 这里的 h-[26rem] (416px) 可以改成 h-96 (384px) 或 h-[28rem] (448px) 来调整卡片总高度 */}
          
          {/* 图片封面 */}
          {showPageCover && (
            <SmartLink href={post?.href} passHref legacyBehavior>
              <div className='w-full h-52 overflow-hidden cursor-pointer select-none flex-shrink-0'>
                {/* 👆 这里的 h-52 (208px) 控制图片高度，可以改成 h-48 (192px) 或 h-56 (224px) */}
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
          <div className='flex p-5 flex-col justify-between flex-1'>
            <header>
              {/* 分类 */}
              {post?.category && (
                <div className='flex mb-1 items-center justify-start flex-wrap dark:text-gray-300 text-gray-600 hover:text-indigo-700 dark:hover:text-yellow-500'>
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
                className='group-hover:text-indigo-700 dark:hover:text-yellow-700 dark:group-hover:text-yellow-600 text-black dark:text-gray-100 line-clamp-2 replace cursor-pointer text-base font-extrabold leading-tight'>
                {siteConfig('POST_TITLE_ICON') && (
                  <NotionIcon
                    icon={post.pageIcon}
                    className="heo-icon w-4 h-4 mr-1 align-middle transform translate-y-[-8%]"
                  />
                )}
                <span className='menu-link'>{post.title}</span>
              </SmartLink>
            </header>

            {/* 摘要 */}
            {(!showPreview || showSummary) && (
              <main className='line-clamp-3 replace text-gray-700 dark:text-gray-300 text-sm font-light leading-tight'>
                {post.summary}
              </main>
            )}

            {/* 标签 */}
            <div className='flex-wrap justify-start inline-block mt-auto'>
              <div>
                {post.tagItems?.map(tag => (
                  <TagItemMini key={tag.name} tag={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </article>
  )
}

export default BlogPostCard
