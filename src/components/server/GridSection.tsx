import Link from 'next/link';

interface GridItem {
  id: number;
  title: string;
  instrument?: string;
  dateTime: string;
  userId?: string;
}

interface GridSectionProps {
  title: string;
  data: GridItem[];
  formatTime: (_dateTime: string)=> string;
  urlPath: string;
}

const GridSection = ({
  title,
  data,
  formatTime,
  urlPath,
}: GridSectionProps) => (
  <section className='mb-10 w-full md:w-1/2'>
    <div className='border-b-theme mb-1 flex items-center justify-between pb-1'>
      <Link href={`/${ urlPath }`} className='text-theme-primary text-lg'>{title}</Link>
      <Link
        href={`/${ urlPath }`}
        className='text-theme-primary text-sm hover:text-orange-600 hover:underline dark:hover:text-orange-200'
      >
        {'더보기'}
      </Link>
    </div>
    <div className='bg-theme overflow-hidden bg-white'>
      {data.map((item) => (
        <Link
          href={`/${ urlPath }/${ item.id }`}
          key={item.id}
          className='border-b-theme grid grid-cols-12 items-center gap-4 py-1  hover:bg-orange-200 dark:hover:bg-orange-400'
        >
          <div className='text-theme col-span-3 truncate text-center text-sm'>
            {item.instrument ? item.instrument : item.userId}
          </div>
          <div className='text-theme col-span-6 truncate text-left'>
            {item.title}
          </div>
          <div className='text-theme col-span-3 truncate text-center text-sm'>
            {formatTime(item.dateTime)}
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default GridSection;
