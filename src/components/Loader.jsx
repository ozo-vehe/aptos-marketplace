import PropTypes from 'prop-types';

const Loader = ({spinnerColor}) => {
  return (
    <span className={`block w-6 h-6 rounded-full ${spinnerColor ? spinnerColor : 'border-gray-50'} border-x-2 animate-spin`}></span>
  );
};

export default Loader;

Loader.propTypes = {
  spinnerColor: PropTypes.string,
};