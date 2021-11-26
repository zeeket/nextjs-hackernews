import Link from 'next/link';

import { useStory } from "../../hooks/useStory";
import ChatGlyph from '../Glyphs/ChatGlyph';
import HackerNewsGlyph from '../Glyphs/HackerNewsGlyph';

const StoryItem = ({ storyId }) => {
  const { isLoading, isError, isSuccess, data } = useStory(storyId);

  return isLoading ? (<IsLoading />) : isError ? (<IsError />) : isSuccess && (
    <div className="grid grid-cols-[40px,1fr] break-words overflow-hidden border-[1px] border-gray-300 rounded shadow-sm transition-colors cursor-pointer hover:border-gray-700/70" onClick={() => console.log('clicked')}>
      {/* karma vertical bar */}
      <div className="flex justify-center items-start py-2 bg-white/50">
        <span className="font-bold text-xs">{ data.score }</span>
      </div>

      {/* content */}
      <div className="grid gap-2 bg-white p-2 pb-1">
        {/* info block */}
        <p className=" text-gray-500/80 text-xs tracking-wide">
          Posted by&nbsp;
          <Link href={`/user/${data.id}`}>
            <a 
              className="hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              u/{data.by}
            </a>
          </Link>
          &nbsp;
          <span>{data.time}</span>
        </p>

        {/* title */}
        <h3 className="font-medium text-lg leading-snug">{data.title}</h3>

        {/* buttons */}
        <div className="grid grid-flow-col auto-cols-auto justify-start gap-1 -ml-1 text-xs text-gray-500/80">
          {/* comment count */}
          <button className="flex items-center rounded pr-2 pl-1 py-1 font-bold transition-colors hover:bg-gray-200 active:bg-gray-300 ">
            <ChatGlyph />
            <span className="ml-1">{ data.descendants === 0 ? 'No' : data.descendants } Comment{ data.descendants > 1 && 's' }</span>
          </button>

          {/* view on hackernews link */}
          <a 
            href={`https://news.ycombinator.com/item?id=${data.id}`} 
            target="_blank"
            className="flex items-center rounded pr-2 pl-1 py-1 font-bold transition-colors hover:bg-gray-200 active:bg-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            <HackerNewsGlyph />
            <span className="ml-1">View Original</span>
          </a>
        </div>
      </div>
    </div>
  );
}


// fetch loading
const IsLoading = () => {
  return (
    <div className="grid grid-cols-[40px,1fr] break-words overflow-hidden border-[1px] border-gray-400/80 rounded">
      <div className="flex justify-center items-start py-2 bg-gray-100">
        <div className="rounded-md w-3/4 h-3 bg-gray-300/80 animate-pulse"></div>
      </div>
      <div className="grid gap-3 items-start bg-white p-2">
        <div className="rounded-md w-5/12 h-4 bg-gray-300/80 animate-pulse"></div>
        <div className="rounded-md w-10/12 h-5 bg-gray-300/80 animate-pulse"></div>
        <div className="rounded-md w-7/12 h-5 bg-gray-300/80 animate-pulse"></div>
      </div>
    </div>
  );
}

// fetch error
const IsError = () => {
  return (
    <div>An error occured.</div>
  )
}
 
export default StoryItem;