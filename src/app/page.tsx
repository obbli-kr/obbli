import ImageCarousel from '@/components/server/ImageCarousel';
import GridSection from '@/components/server/GridSection';
import {
  mockObbliData,
  mockLessonData,
  mockRecruitmentData,
  mockConcertData,
  mockBoardData1,
  mockBoardData2,
  GridData,
  CarouselItem,
  BoardData,
} from '@/_libs/mockData';

// Mock API 함수
const fetchObbliData = async (): Promise<GridData[]> => {
  return mockObbliData;
};

const fetchLessonData = async (): Promise<GridData[]> => {
  return mockLessonData;
};

const fetchRecruitmentData = async (): Promise<CarouselItem[]> => {
  return mockRecruitmentData;
};

const fetchConcertData = async (): Promise<CarouselItem[]> => {
  return mockConcertData;
};

const fetchBoardData1 = async (): Promise<BoardData[]> => {
  return mockBoardData1;
};
const fetchBoardData2 = async (): Promise<BoardData[]> => {
  return mockBoardData2;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${ month }/${ day }`;
};

const Home = async () => {
  const obbliData = await fetchObbliData();
  const lessonData = await fetchLessonData();
  const recruitmentData = await fetchRecruitmentData();
  const concertData = await fetchConcertData();
  const mockBoardData1 = await fetchBoardData1();
  const mockBoardData2 = await fetchBoardData2();

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-10 flex flex-col items-center justify-center rounded-lg bg-orange-200 dark:bg-orange-400 p-5 shadow-lg'>
          <h2 className='text-theme mb-4 text-2xl'>{'Obbli-gato!'}</h2>
          <p className='text-theme'>
            {'클래식 음악을 위한 커뮤니티'}
          </p>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-4'>
          <GridSection
            title='오브리'
            data={obbliData}
            formatTime={formatDate}
            urlPath='obbli'
          />
          <GridSection
            title='레슨'
            data={lessonData}
            formatTime={formatDate}
            urlPath='lesson'
          />
        </div>
        <ImageCarousel title='채용' urlPath='recruit' items={recruitmentData} />
        <ImageCarousel title='콘서트' urlPath='concert' items={concertData} />
        <div className='flex flex-col md:flex-row md:space-x-4'>
          <GridSection
            title='게시판'
            data={mockBoardData1}
            formatTime={formatDate}
            urlPath='board'
          />
          <GridSection
            title='소식'
            data={mockBoardData2}
            formatTime={formatDate}
            urlPath='board'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
