import { BsBriefcase, BsBriefcaseFill } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { HiLocationMarker } from 'react-icons/hi';

type Props = {
  annotation: string;
  onChange: (inputName: string, annotation: string) => void;
};

const AnnotationPicker = ({ annotation, onChange }: Props) => {
  return (
    <div className="flex divide-x divide-gray-300">
      <div
        onClick={() => onChange('annotation', 'Home')}
        className={`w-full px-4 py-4 flex justify-center items-center gap-1 bg-white text-gray-600 cursor-pointer hover:bg-black hover:text-white transition ${
          annotation == 'Home' && 'font-bold'
        }`}
      >
        {annotation == 'Home' ? <GoHomeFill /> : <GoHome />}
        Home
      </div>
      <div
        onClick={() => onChange('annotation', 'Work')}
        className={`w-full px-4 py-4 flex justify-center items-center gap-1 bg-white text-gray-600 cursor-pointer hover:bg-black hover:text-white transition ${
          annotation == 'Work' && 'font-bold'
        }`}
      >
        {annotation == 'Work' ? <BsBriefcaseFill /> : <BsBriefcase />}
        Work
      </div>
      <div
        onClick={() => onChange('annotation', 'Other')}
        className={`w-full px-4 py-4 flex justify-center items-center gap-1 bg-white text-gray-600 cursor-pointer hover:bg-black hover:text-white transition ${
          annotation == 'Other' && 'font-bold'
        }`}
      >
        {annotation == 'Other' ? <HiLocationMarker /> : <CiLocationOn />}
        Other
      </div>
    </div>
  );
};

export default AnnotationPicker;
