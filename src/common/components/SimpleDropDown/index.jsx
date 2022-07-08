import PropTypes from 'prop-types';

/**
 * @param title - заголовок
 * @param className - класс
 * @param titleClassName - класс для заголовка
 * @param children - нода для отрисовки внутри элемента
 */

const SimpleDropDown = ({ title, className, titleClassName, children }) => {
  return (
    <details className={className}>
      <summary className={titleClassName}>
        {title}
      </summary>
      {children}
    </details>
  )
}

SimpleDropDown.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  children: PropTypes.node
};

export default SimpleDropDown