import PropTypes from 'prop-types';

/**
 * @param title - заголовок
 * @param className - класс
 * @param titleClassName - класс для заголовка
 * @param children - нода для отрисовки внутри элемента
 */

// eslint-disable-next-line no-unused-vars
const SimpleDropDown = ({ title, className, titleClassName, children, icon, iconClassName }) => {
  return (
    <details className={className}>
      <summary className={titleClassName}>
        {icon && <span className={iconClassName}>{icon}</span>}
        {title}
      </summary>
      {children}
    </details>
  )
}

SimpleDropDown.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node
};

export default SimpleDropDown