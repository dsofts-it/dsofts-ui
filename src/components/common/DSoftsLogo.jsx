import darkLogo from '../../assets/dark.png';
import lightLogo from '../../assets/light thamed.png';

const DSoftsLogo = ({ className = "h-9 sm:h-10 md:h-12 lg:h-14 w-auto", dark = false, isDarkBg = false }) => {
  const useLightLogo = dark || isDarkBg;
  const logoSrc = useLightLogo ? lightLogo : darkLogo;

  return (
    <div className="inline-flex items-center select-none">
      <img
        src={logoSrc}
        alt="DSofts IT Services"
        className={`object-contain transition-transform duration-300 group-hover:scale-105 ${className}`}
      />
    </div>
  );
};

export default DSoftsLogo;

