import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

const CarouselClientWrapper = dynamic(
  () => import('@/components/client/CarouselClientWrapper'),
  { ssr: false }
);

interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
}

interface ImageCarouselProps {
  title: string;
  urlPath: string;
  items: CarouselItem[];
}

const ImageCarousel = ({ title, urlPath, items }: ImageCarouselProps) => {
  return (
    <section className='relative mb-10'>
      <div className='mb-4 flex items-center justify-between'>
        <Link href={`/${ urlPath }`} className='text-theme-primary text-xl'>{title}</Link>
        <Link
          href={`/${ urlPath }`}
          className='text-theme-primary z-10 text-sm hover:text-orange-600 hover:underline dark:hover:text-orange-200'
        >
          {'더보기'}
        </Link>
      </div>
      <CarouselClientWrapper itemCount={items.length}>
        {items.map((item) => (
          <div key={item.id}>
            <Link href={`/${ urlPath }/${ item.id }`}>
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={210}
                height={297}
                style={{ width: '210px', height: '297px', objectFit: 'cover' }}
              />
            </Link>
          </div>
        ))}
      </CarouselClientWrapper>
      <div className='absolute bottom-0 right-0 top-8 w-10 bg-gradient-to-l from-white to-transparent dark:from-[#222]' />
    </section>
  );
};

export default ImageCarousel;
