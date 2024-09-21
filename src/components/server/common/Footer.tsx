import { Mail } from 'lucide-react';

const Footer = () => (
  <footer className="bg-theme-secondary text-theme text-sm py-4">
    <div className="container mx-auto flex flex-col justify-center text-center">
      <div className='flex justify-center items-center'>
        <Mail className='size-4 mr-1' />
        <p className="">
          <a href="mailto:contact@obbli.kr" className="hover:underline">
            {'contact@obbli.kr'}
          </a>
        </p>
      </div>
      <p>{'© Obbli 2024'}</p>
    </div>
  </footer>
);

export default Footer;
